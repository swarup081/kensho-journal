// app/(main)/journal/page.js
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const JournalPage = () => {
  const [entry, setEntry] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false); 
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSaveEntry = async () => {
    // --- START OF DEBUGGING LOGS ---
    console.log("--- Starting Save & Analyze Process ---");

    if (entry.trim() === '' || !user || isLoading || isSaving) {
        console.log("Save cancelled. Conditions:", { 
            hasEntry: entry.trim() !== '', 
            hasUser: !!user, 
            isNotLoading: !isLoading, 
            isNotSaving: !isSaving 
        });
        return;
    }

    setIsSaving(true);
    console.log("1. State set to isSaving: true");

    // Step 1: Save the entry
    console.log("2. Attempting to save entry to Supabase...");
    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{ content: entry, user_id: user.id }])
      .select('id')
      .single();

    if (error) {
      console.error("3. Supabase save FAILED:", error);
      setIsSaving(false);
      return;
    }
    
    console.log("3. Supabase save SUCCESS. Received data:", data);

    // Step 2: Call the AI analysis
    if (data && data.id) {
        console.log(`4. Attempting to call AI API with entry ID: ${data.id}`);
        try {
          const response = await fetch('/api/analyze-entry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entryId: data.id }),
          });

          console.log("5. AI API response received. Status:", response.status);

          if (!response.ok) {
            const errorData = await response.json();
            console.error('6. AI Analysis FAILED:', errorData);
          } else {
            console.log("6. AI Analysis SUCCESS.");
          }

        } catch (e) {
          console.error('7. CRITICAL: fetch() command failed. Error:', e);
        }
    } else {
        console.error("CRITICAL: Supabase did not return an ID for the new entry. Cannot call AI.");
    }

    // Step 3: Redirect
    console.log("8. Process complete. Redirecting to dashboard...");
    setIsSaving(false);
    router.push('/dashboard');
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="h-full p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <header className="pb-6 border-b border-gray-700/50">
          <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>My Journal</h1>
          <p className="text-gray-400 mt-1">{currentDate}</p>
        </header>
        <div className="flex-grow py-8">
          <div className="bg-black/10 rounded-lg shadow-2xl h-full flex flex-col">
            <div className="p-6 flex-grow">
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                disabled={isLoading || isSaving}
                className="w-full h-full bg-transparent text-gray-200 text-lg leading-relaxed placeholder-gray-500 focus:outline-none resize-none"
                placeholder={isLoading ? "Authenticating..." : "Let your thoughts flow..."}
                style={{ fontFamily: "'Lora', serif" }}
              />
            </div>
            <div className="p-4 bg-gray-900/40 border-t border-gray-700/50 flex justify-end">
              <button
                onClick={handleSaveEntry}
                disabled={isLoading || !entry.trim() || isSaving}
                className="bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Analyzing...' : 'Save & Analyze'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;