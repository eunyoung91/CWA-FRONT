import axios from "axios";
import router from "./router";

const axiosInstance = axios.create({
    baseURL: 'https://d-acaapi.megastudy.net/cwa',
    withCredentials: true
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401){
        router.push('/');
    }

    return Promise.reject(error);
});

export default axiosInstance;