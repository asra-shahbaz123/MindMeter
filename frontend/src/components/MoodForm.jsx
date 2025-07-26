import React, { useState } from 'react';

const MoodForm = ({ onAddMood }) => {
  const [mood, setMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState(3);
  const [notes, setNotes] = useState('');

  const moodOptions = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '🥳', label: 'Excited' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '🤔', label: 'Thoughtful' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) {
      alert('Please select a mood!');
      return;
    }

    onAddMood({
      mood,
      energyLevel: parseInt(energyLevel),
      notes
    });

    setMood('');
    setEnergyLevel(3);
    setNotes('');
  };

  return (
    <div className="mood-form-container">
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit} className="mood-form">
        <div className="form-group">
          <label>Mood</label>
          <div className="mood-options">
            {moodOptions.map((option) => (
              <button
                key={option.emoji}
                type="button"
                className={`mood-button ${mood === option.emoji ? 'selected' : ''}`}
                onClick={() => setMood(option.emoji)}
                title={option.label}
              >
                {option.emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Energy Level: {energyLevel}</label>
          <input
            type="range"
            min="1"
            max="5"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(e.target.value)}
            className="energy-slider"
          />
          <div className="energy-labels">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div className="form-group">
          <label>Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What gave or drained your energy today?"
            maxLength="500"
            rows="3"
          />
        </div>

        <button type="submit" className="submit-button">
           Log Mood
        </button>
      </form>
    </div>
  );
};

export default MoodForm;