'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import InsightModal from '@/components/InsightModal';

const JournalPage = () => {
  const [entry, setEntry] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false); 
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSaveEntry = async () => {
    if (entry.trim() === '' || !user || isSaving) return;

    setIsSaving(true); // This shows "Analyzing..." on the button

    // --- THE FIX ---
    // 1. Reset old data and open the modal IMMEDIATELY.
    // Because `analysisResult` is null, the skeleton will show.
    setAnalysisResult(null);
    setIsModalOpen(true);

    // 2. NOW, do the background work (saving to DB, calling AI).
    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{ content: entry, user_id: user.id }])
      .select('id')
      .single();

    if (error) {
      console.error('Error saving entry:', error);
      setIsSaving(false);
      setIsModalOpen(false); // Close modal on error
      return;
    }

    // 3. Simulate the AI analysis time.
    // In a real app, this would be your AI API call.
    const demoAnalysisResult = {
        summary: "It sounds like you're navigating a period of significant personal growth, balancing the excitement of new opportunities with a natural sense of uncertainty.",
        emotions: [ { "emotion": "Optimism", "score": 8 }, { "emotion": "Anxiety", "score": 5 }, { "emotion": "Curiosity", "score": 7 } ],
        keywords: ["new beginnings", "personal growth", "uncertainty", "opportunity", "reflection"],
        insightfulQuestion: "What one small step could you take tomorrow that honors both your excitement and your need for stability?"
    };

    setTimeout(() => {
      // 4. Once the analysis is ready, update the state.
      // The open modal will now re-render with the real data.
      setAnalysisResult({ ...demoAnalysisResult, entryId: data.id });
      
      setEntry('');
      setIsSaving(false); // Reset the button text
    }, 2500); // 2.5-second delay to make the skeleton visible
  };

  // A handler to clean up state when the modal is closed.
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Use a timeout to prevent the content from disappearing before the closing animation finishes.
    setTimeout(() => {
      setAnalysisResult(null);
    }, 300);
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      <InsightModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        analysis={analysisResult} 
      />
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
    </>
  );
};

export default JournalPage;