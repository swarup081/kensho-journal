'use client';

import { createContext, useState, useEffect } from 'react';

// 1. Create the context
export const PwaContext = createContext(null);

// 2. Create the provider component
export const PwaProvider = ({ children }) => {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(event);
    };

    // Listen for the event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <PwaContext.Provider value={{ installPrompt }}>
      {children}
    </PwaContext.Provider>
  );
};