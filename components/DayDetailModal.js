'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the chart to prevent SSR errors
const EmotionChart = dynamic(() => import('@/components/EmotionChart'), {
    ssr: false,
    loading: () => <div className="h-[150px] w-full flex items-center justify-center text-gray-500">Loading Chart...</div>
});

// --- Reusable Tab Button ---
const TabButton = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`relative font-semibold py-2 px-4 rounded-md transition-colors duration-200
            ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
        `}
    >
        {label}
        {isActive && (
            <motion.div
                layoutId="active-digest-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
            />
        )}
    </button>
);

// --- A component for each expandable journal entry ---
const JournalEntryCard = ({ entry, demoAnalysis }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900/40 rounded-xl border border-gray-800/50 overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-800/50"
            >
                {/* --- THE FIX: Using a grid layout to ensure the icon is always visible --- */}
                <div className="grid grid-cols-[1fr,auto] items-center w-full gap-4">
                    <p className="text-gray-300 truncate font-medium">
                        <span className="text-purple-400 font-bold mr-2">
                            {new Date(entry.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}:
                        </span>
                        {entry.content}
                    </p>
                    <ChevronDown
                        className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        size={20}
                    />
                </div>
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="border-t border-gray-800/50"
                    >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-purple-300">Your Entry</h3>
                                <div className="bg-black/20 p-3 rounded-lg max-h-48 overflow-y-auto scrollbar-hide">
                                    <p className="text-gray-300 whitespace-pre-wrap text-sm">{entry.content}</p>
                                </div>
                                {entry.ai_question_response && (
                                    <div>
                                        <h3 className="font-semibold text-purple-300">Your Reflection</h3>
                                        <p className="text-gray-300 italic text-sm mt-2">"{entry.ai_question_response}"</p>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-purple-300">AI Summary</h3>
                                    <p className="text-gray-300 text-sm mt-2">"{entry.ai_summary || demoAnalysis.summary}"</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-purple-300">Emotion Flow</h3>
                                    {entry.ai_emotions ? <EmotionChart data={entry.ai_emotions} /> : <EmotionChart data={demoAnalysis.emotions} />}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// --- The Main Daily Digest Modal Component ---
export default function DayDetailModal({ entries, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('summary');

  if (!isOpen || !entries || entries.length === 0) return null;

  const formattedDate = new Date(entries[0].created_at).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  
  const dailyDemoAnalysis = {
    summary: "Today was a day of productive focus, balanced with moments of quiet contemplation and planning for the future.",
    emotions: [ { "emotion": "Focused", "score": 8 }, { "emotion": "Content", "score": 7 }, { "emotion": "Hopeful", "score": 6 } ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-3xl bg-black/20 border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="p-6 flex-shrink-0">
              <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
                Daily Digest
              </h1>
              <p className="text-gray-400 mt-1">{formattedDate}</p>
              <button onClick={onClose} className="absolute top-6 right-6 p-1 rounded-full text-gray-400 hover:bg-gray-800 transition-colors">
                <X size={20} />
              </button>
            </header>

            <div className="px-6 border-b border-gray-800/50">
                <div className="flex items-center gap-4">
                    <TabButton label="Day's Summary" isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} />
                    <TabButton label="Journal Entries" isActive={activeTab === 'entries'} onClick={() => setActiveTab('entries')} />
                </div>
            </div>

            <div className="p-6 flex-grow overflow-y-auto scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'summary' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold text-purple-300 mb-2" style={{ fontFamily: "'Lora', serif" }}>Overall Summary</h3>
                            <p className="text-gray-300 italic">"{dailyDemoAnalysis.summary}"</p>
                        </div>
                        <div className="bg-gray-900/40 p-4 rounded-xl">
                            <h3 className="font-semibold text-purple-300 mb-2 text-center">Overall Emotion Flow</h3>
                            <EmotionChart data={dailyDemoAnalysis.emotions} />
                        </div>
                    </div>
                  )}

                  {activeTab === 'entries' && (
                    <div className="space-y-4">
                      {entries.map((entry) => (
                        <JournalEntryCard key={entry.id} entry={entry} demoAnalysis={dailyDemoAnalysis} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}