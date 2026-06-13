const Anthropic = require('@anthropic-ai/sdk');
 
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 
const ask = async (prompt) => {
  const msg = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  });
  return msg.content[0].text;
};
 
const generateBulletPoints = async ({ jobTitle, company, description }) => {
  const prompt = `Generate 5 strong, ATS-optimized resume bullet points for a "${jobTitle}" role${company ? ` at ${company}` : ''}.
${description ? `Additional context: ${description}` : ''}
 
Rules:
- Start each bullet with a strong action verb (Led, Built, Improved, Designed, etc.)
- Include measurable impact where possible (%, numbers, scale)
- Keep each bullet under 20 words
- Make them specific and achievement-focused
 
Return ONLY a JSON array of 5 strings, no explanation. Example: ["Led team of...", "Built system that..."]`;
 
  const raw = await ask(prompt);
  const clean = raw.replace(/\`\`\`json|\`\`\`/g, '').trim();
  return JSON.parse(clean);
};
 
const generateSummary = async (resumeData) => {
  const { personalInfo, experience, skills } = resumeData;
  const prompt = `Write a concise 2-3 sentence professional summary for a resume.
 
Name: ${personalInfo?.fullName || 'Candidate'}
Most recent role: ${experience?.[0]?.position || 'Professional'} at ${experience?.[0]?.company || 'a company'}
Top skills: ${skills?.technical?.slice(0, 5).join(', ') || 'various skills'}
 
Rules:
- Be specific and impactful
- Avoid cliches like "hardworking" or "team player"
- Start with years of experience or key strength
- Return ONLY the summary text, no quotes or extra text`;
 
  return await ask(prompt);
};
 
const improveBullet = async (bullet) => {
  const prompt = `Improve this resume bullet point to be more impactful and ATS-friendly:
 
Original: "${bullet}"
 
Rules:
- Start with a strong action verb
- Add quantifiable results if missing
- Keep under 20 words
- Make it achievement-focused not task-focused
 
Return ONLY the improved bullet text, no explanation or quotes.`;
 
  return await ask(prompt);
};
 
module.exports = { generateBulletPoints, generateSummary, improveBullet };