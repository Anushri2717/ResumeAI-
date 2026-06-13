const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const parseResume = async (filePath, mimetype) => {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf' || mimetype === 'application/pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }
  if (ext === '.docx' || ext === '.doc' || mimetype?.includes('wordprocessingml')) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }
  throw new Error('Unsupported file format');
};

module.exports = parseResume;