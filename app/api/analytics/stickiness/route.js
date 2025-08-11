import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserRole } from '@/lib/auth';
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

export async function GET(request) {
  try {
    const role = await getUserRole();
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const supabase = createClient();

    const today = new Date();
    const startOfToday_ = startOfDay(today);
    const endOfToday_ = endOfDay(today);
    const startOfCurrentMonth = startOfMonth(today);
    const endOfCurrentMonth = endOfMonth(today);

    const { count: dau, error: dauError } = await supabase
      .from('journal_entries')
      .select('user_id', { count: 'exact', head: true })
      .gte('created_at', startOfToday_.toISOString())
      .lte('created_at', endOfToday_.toISOString());

    if (dauError) {
      console.error('Error fetching DAU:', dauError);
      return NextResponse.json({ error: 'Could not fetch DAU data.' }, { status: 500 });
    }

    const { count: mau, error: mauError } = await supabase
      .from('journal_entries')
      .select('user_id', { count: 'exact', head: true })
      .gte('created_at', startOfCurrentMonth.toISOString())
      .lte('created_at', endOfCurrentMonth.toISOString());

    if (mauError) {
      console.error('Error fetching MAU:', mauError);
      return NextResponse.json({ error: 'Could not fetch MAU data.' }, { status: 500 });
    }

    const stickiness = mau > 0 ? (dau / mau) * 100 : 0;

    return NextResponse.json({ stickiness, dau, mau }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
