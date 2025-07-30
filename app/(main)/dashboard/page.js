// app/(main)/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Using the Supabase client you already have
import { BookText, Smile, TrendingUp, Sun } from 'lucide-react';

// A small card component for displaying key stats
const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-gradient-to-br from-gray-900/80 to-black/30 p-6 rounded-xl shadow-lg border border-gray-800/50 flex items-center gap-5">
        <div className={`p-3 rounded-full bg-${color}-500/10`}>
            <Icon className={`h-7 w-7 text-${color}-400`} />
        </div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);


export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        // You can fetch the user's name from your 'users' table if it's stored there
        // For now, we'll just use a placeholder or the email.
        const name = session.user.user_metadata?.name || session.user.email;
        setUserName(name.split('@')[0]); // A simple way to get a display name
      }
    };
    fetchUserData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="h-full p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="pb-6">
          <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
            {getGreeting()}, {userName}
          </h1>
          <p className="text-gray-400 mt-1">Here is your sanctuary's summary.</p>
        </header>

        {/* Stat Cards Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={BookText} label="Total Entries" value="0" color="purple" />
            <StatCard icon={TrendingUp} label="Current Streak" value="0 days" color="orange" />
            <StatCard icon={Smile} label="Overall Mood" value="Neutral" color="green" />
        </div>

        {/* Placeholder for future charts or components */}
        <div className="mt-12 text-center bg-black/10 rounded-2xl p-12 border-2 border-dashed border-gray-800/50">
             <Sun className="mx-auto h-12 w-12 text-gray-600" />
            <h3 className="mt-4 text-xl font-semibold text-gray-400">Your Mood Dashboard</h3>
            <p className="mt-2 text-gray-500">
                As you write, your 7-day mood analysis will appear here.
            </p>
        </div>
      </div>
    </div>
  );
}