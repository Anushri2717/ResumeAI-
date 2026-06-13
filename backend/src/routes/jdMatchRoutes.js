const express = require('express');
const router = express.Router();
const { matchResume } = require('../controllers/jdMatchController');
const { protect } = require('../middleware/authMiddleware');

router.post('/match', protect, matchResume);

module.exports = router;