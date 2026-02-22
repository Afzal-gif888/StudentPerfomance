import axios from 'axios';

// Use environment variable for production URL, fallback to local for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const predictPerformance = async (studentData) => {
    try {
        const response = await api.post('/predict', studentData);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default api;
