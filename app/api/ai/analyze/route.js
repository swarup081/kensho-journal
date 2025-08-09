import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { entryId, content } = await request.json();

  if (!entryId || !content) {
    return NextResponse.json({ error: 'Missing entryId or content' }, { status: 400 });
  }

  try {
    const prompt = `
      Analyze the following journal entry and provide a structured analysis in JSON format. The entry is:
      ---
      ${content}
      ---
      Your response must be a single JSON object with the following keys:
      - "summary": A concise, one-sentence summary of the entry.
      - "keywords": An array of 5-7 relevant keywords or themes from the entry. Extract any user-defined hashtags (words starting with #) and include them.
      - "emotions": An array of the top 3 emotions detected in the entry. Each element must be an object with "emotion" (string) and "score" (integer, 1-10).
      - "insightfulQuestion": A single, open-ended, insightful question that encourages further reflection on the entry's themes.
      - "title": A short, catchy title for the journal entry (max 5 words).

      Example Response:
      {
        "summary": "The user is feeling a mix of excitement and apprehension about an upcoming project.",
        "keywords": ["#project", "#newbeginnings", "anxiety", "excitement", "opportunity"],
        "emotions": [
          { "emotion": "Excitement", "score": 8 },
          { "emotion": "Anxiety", "score": 6 },
          { "emotion": "Hopeful", "score": 7 }
        ],
        "insightfulQuestion": "What specific aspect of this new project is causing the most apprehension, and how can you prepare for it?",
        "title": "Excited and Apprehensive"
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(response.choices[0].message.content);

    const { error } = await supabase
      .from('journal_entries')
      .update({
        ai_summary: analysis.summary,
        ai_keywords: analysis.keywords,
        ai_emotions: analysis.emotions,
        ai_insightful_question: analysis.insightfulQuestion,
        ai_title: analysis.title,
      })
      .eq('id', entryId);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Failed to save analysis to database.' }, { status: 500 });
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze entry.' }, { status: 500 });
  }
}