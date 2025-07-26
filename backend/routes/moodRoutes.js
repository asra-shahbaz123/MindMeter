const express = require('express');
const MoodEntry = require('../models/MoodEntry');
const router = express.Router();

// GET all mood entries
router.get('/', async (req, res) => {
  try {
    const moods = await MoodEntry.find().sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new mood entry
router.post('/', async (req, res) => {
  try {
    const { mood, energyLevel, notes } = req.body;
    
    const newMoodEntry = new MoodEntry({
      mood,
      energyLevel,
      notes
    });

    const savedEntry = await newMoodEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE mood entry
router.delete('/:id', async (req, res) => {
  try {
    await MoodEntry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mood entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;