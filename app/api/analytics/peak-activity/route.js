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

    const { data, error } = await supabase
      .from('journal_entries')
      .select('created_at')
      .gte('created_at', yesterday.toISOString());

    if (error) {
      console.error('Error fetching peak activity data:', error);
      return NextResponse.json({ error: 'Could not fetch peak activity data.' }, { status: 500 });
    }

    const activityByHour = data.reduce((acc, entry) => {
      const hour = new Date(entry.created_at).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json(activityByHour, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
