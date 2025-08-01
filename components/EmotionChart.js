'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function EmotionChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="emotion" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                <Tooltip
                    cursor={{ stroke: '#a78bfa', strokeWidth: 1, strokeDasharray: '3 3' }}
                    contentStyle={{ background: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(4px)', border: '1px solid #374151', borderRadius: '0.75rem', color: '#d1d5db' }}
                />
                <Area type="monotone" dataKey="score" stroke="#a78bfa" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}