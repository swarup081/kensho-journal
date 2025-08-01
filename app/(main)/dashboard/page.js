'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BookText, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

// --- Reusable Components (Slightly restyled for elegance) ---
const StatCard = ({ icon: Icon, label, value, color, isLoading }) => (
    <div className="bg-black/10 p-6 rounded-2xl shadow-2xl border border-gray-800/50 flex items-center gap-5">
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
            <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            {isLoading ? <div className="mt-1 h-8 w-24 bg-gray-700/50 rounded-md animate-pulse"></div> : <p className="text-3xl font-bold text-white">{value}</p>}
        </div>
    </div>
);

const EmotionChart = ({ data }) => { const emotionColors = { Joy: '#facc15', Happiness: '#facc15', Sadness: '#60a5fa', Anger: '#f87171', Fear: '#c084fc', Surprise: '#34d399', Neutral: '#9ca3af', Calm: '#9ca3af', Gratitude: '#818cf8', Love: '#f472b6', Anxiety: '#a78bfa', Disappointment: '#94a3b8' }; return ( <ResponsiveContainer width="100%" height={200}> <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}> <XAxis dataKey="emotion" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} /> <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} /> <Tooltip cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: '0.75rem' }} labelStyle={{ color: '#d1d5db' }} /> <Bar dataKey="score" radius={[4, 4, 0, 0]}> {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={emotionColors[entry.emotion] || '#a78bfa'} /> ))} </Bar> </BarChart> </ResponsiveContainer> ); };

// --- Main Dashboard Component ---
export default function DashboardPage() {
  const [userName, setUserName] = useState('User');
  const [stats, setStats] = useState({ totalEntries: 0, currentStreak: 0 });
  const [latestEntry, setLatestEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.name || user.email.split('@')[0]);

        const { data: entries, error } = await supabase
            .from('journal_entries')
            .select('id, created_at, ai_summary, ai_emotions, ai_keywords, ai_insightful_question')
            .order('created_at', { ascending: false })
            .limit(30); // Fetch last 30 for streak calculation

        if (entries && entries.length > 0) {
            setStats({ totalEntries: entries.length, currentStreak: 0 /* Add streak logic here */ });
            const analyzedEntry = entries.find(e => e.ai_summary);
            setLatestEntry(analyzedEntry || entries[0]);
        }
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  const getGreeting = () => { const hour = new Date().getHours(); if (hour < 12) return "Good morning"; if (hour < 18) return "Good afternoon"; return "Good evening"; };

  return (
    <div className="h-full p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="pb-8">
          <h1 className="text-4xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
            {getGreeting()}, {userName}.
          </h1>
          <p className="text-gray-400 mt-2">Welcome back to your sanctuary. Here's what we've discovered.</p>
        </header>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard icon={BookText} label="Total Entries" value={stats.totalEntries} color="purple" isLoading={loading} />
            <StatCard icon={TrendingUp} label="Current Streak" value={`${stats.currentStreak} days`} color="orange" isLoading={loading} />
        </div>

        {/* --- REDESIGNED AI ANALYSIS SECTION --- */}
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Lora', serif" }}>Latest Insight</h2>
            
            {loading ? ( <div className="bg-black/10 rounded-2xl p-8 border border-gray-800/50 animate-pulse h-[450px]"></div> ) 
            : latestEntry ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
                    
                    {/* Insightful Question - The "Wow Factor" */}
                    <div className="bg-gradient-to-tr from-purple-900/40 via-black/10 to-black/10 p-8 rounded-2xl border border-purple-800/50 shadow-2xl">
                        <h3 className="font-semibold text-purple-300 mb-3 flex items-center gap-2"><HelpCircle size={18}/> A Question for Deeper Reflection</h3>
                        <p className="text-xl text-gray-200 italic">"{latestEntry.ai_insightful_question || 'Analysis in progress. Write a new entry to generate an insight.'}"</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Summary & Keywords */}
                        <div className="bg-black/10 rounded-2xl p-8 border border-gray-800/50 space-y-6">
                            <div>
                                <h3 className="font-semibold text-purple-300 mb-2 flex items-center gap-2"><Sparkles size={18}/> AI Summary</h3>
                                <p className="text-gray-300">"{latestEntry.ai_summary || '...'}"</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-purple-300 mb-3">Keywords & Themes</h3>
                                <div className="flex flex-wrap gap-2">
                                    {latestEntry.ai_keywords ? latestEntry.ai_keywords.map(keyword => (
                                        <span key={keyword} className="bg-gray-700/50 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">{keyword}</span>
                                    )) : <span className="text-sm text-gray-500">...</span>}
                                </div>
                            </div>
                        </div>

                        {/* Emotion Chart */}
                        <div className="bg-black/10 rounded-2xl p-6 border border-gray-800/50">
                            <h3 className="font-semibold text-purple-300 mb-2 ml-2">Top 3 Emotions</h3>
                            {latestEntry.ai_emotions ? ( <EmotionChart data={latestEntry.ai_emotions} /> ) 
                            : ( <div className="h-[200px] flex items-center justify-center text-gray-500">Analysis in progress...</div> )}
                        </div>
                    </div>

                </motion.div>
            ) : ( <div className="text-center bg-black/10 rounded-2xl p-12 border-2 border-dashed border-gray-800/50"> <BookText className="mx-auto h-12 w-12 text-gray-600" /> <h3 className="mt-4 text-xl font-semibold text-gray-400">No entries yet</h3> <p className="mt-2 text-gray-500">Write your first journal entry to begin your journey of self-discovery.</p> </div> )}
        </div>
      </div>
    </div>
  );
}