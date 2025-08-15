'use server';

import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

const isInvalidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
};

const isInvalidPhone = (phone) => {
  const phoneRegex = /^\d+$/;
  return !phoneRegex.test(phone);
};

export async function signup(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');
  
  if (!name || !email || !phone || !password) {
    return { success: false, message: 'All fields are required.' };
  }
  if (isInvalidEmail(email)) {
    return { success: false, message: 'Please use a valid email address.' };
  }
  if (isInvalidPhone(phone)) {
    return { success: false, message: 'Phone number must only contain digits.' };
  }
  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }

  const headersList = headers();
  const host = headersList.get('host');
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';
  const baseURL = `${protocol}://${host}`;

  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      data: {
        name,
        phone,
        avatar_url: `https://placehold.co/128x128/A78BFA/FFFFFF/png?text=${name.charAt(0)}`
      },
      emailRedirectTo: `${baseURL}/api/auth/callback?next=/journal&email=${encodeURIComponent(email)}`
    }
  });

  if (error) {
    console.error('Sign-up Error:', error);
    if (error.message.includes('User already registered')) {
        return { success: false, message: 'An account with this email already exists.' };
    }
    return { success: false, message: 'Could not create user. Please try again.' };
  }

  return { success: true, message: 'Check your email for a magic link to log in.' };
}