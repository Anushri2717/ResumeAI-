const express = require('express');
const router = express.Router();
const { checkUploadedResume, checkBuiltResume } = require('../controllers/checkerController');
const { protect } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');

router.post('/upload', protect, uploadSingle('resume'), checkUploadedResume);
router.post('/analyze', protect, checkBuiltResume);

module.exports = router;