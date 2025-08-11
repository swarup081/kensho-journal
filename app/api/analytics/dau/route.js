import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserRole } from '@/lib/auth';
import { startOfDay, endOfDay } from 'date-fns';

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

    const { count, error } = await supabase
      .from('journal_entries')
      .select('user_id', { count: 'exact', head: true })
      .gte('created_at', startOfToday_.toISOString())
      .lte('created_at', endOfToday_.toISOString());

    if (error) {
      console.error('Error fetching DAU:', error);
      return NextResponse.json({ error: 'Could not fetch DAU data.' }, { status: 500 });
    }

    return NextResponse.json({ dau: count }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
