import axios from 'axios';
import authService from './auth-service';

class AxiosService {
    axiosInstance = {};

    constructor() {
        this.initInstance();
    }

    initInstance() {
        this.axiosInstance = axios.create({
            baseURL: '/api/v1',
            timeout: 1000
        });
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = authService.getToken();
                if (token) {
                    config.header.Authorization = `Bearer ${token}`;
                }
                return config;
            });
            return this.axiosInstance;
    }
    getInstance(){
        return this.axiosInstance || this.axiosInstance();
    }
}
export default new AxiosService();