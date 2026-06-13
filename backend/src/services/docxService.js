const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = require('docx');

const generateDOCX = async (resumeData) => {
  const r = resumeData;
  const p = r.personalInfo || {};
  const children = [];

  const heading = (text) => new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '2563eb' } }
  });

  const bullet = (text) => new Paragraph({
    text: `• ${text}`,
    spacing: { after: 40 },
    indent: { left: 360 }
  });

  const label = (left, right) => new Paragraph({
    children: [
      new TextRun({ text: left, bold: true, size: 24 }),
      new TextRun({ text: right ? `  |  ${right}` : '', size: 22, color: '666666' })
    ],
    spacing: { after: 60 }
  });

  children.push(
    new Paragraph({ text: p.fullName || '', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({
        text: [p.email, p.phone, p.location].filter(Boolean).join('  |  '),
        size: 20, color: '444444'
      })]
    })
  );

  if (p.summary) {
    children.push(heading('Professional Summary'), new Paragraph({ text: p.summary, spacing: { after: 100 } }));
  }

  if (r.experience?.length) {
    children.push(heading('Experience'));
    r.experience.forEach(e => {
      children.push(
        label(`${e.position} – ${e.company}`, `${e.startDate} – ${e.current ? 'Present' : e.endDate}`)
      );
      (e.bullets || []).forEach(b => children.push(bullet(b)));
    });
  }

  if (r.education?.length) {
    children.push(heading('Education'));
    r.education.forEach(e => {
      children.push(label(`${e.degree} in ${e.field}`, e.endDate));
      children.push(new Paragraph({ text: e.institution, spacing: { after: 80 } }));
    });
  }

  const s = r.skills || {};
  const allSkills = [...(s.technical || []), ...(s.tools || []), ...(s.soft || [])];
  if (allSkills.length) {
    children.push(heading('Skills'), new Paragraph({ text: allSkills.join(' · '), spacing: { after: 100 } }));
  }

  if (r.projects?.length) {
    children.push(heading('Projects'));
    r.projects.forEach(proj => {
      children.push(
        label(proj.name, proj.techStack?.join(', ') || ''),
        new Paragraph({ text: proj.description || '', spacing: { after: 80 } })
      );
    });
  }

  const doc = new Document({ sections: [{ children }] });
  return await Packer.toBuffer(doc);
};

module.exports = { generateDOCX };