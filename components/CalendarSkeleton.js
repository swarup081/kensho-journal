const CalendarSkeleton = () => {
    return (
      <div className="h-full p-4 sm:p-8 lg:p-12 animate-pulse">
        <div className="max-w-4xl mx-auto">
          <header className="pb-6">
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mt-2"></div>
          </header>
  
          <div className="mt-8 bg-black/10 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-8 bg-gray-800/50 rounded-full"></div>
              <div className="h-6 bg-gray-700 rounded w-1/4"></div>
              <div className="h-8 w-8 bg-gray-800/50 rounded-full"></div>
            </div>
  
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-semibold mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
              ))}
            </div>
  
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, index) => (
                <div key={index} className="h-16 bg-gray-900/20 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CalendarSkeleton;
  