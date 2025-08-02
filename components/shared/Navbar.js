import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-4xl mt-6 px-6">
        <div className="flex justify-between items-center bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/80 px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Kensho Journal Logo" width={28} height={28} />
            <span className="font-semibold text-md text-gray-800 tracking-wide hidden sm:inline">KENSHO JOURNAL</span>
          </Link>
          <nav>
            <Link 
              href="/sign-in" 
              className="font-semibold text-gray-700 hover:text-purple-600 transition-colors duration-300 py-2 px-5 rounded-lg"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up"
              className="bg-gray-800 text-white font-semibold py-2 px-5 rounded-lg hover:bg-black transition-colors duration-300 ml-2"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;