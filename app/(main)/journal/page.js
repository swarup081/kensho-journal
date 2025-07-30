// app/(main)/journal/page.js
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const JournalPage = () => {
  const [entry, setEntry] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect started. isLoading is true.");

    const fetchUser = async () => {
      try {
        console.log("Attempting to get user session...");
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        }

        if (session) {
          console.log("Session found. User:", session.user.id);
          setUser(session.user);
        } else {
          console.log("No session found.");
        }
      } catch (e) {
        console.error("A critical error occurred in fetchUser:", e);
      } finally {
        // This block will run no matter what happens
        console.log("Setting isLoading to false.");
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSaveEntry = async () => {
    if (entry.trim() === '' || !user || isLoading) return;

    const { error } = await supabase
      .from('journal_entries')
      .insert([{ content: entry, user_id: user.id }]);

    if (error) {
      console.error('Error saving entry:', error);
    } else {
      router.push('/dashboard');
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="h-full p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <header className="pb-6 border-b border-gray-700/50">
          <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
            My Journal
          </h1>
          <p className="text-gray-400 mt-1">{currentDate}</p>
        </header>
        <div className="flex-grow py-8">
          <div className="bg-black/10 rounded-lg shadow-2xl h-full flex flex-col">
            <div className="p-6 flex-grow">
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                disabled={isLoading}
                className="w-full h-full bg-transparent text-gray-200 text-lg leading-relaxed placeholder-gray-500 focus:outline-none resize-none"
                placeholder={isLoading ? "Loading user..." : "Let your thoughts flow..."}
                style={{ fontFamily: "'Lora', serif" }}
              ></textarea>
            </div>
            <div className="p-4 bg-gray-900/40 border-t border-gray-700/50 flex justify-end">
              <button
                onClick={handleSaveEntry}
                disabled={isLoading || !entry.trim()}
                className="bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..." : "Save Entry"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;