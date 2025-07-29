'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample Data remains the same
const journaledDates = [
  '2025-07-05',
  '2025-07-11',
  '2025-07-12',
  '2025-07-28',

];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 29));

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayIndex = firstDayOfMonth.getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Use UTC for today's date as well

  return (
    <div className="h-full p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <header className="pb-6 border-b border-gray-700/50">
          <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
            Calendar
          </h1>
          <p className="text-gray-400 mt-1">Review your journey, one day at a time.</p>
        </header>

        <div className="py-8">
          <div className="bg-black/10 rounded-lg shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                <ChevronLeft className="h-6 w-6 text-gray-300" />
              </button>
              <h2 className="text-xl font-semibold text-white">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                <ChevronRight className="h-6 w-6 text-gray-300" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center font-semibold text-gray-400 text-sm">{day}</div>
              ))}
              
              {Array.from({ length: startDayIndex }).map((_, index) => <div key={`blank-${index}`}></div>)}

              {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                const day = dayIndex + 1;
                
                // --- THIS IS THE FIX ---
                // Create the date in UTC to prevent timezone shifts
                const date = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), day));
                const dateString = date.toISOString().split('T')[0];
                
                const isToday = date.getTime() === today.getTime();
                const hasJournal = journaledDates.includes(dateString);

                return (
                  <div
                    key={day}
                    className={`relative flex items-center justify-center h-14 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors ${isToday ? 'bg-purple-600/30 text-white' : 'text-gray-300'}`}
                  >
                    <span>{day}</span>
                    {hasJournal && (
                      <div className="absolute bottom-2 h-1.5 w-1.5 bg-orange-400 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;