// This file will contain a form asking for the user's email to send a reset code.
// The logic will be similar to the OTP verification page.
// On submit, it would call a server action that generates a new OTP,
// saves it to the user's record in the DB, sends it, and redirects to a
// final page like `/reset-password?email=...` where they can enter the OTP and a new password.