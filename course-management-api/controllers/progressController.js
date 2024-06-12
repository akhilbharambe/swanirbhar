const Progress = require('../models/Progress');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ user: req.params.id }).populate('course completedLessons');
    if (!progress) {
      return res.status(404).send({ message: 'Progress not found' });
    }
    res.send(progress);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving progress' });
  }
};

exports.updateProgress = async (req, res) => {
  const { completedLessons } = req.body;

  if (!completedLessons) {
    return res.status(400).send({ message: 'Completed lessons are required' });
  }

  try {
    const progress = await Progress.findOne({ user: req.params.id });

    if (!progress) {
      return res.status(404).send({ message: 'Progress not found' });
    }

    progress.completedLessons = completedLessons;
    await progress.save();

    res.send(progress);
  } catch (err) {
    res.status(500).send({ message: 'Error updating progress' });
  }
};
