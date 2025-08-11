import { Suspense } from 'react';
import VerifyOtpForm from './VerifyOtpForm';
import Spinner from '@/components/ui/Spinner';

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-6 text-center flex justify-center items-center"><Spinner /></div>}>
        <VerifyOtpForm />
      </Suspense>
    </div>
  );
}