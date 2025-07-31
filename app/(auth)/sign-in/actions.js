// app/(auth)/sign-in/actions.js
'use server';

import { createClient } from '../../../lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign-in error:', error);
    return redirect('/sign-in?message=Could not authenticate user');
  }

  // Changed this line from '/dashboard' to '/journal'
  return redirect('/journal');
}