'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

// --- Reusable Emotion Chart Component ---
const EmotionChart = ({ data }) => ( 
    <ResponsiveContainer width="100%" height={150}> 
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}> 
            <defs> 
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1"> 
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/> 
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/> 
                </linearGradient> 
            </defs> 
            <XAxis dataKey="emotion" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} /> 
            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} /> 
            <Tooltip 
                cursor={{ stroke: '#a78bfa', strokeWidth: 1, strokeDasharray: '3 3' }} 
                contentStyle={{ background: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(4px)', border: '1px solid #374151', borderRadius: '0.75rem', color: '#d1d5db' }} 
            /> 
            <Area type="monotone" dataKey="score" stroke="#a78bfa" fillOpacity={1} fill="url(#colorUv)" /> 
        </AreaChart> 
    </ResponsiveContainer> 
);

// --- The Main, Refined Insight Modal Component ---
export default function InsightModal({ analysis, isOpen, onClose }) {
  const [isReflecting, setIsReflecting] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // State to ensure the chart only renders on the client, preventing errors
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset the modal's local state whenever a new analysis is passed in
  useEffect(() => {
    if (analysis) {
      setIsReflecting(false);
      setReflection('');
      setIsSaved(false);
    }
  }, [analysis]);

  if (!analysis) return null;

  const handleSaveReflection = async () => {
    if (reflection.trim() === '' || isSaving || isSaved) return;

    setIsSaving(true);
    const { error } = await supabase
        .from('journal_entries')
        .update({ ai_question_response: reflection })
        .eq('id', analysis.entryId);
    
    setIsSaving(false);
    if (!error) {
        setIsSaved(true);
        // After saving is confirmed, close the reflection text area
        setTimeout(() => {
            setIsReflecting(false);
        }, 1500); // Allow time to see the "Saved!" message
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-2xl bg-black/20 border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="p-6 text-center border-b border-gray-800/50">
                {/* --- THE FIX: Using the AI-generated title --- */}
                <h1 className="text-2xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
                    {analysis.title || "Your Insight"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">AI Analysis of your recent entry</p>
                <button onClick={handleClose} className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-800 transition-colors"><X size={20} /></button>
            </header>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                      <h3 className="font-semibold text-purple-300">Summary</h3>
                      <p className="text-gray-300 italic text-sm">"{analysis.summary}"</p>
                       <h3 className="font-semibold text-purple-300 pt-4">Keywords & Themes</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.map(keyword => ( <span key={keyword} className="bg-gray-700/50 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">{keyword}</span> ))}
                      </div>
                  </div>
                  <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h3 className="font-semibold text-purple-300 mb-2 text-center">Emotion Flow</h3>
                      {isClient && <EmotionChart data={analysis.emotions} />}
                  </div>
              </div>

              <div className="text-center border-t border-gray-800/50 pt-8">
                  <p className="text-lg text-gray-300 italic" style={{ fontFamily: "'Lora', serif" }}>
                      "{analysis.insightfulQuestion}"
                  </p>
                  <div className="mt-6">
                      <AnimatePresence mode="wait">
                          {isReflecting ? (
                              <motion.div key="textarea" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ opacity: 0 }} className="text-left">
                                  <textarea
                                      value={reflection}
                                      onChange={(e) => setReflection(e.target.value)}
                                      className="w-full h-24 bg-gray-900/70 text-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                      placeholder="Your thoughts..."
                                  />
                                  <div className="flex justify-end mt-2">
                                      <button onClick={handleSaveReflection} disabled={isSaving || isSaved} className={`flex items-center justify-center gap-2 font-semibold text-white py-2 px-4 rounded-lg transition-all duration-300 w-40 ${isSaved ? 'bg-purple-600' : 'bg-purple-600 hover:bg-purple-700'}`}>
                                          <AnimatePresence mode="wait">
                                              {isSaving ? <motion.span key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Saving...</motion.span>
                                              : isSaved ? <motion.span key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Saved!</motion.span>
                                              : <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Save Reflection</motion.span>}
                                          </AnimatePresence>
                                      </button>
                                  </div>
                              </motion.div>
                          ) : isSaved ? (
                              <motion.div key="saved-confirmation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-semibold text-purple-400 bg-purple-500/10 px-5 py-2 rounded-lg inline-block">
                                  Reflection Saved
                              </motion.div>
                          ) : (
                              <motion.button key="reflect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsReflecting(true)} className="font-semibold text-gray-300 bg-gray-800/50 hover:bg-gray-800 px-5 py-2 rounded-lg transition-colors">
                                  Reflect on this
                              </motion.button>
                          )}
                      </AnimatePresence>
                  </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}