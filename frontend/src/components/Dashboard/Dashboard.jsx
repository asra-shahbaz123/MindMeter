import React from 'react';
import MoodChart from './MoodChart';
import EnergyChart from './EnergyChart';
import MoodDistribution from './MoodDistribution';
import { format, subDays, isWithinInterval } from 'date-fns';

const Dashboard = ({ moods }) => {
  const getStats = () => {
    if (moods.length === 0) return null;

    const totalEntries = moods.length;
    const avgEnergy = (moods.reduce((sum, mood) => sum + mood.energyLevel, 0) / totalEntries).toFixed(1);
    
    // Last 7 days data
    const last7Days = moods.filter(mood => 
      isWithinInterval(new Date(mood.date), {
        start: subDays(new Date(), 7),
        end: new Date()
      })
    );

    return {
      totalEntries,
      avgEnergy,
      last7DaysCount: last7Days.length,
      lastEntry: moods[0] ? format(new Date(moods[0].date), 'MMM dd, yyyy') : null
    };
  };

  const stats = getStats();

  if (moods.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>📊 Your Mental Energy Dashboard</h2>
          <p>Start tracking your moods to see beautiful insights!</p>
        </div>
        <div className="empty-dashboard">
          <div className="empty-chart">
            <p>📈 Charts will appear here once you log some moods</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📊 Your Mental Energy Dashboard</h2>
        <p>Visualize your mood patterns and energy trends</p>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalEntries}</div>
            <div className="stat-label">Total Entries</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.avgEnergy}</div>
            <div className="stat-label">Avg Energy</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.last7DaysCount}</div>
            <div className="stat-label">Last 7 Days</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.lastEntry}</div>
            <div className="stat-label">Last Entry</div>
          </div>
        </div>
      )}

      <div className="charts-grid">
        <div className="chart-section">
          <h3>📈 Energy Levels Over Time</h3>
          <EnergyChart moods={moods} />
        </div>

        <div className="chart-section">
          <h3>🎭 Mood Distribution</h3>
          <MoodDistribution moods={moods} />
        </div>

        <div className="chart-section full-width">
          <h3>📊 Daily Mood & Energy Tracking</h3>
          <MoodChart moods={moods} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;