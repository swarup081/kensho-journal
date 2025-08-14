// components/DayDetailModal.js
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { convertToHtml } from '@/lib/htmlConverter';
import DailyDigestSkeleton from './DailyDigestSkeleton';

const EmotionChart = dynamic(() => import('@/components/EmotionChart'), {
    ssr: false,
    loading: () => <div className="h-[150px] w-full flex items-center justify-center text-gray-500">Loading Chart...</div>
});

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

const JournalEntryCard = ({ entry, demoAnalysis }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const entryHtml = convertToHtml(entry.content);

    return (
        <div className="bg-gray-900/40 rounded-xl border border-gray-800/50 overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-800/50"
            >
                <div className="grid grid-cols-[1fr,auto] items-center w-full gap-4">
                    <p className="text-gray-300 truncate font-medium">
                        <span className="text-purple-400 font-bold mr-2">
                            {new Date(entry.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}:
                        </span>
                        {entry.ai_title || entry.content}
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
                                    {/* --- FIX: Apply inline styles for guaranteed font size and line height --- */}
                                    <div
                                      className="prose prose-invert"
                                      style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
                                      dangerouslySetInnerHTML={{ __html: entryHtml }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-purple-300">AI Summary</h3>
                                    <p className="text-gray-300 text-sm mt-2">&quot;{entry.ai_summary || demoAnalysis.summary}&quot;</p>
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


export default function DayDetailModal({ entries, isOpen, onClose, dailyAnalysis }) {
  const [activeTab, setActiveTab] = useState('summary');

  if (!isOpen || !entries || entries.length === 0) return null;

  const formattedDate = new Date(entries[0].created_at).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  
  const displayAnalysis = dailyAnalysis || {
    summary: "Analyzing the day's entries...",
    emotions: [],
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
            <header className="p-6 flex-shrink-0 relative">
              <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
                Daily Digest
              </h1>
              <p className="text-gray-400 mt-1">{formattedDate}</p>
              <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-800 transition-colors">
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
                    !dailyAnalysis ? (
                      <DailyDigestSkeleton />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <h3 className="text-xl font-semibold text-purple-300 mb-2" style={{ fontFamily: "'Lora', serif" }}>Overall Summary</h3>
                              <p className="text-gray-300 italic">&quot;{displayAnalysis.summary}&quot;</p>
                          </div>
                          <div className="bg-gray-900/40 p-4 rounded-xl">
                              <h3 className="font-semibold text-purple-300 mb-2 text-center">Overall Emotion Flow</h3>
                              <EmotionChart data={displayAnalysis.emotions} />
                          </div>
                      </div>
                    )
                  )}

                  {activeTab === 'entries' && (
                    <div className="space-y-4">
                      {entries.map((entry) => (
                        <JournalEntryCard key={entry.id} entry={entry} demoAnalysis={displayAnalysis} />
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