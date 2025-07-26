import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const MoodDistribution = ({ moods }) => {
  const moodColors = {
    '😊': '#10b981', // green
    '😐': '#6b7280', // gray
    '😢': '#3b82f6', // blue
    '😴': '#8b5cf6', // purple
    '😤': '#f59e0b', // yellow
    '🥳': '#ec4899', // pink
    '😰': '#ef4444', // red
    '🤔': '#06b6d4'  // cyan
  };

  const moodLabels = {
    '😊': 'Happy',
    '😐': 'Neutral',
    '😢': 'Sad',
    '😴': 'Tired',
    '😤': 'Frustrated',
    '🥳': 'Excited',
    '😰': 'Anxious',
    '🤔': 'Thoughtful'
  };

  const moodCount = moods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(moodCount).map(([mood, count]) => ({
    name: `${mood} ${moodLabels[mood]}`,
    value: count,
    emoji: mood,
    percentage: Math.round((count / moods.length) * 100)
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-value">
            {data.name}: <span>{data.value} entries ({data.percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, emoji, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percentage < 5) return null; // Hide labels for small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="18"
        fontWeight="bold"
      >
        {emoji}
      </text>
    );
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={moodColors[entry.emoji]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{
              fontSize: '12px',
              color: '#6b46c1'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodDistribution;