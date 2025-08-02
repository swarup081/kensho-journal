'use client';

import { useRouter } from 'next/navigation';

export default function TermsPage() {
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

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: August 2, 2025</p>

        <div className="space-y-6 text-gray-700 prose max-w-none">
          <p>
            These Terms and Conditions (“Terms”) constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you” or “User”), and Swarup Das (“we,” “us,” or “our”), concerning your access to and use of the Kensho Journal website and application (the “Service”).
          </p>
          <p>
            By creating an account or using the Service, you agree that you have read, understood, and agree to be bound by all of these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Definitions</h2>
          <ul>
            <li><strong>Service:</strong> The Kensho Journal website, mobile application, and any related services.</li>
            <li><strong>User:</strong> Any person who creates an account and uses the Service.</li>
            <li><strong>Our Content:</strong> All source code, databases, functionality, software, designs, text, and graphics within the Service that are owned or licensed by us.</li>
            <li><strong>User Content:</strong> All data, text, or other materials, including journal entries, that a User posts or submits to the Service.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Intellectual Property Rights</h2>
          <p>
            The Service, Our Content, and our trademarks are our exclusive property, protected by copyright and other intellectual property laws. Except as expressly permitted by us in writing, you are strictly prohibited from copying, reproducing, distributing, selling, licensing, or otherwise exploiting any part of the Service or Our Content for any purpose.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">User Accounts & Data Ownership</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password. You retain full ownership of your User Content. We do not claim any ownership rights over your data. However, to provide the Service, you grant us a limited, non-exclusive license to host, store, process, and display your User Content. This license is solely for the purpose of operating and improving the Service and terminates when you delete your account.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Acceptable Use of the Service</h2>
          <p>You agree not to misuse the Service. This includes, but is not limited to:</p>
          <ul>
            <li>Using the Service for any illegal or unauthorized purpose.</li>
            <li>Attempting to reverse-engineer, decompile, or otherwise extract the source code of the Service.</li>
            <li>Engaging in any automated use of the system, such as using scripts for data scraping, sending spam, or using bots.</li>
            <li>Interfering with or creating an undue burden on the Service or its networks.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Age Requirement</h2>
          <p>
            The Service is intended for users who are at least 13 years of age. If you are between the ages of 13 and 18, you represent that your legal guardian has reviewed and agreed to these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Fees and Payment</h2>
          <p>
            Our Service operates on a freemium model. Core features are free. We reserve the right to introduce fees for Premium Services in the future. You will not be charged without your explicit consent to a paid plan.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Disclaimers and Limitation of Liability</h2>
          <ul>
            <li><strong>AI Features:</strong> The Service may use third-party AI models (e.g., from OpenAI) to generate insights. This content is for informational purposes only and is not professional advice. We are not liable for any errors, omissions, or actions taken based on AI-generated content.</li>
            <li><strong>Third-Party Services:</strong> The Service relies on third-party platforms like Supabase for backend infrastructure. We are not responsible for service interruptions or data security breaches originating from these third-party providers.</li>
            <li><strong>"As-Is" Service:</strong> The Service is provided on an "as-is" basis. We are not liable for any direct, indirect, or consequential damages arising from your use of the Service.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Termination</h2>
          <p>
            You may request account termination by emailing us at kenshojournal.help@gmail.com. We reserve the right to suspend or terminate your account if you violate these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Changes to These Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will notify you of any material changes by providing a prominent notice within the Service (such as a pop-up). We will also update the "Last Updated" date at the top of these Terms. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts located in Silchar, Assam.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at kenshojournal.help@gmail.com.
          </p>

          <p className="text-center !mt-12 text-sm text-gray-500">© 2025 Swarup Das. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}