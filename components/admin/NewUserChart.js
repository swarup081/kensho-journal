'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const NewUserChart = ({ data }) => {
  if (!data) return null;

  // Process the data from { '2023-01-01': 5, ... } to [ { date: 'Jan 01', users: 5 }, ... ]
  const chartData = Object.entries(data)
    .map(([date, users]) => ({
      date: new Date(date),
      users,
    }))
    .sort((a, b) => a.date - b.date) // Sort by date
    .map(item => ({
      ...item,
      // Format date for display, e.g., "Jan 01"
      date: item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50"
    >
      <h3 className="text-lg font-semibold text-white mb-4">New User Growth</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="date" stroke="#A0AEC0" fontSize={12} />
            <YAxis stroke="#A0AEC0" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                borderColor: '#4A5568',
                color: '#E2E8F0',
              }}
              cursor={{ fill: 'rgba(128, 90, 213, 0.1)' }}
            />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Bar dataKey="users" name="New Users" fill="#805AD5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default NewUserChart;
