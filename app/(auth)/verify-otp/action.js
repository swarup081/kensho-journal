'use server';

import { redirect } from 'next/navigation';

export async function verifyOtp(formData) {
  const email = formData.get('email');
  const otp = formData.get('otp');

  console.log(`--- Verifying OTP for ${email} ---`);
  console.log(`Submitted OTP: ${otp}`);

  // --- Backend Logic ---
  // In a real application, you would:
  // 1. Find the user in your database via their email.
  // 2. Check if the submitted OTP matches the one in the database.
  // 3. If it matches, update the user's status to "verified".

  const isOtpValid = true; // Placeholder for your real verification logic

  if (isOtpValid) {
    console.log('OTP is valid. Redirecting to journal...');
    // Redirect to the main journal page after successful verification
    redirect('/journal');
  } else {
    // If the OTP is invalid, you could redirect back with an error
    // redirect('/verify-otp?error=InvalidOTP');
    console.log('OTP is invalid.');
  }
}