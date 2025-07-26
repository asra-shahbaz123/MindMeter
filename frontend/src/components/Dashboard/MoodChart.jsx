import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfDay, isSameDay } from 'date-fns';

const MoodChart = ({ moods }) => {
  // Group moods by day and calculate average energy
  const dailyData = moods.reduce((acc, mood) => {
    const day = format(startOfDay(parseISO(mood.date)), 'yyyy-MM-dd');
    
    if (!acc[day]) {
      acc[day] = {
        date: day,
        displayDate: format(parseISO(mood.date), 'MMM dd'),
        moods: [],
        totalEnergy: 0,
        count: 0
      };
    }
    
    acc[day].moods.push(mood.mood);
    acc[day].totalEnergy += mood.energyLevel;
    acc[day].count += 1;
    
    return acc;
  }, {});

  const chartData = Object.values(dailyData)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-14) // Last 14 days
    .map(day => ({
      date: day.displayDate,
      avgEnergy: Math.round((day.totalEnergy / day.count) * 10) / 10,
      entries: day.count,
      dominantMood: getMostFrequentMood(day.moods)
    }));

  function getMostFrequentMood(moods) {
    const moodCount = moods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(moodCount).reduce((a, b) => 
      moodCount[a] > moodCount[b] ? a : b
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-date">{label}</p>
          <p className="tooltip-value">
            Avg Energy: <span>{data.avgEnergy}/5</span>
          </p>
          <p className="tooltip-value">
            Entries: <span>{data.entries}</span>
          </p>
          <p className="tooltip-value">
            Mood: <span>{data.dominantMood}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
  <BarChart data={chartData}>
    {/* Grid lines invisible */}
    <CartesianGrid stroke="#c4b5fd" strokeOpacity={0} />

    {/* Lighter X-axis */}
    <XAxis 
      dataKey="date" 
      stroke="#c4b5fd"
      tick={{ fill: '#c4b5fd', fontSize: 12 }}
      axisLine={{ stroke: '#c4b5fd', strokeWidth: 1 }}
      tickLine={false}
    />

    {/* Lighter Y-axis */}
    <YAxis 
      domain={[0, 5]}
      stroke="#c4b5fd"
      tick={{ fill: '#c4b5fd', fontSize: 12 }}
      axisLine={{ stroke: '#c4b5fd', strokeWidth: 1 }}
      tickLine={false}
    />

    {/* Lighter tracking cursor */}
    <Tooltip 
      content={<CustomTooltip />} 
      cursor={{ stroke: '#c4b5fd', strokeWidth: 1, strokeDasharray: '3 3' }}
    />

    <Bar 
      dataKey="avgEnergy" 
      fill="url(#colorGradient)"
      radius={[4, 4, 0, 0]}
    />

    <defs>
      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#c4b5fd" stopOpacity={0.6}/>
      </linearGradient>
    </defs>
  </BarChart>
</ResponsiveContainer>

    </div>
  );
};

export default MoodChart;