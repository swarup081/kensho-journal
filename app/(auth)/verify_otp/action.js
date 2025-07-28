'use server';

import { redirect } from 'next/navigation';

export async function verifyOtp(formData) {
  const email = formData.get('email');
  const otp = formData.get('otp');

  // --- Backend Logic ---
  // 1. Find the user in your database by their email.
  // 2. Check if the provided OTP matches the one stored in the database.
  // 3. Check if the OTP has expired.
  console.log(`--- Verifying OTP for ${email} ---`);
  console.log(`Submitted OTP: ${otp}`);

  // if (otpIsValid) {
  //   // 4. If valid, mark the user as "verified" in the database.
  //   console.log('OTP is valid. User verified.');
       redirect('/sign-in?verified=true');
  // } else {
  //   // 5. If invalid, return an error message.
  //   console.log('OTP is invalid.');
  //   return { error: 'Invalid OTP. Please try again.' };
  // }
  // -----------------------
}