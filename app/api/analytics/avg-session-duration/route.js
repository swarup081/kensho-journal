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

    const yesterday = subDays(new Date(), 1);

    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('user_id, created_at')
      .gte('created_at', yesterday.toISOString());

    if (error) {
      console.error('Error fetching session data:', error);
      return NextResponse.json({ error: 'Could not fetch session data.' }, { status: 500 });
    }

    const sessions = entries.reduce((acc, entry) => {
      if (!acc[entry.user_id]) {
        acc[entry.user_id] = {
          first: new Date(entry.created_at),
          last: new Date(entry.created_at),
        };
      } else {
        const entryDate = new Date(entry.created_at);
        if (entryDate < acc[entry.user_id].first) {
          acc[entry.user_id].first = entryDate;
        }
        if (entryDate > acc[entry.user_id].last) {
          acc[entry.user_id].last = entryDate;
        }
      }
      return acc;
    }, {});

    const sessionDurations = Object.values(sessions).map(session => {
      return (session.last - session.first) / 1000; // duration in seconds
    });

    const avgSessionDuration = sessionDurations.length > 0
      ? sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length
      : 0;

    return NextResponse.json({ avgSessionDuration }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
