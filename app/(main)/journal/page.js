'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import InsightModal from '@/components/InsightModal';
import PwaInstallPopup from '@/components/shared/PwaInstallPopup';
// UPDATED: Corrected the import path using the '@/' alias
import InsightModalSkeleton from '@/components/InsightModalSkeleton';

const JournalPage = () => {
  // ... component code remains the same
  const [entry, setEntry] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [modalAnalysis, setModalAnalysis] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPwaPopup, setShowPwaPopup] = useState(false);
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false); 
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const handleSaveEntry = async () => {
    if (entry.trim() === '' || !user || isSaving) return;

    setIsSaving(true);
    setModalAnalysis(null); 
    setIsModalOpen(true);

    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{ content: entry, user_id: user.id }])
      .select('id')
      .single();

    if (error) {
      console.error('Error saving entry:', error);
      setIsSaving(false);
      setIsModalOpen(false);
      return;
    }

    const demoAnalysisResult = {
        summary: "It sounds like you're navigating a period of significant personal growth, balancing the excitement of new opportunities with a natural sense of uncertainty.",
        emotions: [ { "emotion": "Optimism", "score": 8 }, { "emotion": "Anxiety", "score": 5 }, { "emotion": "Curiosity", "score": 7 } ],
        keywords: ["new beginnings", "personal growth", "uncertainty", "opportunity", "reflection"],
        insightfulQuestion: "What one small step could you take tomorrow that honors both your excitement and your need for stability?"
    };

    setTimeout(() => {
      setModalAnalysis({ ...demoAnalysisResult, entryId: data.id });
      setEntry('');
      setIsSaving(false);
    }, 2500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      const alreadyInstalled = localStorage.getItem('pwaInstallCompleted');
      if (alreadyInstalled) return;

      const currentCount = parseInt(localStorage.getItem('insightClosedCount') || '0', 10);
      const newCount = currentCount + 1;
      localStorage.setItem('insightClosedCount', newCount.toString());

      const promptThresholds = [1, 6, 15, 21];
      if (promptThresholds.includes(newCount)) {
        setShowPwaPopup(true);
      }
    }, 300);
  }
  
  const handlePopupDismiss = (installed) => {
    setShowPwaPopup(false);
    if (installed) {
      localStorage.setItem('pwaInstallCompleted', 'true');
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      <InsightModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        analysis={modalAnalysis} 
        // Pass the skeleton as a fallback for when analysis is null
        fallback={<InsightModalSkeleton />}
      />
      <PwaInstallPopup show={showPwaPopup} onDismiss={handlePopupDismiss} />
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
                  className="bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Analyzing...' : 'Save'}
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