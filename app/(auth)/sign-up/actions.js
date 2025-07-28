'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

// --- Placeholder for OTP generation and sending ---
// In a real app, you'd use a library for this.
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

async function sendOtp(destination, otp) {
  // Replace this with your actual email/SMS sending logic
  console.log(`Sending OTP ${otp} to ${destination}`);
  // Example for email: await sendEmail({ to: destination, subject: 'Your OTP', text: `Your code is ${otp}` });
  // Example for SMS: await twilio.messages.create({ body: `Your code is ${otp}`, from: '+1234567890', to: destination });
  return Promise.resolve();
}
// ----------------------------------------------------

export async function signup(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');

  // --- Backend Logic ---
  // 1. Check if user already exists in your database
  // 2. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // 3. Generate OTP
  const otp = generateOtp();

  // 4. Save the new user, their hashed password, phone number, and OTP to your database.
  //    Mark the user as "unverified" for now.
  console.log('--- New User Signup ---');
  console.log({ name, email, phone, hashedPassword, otp });
  console.log('User saved to DB as unverified.');
  // -----------------------

  // Send the same OTP to both email and phone
  await sendOtp(email, otp);
  await sendOtp(phone, otp);

  // Redirect to the OTP verification page
  redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
}