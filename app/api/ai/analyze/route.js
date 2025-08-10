import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import OpenAI from 'openai';
import { cookies } from 'next/headers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { content } = await request.json();

  if (!content) {
    return NextResponse.json({ error: 'Missing content' }, { status: 400 });
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
      },
    }
  );

  try {
    // 1. Create the journal entry and get the new ID
    const { data: entryId, error: rpcError } = await supabase.rpc('create_journal_entry', {
      entry_content: content,
    });

    if (rpcError) {
      console.error('Supabase RPC error:', rpcError);
      return NextResponse.json({ error: 'Failed to create journal entry.' }, { status: 500 });
    }

    // 2. Get AI analysis
    const prompt = `
      Analyze the following journal entry and provide a structured analysis.
      The response MUST be a single, valid JSON object.
      ALL fields in the JSON schema are MANDATORY.
      Journal Entry:
      ---
      ${content}
      ---
      JSON Schema:
      {
        "summary": "A concise, one-sentence summary of the entry.",
        "keywords": ["An", "array", "of", "5-7", "relevant", "keywords", "or", "themes"],
        "emotions": [
          { "emotion": "The name of the emotion", "score": "An integer from 1-10" },
          { "emotion": "The name of the emotion", "score": "An integer from 1-10" },
          { "emotion": "The name of the emotion", "score": "An integer from 1-10" }
        ],
        "insightfulQuestion": "A single, open-ended, insightful question that encourages further reflection.",
        "title": "A short, catchy title for the journal entry (max 5 words)."
      }
      Ensure the "emotions" array contains exactly 3 objects.
      Do not include any text or formatting outside of the main JSON object.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
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