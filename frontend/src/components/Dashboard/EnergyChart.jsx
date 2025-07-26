import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

const EnergyChart = ({ moods }) => {
  const chartData = moods
    .slice(0, 30) // Last 30 entries
    .reverse()
    .map((mood) => ({
      date: format(parseISO(mood.date), 'MMM dd'),
      energy: mood.energyLevel,
      fullDate: format(parseISO(mood.date), 'MMM dd, yyyy HH:mm')
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-date">{payload[0]?.payload?.fullDate}</p>
          <p className="tooltip-value">
            Energy Level: <span>{payload[0]?.value}/5</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          {/* Make grid lines invisible */}
          <CartesianGrid stroke="#c4b5fd" strokeOpacity={0} />

          {/* Light, clean X-axis */}
          <XAxis 
            dataKey="date" 
            stroke="#c4b5fd"
            tick={{ fill: '#c4b5fd', fontSize: 12 }}
            axisLine={{ stroke: '#c4b5fd', strokeWidth: 1 }}
            tickLine={false}
          />

          {/* Light, clean Y-axis */}
          <YAxis 
            domain={[1, 5]}
            stroke="#c4b5fd"
            tick={{ fill: '#c4b5fd', fontSize: 12 }}
            axisLine={{ stroke: '#c4b5fd', strokeWidth: 1 }}
            tickLine={false}
          />

          {/* Tooltip with light dashed cursor */}
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#c4b5fd', strokeWidth: 1, strokeDasharray: '3 3' }}
          />

          {/* Line styling */}
          <Line 
            type="monotone" 
            dataKey="energy" 
            stroke="#a78bfa"         // lighter purple (was #7c3aed)
            strokeWidth={3}
            dot={{ fill: '#a78bfa', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#8b5cf6' }} 
            />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;
