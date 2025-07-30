'use server';
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';

export async function signin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign-in Error:', error);
    redirect('/sign-in?error=InvalidCredentials');
    return;
  }

  redirect('/journal');
}