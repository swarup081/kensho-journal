'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updatePassword } from './actions';
import { AlertTriangle } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';

export default function UpdatePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      setLoading(false);
      return;
    }

    const result = await updatePassword(formData);

    if (result.success) {
      router.push(`/sign-in?message=${encodeURIComponent(result.message)}`);
    } else {
      setMessage({ type: 'error', text: result.message });
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Choose a New Password</h1>
        <p className="text-gray-500 mt-2">Enter and confirm your new password below.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="New Password"
            required
            disabled={loading}
          />
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="Confirm New Password"
            required
            disabled={loading}
          />
        </div>
        {message && (
          <div className={`flex items-start gap-3 text-sm font-semibold ${message.type === 'error' ? 'text-red-600 bg-red-500/10 border-red-500/20' : 'text-green-600 bg-green-500/10 border-green-500/20'} p-3 rounded-lg border`}>
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="flex-1">{message.text}</span>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center disabled:opacity-75"
          disabled={loading}
        >
          {loading ? <Spinner className="h-5 w-5" /> : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
