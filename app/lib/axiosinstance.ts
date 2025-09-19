import type { response } from '@/types/response';
import axios, { type AxiosResponse } from 'axios';

const API_URL = 'https://futuretech-admin-api.onrender.com/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': "3EF5EABB9C32A866FF4B2AD6A4D6E",
        
    },
    withCredentials: true
});




export default axiosInstance;