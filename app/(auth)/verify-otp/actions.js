'use server';

import { createClient } from '@/lib/supabase/server';

export async function resendVerificationEmail(formData) {
  const email = formData.get('email');
  
  if (!email) {
    return { error: 'Email is required to resend verification.' };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  });

  if (error) {
    console.error('Resend Error:', error);
    return { error: 'Could not resend email. Please try again shortly.' };
  }

  return { success: 'Verification email sent successfully!' };
}