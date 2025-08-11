'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/lib/utils';

const NavLink = ({ href, icon: Icon, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
      <Link href={href} className={cn('flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200', isActive ? 'bg-purple-600/30 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white')}>
        <Icon className="h-6 w-6" />
        <span className="ml-4 font-semibold hidden lg:inline">{children}</span>
      </Link>
    );
};

export const AdminNavLink = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
        if (profile && profile.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
    
    fetchUserRole();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchUserRole();
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (!isAdmin) {
    return null;
  }

  return <NavLink href="/admin" icon={Shield}>Admin</NavLink>;
};