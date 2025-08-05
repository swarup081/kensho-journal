'use client';

import { useContext } from 'react'; // Import useContext
import { PwaContext } from '@/app/context/PwaContext'; // Import our new context

const PwaInstallButton = () => {
  // Get the install prompt from the shared context
  const { installPrompt } = useContext(PwaContext);

  const handleInstallClick = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      // The logic to hide the button after will be handled by the browser
    }
  };

  // If there's no install prompt, don't render anything
  if (!installPrompt) {
    return null;
  }

  return (
    <div className="py-6 flex items-center justify-between">
        <div>
            <h3 className="font-semibold text-white">Install App</h3>
            <p className="text-gray-400 text-sm mt-1">Get the best experience by installing Kensho on your device.</p>
        </div>
        <button 
          onClick={handleInstallClick}
          className="font-semibold bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg transition-colors duration-200"
        >
          Install
        </button>
    </div>
  );
};

export default PwaInstallButton;