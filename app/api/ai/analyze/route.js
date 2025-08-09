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
      Analyze the following journal entry with a human, polite, and supportive tone. Avoid a robotic feel and do not start sentences with "The user...". Your analysis should be detailed yet precise. The entry is:
      ---
      ${content}
      ---
      Your response must be a single JSON object with the following keys:
      - "summary": A concise, one or two-sentence summary that sounds like a supportive friend's observation. It should be insightful and reflect the core of the entry.
      - "keywords": An array of 5-7 relevant keywords or themes. ALL keywords MUST be prefixed with a '#'. Extract any user-defined hashtags and ensure all other keywords you generate also have this prefix.
      - "emotions": An array of the top 3 emotions detected. Each element must be an object with "emotion" (string) and "score" (integer, 1-10).
      - "insightfulQuestion": A single, open-ended, and appropriate insightful question that encourages deeper, meaningful reflection. It should feel like it's coming from someone who genuinely understands.
      - "title": A short, catchy, and emotionally resonant title for the journal entry (max 5 words).

      Example of the TONE and STRUCTURE:
      {
        "summary": "It sounds like you're navigating a complex situation, and it's completely understandable to feel a mix of hope and uncertainty. You're showing great strength by reflecting on it.",
        "keywords": ["#NewChapter", "#PersonalGrowth", "#Uncertainty", "#SelfReflection", "#JobSearch"],
        "emotions": [
          { "emotion": "Hopeful", "score": 8 },
          { "emotion": "Anxious", "score": 5 },
          { "emotion": "Determined", "score": 7 }
        ],
        "insightfulQuestion": "As you step into this new chapter, what is one core value you want to hold onto, no matter what challenges arise?",
        "title": "Navigating the Unknown"
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(response.choices[0].message.content);

    // Post-processing to ensure all keywords have a '#' prefix
    if (analysis.keywords && Array.isArray(analysis.keywords)) {
      analysis.keywords = analysis.keywords.map(kw => kw.startsWith('#') ? kw : `#${kw}`);
    }

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
