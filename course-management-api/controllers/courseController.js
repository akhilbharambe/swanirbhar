const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher');
    res.send(courses);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving courses' });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher');
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }
    res.send(course);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving course' });
  }
};

exports.createCourse = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const course = new Course({
    title,
    description,
    teacher: req.user._id,
  });

  try {
    await course.save();
    res.status(201).send(course);
  } catch (err) {
    res.status(500).send({ message: 'Error creating course' });
  }
};

exports.updateCourse = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    course.title = title;
    course.description = description;
    await course.save();

    res.send(course);
  } catch (err) {
    res.status(500).send({ message: 'Error updating course' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }

    await course.remove();
    res.send({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting course' });
  }
};
