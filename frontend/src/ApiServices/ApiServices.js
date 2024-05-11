import axios from "../Axios/axios"  
import BaseAxios from "axios" 
import { baseURL } from "../Axios/axios"



export function loginUser(user) {
    return BaseAxios.post(`${baseURL}login/`, user).then((res) => {
        return res
    })
} 


//first we are checking the status of the current user if the access token is outdated we will get the 
// refresh token on the catch session. ====USER STATUS SESSION====

export function userStatus() {
    return axios.get('user_status/').then((res) => {
        return res
    }).catch((err) => {
        const refresh = localStorage.getItem('refresh') 
        return BaseAxios.post(`${baseURL}api/token/refresh`, {refresh}).then((res) => {
            localStorage.setItem('access', res.data.access); 
            console.log('refreshed'); 
            return axios.get('user_status/').then((res) => {
                return res
            })
        }) 
    })
}