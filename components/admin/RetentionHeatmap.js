'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const RetentionHeatmap = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Retention Cohorts</h3>
            <p className="text-gray-400">Not enough data to generate retention cohorts yet.</p>
        </div>
    );
  }

  const cohorts = Object.entries(data)
    .map(([cohortDate, cohortData]) => ({
      cohort: new Date(cohortDate),
      ...cohortData,
    }))
    .sort((a, b) => b.cohort - a.cohort);

  const maxWeeks = Math.max(...cohorts.flatMap(c => Object.keys(c.weeklyRetention).map(Number))) + 1;

  const getCellColor = (percentage) => {
    if (percentage === null) return 'bg-gray-800';
    if (percentage > 80) return 'bg-purple-500';
    if (percentage > 60) return 'bg-purple-600';
    if (percentage > 40) return 'bg-purple-700';
    if (percentage > 20) return 'bg-purple-800';
    if (percentage > 0) return 'bg-purple-900';
    return 'bg-gray-800/60';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50 overflow-x-auto"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Weekly Retention Cohorts</h3>
      <p className="text-sm text-gray-400 mb-4">
        Percentage of users from a signup cohort who returned in subsequent weeks.
      </p>
      <div className="min-w-max">
        {/* Header */}
        <div className="grid grid-cols-12 text-xs font-bold text-gray-400">
          <div className="col-span-3 p-2">Cohort</div>
          <div className="col-span-1 p-2 text-center">Users</div>
          {Array.from({ length: Math.min(maxWeeks, 8) }).map((_, i) => (
            <div key={i} className="col-span-1 p-2 text-center">{`Week ${i}`}</div>
          ))}
        </div>

        {/* Rows */}
        {cohorts.map(({ cohort, totalUsers, weeklyRetention }) => (
          <div key={cohort.toISOString()} className="grid grid-cols-12 text-sm border-t border-gray-700/50">
            <div className="col-span-3 p-2 font-medium text-white">
              {cohort.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="col-span-1 p-2 text-center text-gray-300">{totalUsers}</div>
            
            {Array.from({ length: Math.min(maxWeeks, 8) }).map((_, i) => {
              const retainedUsers = weeklyRetention[i] || 0;
              const retentionPercentage = totalUsers > 0 ? (retainedUsers / totalUsers) * 100 : 0;
              const displayValue = i in weeklyRetention ? `${retentionPercentage.toFixed(0)}%` : '-';
              
              return (
                <div key={i} className={cn("m-1 p-2 flex items-center justify-center text-xs font-bold rounded-md", getCellColor(i in weeklyRetention ? retentionPercentage : null))}>
                  {displayValue}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RetentionHeatmap;