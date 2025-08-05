'use client';

import { useContext } from 'react';
import { PwaContext } from '@/app/context/PwaContext';

const PwaInstallButton = () => {
  const { installPrompt } = useContext(PwaContext);

  const handleInstallClick = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
    }
  };

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
          // UPDATED: Changed class to match the "Send Reset Link" button style
          className="font-semibold bg-gray-700/80 hover:bg-gray-700 text-white py-2 px-5 rounded-lg transition-colors duration-200"
        >
          Install
        </button>
    </div>
  );
};

export default PwaInstallButton;