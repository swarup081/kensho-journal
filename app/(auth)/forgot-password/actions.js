// app/(auth)/forgot-password/actions.js
'use server';

import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function requestPasswordReset(formData) {
  const origin = headers().get('origin');
  const email = formData.get('email');
  const supabase = createClient();

  // This is the recommended secure method. It does not confirm if an account exists.
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/update-password`,
  });

  if (error) {
    // We still don't want to reveal specific errors to the client.
    // We log the real error for debugging but return a generic success message.
    console.error('Password Reset Error:', error);
  }

  // Always return a professional, non-committal success message.
  return { 
    success: true, 
    message: 'A password reset link has been sent to the provided email address. Please check your inbox (and spam folder).' 
  };
}