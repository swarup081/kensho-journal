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
  isToday,
} from 'date-fns';

// --- Main Calendar Page Component ---

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // --- NEW: State to hold the dates of journal entries ---
  const [journaledDates, setJournaledDates] = useState(new Set());

  // --- NEW: useEffect to fetch journal data from Supabase ---
  useEffect(() => {
    const fetchJournalDates = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Fetch all journal entries for the current user
        const { data: entries, error } = await supabase
          .from('journal_entries')
          .select('created_at');
        
        if (error) {
          console.error('Error fetching journal dates:', error);
        } else if (entries) {
          // Process the dates and add them to a Set for efficient lookup
          const dates = new Set(
            entries.map(entry => {
              // Normalize the date to the start of the day to avoid timezone issues
              const d = new Date(entry.created_at);
              return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
            })
          );
          setJournaledDates(dates);
        }
      }
      setLoading(false);
    };

    fetchJournalDates();
  }, []); // The empty dependency array ensures this runs once on component mount

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });

  const startingDayIndex = startOfCurrentMonth.getDay();

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
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
              <div key={`empty-${index}`} className="h-16 border border-transparent rounded-lg"></div>
            ))}
            {daysInMonth.map((day, index) => {
              const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
              const hasJournal = journaledDates.has(dayStart);

              return (
                <div key={index} className="relative h-16 border border-gray-800/50 bg-gray-900/20 rounded-lg flex items-center justify-center">
                  <span className={`
                    ${isToday(day) ? 'text-purple-400 font-bold' : 'text-gray-300'}
                  `}>
                    {format(day, 'd')}
                  </span>
                  {hasJournal && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="absolute bottom-2 h-1.5 w-1.5 bg-orange-400 rounded-full"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;