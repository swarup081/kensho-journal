import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { date, userId } = await request.json();

  if (!date || !userId) {
    return NextResponse.json({ error: 'Missing date or userId' }, { status: 400 });
  }

  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  try {
    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('content, ai_summary, ai_emotions')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch entries.' }, { status: 500 });
    }

    if (!entries || entries.length === 0) {
      return NextResponse.json({ summary: "No entries for this day.", emotions: [] });
    }

    if (entries.length === 1) {
      return NextResponse.json({
        summary: entries[0].ai_summary || "A moment of reflection.",
        emotions: entries[0].ai_emotions || [],
      });
    }

    const combinedContent = entries.map(e => e.content).join('\n\n---\n\n');

    const prompt = `
      Analyze the following collection of journal entries from a single day and provide a consolidated summary and emotional analysis in JSON format. The entries are:
      ---
      ${combinedContent}
      ---
      Your response must be a single JSON object with the following keys:
      - "summary": A concise, one or two-sentence summary of the entire day's mood and themes.
      - "emotions": An array of the top 3 overall emotions for the day. Each element must be an object with "emotion" (string) and "score" (integer, 1-10).

      Example Response:
      {
        "summary": "The user had a productive day, balancing work-related stress with a sense of personal accomplishment.",
        "emotions": [
          { "emotion": "Productive", "score": 8 },
          { "emotion": "Stressed", "score": 5 },
          { "emotion": "Content", "score": 7 }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(response.choices[0].message.content);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI daily summary error:', error);
    return NextResponse.json({ error: 'Failed to generate daily summary.' }, { status: 500 });
  }
}