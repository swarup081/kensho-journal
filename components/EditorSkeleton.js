// components/EditorSkeleton.js
const EditorSkeleton = () => (
    <div className="animate-pulse h-full">
      {/* Mimic a line of text */}
      <div className="h-4 bg-gray-700 rounded-md w-3/4 mb-4"></div>
      {/* Mimic another line of text */}
      <div className="h-4 bg-gray-700 rounded-md w-full mb-4"></div>
      {/* Mimic a shorter line of text */}
      <div className="h-4 bg-gray-700 rounded-md w-5/6"></div>
    </div>
  );
  
  export default EditorSkeleton;