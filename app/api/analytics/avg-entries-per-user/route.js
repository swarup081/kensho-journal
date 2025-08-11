import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserRole } from '@/lib/auth';

export async function GET(request) {
  try {
    const role = await getUserRole();
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const supabase = createClient();

    const { count: totalEntries, error: entriesError } = await supabase
      .from('journal_entries')
      .select('*', { count: 'exact', head: true });

    if (entriesError) {
      console.error('Error fetching total entries:', entriesError);
      return NextResponse.json({ error: 'Could not fetch total entries.' }, { status: 500 });
    }

    // This is the correct way to get the count of distinct users
    const { count: totalUsers, error: usersError } = await supabase
      .from('journal_entries')
      .select('user_id', { count: 'exact', head: true });


    if (usersError) {
      console.error('Error fetching total users:', usersError);
      return NextResponse.json({ error: 'Could not fetch total users.' }, { status: 500 });
    }
    
    const avgEntriesPerUser = totalUsers > 0 ? totalEntries / totalUsers : 0;

    return NextResponse.json({ avgEntriesPerUser }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
