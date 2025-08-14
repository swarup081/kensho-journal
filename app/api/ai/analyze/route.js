import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import OpenAI from 'openai';
import { cookies } from 'next/headers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const revalidate = 0;

export async function POST(request) {
  const { content, userId } = await request.json();

  if (!content || !userId) {
    return NextResponse.json({ error: 'Missing content or userId' }, { status: 400 });
  }
  
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  try {
    // 1. Create the journal entry and get the new ID
    const { data: newEntries, error: insertError } = await supabase
      .from('journal_entries')

      .insert({ content: content, user_id: userId }) // RLS policy should enforce user_id

      .select('id');

    if (insertError || !newEntries || newEntries.length === 0) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json({ error: 'Failed to create journal entry.' }, { status: 500 });
    }
    const entryId = newEntries[0].id;

    // --- FIX: Check for a valid entryId after creation ---
    if (!entryId) {
      console.error('Failed to retrieve ID for new journal entry.');
      return NextResponse.json({ error: 'Failed to create journal entry; could not retrieve ID.' }, { status: 500 });
    }

    // 2. Get AI analysis
    const prompt = `
      Analyze the following journal entry with a calm, gentle, and reassuring tone in 15-20 words. Your personality should be insightful, curious, and empathetic, acting as a partner in reflection. Use simple, easy, clear, and slightly poetic language.
      Focus on the emotional and psychological aspects, avoiding technical jargon. The analysis should feel like a warm conversation, not a clinical report.

      Journal Entry:
      ---
      \${content}
      ---

      The response MUST be a single, valid JSON object with the following schema:
      {
        "title": "The Weight of a Successful Launch",
        "summary": "In a compassionate tone, it feels like even though the launch was a success, there's a disconnect between the external celebration and your internal sense of fulfillment.",
        "keywords": ["Achievement Gap", "Emotional Disconnect", "Burnout", "Work-Life", "Work"],
        "insightfulQuestion": "You've described a gap between the success and the feeling. What's one thing, however small, that used to bring you joy in your work that feels absent right now?",
        "emotions": [
          { "emotion": "The name of the emotion", "score": "An integer from 1-10" },
          { "emotion": "The name of the emotion", "score": "An integer from 1-10" },
          { "emotion": "The name of the emotion", "score": "An integer from 1-10" }
        ]
      }

      Ensure the "emotions" array contains exactly 3 objects.
      Do not include any text or formatting outside of the main JSON object.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-5-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(response.choices[0].message.content);

    // 3. Sanitize the AI response and provide defaults
    const cleanAnalysis = {
      summary: analysis.summary || "AI summary could not be generated for this entry.",
      keywords: Array.isArray(analysis.keywords) && analysis.keywords.length > 0 ? analysis.keywords : ["analysis"],
      emotions: Array.isArray(analysis.emotions) && analysis.emotions.length > 0 ? analysis.emotions : [{ emotion: "Neutral", score: 5 }],
      insightfulQuestion: analysis.insightfulQuestion || "What is one thing you could do differently next time?",
      title: analysis.title || content.slice(0, 25) || "Journal Entry"
    };

    // 4. Update the entry with the analysis
    const { error: updateError } = await supabase
      .from('journal_entries')
      .update({
        ai_summary: cleanAnalysis.summary,
        ai_keywords: cleanAnalysis.keywords,
        ai_emotions: cleanAnalysis.emotions,
        ai_insightful_question: cleanAnalysis.insightfulQuestion,
        ai_title: cleanAnalysis.title,
      })
      .eq('id', entryId);

    if (updateError) {
      console.error('Supabase update error:', updateError);
      // Even if update fails, we can still return the analysis to the user
      // The entry is created, just not updated with AI data.
    }

    return NextResponse.json({ ...cleanAnalysis, entryId });
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze entry.' }, { status: 500 });
  }
}