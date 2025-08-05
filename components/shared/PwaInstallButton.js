'use client';

import { useState, useEffect } from 'react';

const PwaInstallButton = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsVisible(false);
      }
    }
  };

  if (!isVisible) {
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