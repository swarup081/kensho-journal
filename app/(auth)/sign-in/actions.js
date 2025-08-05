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
    // UPDATED: Provide a more specific error message
    return redirect('/sign-in?message=Invalid login credentials. Please try again.');
  }

  return redirect('/journal');
}