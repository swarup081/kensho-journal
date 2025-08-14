import { Suspense } from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';
import Spinner from '@/components/ui/Spinner';

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="w-full max-w-sm p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-6 flex justify-center items-center"><Spinner /></div>}>
        <UpdatePasswordForm />
      </Suspense>
    </div>
  );
}
