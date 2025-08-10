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
        get(name) { return cookieStore.get(name)?.value },
        set(name, value, options) { cookieStore.set({ name, value, ...options }) },
        remove(name, options) { cookieStore.set({ name, value: '', ...options }) },
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
    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('ai_summary, ai_emotions')
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

    // For single entries, we still use the direct summary. No AI call needed.
    if (entries.length === 1) {
      return NextResponse.json({
        summary: entries[0].ai_summary || "A moment of reflection.",
        emotions: entries[0].ai_emotions || [],
      });
    }

    // --- FINAL WORKAROUND ---
    // For multiple entries, we will ALWAYS generate a new summary and will NOT cache it.
    // This guarantees the summary is always up-to-date, at the cost of consistency and efficiency.
    
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
      Your response must be a single JSON object with "summary" and "emotions" keys.
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