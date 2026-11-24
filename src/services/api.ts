import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_DJANGO_API_URL || 'http://127.0.0.1:8000/api';

export const ACCESS_KEY = 'emlearns_auth_token';
export const REFRESH_KEY = 'emlearns_refresh_token';
export const USER_KEY = 'emlearns_current_student';

export const clearAuthStorage = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const status = error.response?.status;
    const url = original?.url ?? '';
    const isAuthCall =
      url.includes('/auth/login/') ||
      url.includes('/auth/register/') ||
      url.includes('/auth/refresh/');

    if (status === 401 && original && !original._retry && !isAuthCall) {
      original._retry = true;
      const refresh = localStorage.getItem(REFRESH_KEY);

      if (refresh) {
        try {
          if (!refreshPromise) {
            refreshPromise = axios
              .post(`${API_BASE_URL}/auth/refresh/`, { refresh })
              .then((res) => res.data.access as string)
              .finally(() => {
                refreshPromise = null;
              });
          }
          const newAccess = await refreshPromise;
          localStorage.setItem(ACCESS_KEY, newAccess);
          original.headers.Authorization = `Bearer ${newAccess}`;
          return apiClient(original);
        } catch {
          clearAuthStorage();
        }
      } else {
        clearAuthStorage();
      }
    }

    console.error('[emLearns API] Request failed:', error);
    return Promise.reject(error);
  }
);

export default apiClient;