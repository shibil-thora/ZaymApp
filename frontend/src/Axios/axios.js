import axios from 'axios' 
export const baseURL = 'http://13.232.49.159'
export const domainPort = '13.232.49.159'
 

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