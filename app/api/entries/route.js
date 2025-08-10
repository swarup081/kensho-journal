import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { content } = await request.json();

  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

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

  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const { user } = session;

    const { data: newEntries, error: insertError } = await supabase
      .from('journal_entries')
      .insert([{ content, user_id: user.id }])
      .select('created_at')
      .single();

    if (insertError) {
      console.error('Error saving journal entry:', insertError);
      return NextResponse.json({ error: 'Could not save journal entry.' }, { status: 500 });
    }

    const entryDate = new Date(newEntries.created_at);
    const dateString = entryDate.toISOString().slice(0, 10);

    const { error: deleteError } = await supabase
      .from('daily_summaries')
      .delete()
      .eq('user_id', user.id)
      .eq('date', dateString);

    if (deleteError) {
      // This is the important change for debugging.
      console.error('Failed to invalidate daily summary:', deleteError);
      return NextResponse.json(
        { error: 'Entry was saved, but failed to update the daily summary cache.', details: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Journal entry saved successfully.' }, { status: 201 });

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}