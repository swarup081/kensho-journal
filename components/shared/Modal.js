// components/shared/Modal.js
'use client';

import { useEffect, useState } from 'react';

export default function Modal({ title, onClose, children, size = '4xl' }) {
  const [isClosing, setIsClosing] = useState(false);

  // A map to connect the size prop to a Tailwind CSS class
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm`} />
      <div
        className={`relative flex flex-col w-full ${sizeClasses[size]} max-h-[90vh] bg-white rounded-2xl shadow-xl transform transition-all duration-300 ease-in-out ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 flex-shrink-0">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <button
            type="button"
            className="p-1.5 rounded-full text-gray-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="prose max-w-none text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}