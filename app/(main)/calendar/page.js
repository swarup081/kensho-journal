'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  addMonths,
  subMonths,
  isSameDay,
} from 'date-fns';
// --- THE FIX: Using the correct alias path for your folder structure ---
import DayDetailModal from '@/components/DayDetailModal'; 

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: entries, error } = await supabase
          .from('journal_entries')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error('Error fetching journal entries:', error);
        } else if (entries) {
          setJournalEntries(entries);
        }
      }
      setLoading(false);
    };

    fetchJournalEntries();
  }, []);

  const journaledDates = new Set(
    journalEntries.map(entry => new Date(new Date(entry.created_at).setHours(0, 0, 0, 0)).getTime())
  );
  
  const handleDateClick = (day) => {
    const dayStart = new Date(day.setHours(0, 0, 0, 0)).getTime();
    
    const entriesForDay = journalEntries.filter(entry => {
        const entryDayStart = new Date(new Date(entry.created_at).setHours(0, 0, 0, 0)).getTime();
        return entryDayStart === dayStart;
    });

    if (entriesForDay.length > 0) {
        setSelectedEntries(entriesForDay);
        setIsModalOpen(true);
    }
  };

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startOfCurrentMonth, end: endOfCurrentMonth });
  const startingDayIndex = startOfCurrentMonth.getDay();

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <>
      <DayDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        entries={selectedEntries}
      />
      <div className="h-full p-4 sm:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <header className="pb-6">
            <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
              Your Journey Calendar
            </h1>
            <p className="text-gray-400 mt-1">A visual timeline of your reflections and growth.</p>
          </header>

          <div className="mt-8 bg-black/10 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-800/50 transition-colors">
                <ChevronLeft className="h-6 w-6 text-gray-400" />
              </button>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-800/50 transition-colors">
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-semibold mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startingDayIndex }).map((_, index) => (
                <div key={`empty-${index}`} className="h-16 rounded-lg"></div>
              ))}
              {daysInMonth.map((day, index) => {
                const dayStart = new Date(day.setHours(0, 0, 0, 0)).getTime();
                const hasJournal = journaledDates.has(dayStart);
                const isPastOrToday = day <= new Date();

                return (
                  <button key={index} onClick={() => hasJournal && handleDateClick(day)} className={`relative h-16 border border-gray-800/50 bg-gray-900/20 rounded-lg flex items-center justify-center transition-colors ${hasJournal ? 'hover:bg-purple-900/30 cursor-pointer' : 'cursor-default'}`}>
                    <span className={`${isSameDay(day, new Date()) ? 'text-purple-400 font-bold' : 'text-gray-300'}`}>
                      {format(day, 'd')}
                    </span>
                    {hasJournal && isPastOrToday && !isSameDay(day, new Date()) && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-2 h-1.5 w-1.5 bg-orange-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;