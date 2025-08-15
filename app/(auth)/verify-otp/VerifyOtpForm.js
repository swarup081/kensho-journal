'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { resendVerificationEmail } from './actions';

export default function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResend = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    const formData = new FormData(event.target);
    const result = await resendVerificationEmail(formData);
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: result.success });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-6 text-center">
      <div>
        {/* ICON DIV REMOVED */}
        <h1 
          className="text-3xl font-bold text-gray-900 font-lora" // Margin top removed for better spacing
        >
          Confirm Your Email
        </h1>
        <p className="text-gray-500 mt-3 leading-relaxed">
          We&apos;ve sent a verification link to your email address:
        </p>
        {email && (
          <p className="font-semibold text-gray-800 mt-2 break-words">
            {email}
          </p>
        )}
        <p className="text-gray-500 mt-4">
          Please click the link in that email to complete your sign-up. Once verified, you can sign in.
        </p>
      </div>

      {/* Resend Email Form */}
      <form onSubmit={handleResend}>
        <input type="hidden" name="email" value={email || ''} />
        
        {message && (
          <p className={`text-sm font-semibold mt-4 ${message.type === 'error' ? 'text-red-500' : 'text-purple-600'}`}>
            {message.text}
          </p>
        )}

        <div className="text-center text-sm pt-4">
          <span className="text-gray-500">Didn&apos;t receive an email? </span>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="font-medium text-purple-600 hover:text-purple-800 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Resend link'}
          </button>
        </div>
      </form>
      
      <div className="pt-4 border-t border-gray-200">
         <Link href="/sign-in" className="font-semibold text-gray-600 hover:text-gray-800 transition-colors">
            &larr; Back to Sign In
          </Link>
      </div>
    </div>
  );
}