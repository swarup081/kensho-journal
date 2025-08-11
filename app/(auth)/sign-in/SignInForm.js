'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signin } from './actions';
import { requestPasswordReset } from '../forgot-password/actions';
import Modal from '@/components/shared/Modal';
import { AlertTriangle } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';

export default function SignInForm() {
  const [isForgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(useSearchParams().get('message'));
  const router = useRouter();

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await signin(formData);

    if (result.success) {
      router.push(result.redirect);
    } else {
      setMessage(result.message);
      setLoading(false);
    }
  };

  const handleResetSubmit = async (formData) => {
    const result = await requestPasswordReset(formData);
    setResetMessage(result.message);
  };
  
  const openModal = () => {
    setResetMessage('');
    setForgotModalOpen(true);
  }

  return (
    <>
      <div className="w-full max-w-sm p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to continue to Kensho Journal</p>
        </div>
        <form onSubmit={handleSignInSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Email"
              required
              disabled={loading}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Password"
              required
              disabled={loading}
            />
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={openModal}
              className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline cursor-pointer"
              disabled={loading}
            >
              Forgot Password?
            </button>
          </div>
          {message && (
            <div className="flex items-start gap-3 text-sm font-semibold text-red-600 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="flex-1">{message}</span>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center disabled:opacity-75"
            disabled={loading}
          >
            {loading ? <Spinner className="h-5 w-5" /> : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          <Link href="/sign-up" className="hover:text-purple-600 transition-colors duration-200">
            Don&apos;t have an account?
          </Link>
        </p>
      </div>

      {isForgotModalOpen && (
        <Modal title="Reset Password" onClose={() => setForgotModalOpen(false)} size="md">
          <div className="prose-lg text-left">
            {resetMessage ? (
              <div className="text-center space-y-4 p-4">
                <h3 className="text-xl font-semibold text-gray-800">Request Sent</h3>
                <p className="text-gray-600">{resetMessage}</p>
                 <button
                    onClick={() => setForgotModalOpen(false)}
                    className="w-full mt-4 bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-black transition-all"
                  >
                   Close
                  </button>
              </div>
            ) : (
              <form action={handleResetSubmit} className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600">Enter your account&apos;s email address and we will send a link to reset your password.</p>
                </div>
                <div>
                  <input
                    type="email"
                    id="reset-email"
                    name="email"
                    className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
