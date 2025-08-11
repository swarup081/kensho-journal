'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const PeakActivityChart = ({ data }) => {
  if (!data) return null;

  const chartData = Array.from({ length: 24 }, (_, i) => {
    const hour24 = i;
    const count = data[hour24] || 0;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    return {
      hour: `${hour12} ${ampm}`,
      count,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Peak User Activity (Last 24h)</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="hour" stroke="#A0AEC0" fontSize={10} interval={1} angle={-45} textAnchor="end" height={50} />
            <YAxis stroke="#A0AEC0" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                borderColor: '#4A5568',
                color: '#E2E8F0',
              }}
              cursor={{ fill: 'rgba(128, 90, 213, 0.1)' }}
            />
            <Bar dataKey="count" name="Entries" fill="#805AD5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PeakActivityChart;