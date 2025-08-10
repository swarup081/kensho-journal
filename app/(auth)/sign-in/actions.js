'use server';

import { createClient } from '../../../lib/supabase/server';

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
    return { 
      success: false, 
      message: 'Invalid login credentials. Please try again.' 
    };
  }

  return { 
    success: true, 
    redirect: '/journal' 
  };
}