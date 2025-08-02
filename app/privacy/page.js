'use client';

import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
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

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: August 2, 2025</p>

        <div className="space-y-6 text-gray-700 prose max-w-none">
          <p>
            This Privacy Policy describes how Swarup Das (“we,” “us,” or “our”) collects, uses, and protects your information when you use the Kensho Journal Service, in compliance with applicable data protection laws including India's Digital Personal Data Protection (DPDP) Act, 2023.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Information We Collect</h2>
          <ul>
            <li><strong>Personal Data:</strong> Your name, email address, and phone number.</li>
            <li><strong>User Content:</strong> Your journal entries.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">How We Use Your Information</h2>
          <p>
            Your information is used to provide, maintain, and improve the Service. We do not sell your personal data. By using the Service, you provide your consent for us to process your data for these specified purposes.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Marketing and Communications</h2>
          <p>
            By providing your email address, you agree that we may occasionally send you emails about Service updates, new features, or other information related to Kensho Journal. You may opt out of receiving these marketing communications at any time by clicking the "unsubscribe" link provided in every email or by contacting us directly. Please note that you may still receive essential transactional emails related to your account (e.g., password resets).
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Data Sharing and Third-Party Services</h2>
          <p>
            We share data only with essential service providers ("Data Processors") who help us operate. We ensure our partners adhere to strict data protection standards.
          </p>
          <ul>
            <li><strong>Supabase:</strong> For secure database hosting and authentication.</li>
            <li><strong>OpenAI:</strong> To process your User Content for AI analysis features. We do not use your User Content or AI outputs for training third-party models. Your data is sent to OpenAI only for the purpose of generating your personalized insights and is not used to improve their AI systems.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Your Rights and Data Control</h2>
          <p>
            As a "Data Principal" under the DPDP Act, you have rights over your personal data. For our MVP, these rights can be exercised by contacting us directly.
          </p>
          <ul>
            <li><strong>Access and Correction:</strong> You may request access to or correction of your personal data.</li>
            <li><strong>Data Portability:</strong> You may request an export of your User Content.</li>
            <li><strong>Deletion (Right to Erasure):</strong> You may request the deletion of your account and all associated data.</li>
          </ul>
          <p>
            To make any of these requests, please contact us at kenshojournal.help@gmail.com.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Data Retention and Deletion</h2>
          <p>
            We retain your data only as long as necessary for the purpose for which it was collected. Upon a deletion request, we provide a 30-day grace period for account recovery. After this period, all your data is permanently deleted.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Children's Privacy</h2>
          <p>
            Our Service is not intended for individuals under the age of 13. We do not knowingly collect personal data from children under 13. If we become aware that we have collected such data without verifiable parental consent, we will take steps to delete it immediately.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Compliance with Indian Law</h2>
          <p>
            This policy is designed to comply with India's Digital Personal Data Protection (DPDP) Act, 2023. We act as the "Data Fiduciary" for your personal data. If you have a grievance, you may contact our designated contact person at kenshojournal.help@gmail.com.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by email and/or through a prominent notice within our Service. We will also update the “Last Updated” date at the top of this policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Contact Us</h2>
          <p>
            For any privacy-related questions, please contact us at kenshojournal.help@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}