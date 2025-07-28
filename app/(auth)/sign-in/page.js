import Link from 'next/link';
import { signin } from './actions';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Kensho Journal</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>
        <form action={signin} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Password"
              required
            />
          </div>
          <div className="text-right text-sm">
            <Link href="/forgot-password" className="font-medium text-purple-600 hover:underline">
                Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="font-medium text-purple-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}