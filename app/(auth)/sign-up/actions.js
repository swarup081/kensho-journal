// app/(auth)/sign-up/actions.js
'use server';

import { createClient } from '@/lib/supabase/server'; // Correctly import the server client
import { redirect } from 'next/navigation';

export async function signup(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');
  const supabase = createClient(); // Create an instance of the server client

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        avatar_url: `https://placehold.co/128x128/A78BFA/FFFFFF/png?text=${name.charAt(0)}`
      },
      // This is for the email confirmation flow if you re-enable it
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/` 
    }
  });

  if (error) {
    console.error('Sign-up Error:', error);
    return redirect('/sign-up?message=Could not create user');
  }

  // Redirect to the journal page after a successful signup
  return redirect('/journal');
}