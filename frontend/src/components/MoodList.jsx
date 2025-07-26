import React from 'react';
import MoodItem from './MoodItem';

const MoodList = ({ moods, onDeleteMood }) => {
  if (moods.length === 0) {
    return (
      <div className="mood-list-container">
        <h2>Your Mood History</h2>
        <div className="empty-state">
          <p>No mood entries yet. Start tracking your energy! 🌟</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mood-list-container">
      <h2>Your Mood History</h2>
      <div className="mood-list">
        {moods.map((mood) => (
          <MoodItem
            key={mood._id}
            mood={mood}
            onDelete={() => onDeleteMood(mood._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoodList;