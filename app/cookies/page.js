'use client';

import { useRouter } from 'next/navigation';

export default function CookiesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: August 2, 2025</p>

        <div className="space-y-6 text-gray-700 prose max-w-none">
          <p>
            This Cookie Policy explains how Kensho Journal uses essential cookies. By using our Service, you agree to the use of cookies as described in this policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device that are necessary for website functionality.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">How We Use Cookies</h2>
          <p>
            We use cookies for essential purposes only. We do not use cookies for advertising, marketing, or third-party analytics like Google Analytics.
          </p>
          <ul>
            <li><strong>Authentication Cookies:</strong> To keep you securely logged in.</li>
            <li><strong>Session Cookies:</strong> To maintain your session as you use the Service. These are temporary cookies that are erased when you close your browser.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">How to Control Cookies</h2>
          <p>
            You can control cookies through your browser settings, but blocking our essential cookies will prevent the Service from functioning correctly.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Linking</h2>
          <p>
            For your convenience, this Cookie Policy is referenced in our Privacy Policy. We recommend you link to your legal documents from your website footer and sign-up screen.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Contact Us</h2>
          <p>
            For questions about our use of cookies, please contact us at kenshojournal.help@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}