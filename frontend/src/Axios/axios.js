import axios from 'axios' 
export const baseURL = 'http://127.0.0.1:8000/' 
export const baseImageURL = 'http://127.0.0.1:8000' //same but the slash difference

const axiosInstance = axios.create({
    baseURL, 
    headers: {
        'Content-Type': 'application/json', 
    }, 
}) 

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } 
    return config
})

export default axiosInstance