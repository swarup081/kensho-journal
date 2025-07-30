// app/(auth)/sign-in/actions.js
'use server';

import { createClient } from '@/lib/supabase/server'; // Correctly import the server client
import { redirect } from 'next/navigation';

export async function signin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const supabase = createClient(); // Create an instance of the server client

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // You can handle the error more gracefully here, e.g., return a message
    console.error('Sign-in error:', error);
    return redirect('/sign-in?message=Could not authenticate user');
  }

  return redirect('/dashboard');
}