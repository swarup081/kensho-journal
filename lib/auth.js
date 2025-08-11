import { createClient } from '@/lib/supabase/server';

export async function getUserRole() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null; // No user logged in
  }

  const { data: profile, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    console.error('Error fetching user profile or profile does not exist:', error);
    // Default to a non-privileged role for safety
    return 'user';
  }

  return profile.role;
}
