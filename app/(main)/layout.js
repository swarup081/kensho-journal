'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import { usePathname } from 'next/navigation';
import { BookText, CalendarDays, MessageSquare, User } from 'lucide-react';

// NavLink component remains the same
const NavLink = ({ href, icon: Icon, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200
        ${isActive ? 'bg-purple-600/30 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}
      `}
    >
      <Icon className="h-6 w-6" />
      <span className="ml-4 font-semibold hidden lg:inline">{children}</span>
    </Link>
  );
};


export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <aside className="w-20 lg:w-64 bg-black/20 flex flex-col p-4 border-r border-gray-800 transition-all duration-300">
        {/* LOGO UPDATED HERE */}
        <div className="mb-8 flex items-center justify-center lg:justify-start">
          <Image 
            src="/logo_background_light.png" 
            alt="Kensho Journal Logo" 
            width={40} 
            height={40} 
            className="rounded-md"
          />
          <span className="ml-3 text-xl font-bold hidden lg:inline">Kensho</span>
        </div>

        <nav className="flex flex-col">
          <NavLink href="/journal" icon={BookText}>Journal</NavLink>
          <NavLink href="/calendar" icon={CalendarDays}>Calendar</NavLink>
          <NavLink href="/feedback" icon={MessageSquare}>Feedback</NavLink>
        </nav>

        <div className="flex-grow"></div> {/* Spacer */}

        <div className="border-t border-gray-700/50 pt-4">
          <NavLink href="/profile" icon={User}>Profile & Settings</NavLink>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}