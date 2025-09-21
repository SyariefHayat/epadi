import axios from 'axios';

export const apiInstanceExpress = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_SERVER,
    headers: {
        'Content-Type': 'application/json',
    },
});