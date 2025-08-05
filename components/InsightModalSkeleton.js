// components/InsightModalSkeleton.js
const InsightModalSkeleton = () => (
  <div className="p-8 space-y-8 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        {/* Summary Skeleton */}
        <div className="h-4 bg-gray-700 rounded-md w-1/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-800 rounded-md w-full"></div>
          <div className="h-3 bg-gray-800 rounded-md w-5/6"></div>
          <div className="h-3 bg-gray-800 rounded-md w-full"></div>
        </div>
        
        {/* Keywords Skeleton */}
        <div className="h-4 bg-gray-700 rounded-md w-1/3 pt-4"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-gray-800 rounded-full w-24"></div>
          <div className="h-6 bg-gray-800 rounded-full w-32"></div>
          <div className="h-6 bg-gray-800 rounded-full w-28"></div>
        </div>
      </div>
      <div className="bg-gray-900/40 p-4 rounded-xl">
        {/* Chart Skeleton */}
        <div className="h-4 bg-gray-700 rounded-md w-1/2 mx-auto mb-4"></div>
        <div className="h-[150px] bg-gray-800 rounded-lg"></div>
      </div>
    </div>

    <div className="text-center border-t border-gray-800/50 pt-8">
      {/* Insightful Question Skeleton */}
      <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded-md w-5/6 mx-auto"></div>
          <div className="h-4 bg-gray-800 rounded-md w-4/6 mx-auto"></div>
      </div>
      {/* Button Skeleton */}
      <div className="mt-6 h-10 bg-gray-800 rounded-lg w-40 mx-auto"></div>
    </div>
  </div>
);

export default InsightModalSkeleton;