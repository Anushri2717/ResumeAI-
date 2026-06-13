const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const matchResumeToJD = async (resumeData, jobDescription) => {
  const resumeText = buildResumeText(resumeData);

  const prompt = `Compare this resume against the job description and return a detailed JSON match report.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY a valid JSON object with this exact structure:
{
  "matchScore": <number 0-100>,
  "summary": "<2 sentence summary of the match>",
  "keywordsFound": [<keywords from JD that appear in resume>],
  "keywordsMissing": [<important keywords from JD missing in resume>],
  "skillsMatch": {
    "matched": [<string>],
    "missing": [<string>]
  },
  "toneAnalysis": {
    "score": <0-100>,
    "weakVerbs": [<string>],
    "strongVerbs": [<string>],
    "suggestions": [<string>]
  },
  "recommendations": [<string>, <string>, <string>],
  "quickWins": [<string>]
}`;

  const msg = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }]
  });

  const raw = msg.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(raw);
};

const buildResumeText = (r) => {
  const lines = [];
  const p = r.personalInfo || {};
  if (p.summary) lines.push('Summary:', p.summary);
  (r.experience || []).forEach(e => {
    lines.push(`${e.position} at ${e.company}`);
    (e.bullets || []).forEach(b => lines.push(`- ${b}`));
  });
  const s = r.skills || {};
  const allSkills = [...(s.technical || []), ...(s.tools || []), ...(s.languages || [])];
  if (allSkills.length) lines.push('Skills:', allSkills.join(', '));
  (r.projects || []).forEach(p => {
    lines.push(`Project: ${p.name}`);
    if (p.description) lines.push(p.description);
  });
  return lines.join('\n');
};

module.exports = { matchResumeToJD };