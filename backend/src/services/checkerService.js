const Anthropic = require('@anthropic-ai/sdk');
const scoreCalculator = require('../utils/scoreCalculator');
const atsKeywords = require('../utils/atsKeywords');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const analyzeResume = async (text) => {
  const prompt = `Analyze this resume text and return a detailed JSON report.

RESUME TEXT:
${text}

Return ONLY a valid JSON object with this exact structure:
{
  "overallScore": <number 0-100>,
  "sections": {
    "ats": { "score": <0-100>, "issues": [<string>], "passed": [<string>] },
    "formatting": { "score": <0-100>, "issues": [<string>], "passed": [<string>] },
    "content": { "score": <0-100>, "issues": [<string>], "passed": [<string>] },
    "keywords": { "score": <0-100>, "found": [<string>], "missing": [<string>] },
    "impact": { "score": <0-100>, "weakVerbs": [<string>], "suggestions": [<string>] }
  },
  "topSuggestions": [<string>, <string>, <string>],
  "strengths": [<string>, <string>]
}`;

  const msg = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }]
  });

  const raw = msg.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(raw);
};

const analyzeResumeData = async (resumeData) => {
  const text = flattenResumeData(resumeData);
  const aiResult = await analyzeResume(text);
  const completenessScore = scoreCalculator.calcCompleteness(resumeData);
  aiResult.sections.completeness = completenessScore;
  aiResult.overallScore = Math.round(
    (aiResult.overallScore + completenessScore.score) / 2
  );
  return aiResult;
};

const flattenResumeData = (r) => {
  const lines = [];
  const p = r.personalInfo || {};
  lines.push(p.fullName, p.email, p.phone, p.location, p.summary);
  (r.experience || []).forEach(e => {
    lines.push(`${e.position} at ${e.company}`);
    (e.bullets || []).forEach(b => lines.push(b));
  });
  (r.education || []).forEach(e => lines.push(`${e.degree} ${e.field} ${e.institution}`));
  const s = r.skills || {};
  lines.push(...(s.technical || []), ...(s.tools || []), ...(s.soft || []));
  (r.projects || []).forEach(p => lines.push(p.name, p.description));
  return lines.filter(Boolean).join('\n');
};

module.exports = { analyzeResume, analyzeResumeData };