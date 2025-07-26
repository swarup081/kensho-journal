

import Link from 'next/link';
import Image from 'next/image';

const UserIcon = () => (
    <div className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-yellow-400 ring-2 ring-white" />
    </div>
);

const Navbar = () => {
  return (
    <header className="px-8 pt-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Kensho Journal Logo" width={28} height={28} />
          <span className="font-semibold text-md text-gray-800 tracking-wide">KENSHO JOURNAL</span>
        </Link>
        <nav>
          <Link href="/sign-in" className="p-2 rounded-full hover:bg-gray-100/50">
            <UserIcon />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;