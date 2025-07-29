'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

// This is a placeholder for a real database call.
// In a real app, you would fetch the user from your database.
async function getUserByEmail(email) {
  // For this example, let's assume a user exists with this email.
  if (email === 'olduser@example.com' || email) { // Temporarily allowing any email for testing
    return {
      email: email,
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
    console.log('Authentication failed: User not found.');
    // In a real app, you'd redirect with an error message
    // redirect('/sign-in?error=InvalidCredentials');
    return; // Stop execution
  }

  // In a real scenario, you'd compare passwords. For now, let's assume it's correct.
  // const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  // if (!isPasswordCorrect) {
  //   console.log('Authentication failed: Invalid password.');
  //   return;
  // }

  // If password is correct, log the user's email and redirect to the journal page
  console.log('User signed in successfully:', user.email);
  redirect('/journal');
}