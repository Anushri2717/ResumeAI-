import axios from 'axios';
const downloadBlob = (data, filename, type) => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};
export const exportPDF = async (resumeData, template) => {
  const res = await axios.post('/api/export/pdf', { resumeData, template }, { responseType: 'arraybuffer' });
  downloadBlob(res.data, 'resume.pdf', 'application/pdf');
};
export const exportDOCX = async (resumeData) => {
  const res = await axios.post('/api/export/docx', { resumeData }, { responseType: 'arraybuffer' });
  downloadBlob(res.data, 'resume.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
};
export const exportTXT = async (resumeData) => {
  const res = await axios.post('/api/export/txt', { resumeData }, { responseType: 'blob' });
  downloadBlob(res.data, 'resume.txt', 'text/plain');
};