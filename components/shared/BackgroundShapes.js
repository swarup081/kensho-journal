// components/shared/BackgroundShapes.js
const BackgroundShapes = () => {
    return (
      <>
        {/* Top-left yellow shape */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200/50 rounded-full blur-3xl -translate-x-16 -translate-y-16" />
  
        {/* Bottom-right red/pink shape */}
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-200/50 rounded-full blur-3xl translate-x-16 translate-y-16" />
  
        {/* You can add more shapes here and adjust their color, size, position, and blur */}
      </>
    );
  };
  
  export default BackgroundShapes;