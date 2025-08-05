'use client';

import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // Import X icon
import { PwaContext } from '@/app/context/PwaContext';

const PwaInstallPopup = ({ show, onDismiss }) => {
  const { installPrompt } = useContext(PwaContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(show && !!installPrompt);
  }, [show, installPrompt]);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    onDismiss(outcome === 'accepted');
  };
  
  const handleDismiss = () => {
    onDismiss(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleDismiss} // Allow closing by clicking overlay
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            // UPDATED: New structure and styling to match other modals
            className="w-full max-w-md bg-black/20 border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="p-6 text-center relative">
              <h1 className="text-2xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
                Install Kensho Journal
              </h1>
              <p className="text-sm text-gray-400 mt-1">Get the best offline experience.</p>
              <button onClick={handleDismiss} className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-800 transition-colors">
                <X size={20} />
              </button>
            </header>
            
            <div className="p-6 pt-0">
                <p className="text-center text-gray-300 mb-6">
                    For faster access and to use your journal even when you're offline, add Kensho to your home screen.
                </p>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleInstall} 
                        className="w-full font-semibold bg-gradient-to-r from-purple-600 to-orange-400 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Install App
                    </button>
                    <button 
                        onClick={handleDismiss} 
                        className="w-full font-semibold text-gray-400 hover:bg-gray-800/50 py-3 px-4 rounded-lg transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PwaInstallPopup;