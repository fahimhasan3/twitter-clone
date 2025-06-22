import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://a063-2a0a-ef40-b9e-1701-289f-5dd6-f306-440e.ngrok-free.app/api'
});

export default axiosConfig;