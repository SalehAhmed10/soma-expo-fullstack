import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.104:3000/api/somamobileapis'; // Prefix with your API base URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;