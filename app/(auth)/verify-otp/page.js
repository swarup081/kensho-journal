import { verifyOtp } from './actions';

export default function VerifyOtpPage({ searchParams }) {
  const email = searchParams.email;

  if (!email) {
    return (
      <div className="text-center p-8">
        <p>Email not found. Please try signing up again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Verify Your Account</h1>
          <p className="text-gray-500 mt-2">
            Enter the 6-digit code sent to your email and phone.
          </p>
        </div>
        <form action={verifyOtp}>
          <input type="hidden" name="email" value={email} />
          <div className="space-y-4">
            <input
              type="text"
              id="otp"
              name="otp"
              maxLength="6"
              className="w-full text-center text-2xl tracking-widest px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="_ _ _ _ _ _"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}