import { Suspense } from 'react';
import SignInForm from './SignInForm';
import Spinner from '@/components/ui/Spinner';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="w-full max-w-sm p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-6 flex justify-center items-center"><Spinner /></div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}