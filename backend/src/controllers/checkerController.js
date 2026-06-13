const checkerService = require('../services/checkerService');
const parseResume = require('../utils/parseResume');
const fs = require('fs');
 
const checkUploadedResume = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const filePath = req.file.path;
    const text = await parseResume(filePath, req.file.mimetype);
    const result = await checkerService.analyzeResume(text);
    fs.unlinkSync(filePath);
    res.json(result);
  } catch (error) { next(error); }
};
 
const checkBuiltResume = async (req, res, next) => {
  try {
    const { resumeData } = req.body;
    if (!resumeData) return res.status(400).json({ message: 'Resume data is required' });
    const result = await checkerService.analyzeResumeData(resumeData);
    res.json(result);
  } catch (error) { next(error); }
};
 
module.exports = { checkUploadedResume, checkBuiltResume };
 