'use server';

import { createClient } from '@/lib/supabase/server';

export async function updatePassword(formData) {
  const password = formData.get('password');
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error('Update Password Error:', error);
    return { 
      success: false, 
      message: 'There was an error updating your password. Please try again.' 
    };
  }

  return { 
    success: true, 
    message: 'Your password has been updated successfully! Please sign in with your new password.' 
  };
}
