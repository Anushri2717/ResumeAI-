const calcCompleteness = (resumeData) => {
  const checks = [
    { key: 'personalInfo.fullName', label: 'Full name', weight: 10 },
    { key: 'personalInfo.email', label: 'Email', weight: 10 },
    { key: 'personalInfo.phone', label: 'Phone', weight: 5 },
    { key: 'personalInfo.location', label: 'Location', weight: 5 },
    { key: 'personalInfo.summary', label: 'Summary', weight: 15 },
    { key: 'experience', label: 'Work experience', weight: 20 },
    { key: 'education', label: 'Education', weight: 15 },
    { key: 'skills.technical', label: 'Technical skills', weight: 15 },
    { key: 'projects', label: 'Projects', weight: 5 }
  ];

  let score = 0;
  const passed = [];
  const issues = [];

  checks.forEach(({ key, label, weight }) => {
    const keys = key.split('.');
    let val = resumeData;
    for (const k of keys) val = val?.[k];
    const present = Array.isArray(val) ? val.length > 0 : Boolean(val);
    if (present) { score += weight; passed.push(label); }
    else issues.push(`Missing: ${label}`);
  });

  return { score, passed, issues };
};

module.exports = { calcCompleteness };