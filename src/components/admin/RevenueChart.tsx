"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', total: 120000 },
  { name: 'Feb', total: 180000 },
  { name: 'Mar', total: 150000 },
  { name: 'Apr', total: 220000 },
  { name: 'May', total: 280000 },
  { name: 'Jun', total: 260000 },
  { name: 'Jul', total: 340000 },
  { name: 'Aug', total: 320000 },
  { name: 'Sep', total: 380000 },
  { name: 'Oct', total: 420000 },
];

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#00D4AA" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis 
          dataKey="name" 
          stroke="#888888" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          dy={10}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value / 1000}k`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#0A0F1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
          itemStyle={{ color: '#00D4AA' }}
          formatter={(value: any) => [`₹${Number(value || 0).toLocaleString()}`, 'Revenue']}
        />
        <Area 
          type="monotone" 
          dataKey="total" 
          stroke="#00D4AA" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorTotal)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
