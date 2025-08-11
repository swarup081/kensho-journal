import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getUserRole } from '@/lib/auth';
import { startOfWeek, format } from 'date-fns';

export async function GET(request) {
  try {
    const role = await getUserRole();
    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const supabase = createAdminClient();

    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return NextResponse.json({ error: 'Could not fetch users.' }, { status: 500 });
    }

    const { data: entries, error: entriesError } = await supabase
      .from('journal_entries')
      .select('user_id, created_at');

    if (entriesError) {
      console.error('Error fetching entries:', entriesError);
      return NextResponse.json({ error: 'Could not fetch entries.' }, { status: 500 });
    }

    const cohorts = users.reduce((acc, user) => {
      const cohortDate = startOfWeek(new Date(user.created_at));
      const cohortKey = format(cohortDate, 'yyyy-MM-dd');
      if (!acc[cohortKey]) {
        acc[cohortKey] = {
          totalUsers: 0,
          weeklyRetention: {},
        };
      }
      acc[cohortKey].totalUsers++;
      return acc;
    }, {});

    entries.forEach(entry => {
      const user = users.find(u => u.id === entry.user_id);
      if (user) {
        const cohortDate = startOfWeek(new Date(user.created_at));
        const cohortKey = format(cohortDate, 'yyyy-MM-dd');
        const entryWeek = startOfWeek(new Date(entry.created_at));
        const weekNumber = Math.floor((entryWeek - cohortDate) / (1000 * 60 * 60 * 24 * 7));

        if (cohorts[cohortKey]) {
          if (!cohorts[cohortKey].weeklyRetention[weekNumber]) {
            cohorts[cohortKey].weeklyRetention[weekNumber] = new Set();
          }
          cohorts[cohortKey].weeklyRetention[weekNumber].add(user.id);
        }
      }
    });

    // Convert sets to counts
    Object.keys(cohorts).forEach(cohortKey => {
      Object.keys(cohorts[cohortKey].weeklyRetention).forEach(weekNumber => {
        cohorts[cohortKey].weeklyRetention[weekNumber] = cohorts[cohortKey].weeklyRetention[weekNumber].size;
      });
    });

    return NextResponse.json(cohorts, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}