import axios from 'axios';
const BASE = import.meta.env.VITE_API_URL;
const h = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const aiApi = {
  generateBullets: async (payload, token) => (await axios.post(`${BASE}/ai/bullets`, payload, h(token))).data,
  generateSummary: async (resumeData, token) => (await axios.post(`${BASE}/ai/summary`, { resumeData }, h(token))).data,
  improveBullet: async (bullet, token) => (await axios.post(`${BASE}/ai/improve-bullet`, { bullet }, h(token))).data,
  exportPDF: async (resumeData, template, token) => {
    const res = await axios.post(`${BASE}/export/pdf`, { resumeData, template }, { ...h(token), responseType: 'blob' });
    return res.data;
  },
  exportDOCX: async (resumeData, token) => {
    const res = await axios.post(`${BASE}/export/docx`, { resumeData }, { ...h(token), responseType: 'blob' });
    return res.data;
  },
  exportTXT: async (resumeData, token) => {
    const res = await axios.post(`${BASE}/export/txt`, { resumeData }, { ...h(token), responseType: 'blob' });
    return res.data;
  }
};