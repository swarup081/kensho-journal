import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserRole } from '@/lib/auth';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

export async function GET(request) {
  try {
    const role = await getUserRole();
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const supabase = createClient();

    const today = new Date();
    const startOfCurrentMonth = startOfMonth(today);
    const endOfCurrentMonth = endOfMonth(today);
    const startOfPreviousMonth = startOfMonth(subMonths(today, 1));
    const endOfPreviousMonth = endOfMonth(subMonths(today, 1));

    const { data: activeLastMonth, error: lastMonthError } = await supabase
      .from('journal_entries')
      .select('user_id')
      .gte('created_at', startOfPreviousMonth.toISOString())
      .lte('created_at', endOfPreviousMonth.toISOString());

    if (lastMonthError) {
      console.error('Error fetching last month activity:', lastMonthError);
      return NextResponse.json({ error: 'Could not fetch last month activity.' }, { status: 500 });
    }

    const { data: activeThisMonth, error: thisMonthError } = await supabase
      .from('journal_entries')
      .select('user_id')
      .gte('created_at', startOfCurrentMonth.toISOString())
      .lte('created_at', endOfCurrentMonth.toISOString());

    if (thisMonthError) {
      console.error('Error fetching this month activity:', thisMonthError);
      return NextResponse.json({ error: 'Could not fetch this month activity.' }, { status: 500 });
    }

    const lastMonthUsers = new Set(activeLastMonth.map(u => u.user_id));
    const thisMonthUsers = new Set(activeThisMonth.map(u => u.user_id));

    const churnedUsers = [...lastMonthUsers].filter(user => !thisMonthUsers.has(user));
    
    const churnRate = lastMonthUsers.size > 0 ? (churnedUsers.length / lastMonthUsers.size) * 100 : 0;

    return NextResponse.json({ churnRate, churnedUsers: churnedUsers.length, totalUsersLastMonth: lastMonthUsers.size }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
