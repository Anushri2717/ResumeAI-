import axios from 'axios';
const BASE = import.meta.env.VITE_API_URL;
const h = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const checkerApi = {
  uploadResume: async (file, token) => {
    const form = new FormData();
    form.append('resume', file);
    const { data } = await axios.post(`${BASE}/checker/upload`, form, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
  analyzeBuilt: async (resumeData, token) => {
    const { data } = await axios.post(`${BASE}/checker/analyze`, { resumeData }, h(token));
    return data;
  },
  matchJD: async (resumeData, jobDescription, token) => {
    const { data } = await axios.post(`${BASE}/jd-match/match`, { resumeData, jobDescription }, h(token));
    return data;
  }
};