import axios from 'axios';
const BASE = import.meta.env.VITE_API_URL;
const h = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const resumeApi = {
  getAll: async (token) => (await axios.get(`${BASE}/resumes`, h(token))).data,
  getById: async (id, token) => (await axios.get(`${BASE}/resumes/${id}`, h(token))).data,
  create: async (data, token) => (await axios.post(`${BASE}/resumes`, data, h(token))).data,
  update: async (id, data, token) => (await axios.put(`${BASE}/resumes/${id}`, data, h(token))).data,
  delete: async (id, token) => (await axios.delete(`${BASE}/resumes/${id}`, h(token))).data
};