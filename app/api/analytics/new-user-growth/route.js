import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getUserRole } from '@/lib/auth';
import { format } from 'date-fns';

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

    const growthByDay = users.reduce((acc, user) => {
      const dayKey = format(new Date(user.created_at), 'yyyy-MM-dd');
      acc[dayKey] = (acc[dayKey] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json(growthByDay, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}