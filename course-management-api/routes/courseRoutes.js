const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');

router.get('/courses', auth, courseController.getCourses);
router.get('/courses/:id', auth, courseController.getCourse);
router.post('/courses', auth, courseController.createCourse);
router.put('/courses/:id', auth, courseController.updateCourse);
router.delete('/courses/:id', auth, courseController.deleteCourse);

module.exports = router;
