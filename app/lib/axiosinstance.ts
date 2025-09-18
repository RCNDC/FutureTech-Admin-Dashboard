import type { response } from '@/types/response';
import axios, { type AxiosResponse } from 'axios';

const API_URL = 'api.futuretech.habesharunway.com/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY as string,
        
    },
    withCredentials: true
});




export default axiosInstance;