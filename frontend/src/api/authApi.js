import axios from 'axios';
const BASE = import.meta.env.VITE_API_URL;

export const authApi = {
  register: async (name, email, password) => {
    const { data } = await axios.post(`${BASE}/auth/register`, { name, email, password });
    return data;
  },
  login: async (email, password) => {
    const { data } = await axios.post(`${BASE}/auth/login`, { email, password });
    return data;
  },
  getProfile: async (token) => {
    const { data } = await axios.get(`${BASE}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  }
};