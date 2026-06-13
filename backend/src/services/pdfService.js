const puppeteer = require('puppeteer');

const generatePDF = async (resumeData, template = 'modern') => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });
    const page = await browser.newPage();
    const html = buildHTML(resumeData, template);
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', right: '12mm', bottom: '15mm', left: '12mm' }
    });
    return pdfBuffer;
  } catch (err) {
    throw new Error(`PDF generation failed: ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }
};

const safe = (val) => {
  if (!val) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

const buildHTML = (r, template) => {
  const p = r?.personalInfo || {};

  const themes = {
    modern: {
      headerBg: '#2563eb', headerText: '#ffffff',
      sectionColor: '#2563eb', hrColor: '#2563eb',
      subColor: '#1d4ed8', bodyBg: '#ffffff'
    },
    classic: {
      headerBg: '#ffffff', headerText: '#111111',
      sectionColor: '#111111', hrColor: '#111111',
      subColor: '#444444', bodyBg: '#ffffff'
    },
    creative: {
      headerBg: '#7c3aed', headerText: '#ffffff',
      sectionColor: '#7c3aed', hrColor: '#7c3aed',
      subColor: '#6d28d9', bodyBg: '#ffffff'
    }
  };

  const t = themes[template] || themes.modern;

  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website]
    .filter(Boolean)
    .map(c => `<span class="contact-item">${safe(c)}</span>`)
    .join('');

  const experienceHTML = (r.experience || []).map(e => {
    if (!e) return '';
    const bullets = (e.bullets || [])
      .filter(b => b && b.trim())
      .map(b => `<li>${safe(b)}</li>`)
      .join('');
    return `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${safe(e.position)}</span>
          <span class="item-date">${safe(e.startDate)} – ${e.current ? 'Present' : safe(e.endDate)}</span>
        </div>
        <div class="item-sub">${safe(e.company)}${e.location ? `, ${safe(e.location)}` : ''}</div>
        ${bullets ? `<ul>${bullets}</ul>` : ''}
      </div>`;
  }).join('');

  const educationHTML = (r.education || []).map(e => {
    if (!e) return '';
    return `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${safe(e.degree)} in ${safe(e.field)}</span>
          <span class="item-date">${safe(e.endDate)}</span>
        </div>
        <div class="item-sub">${safe(e.institution)}${e.gpa ? ` · GPA: ${safe(e.gpa)}` : ''}</div>
      </div>`;
  }).join('');

  const s = r.skills || {};
  const skillRows = [];
  if (s.technical?.length) skillRows.push(`<div class="skill-row"><strong>Technical:</strong> ${s.technical.map(safe).join(', ')}</div>`);
  if (s.tools?.length)     skillRows.push(`<div class="skill-row"><strong>Tools:</strong> ${s.tools.map(safe).join(', ')}</div>`);
  if (s.soft?.length)      skillRows.push(`<div class="skill-row"><strong>Soft Skills:</strong> ${s.soft.map(safe).join(', ')}</div>`);
  if (s.languages?.length) skillRows.push(`<div class="skill-row"><strong>Languages:</strong> ${s.languages.map(safe).join(', ')}</div>`);
  const skillsHTML = skillRows.join('');

  const projectsHTML = (r.projects || []).map(proj => {
    if (!proj) return '';
    return `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${safe(proj.name)}</span>
          ${proj.link ? `<span class="item-date">${safe(proj.link)}</span>` : ''}
        </div>
        ${proj.techStack?.length ? `<div class="item-sub">${proj.techStack.map(safe).join(' · ')}</div>` : ''}
        ${proj.description ? `<p class="item-desc">${safe(proj.description)}</p>` : ''}
      </div>`;
  }).join('');

  const section = (title, content) => {
    if (!content || !content.trim()) return '';
    return `
      <div class="section">
        <h2>${title}</h2>
        <div class="section-hr"></div>
        ${content}
      </div>`;
  };

  const classicHeader  = template === 'classic' ? 'border-bottom:2.5px solid #111;text-align:center;padding-bottom:14px;' : '';
  const classicH1      = template === 'classic' ? 'font-size:24px;color:#111;letter-spacing:0.04em;' : '';
  const classicContact = template === 'classic' ? 'justify-content:center;color:#444;' : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Segoe UI',Arial,sans-serif; font-size:13px; color:#1a1a1a; background:${t.bodyBg}; line-height:1.5; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .header { background:${t.headerBg}; color:${t.headerText}; padding:${template==='classic'?'20px 28px':'26px 30px'}; ${classicHeader} }
  .header h1 { font-size:26px; font-weight:700; letter-spacing:-0.01em; margin-bottom:8px; ${classicH1} }
  .contact { display:flex; flex-wrap:wrap; gap:4px 14px; font-size:12px; opacity:${template==='classic'?'1':'0.92'}; ${classicContact} }
  .contact-item { display:inline-flex; align-items:center; }
  .contact-item + .contact-item::before { content:'·'; margin:0 7px; opacity:0.5; }
  .body { padding:20px 30px; }
  .section { margin-bottom:18px; page-break-inside:avoid; }
  .section h2 { font-size:11px; font-weight:800; color:${t.sectionColor}; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:5px; }
  .section-hr { height:1.5px; background:${t.hrColor}; margin-bottom:11px; opacity:${template==='classic'?'1':'0.7'}; }
  .item { margin-bottom:13px; page-break-inside:avoid; }
  .item-header { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px; }
  .item-title { font-weight:700; font-size:13px; color:#111; }
  .item-date { font-size:11px; color:#666; white-space:nowrap; margin-left:8px; flex-shrink:0; }
  .item-sub { font-size:12px; color:${t.subColor}; font-weight:500; margin-bottom:5px; }
  ul { padding-left:16px; margin-top:4px; }
  li { margin-bottom:3px; line-height:1.5; color:#333; }
  .item-desc { font-size:12.5px; color:#444; line-height:1.6; margin-top:4px; }
  .skill-row { font-size:12.5px; line-height:1.7; color:#333; }
  .summary-text { font-size:13px; line-height:1.65; color:#333; }
</style>
</head>
<body>
  <div class="header">
    <h1>${safe(p.fullName) || 'Your Name'}</h1>
    ${contacts ? `<div class="contact">${contacts}</div>` : ''}
  </div>
  <div class="body">
    ${section('Professional Summary', p.summary ? `<p class="summary-text">${safe(p.summary)}</p>` : '')}
    ${section('Experience', experienceHTML)}
    ${section('Education', educationHTML)}
    ${section('Skills', skillsHTML)}
    ${section('Projects', projectsHTML)}
  </div>
</body>
</html>`;
};

module.exports = { generatePDF };