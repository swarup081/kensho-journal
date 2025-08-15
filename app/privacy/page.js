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
        <p className="text-sm text-gray-500 mb-8">Last Updated: August 11, 2025</p>

        <div className="space-y-6 text-gray-700 prose max-w-none">
        <p className="lead"><strong>Last Updated:</strong> August 11, 2025</p>
      <p>This Privacy Policy describes how <strong>KenshoJournal</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your information when you use the Kensho Journal Service, in compliance with applicable data protection laws including <strong>India&apos;s Digital Personal Data Protection (DPDP) Act, 2023.</strong></p>

      <h3>Information We Collect</h3>
      <ul>
          <li><strong>Personal Data:</strong> Your name, email address, and phone number.</li>
          <li><strong>User Content:</strong> Your journal entries.</li>
      </ul>

      <h3>How We Use Your Information</h3>
      <p>Your information is used to provide, maintain, and improve the Service.We may use your data to improve and train our AI models. All data will be processed in an anonymized manner, without storing or associating it with your name or any personally identifiable information. If you do not wish for your data to be used for these purposes, you may contact us at <strong>kenshojournal.help@gmail.com</strong> We do not sell or disclose your data to any third parties for commercial purposes. By using the Service, you provide your consent for us to process your data for these specified purposes.</p>

      <h3>Marketing and Communications</h3>
      <p>By providing your email address, you agree that we may occasionally send you emails about Service updates, new features, or other information related to Kensho Journal. You may opt out of receiving these marketing communications at any time by clicking the &quot;unsubscribe&quot; link provided in every email or by contacting us directly. Please note that you may still receive essential transactional emails related to your account (e.g., password resets).</p>

      <h3>Data Sharing and Third-Party Services</h3>
      <p>We share data only with essential service providers (&quot;Data Processors&quot;) who help us operate. We ensure our partners adhere to strict data protection standards.</p>
      <ul>
          <li><strong>Supabase :</strong> For secure database hosting and authentication.</li>
          <li><strong>AI Processing :</strong> Your content is processed solely for providing AI-based analysis features. We do not use your content or AI outputs for training third-party models. Your data is used only for generating your personalized insights and is not used to improve any external AI systems.</li>
      </ul>

      <h3>Your Rights and Data Control</h3>
      <p>As a &quot;Data Principal&quot; under the DPDP Act, you have rights over your personal data. For our MVP, these rights can be exercised by contacting us directly.</p>
      <ul>
          <li><strong>Access and Correction:</strong> You may request access to or correction of your personal data.</li>
          <li><strong>Data Portability:</strong> You may request an export of your User Content.</li>
          <li><strong>Deletion (Right to Erasure):</strong> You may request the deletion of your account and all associated data.</li>
      </ul>
      <p>To make any of these requests, please contact us at <strong>kenshojournal.help@gmail.com</strong>.</p>

      <h3>Data Retention and Deletion</h3>
      <p>We retain your data only as long as necessary for the purpose for which it was collected. Upon a deletion request, we provide a <strong>30-day grace period</strong> for account recovery. After this period, all your data is permanently deleted.</p>

      <h3>Children&apos;s Privacy</h3>
      <p>Our Service is not intended for individuals under the age of 13. We do not knowingly collect personal data from children under 13. If we become aware that we have collected such data without verifiable parental consent, we will take steps to delete it immediately.</p>

      <h3>Compliance with Indian Law</h3>
      <p>This policy is designed to comply with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023. We act as the &quot;Data Fiduciary&quot; for your personal data. If you have a grievance, you may contact our designated contact person at <strong>kenshojournal.help@gmail.com</strong>.</p>

      <h3>Changes to This Privacy Policy</h3>
      <p>We reserve the right to modify or replace these Policy at any time, without prior notice. The “Last Updated” date at the top of these Terms will reflect the most recent changes. Your continued access or use of our Service after such changes constitutes your acceptance of the revised Terms.</p>

      <h3>Contact Us</h3>
      <p>For any privacy-related questions, please contact us at <strong>kenshojournal.help@gmail.com</strong>.</p>
        </div>
      </div>
    </div>
  );
}