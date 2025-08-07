// components/JournalSkeleton.js
const JournalSkeleton = () => (
    <div className="h-full p-4 sm:p-8 lg:p-12 animate-pulse">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Header Skeleton */}
        <header className="pb-6 border-b border-gray-700/50">
          <div className="h-8 bg-gray-700 rounded-md w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded-md w-1/2"></div>
        </header>
  
        {/* Editor Area Skeleton */}
        <div className="flex-grow py-8">
          <div className="bg-black/10 rounded-lg shadow-2xl h-full flex flex-col">
            <div className="p-6 flex-grow">
              {/* A single line to represent the editor placeholder */}
              <div className="h-4 bg-gray-700 rounded-md w-3/4"></div>
            </div>
            {/* Footer/Toolbar Skeleton */}
            <div className="p-4 bg-gray-900/40 border-t border-gray-700/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
                <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
                <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
                <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
              </div>
              <div className="h-10 bg-gray-700 rounded-lg w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default JournalSkeleton;