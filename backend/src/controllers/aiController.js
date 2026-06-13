const aiService = require('../services/aiService');
 
const generateBullets = async (req, res, next) => {
  try {
    const { jobTitle, company, description } = req.body;
    if (!jobTitle) return res.status(400).json({ message: 'Job title is required' });
    const bullets = await aiService.generateBulletPoints({ jobTitle, company, description });
    res.json({ bullets });
  } catch (error) { next(error); }
};
 
const generateSummary = async (req, res, next) => {
  try {
    const { resumeData } = req.body;
    if (!resumeData) return res.status(400).json({ message: 'Resume data is required' });
    const summary = await aiService.generateSummary(resumeData);
    res.json({ summary });
  } catch (error) { next(error); }
};
 
const improveBullet = async (req, res, next) => {
  try {
    const { bullet } = req.body;
    if (!bullet) return res.status(400).json({ message: 'Bullet text is required' });
    const improved = await aiService.improveBullet(bullet);
    res.json({ improved });
  } catch (error) { next(error); }
};
 
module.exports = { generateBullets, generateSummary, improveBullet };
 