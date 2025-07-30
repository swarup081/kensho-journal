'use server';
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';

export async function signup(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');

  // Supabase handles OTP generation and sending for email verification
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        // The default avatar can be set here or in the profile page later
        avatar_url: `https://placehold.co/128x128/A78BFA/FFFFFF/png?text=${name.charAt(0)}`
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/journal`
    }
  });

  if (error) {
    console.error('Sign-up Error:', error);
    // Redirect to an error page or show a message
    return;
  }

  // Supabase sends a confirmation email. We'll redirect to a page
  // telling the user to check their email.
  redirect('/verify-email'); // We will need to create this simple page.
}