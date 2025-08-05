'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const isInvalidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
};

// UPDATED: Checks for any non-digit characters, allowing any length
const isInvalidPhone = (phone) => {
  const phoneRegex = /^\d+$/;
  return !phoneRegex.test(phone);
};

export async function signup(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');
  
  // --- Input Validation ---
  if (!name || !email || !phone || !password) {
    return redirect('/sign-up?message=All fields are required.');
  }
  if (isInvalidEmail(email)) {
    return redirect('/sign-up?message=Please use a valid email address.');
  }
  if (isInvalidPhone(phone)) {
    return redirect('/sign-up?message=Phone number must only contain digits.');
  }
  if (password.length < 6) {
    return redirect('/sign-up?message=Password must be at least 6 characters long.');
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
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/` 
    }
  });

  if (error) {
    console.error('Sign-up Error:', error);
    if (error.message.includes('User already registered')) {
        return redirect('/sign-up?message=An account with this email already exists.');
    }
    return redirect('/sign-up?message=Could not create user. Please try again.');
  }

  // Redirect to the OTP page, passing the email to display it to the user
  return redirect(`/verify-otp?email=${email}`);
}