import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://a0d0-2a0a-ef40-190f-d801-8f0-e644-b934-99f3.ngrok-free.app/api'
});

export default axiosConfig;