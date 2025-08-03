// components/ProfileSkeleton.js
const ProfileSkeleton = () => (
    <div className="h-full p-4 sm:p-8 lg:p-12 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <header className="pb-6">
          <div className="h-8 bg-gray-700 rounded-md w-1/3"></div>
          <div className="h-4 bg-gray-700 rounded-md w-1/2 mt-2"></div>
        </header>
        <div className="mt-8">
          <div className="h-12 bg-gray-800/50 rounded-lg w-1/4"></div>
          <div className="mt-8">
            <div className="bg-black/10 rounded-2xl shadow-2xl p-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="h-32 w-32 rounded-full bg-gray-700 flex-shrink-0"></div>
                <div className="flex-grow text-center sm:text-left w-full">
                  <div className="h-8 bg-gray-700 rounded-md w-1/2 mx-auto sm:mx-0"></div>
                  <div className="h-4 bg-gray-700 rounded-md w-3/4 mt-2 mx-auto sm:mx-0"></div>
                  <div className="h-3 bg-gray-700 rounded-md w-1/4 mt-2 mx-auto sm:mx-0"></div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="h-6 bg-gray-700 rounded-md w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-black/10 p-6 rounded-2xl h-28"></div>
                <div className="bg-black/10 p-6 rounded-2xl h-28"></div>
                <div className="bg-black/10 p-6 rounded-2xl h-28"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default ProfileSkeleton;