'use client';

import { motion } from 'framer-motion';

const StatCard = ({ title, value, description, icon: Icon, color = 'purple' }) => {
  const valueAsNumber = Number(value);
  const formattedValue = isNaN(valueAsNumber) 
    ? value // if value is not a number (e.g. string), display as is
    : valueAsNumber % 1 !== 0 
      ? valueAsNumber.toFixed(2) // if float, show 2 decimal places
      : valueAsNumber.toLocaleString(); // if integer, format with commas

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50"
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`p-3 rounded-lg bg-${color}-500/10`}>
            <Icon className={`h-6 w-6 text-${color}-400`} />
          </div>
        )}
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{formattedValue}</p>
        </div>
      </div>
      {description && (
        <p className="text-xs text-gray-500 mt-3">{description}</p>
      )}
    </motion.div>
  );
};

export default StatCard;
