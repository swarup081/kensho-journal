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

    // --- FIX: Add optimized path for single entries that still processes emotions ---
    if (entries.length === 1) {
      const entry = entries[0];
      const emotions = entry.ai_emotions || [];
      const top5Emotions = emotions
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(e => ({ ...e, score: parseFloat(e.score.toFixed(1)) }));
      
      return NextResponse.json({
        summary: entry.ai_summary || "A moment of reflection.",
        emotions: top5Emotions,
      });
    }

    // --- FINAL WORKAROUND ---
    // --- FIX: Manually calculate top 5 emotions and only ask AI for summary ---
    
    // 1. Consolidate and process emotions
    const allEmotions = entries.flatMap(e => e.ai_emotions || []);
    const emotionScores = {};
    const emotionCounts = {};

    if (allEmotions.length > 0) {
      allEmotions.forEach(({ emotion, score }) => {
        if (emotion && typeof score === 'number') {
          emotionScores[emotion] = (emotionScores[emotion] || 0) + score;
          emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
        }
      });
    }

    const averagedEmotions = Object.keys(emotionScores).map(emotion => ({
      emotion,
      score: parseFloat((emotionScores[emotion] / emotionCounts[emotion]).toFixed(1)),
    }));

    const top5Emotions = averagedEmotions
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // 2. Prepare content for AI summary generation
    const combinedSummaries = entries.map(e => e.ai_summary).filter(Boolean).join('\n\n---\n\n');

    if (!combinedSummaries) {
      // If no summaries, return top emotions with a generic summary
      return NextResponse.json({
        summary: "A day of quiet reflection.",
        emotions: top5Emotions,
      });
    }

    const prompt = `
      Analyze the following collection of AI-generated summaries from a user's journal entries for a single day. Your task is to create a single, overarching "Overall Summary" that captures the key themes and feelings of the day.

      Here are the individual summaries:
      ---
      ${combinedSummaries}
      ---
      Your response must be a single JSON object with a single key "summary".
    `;

    // 3. Call AI for summary and combine with processed emotions
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    
    return NextResponse.json({
      summary: analysis.summary,
      emotions: top5Emotions,
    });

  } catch (error) {
    console.error('AI daily summary error:', error);
    return NextResponse.json({ error: 'Failed to generate daily summary.' }, { status: 500 });
  }
}