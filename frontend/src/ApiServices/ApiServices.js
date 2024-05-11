import axios from "../Axios/axios"  
import BaseAxios from "axios" 
import { baseURL } from "../Axios/axios"



export function loginUser(user) {
    return BaseAxios.post(`${baseURL}login/`, user).then((res) => {
        return res
    })
} 

export function userStatus() {
    return axios.get('user_status/').then((res) => {
        return res
    }).catch((err) => {
        const refresh = localStorage.getItem('refresh') 
        axios.get()
        console.log(err)
    })
}