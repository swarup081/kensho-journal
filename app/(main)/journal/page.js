'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const JournalPage = () => {
  const [entry, setEntry] = useState('');
  const [pastEntries, setPastEntries] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndEntries = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        // Fetch past entries for the logged-in user
        const { data: entries, error } = await supabase
          .from('journal_entries')
          .select('id, content, created_at')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
        
        if (error) console.error('Error fetching entries:', error);
        else setPastEntries(entries);
      }
    };
    fetchUserAndEntries();
  }, []);

  const handleSaveEntry = async () => {
    if (entry.trim() === '' || !user) return;

    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{ content: entry, user_id: user.id }])
      .select();

    if (error) {
      console.error('Error saving entry:', error);
    } else {
      setPastEntries([data[0], ...pastEntries]); // Add new entry to the top of the list
      setEntry(''); // Clear the textarea
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

        <div className="py-8">
          <div className="bg-black/10 rounded-lg shadow-2xl">
            <div className="p-6">
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="w-full h-48 bg-transparent text-gray-200 text-lg leading-relaxed placeholder-gray-500 focus:outline-none resize-none"
                placeholder="Let your thoughts flow..."
                style={{ fontFamily: "'Lora', serif" }}
              />
            </div>
            <div className="p-4 bg-gray-900/40 border-t border-gray-700/50 flex justify-end">
              <button
                onClick={handleSaveEntry}
                className="bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-grow flex flex-col min-h-0">
          <h2 className="text-2xl font-bold text-gray-300 mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Past Entries
          </h2>
          <div className="flex-grow overflow-y-auto pr-2">
            {pastEntries.map((pastEntry) => (
              <div key={pastEntry.id} className="bg-gray-800/20 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-400">{new Date(pastEntry.created_at).toLocaleDateString()}</p>
                <p className="text-gray-300 mt-2 whitespace-pre-wrap">
                  {pastEntry.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;