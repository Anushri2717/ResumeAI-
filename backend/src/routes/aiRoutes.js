const express = require('express');
const router = express.Router();
const { generateBullets, generateSummary, improveBullet } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/bullets', protect, generateBullets);
router.post('/summary', protect, generateSummary);
router.post('/improve-bullet', protect, improveBullet);

module.exports = router;