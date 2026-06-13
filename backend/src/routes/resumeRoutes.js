const express = require('express');
const router = express.Router();
const { createResume, getResumes, getResumeById, updateResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/').get(getResumes).post(createResume);
router.route('/:id').get(getResumeById).put(updateResume).delete(deleteResume);

module.exports = router;