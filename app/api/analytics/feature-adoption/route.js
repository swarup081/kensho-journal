import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getUserRole } from '@/lib/auth';

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
    const totalUsers = users.length;


    const { count: usersWithEntries, error: entriesError } = await supabase
      .from('journal_entries')
      .select('user_id', { count: 'exact', head: true });

    if (entriesError) {
      console.error('Error fetching users with entries:', entriesError);
      return NextResponse.json({ error: 'Could not fetch users with entries.' }, { status: 500 });
    }

    const adoptionRate = totalUsers > 0 ? (usersWithEntries / totalUsers) * 100 : 0;

    return NextResponse.json({ adoptionRate, totalUsers, usersWithEntries }, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}