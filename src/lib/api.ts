import axios from 'axios';

// IMPORTANT: In production (Vercel), NEXT_PUBLIC_API_URL must be set in Vercel Dashboard.
// If not set, fallback to the production backend URL.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apex-backend-theta.vercel.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 30000, // 30 second timeout to prevent hanging requests
});


api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;