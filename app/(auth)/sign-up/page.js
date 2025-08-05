'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signup } from './actions';
import Modal from '@/components/shared/Modal';

// --- Content for the modals with final legal text ---
const TermsContent = () => (
    <>
      <p className="lead"><strong>Last Updated:</strong> August 2, 2025</p>
      <p>These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot; or &quot;User&quot;), and <strong>Swarup Das</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), concerning your access to and use of the Kensho Journal website and application (the &quot;Service&quot;).</p>
      <p>By creating an account or using the Service, you agree that you have read, understood, and agree to be bound by all of these Terms.</p>
      
      <h3>Definitions</h3>
      <ul>
          <li><strong>Service:</strong> The Kensho Journal website, mobile application, and any related services.</li>
          <li><strong>User:</strong> Any person who creates an account and uses the Service.</li>
          <li><strong>Our Content:</strong> All source code, databases, functionality, software, designs, text, and graphics within the Service that are owned or licensed by us.</li>
          <li><strong>User Content:</strong> All data, text, or other materials, including journal entries, that a User posts or submits to the Service.</li>
      </ul>

      <h3>Intellectual Property Rights</h3>
      <p>The Service, Our Content, and our trademarks are our exclusive property, protected by copyright and other intellectual property laws. Except as expressly permitted by us in writing, you are strictly prohibited from copying, reproducing, distributing, selling, licensing, or otherwise exploiting any part of the Service or Our Content for any purpose.</p>
      
      <h3>User Accounts &amp; Data Ownership</h3>
      <p>You are responsible for maintaining the confidentiality of your account and password. You retain full ownership of your User Content. We do not claim any ownership rights over your data. However, to provide the Service, you grant us a limited, non-exclusive license to host, store, process, and display your User Content. This license is solely for the purpose of operating and improving the Service and terminates when you delete your account.</p>
      
      <h3>Acceptable Use of the Service</h3>
      <p>You agree not to misuse the Service. This includes, but is not limited to:</p>
      <ul>
          <li>Using the Service for any illegal or unauthorized purpose.</li>
          <li>Attempting to reverse-engineer, decompile, or otherwise extract the source code of the Service.</li>
          <li>Engaging in any automated use of the system, such as using scripts for data scraping, sending spam, or using bots.</li>
          <li>Interfering with or creating an undue burden on the Service or its networks.</li>
      </ul>

      <h3>Age Requirement</h3>
      <p>The Service is intended for users who are at least 13 years of age. If you are between the ages of 13 and 18, you represent that your legal guardian has reviewed and agreed to these Terms.</p>
      
      <h3>Fees and Payment</h3>
      <p>Our Service operates on a freemium model. Core features are free. We reserve the right to introduce fees for Premium Services in the future. You will not be charged without your explicit consent to a paid plan.</p>
      
      <h3>Disclaimers and Limitation of Liability</h3>
      <ul>
          <li><strong>AI Features:</strong> The Service may use third-party AI models (e.g., from OpenAI) to generate insights. This content is for informational purposes only and is not professional advice. We are not liable for any errors, omissions, or actions taken based on AI-generated content.</li>
          <li><strong>Third-Party Services:</strong> The Service relies on third-party platforms like Supabase for backend infrastructure. We are not responsible for service interruptions or data security breaches originating from these third-party providers.</li>
          <li><strong>&quot;As-Is&quot; Service:</strong> The Service is provided on an &quot;as-is&quot; basis. We are not liable for any direct, indirect, or consequential damages arising from your use of the Service.</li>
      </ul>

      <h3>Termination</h3>
      <p>You may request account termination by emailing us at <strong>kenshojournal.help@gmail.com</strong>. We reserve the right to suspend or terminate your account if you violate these Terms.</p>
      
      <h3>Changes to These Terms</h3>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will notify you of any material changes by providing a <strong>prominent notice within the Service (such as a pop-up)</strong>. We will also update the &quot;Last Updated&quot; date at the top of these Terms. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.</p>
      
      <h3>Governing Law</h3>
      <p>These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts located in <strong>Silchar, Assam</strong>.</p>
      
      <h3>Contact Us</h3>
      <p>If you have any questions about these Terms, please contact us at <strong>kenshojournal.help@gmail.com</strong>.</p>
      
      <p className="!text-center !mt-8">© 2025 Swarup Das. All Rights Reserved.</p>
    </>
);

const PrivacyContent = () => (
    <>
      <p className="lead"><strong>Last Updated:</strong> August 2, 2025</p>
      <p>This Privacy Policy describes how <strong>Swarup Das</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your information when you use the Kensho Journal Service, in compliance with applicable data protection laws including <strong>India&apos;s Digital Personal Data Protection (DPDP) Act, 2023.</strong></p>
      
      <h3>Information We Collect</h3>
      <ul>
          <li><strong>Personal Data:</strong> Your name, email address, and phone number.</li>
          <li><strong>User Content:</strong> Your journal entries.</li>
      </ul>

      <h3>How We Use Your Information</h3>
      <p>Your information is used to provide, maintain, and improve the Service. We do not sell your personal data. By using the Service, you provide your consent for us to process your data for these specified purposes.</p>
      
      <h3>Marketing and Communications</h3>
      <p>By providing your email address, you agree that we may occasionally send you emails about Service updates, new features, or other information related to Kensho Journal. You may opt out of receiving these marketing communications at any time by clicking the &quot;unsubscribe&quot; link provided in every email or by contacting us directly. Please note that you may still receive essential transactional emails related to your account (e.g., password resets).</p>
      
      <h3>Data Sharing and Third-Party Services</h3>
      <p>We share data only with essential service providers (&quot;Data Processors&quot;) who help us operate. We ensure our partners adhere to strict data protection standards.</p>
      <ul>
          <li><strong>Supabase:</strong> For secure database hosting and authentication.</li>
          <li><strong>OpenAI:</strong> To process your User Content for AI analysis features. <strong>We do not use your User Content or AI outputs for training third-party models. Your data is sent to OpenAI only for the purpose of generating your personalized insights and is not used to improve their AI systems.</strong></li>
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
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes <strong>by email and/or through a prominent notice within our Service</strong>. We will also update the “Last Updated” date at the top of this policy.</p>
      
      <h3>Contact Us</h3>
      <p>For any privacy-related questions, please contact us at <strong>kenshojournal.help@gmail.com</strong>.</p>
    </>
);

const CookiesContent = () => (
    <>
      <p className="lead"><strong>Last Updated:</strong> August 2, 2025</p>
      <p>This Cookie Policy explains how Kensho Journal uses essential cookies. By using our Service, you agree to the use of cookies as described in this policy.</p>
      
      <h3>What Are Cookies?</h3>
      <p>Cookies are small text files stored on your device that are necessary for website functionality.</p>
      
      <h3>How We Use Cookies</h3>
      <p>We use cookies for essential purposes only. We <strong>do not</strong> use cookies for advertising, marketing, or third-party analytics like Google Analytics.</p>
      <ul>
        <li><strong>Authentication Cookies:</strong> To keep you securely logged in.</li>
        <li><strong>Session Cookies:</strong> To maintain your session as you use the Service. These are temporary cookies that are erased when you close your browser.</li>
      </ul>

      <h3>How to Control Cookies</h3>
      <p>You can control cookies through your browser settings, but blocking our essential cookies will prevent the Service from functioning correctly.</p>
      
      <h3>Linking</h3>
      <p>For your convenience, this Cookie Policy is referenced in our Privacy Policy. We recommend you link to your legal documents from your website footer and sign-up screen.</p>
      
      <h3>Contact Us</h3>
      <p>For questions about our use of cookies, please contact us at <strong>kenshojournal.help@gmail.com</strong>.</p>
    </>
);

export default function SignUpPage() {
  const [openModal, setOpenModal] = useState(null);

  const modalData = {
    terms: { title: 'Terms and Conditions', content: <TermsContent /> },
    privacy: { title: 'Privacy Policy', content: <PrivacyContent /> },
    cookies: { title: 'Cookies Policy', content: <CookiesContent /> },
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Kensho Journal</h1>
            <p className="text-gray-500 mt-2">Create your account</p>
          </div>
          <form action={signup} className="space-y-4">
            <div>
              <input type="text" id="name" name="name" className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Name" required />
            </div>
            <div>
              <input type="email" id="email" name="email" className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Email" required />
            </div>
            <div>
              <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Phone Number" required />
            </div>
            <div>
              <input type="password" id="password" name="password" className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Password" required />
            </div>
            <p className="text-xs text-center text-gray-500 leading-relaxed">
              By clicking Sign Up, you agree to our{' '}
              <button type="button" onClick={() => setOpenModal('terms')} className="font-medium text-purple-600 hover:text-purple-800 focus:outline-none underline-offset-2 hover:underline">
                Terms
              </button>
              ,{' '}
              <button type="button" onClick={() => setOpenModal('privacy')} className="font-medium text-purple-600 hover:text-purple-800 focus:outline-none underline-offset-2 hover:underline">
                Privacy Policy
              </button>{' '}
              &{' '}
              <button type="button" onClick={() => setOpenModal('cookies')} className="font-medium text-purple-600 hover:text-purple-800 focus:outline-none underline-offset-2 hover:underline">
                Cookies Policy
              </button>
              .
            </p>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-500">
            <Link href="/sign-in" className="hover:text-purple-600 transition-colors duration-200">
              Already have an account?
            </Link>
          </p>
        </div>
      </div>

      {openModal && (
        <Modal title={modalData[openModal].title} onClose={() => setOpenModal(null)}>
          {modalData[openModal].content}
        </Modal>
      )}
    </>
  );
}
