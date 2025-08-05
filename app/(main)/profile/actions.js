'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

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

// --- NEW FUNCTION ---
export async function requestPasswordReset() {
  const supabase = createClient();
  const origin = headers().get('origin');

  // Get the authenticated user's email from the server-side
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'Could not identify user.' };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
    // This should be a page where users can enter their new password.
    // You'll need to create this page in a future step.
    redirectTo: `${origin}/update-password`,
  });

  if (error) {
    console.error('Password Reset Error:', error);
    // Return a generic message for security to avoid confirming if an account exists.
    return { 
      success: true, 
      message: 'If an account with this email exists, a password reset link has been sent.' 
    };
  }

  return { 
    success: true, 
    message: 'A password reset link has been sent to your email.' 
  };
}