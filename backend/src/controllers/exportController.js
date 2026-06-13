const pdfService = require('../services/pdfService');
const docxService = require('../services/docxService');
 
const exportPDF = async (req, res, next) => {
  try {
    const { resumeData, template } = req.body;
    if (!resumeData) return res.status(400).json({ message: 'Resume data is required' });
    const pdfBuffer = await pdfService.generatePDF(resumeData, template || 'modern');
    res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename=resume.pdf' });
    res.send(pdfBuffer);
  } catch (error) { next(error); }
};
 
const exportDOCX = async (req, res, next) => {
  try {
    const { resumeData } = req.body;
    if (!resumeData) return res.status(400).json({ message: 'Resume data is required' });
    const docxBuffer = await docxService.generateDOCX(resumeData);
    res.set({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Content-Disposition': 'attachment; filename=resume.docx' });
    res.send(docxBuffer);
  } catch (error) { next(error); }
};
 
const exportTXT = async (req, res, next) => {
  try {
    const { resumeData } = req.body;
    if (!resumeData) return res.status(400).json({ message: 'Resume data is required' });
    const text = buildPlainText(resumeData);
    res.set({ 'Content-Type': 'text/plain', 'Content-Disposition': 'attachment; filename=resume.txt' });
    res.send(text);
  } catch (error) { next(error); }
};
 
function buildPlainText(r) {
  const lines = [];
  const { personalInfo: p, experience, education, skills, projects } = r;
  if (p) {
    lines.push(p.fullName || '', p.email || '', p.phone || '', p.location || '', '');
    if (p.summary) lines.push('SUMMARY', p.summary, '');
  }
  if (experience?.length) {
    lines.push('EXPERIENCE');
    experience.forEach(e => {
      lines.push(`${e.position} at ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})`);
      (e.bullets || []).forEach(b => lines.push(`  - ${b}`));
    });
    lines.push('');
  }
  if (education?.length) {
    lines.push('EDUCATION');
    education.forEach(e => lines.push(`${e.degree} in ${e.field}, ${e.institution} (${e.endDate})`));
    lines.push('');
  }
  if (skills) {
    lines.push('SKILLS');
    if (skills.technical?.length) lines.push('Technical: ' + skills.technical.join(', '));
    if (skills.tools?.length) lines.push('Tools: ' + skills.tools.join(', '));
    lines.push('');
  }
  return lines.join('\n');
}
 
module.exports = { exportPDF, exportDOCX, exportTXT };