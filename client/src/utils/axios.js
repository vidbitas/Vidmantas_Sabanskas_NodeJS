import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use((config) => {
  const userId = sessionStorage.getItem('user');
  config.headers.Authorization = sessionStorage.getItem(userId);

  return config;
});

export default instance;
