import api from './axiosInstance';
export const registerUser = async(userData)=>{
    const response = await api.post('/auth/register',userData);
    return response.data;
}
export const loginUser = async(credentials)=>{
    try {
        const response = await api.post('/auth/login',credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
}