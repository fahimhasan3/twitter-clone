import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://f680-2a0a-ef40-190f-d801-e0fa-7e33-b6fb-e4de.ngrok-free.app/api'
});

export default axiosConfig;