// app/page.js
import Navbar from '@/components/shared/Navbar';
import Link from 'next/link';
import BackgroundShapes from '@/components/shared/BackgroundShapes';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F9F7] text-gray-900 relative overflow-hidden flex items-center justify-center p-4">
      <BackgroundShapes />

      {/* Main Content Card - This is the key change */}
      <div 
        className="relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/80 w-full max-w-4xl"
      >
        <Navbar />
        <main className="px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-lora mb-4 leading-tight">
            The Journal That Talks Back.
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            Unlock Your Inner Wisdom Through Interactive Journaling
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* --- Refined Button Styles --- */}
            <Link 
              href="/sign-up" 
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Your Free Trial
            </Link>
            <Link 
              href="/learn-more"
              className="w-full sm:w-auto bg-gray-50/50 backdrop-blur-sm text-gray-700 font-semibold py-3 px-8 rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 border border-gray-200/80"
            >
              Learn More
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}