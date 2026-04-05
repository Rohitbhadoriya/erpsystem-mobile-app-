import axios from 'axios';

const BASE_URL = ' http://10.0.2.2:5000/api/'
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 12000,
    headers:{
        'Content-Type': 'application/json',
    }
})
export default api;