import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  );

  const { date, userId } = await request.json();

  if (!date || !userId) {
    return NextResponse.json({ error: 'Missing date or userId' }, { status: 400 });
  }

  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);
  const dateString = startDate.toISOString().slice(0, 10);

  try {
    // 1. Check for an existing daily summary
    const { data: existingSummary, error: summaryError } = await supabase
      .from('daily_summaries')
      .select('summary, emotions')
      .eq('user_id', userId)
      .eq('date', dateString)
      .single();

    if (summaryError && summaryError.code !== 'PGRST116') {
      console.error('Error fetching existing summary:', summaryError);
    }

    if (existingSummary) {
      return NextResponse.json(existingSummary);
    }

    // 2. If no summary, fetch entries and generate one
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
      const analysis = {
        summary: entries[0].ai_summary || "A moment of reflection.",
        emotions: entries[0].ai_emotions || [],
      };
      return NextResponse.json(analysis);
    }

    const combinedAnalysis = entries.map(e => {
      return `Entry Summary: ${e.ai_summary}\
Emotions: ${JSON.stringify(e.ai_emotions)}`;
    }).join('\n\n---\n\n');

    const prompt = `
      Analyze the following collection of AI-generated summaries and emotion analyses from a user's journal entries for a single day. Your task is to create a single, overarching "Overall Summary" and a consolidated "Overall Emotion Flow".

      Here are the individual analyses:
      ---
      ${combinedAnalysis}
      ---
      Based on the provided data, generate a response in JSON format. Your response must be a single JSON object with the following keys:
      - "summary": A concise, one or two-sentence summary that synthesizes the themes and moods from all the individual summaries. This should reflect the entire day's experience.
      - "emotions": An array of the top 3 most prominent emotions for the entire day. Each element must be an object with "emotion" (string) and "score" (integer, 1-10), representing the consolidated emotional state.

      Example Response:
      {
        "summary": "The user experienced a day of mixed emotions, navigating professional challenges while finding moments of personal peace and reflection.",
        "emotions": [
          { "emotion": "Focused", "score": 8 },
          { "emotion": "Anxious", "score": 6 },
          { "emotion": "Calm", "score": 7 }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(response.choices[0].message.content);

    const { error: upsertError } = await supabase
      .from('daily_summaries')
      .upsert({
        user_id: userId,
        date: dateString,
        summary: analysis.summary,
        emotions: analysis.emotions,
      }, { onConflict: 'user_id, date' });

    if (upsertError) {
      console.error('Failed to save daily summary:', upsertError);
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI daily summary error:', error);
    return NextResponse.json({ error: 'Failed to generate daily summary.' }, { status: 500 });
  }
}