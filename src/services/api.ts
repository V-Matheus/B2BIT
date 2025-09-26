import { parseCookies, setCookie } from 'nookies';
import axios from 'axios';
import { signOut } from './auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let failedRequestsQueue: Array<{
  onSuccess: (token: string) => void;
  onFailure: (err: unknown) => void;
}> = [];

api.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json;version=v1_web';
  config.headers['Content-Type'] = 'application/json';

  const { 'auth.access_token': token } = parseCookies();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            onFailure: (err: unknown) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { 'auth.refresh_token': refreshToken } = parseCookies();

      if (!refreshToken) {
        signOut();
        return Promise.reject(error);
      }

      try {
        const { 'auth.access_token': access } = parseCookies();

        // const access = await refreshToken(refreshToken);
        // Simulating refresh token call for demonstration purposes

        setCookie(undefined, 'auth.access_token', access, {
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          path: '/',
          secure: true,
          sameSite: 'strict',
        });

        originalRequest.headers.Authorization = `Bearer ${access}`;

        failedRequestsQueue.forEach((request) => request.onSuccess(access));
        failedRequestsQueue = [];

        return api(originalRequest);
      } catch (refreshError) {
        failedRequestsQueue.forEach((request) =>
          request.onFailure(refreshError),
        );
        failedRequestsQueue = [];

        signOut();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
