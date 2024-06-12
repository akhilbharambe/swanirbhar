const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const auth = require('../middleware/auth');

router.get('/users/:id/progress', auth, progressController.getProgress);
router.post('/users/:id/progress', auth, progressController.updateProgress);

module.exports = router;
