import api from './axiosInstance';

export const createBatch = async(batchData,token)=>{
     try {
        const response = await api.post('/batches', batchData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}



export const getAllBatches = async (token) => {
    try {
        const response = await api.get('/batches', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
