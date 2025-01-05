import axios from 'axios';

export async function fetchAnalytics() {
    try {
        const response = await axios.get('/api/analytics');
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics data:', error.message);
        throw error;
    }
}

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json'
    }
  });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Network error occurred. Please try again.');
    }
  );

export default api;