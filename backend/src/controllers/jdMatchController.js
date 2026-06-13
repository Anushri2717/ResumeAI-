const jdMatchService = require('../services/jdMatchService');
 
const matchResume = async (req, res, next) => {
  try {
    const { resumeData, jobDescription } = req.body;
    if (!resumeData || !jobDescription)
      return res.status(400).json({ message: 'Resume data and job description are required' });
    const result = await jdMatchService.matchResumeToJD(resumeData, jobDescription);
    res.json(result);
  } catch (error) { next(error); }
};
 
module.exports = { matchResume };
 