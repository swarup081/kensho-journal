'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookText, CalendarDays, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/journal', label: 'Journal', icon: BookText },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/feedback', label: 'Feedback', icon: MessageSquare },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-20">
      {/* Background with a subtle gradient and blur effect */}
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl border-t border-gray-700/60"></div>
      
      <div className="relative flex justify-around items-center h-full">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col items-center justify-center w-1/4 h-full text-xs"
            >
              {/* Icon with updated active color */}
              <Icon 
                className={cn(
                  'h-6 w-6 mb-1 transition-colors duration-300',
                  isActive ? 'text-purple-400' : 'text-gray-500 group-hover:text-gray-300'
                )} 
              />
              
              {/* Label with updated active color and font weight */}
              <span 
                className={cn(
                  'font-medium transition-colors duration-300',
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}