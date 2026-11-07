import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Central API Configuration for Django REST Framework integration
// Default fallback points to Django backend API prefix /api/v1
const API_BASE_URL = import.meta.env.VITE_DJANGO_API_URL || '/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT / Session token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('emlearns_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with graceful fallback
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // When standalone without Django backend running, log cleanly
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      console.info('[emLearns API Service] Operating with local client repository cache.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
