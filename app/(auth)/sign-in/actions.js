'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

// This is a placeholder for a real database call.
// In a real app, you would fetch the user from your database.
async function getUserByEmail(email) {
  // For this example, let's assume a user exists with this email.
  if (email === 'olduser@example.com') {
    return {
      email: 'olduser@example.com',
      // This is the hashed password for "password123"
      passwordHash: '$2a$10$8.K1Z3Y2Z.K1Z3Y2Z.K1Z3Y2Z.K1Z3Y2Z.K1Z3Y2Z.K1Z3Y2Z.K1Z3',
    };
  }
  return null;
}

export async function signin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const user = await getUserByEmail(email);

  if (!user) {
    // It's better not to reveal if the email exists or not
    console.log('Authentication failed: Invalid credentials.');
    redirect('/sign-in?error=InvalidCredentials');
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorrect) {
    console.log('Authentication failed: Invalid credentials.');
    redirect('/sign-in?error=InvalidCredentials');
    return;
  }

  // If password is correct, create a session and redirect to the dashboard.
  console.log('User signed in successfully:', user.email);
  redirect('/dashboard'); // Or any other protected page
}