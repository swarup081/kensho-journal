import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserRole } from '@/lib/auth';
import { subDays } from 'date-fns';

export async function GET(request) {
  try {
    const role = await getUserRole();
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const supabase = createClient();

    const thirtyDaysAgo = subDays(new Date(), 30);

    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('user_id')
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (error) {
      console.error('Error fetching entries:', error);
      return NextResponse.json({ error: 'Could not fetch entries.' }, { status: 500 });
    }

    const entryCounts = entries.reduce((acc, entry) => {
      acc[entry.user_id] = (acc[entry.user_id] || 0) + 1;
      return acc;
    }, {});

    const powerUsers = Object.keys(entryCounts).filter(userId => entryCounts[userId] > 10);

    return NextResponse.json({ powerUsers, count: powerUsers.length }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
