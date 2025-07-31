'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfileName(newName) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update your profile.' };
  }

  // --- FIX: Update the name in two places for consistency ---

  // 1. Update the public 'users' table
  const { error: publicError } = await supabase
    .from('users')
    .update({ name: newName })
    .eq('id', user.id);

  // 2. Update the user's metadata in the 'auth.users' table
  const { error: authError } = await supabase.auth.updateUser({
    data: { name: newName }
  });

  if (publicError || authError) {
    console.error('Error updating name:', publicError || authError);
    return { error: 'Could not update your name.' };
  }

  // Revalidate the profile page to ensure data is fresh
  revalidatePath('/profile');
  
  return { success: true };
}