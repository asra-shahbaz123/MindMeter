import React from 'react';

const MoodItem = ({ mood, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEnergyDisplay = (level) => {
    return '⚡'.repeat(level) + '○'.repeat(5 - level);
  };

  return (
    <div className="mood-item">
      <div className="mood-header">
        <div className="mood-emoji">{mood.mood}</div>
        <div className="mood-info">
          <div className="mood-date">{formatDate(mood.date)}</div>
          <div className="mood-energy">
            Energy: {getEnergyDisplay(mood.energyLevel)} ({mood.energyLevel}/5)
          </div>
        </div>
        <button onClick={onDelete} className="delete-button" title="Delete entry">
          🗑️
        </button>
      </div>
      {mood.notes && (
        <div className="mood-notes">
          <p>"{mood.notes}"</p>
        </div>
      )}
    </div>
  );
};

export default MoodItem;