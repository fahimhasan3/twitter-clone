import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://7382-2a0a-ef40-190f-d801-cc77-579a-3ca2-ba8d.ngrok-free.app/api'
});

export default axiosConfig;