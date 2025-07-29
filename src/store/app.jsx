import axios from 'axios';
import { createStore } from './util';

const useAppStore = createStore('app', (set) => {
    const baseApiUrl = import.meta.env.VITE_BASE_API_URL || 'http://localhost:3000/api';
    const httpClient = axios.create({
        baseURL: baseApiUrl,
        withCredentials: true,
    });
});
