const DailyDigestSkeleton = () => {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
          <div className="bg-gray-900/40 p-4 rounded-xl">
            <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-32 bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DailyDigestSkeleton;
  