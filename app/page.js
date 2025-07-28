// app/page.js
import Navbar from '@/components/shared/Navbar'; // navbar import 
import Link from 'next/link';
// The BackgroundShapes component is no longer needed
//import BackgroundShapes from '@/components/shared/BackgroundShapes';

export default function Home() {
  return (
    // The background is now on the body, so we can simplify this container
    <div className="min-h-screen text-gray-900 flex items-center justify-center p-4 "> {/* The background is now applied to the body, so we don't need a separate div for it */}
    {      /* The background need to be fixed for larger screen */}
      {/* The Main Content Card remains unchanged */}
      <div 
        className="element_box relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/80 w-full max-w-4xl "
      > {/* The insider box */}
        <Navbar />
        <main className="px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-lora mb-4 leading-tight">
            The Journal That Talks Back.
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            Unlock Your Inner Wisdom Through Interactive Journaling
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/sign-up" /* Link to the sign-up page */
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                 Start Your Free Trial
            </Link>
            <Link 
              href="/learn-more" /* Link to the learn more page */
              className="w-full sm:w-auto bg-gray-50/50 backdrop-blur-sm text-gray-700 font-semibold py-3 px-8 rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 border border-gray-200/80 hover:bg-white/70 hover:border-gray-300/90"
            >
              Learn More
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}