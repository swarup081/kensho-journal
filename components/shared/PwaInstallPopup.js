'use client';

import { useState, useEffect, useContext } from 'react'; // Import useContext
import { motion, AnimatePresence } from 'framer-motion';
import { X, DownloadCloud } from 'lucide-react';
import { PwaContext } from '@/app/context/PwaContext'; // Import our new context

const PwaInstallPopup = ({ show, onDismiss }) => {
  // Get the install prompt from the shared context
  const { installPrompt } = useContext(PwaContext);
  const [isVisible, setIsVisible] = useState(false);

  // This effect now just checks if it *should* be visible
  useEffect(() => {
    setIsVisible(show && !!installPrompt);
  }, [show, installPrompt]);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    onDismiss(true);
  };
  
  const handleDismiss = () => {
    onDismiss(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm p-5 bg-gray-800 border border-gray-700/50 rounded-2xl shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <DownloadCloud className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-white">Install Kensho Journal</h3>
              <p className="text-sm text-gray-400 mt-1">For a faster, offline-ready experience, add Kensho to your home screen.</p>
              <div className="mt-4 flex gap-3">
                <button onClick={handleInstall} className="w-full font-semibold bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">Install App</button>
                <button onClick={handleDismiss} className="w-full font-semibold bg-gray-700/80 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors">Later</button>
              </div>
            </div>
            <button onClick={handleDismiss} className="p-1 rounded-full text-gray-400 hover:bg-gray-600">
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PwaInstallPopup;