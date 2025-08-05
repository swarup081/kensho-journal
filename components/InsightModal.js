'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/lib/supabaseClient';
import InsightModalSkeleton from '@/components/InsightModalSkeleton';

// --- (EmotionChart component remains unchanged) ---
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

export default function InsightModal({ analysis, isOpen, onClose }) {
  const [isReflecting, setIsReflecting] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (analysis) {
      setIsReflecting(false);
      setReflection('');
      setIsSaved(false);
    }
  }, [analysis]);

  const handleSaveReflection = async () => {
    if (reflection.trim() === '' || isSaving || isSaved || !analysis) return;

    setIsSaving(true);
    const { error } = await supabase
        .from('journal_entries')
        .update({ ai_question_response: reflection })
        .eq('id', analysis.entryId);
    
    setIsSaving(false);
    if (!error) {
        setIsSaved(true);
        setTimeout(() => {
            setIsReflecting(false);
        }, 1500);
    }
  };

  const motionProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-2xl bg-black/20 border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="p-6 text-center border-b border-gray-800/50 relative">
              <h1 className="text-2xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
                {analysis ? "Your Insight" : "Analyzing..."}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {analysis ? "AI Analysis of your recent entry" : "Please wait while we analyze your entry."}
              </p>
              <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-800 transition-colors">
                <X size={20} />
              </button>
            </header>

            {/* UPDATED: Use AnimatePresence to ensure only one view is visible at a time */}
            <AnimatePresence mode="wait">
              {!analysis ? (
                <motion.div key="skeleton" {...motionProps}>
                  <InsightModalSkeleton />
                </motion.div>
              ) : (
                <motion.div key="content" {...motionProps}>
                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-purple-300">Summary</h3>
                        <p className="text-gray-300 italic text-sm">&quot;{analysis.summary}&quot;</p>
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
                        &quot;{analysis.insightfulQuestion}&quot;
                      </p>
                      <div className="mt-6">
                        {/* Reflection UI logic can remain here */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}