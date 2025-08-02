// components/shared/AnimatedLock.js
'use client';

import { motion } from 'framer-motion';

const AnimatedLock = () => {
  const lockVariants = {
    // State for the unlocked path (the U-shaped part)
    unlocked: {
      y: "15%", // Moves the U-shape down
    },
    // State for the locked path
    locked: {
      y: "0%", // Moves it back to its original position
    },
  };

  return (
    <motion.div
      initial="unlocked" // Start in the 'unlocked' state
      whileInView="locked" // Animate to 'locked' when it comes into view
      viewport={{ once: true, amount: 0.8 }} // Trigger animation when 80% of it is visible
      className="inline-block p-4 bg-white/60 rounded-xl border border-gray-200/80 shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44" // A bit larger to accommodate the animation
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500"
      >
        {/* The U-shaped part of the lock that will animate */}
        <motion.path
          d="M16 20V10a4 4 0 0 0-8 0v10"
          variants={lockVariants}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* The body of the lock, which remains static */}
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      </svg>
    </motion.div>
  );
};

export default AnimatedLock;