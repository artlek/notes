/* eslint-disable no-unused-vars */
import axios from 'axios';

const API = import.meta.env.VITE_API;

export const apiClient = axios.create({
    baseURL: API,
    withCredentials: true,
    timeout: 20000,
    headers: {
        'patch': {
            'Content-Type': 'application/merge-patch+json'
        }
    }
});
apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/api/token/refresh')) {
            originalRequest._retry = true;
            try {
                // await apiClient.post('/api/token/refresh');
                await axios.post(`${API}/api/token/refresh`, {}, { withCredentials: true });
                return apiClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;