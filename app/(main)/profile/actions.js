'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const name = formData.get('name');
  const avatar_url = formData.get('avatar_url');

  const updateData = {};
  if (name) updateData.name = name;
  if (avatar_url) updateData.avatar_url = avatar_url;

  // Update the public profile table
  const { error: profileError } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', user.id);

  if (profileError) {
    console.error('Profile update error:', profileError);
    return { error: 'Failed to update profile.' };
  }

  // Also update the user metadata in the auth table
  if (name) {
      await supabase.auth.updateUser({ data: { name: name } });
  }

  revalidatePath('/profile');
  return { success: true };
}