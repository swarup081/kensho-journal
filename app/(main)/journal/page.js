const JournalPage = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return (
      <div className="h-full p-4 sm:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Header */}
          <header className="pb-6 border-b border-gray-700/50">
            <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
              My Journal
            </h1>
            <p className="text-gray-400 mt-1">{currentDate}</p>
          </header>
  
          {/* Main Content - Editor */}
          <div className="flex-grow py-8">
            <div className="bg-black/10 rounded-lg shadow-2xl h-full flex flex-col">
              <div className="p-6 flex-grow">
                <textarea
                  className="w-full h-full bg-transparent text-gray-200 text-lg leading-relaxed placeholder-gray-500 focus:outline-none resize-none"
                  placeholder="Let your thoughts flow..."
                  style={{ fontFamily: "'Lora', serif" }}
                ></textarea>
              </div>
              <div className="p-4 bg-gray-900/40 border-t border-gray-700/50 flex justify-end">
                <button
                  className="bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default JournalPage;