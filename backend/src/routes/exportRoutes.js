const express = require('express');
const router = express.Router();
const { exportPDF, exportDOCX, exportTXT } = require('../controllers/exportController');
const { protect } = require('../middleware/authMiddleware');

router.post('/pdf', protect, exportPDF);
router.post('/docx', protect, exportDOCX);
router.post('/txt', protect, exportTXT);

module.exports = router;