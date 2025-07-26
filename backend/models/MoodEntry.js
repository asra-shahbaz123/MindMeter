const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
    enum: ['😊', '😐', '😢', '😴', '😤', '🥳', '😰', '🤔']
  },
  energyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  notes: {
    type: String,
    maxlength: 500
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MoodEntry', moodEntrySchema);