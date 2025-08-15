'use server';

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

  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        avatar_url: `https://placehold.co/128x128/A78BFA/FFFFFF/png?text=${name.charAt(0)}`
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback` 
    }
  });

  if (error) {
    console.error('Sign-up Error:', error);
    if (error.message.includes('User already registered')) {
        return { success: false, message: 'An account with this email already exists.' };
    }
    return { success: false, message: 'Could not create user. Please try again.' };
  }

  // When email confirmation is disabled, user is returned directly.
  // When email confirmation is enabled, user is returned and identities array is empty.
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { 
      success: false, 
      message: 'A user has been created, but the confirmation email could not be sent. Please contact support.' 
    };
  }
  
  return { success: true, redirect: `/verify-otp?email=${email}` };
}