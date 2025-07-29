'use server';

import { redirect } from 'next/navigation';

export async function verifyOtp(formData) {
  const email = formData.get('email');
  const otp = formData.get('otp');

  console.log(`--- Verifying OTP for ${email} ---`);
  console.log(`Submitted OTP: ${otp}`);

  // This is a placeholder for your real verification logic.
  // In a real app, you would check the OTP against a database.
  const isOtpValid = true; 

  if (isOtpValid) {
    console.log('OTP is valid. Redirecting to journal...');
    // Redirect to the main journal page after successful verification
    redirect('/journal');
  } else {
    // If the OTP is invalid, you could redirect back with an error
    console.log('OTP is invalid.');
  }
}
