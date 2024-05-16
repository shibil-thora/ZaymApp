import axios from "../Axios/axios"  
import BaseAxios from "axios" 
import { baseURL } from "../Axios/axios"



export function loginUser(user) {
    return BaseAxios.post(`${baseURL}/login/`, user).then((res) => {
        return res
    })
} 

export function signUpUser(user) {
    return BaseAxios.post(`${baseURL}/signup/`, user).then((res) => {
        return res
    })
} 

export function GetAreaList() {
    return BaseAxios.get(`${baseURL}/services/get_areas`).then((res) => {
        return res
    })
}


//first we are checking the status of the current user if the access token is outdated we will get the 
// refresh token on the catch session. ====USER STATUS SESSION====

export function userStatus() {
    return axios.get('/user_status/').then((res) => {
        return res
    }).catch((err) => {
        const refresh = localStorage.getItem('refresh') 
        return BaseAxios.post(`${baseURL}/api/token/refresh`, {refresh}).then((res) => {
            localStorage.setItem('access', res.data.access); 
            console.log('refreshed'); 
            return axios.get('/user_status/').then((res) => {
                return res
            })
        }) 
    })
}

export function getUsersList() {
    return axios.get('/zaymadmin/users_list').then((res) => {
        return res
    })
}

export function ToggleBlockUser(id) {
    return axios.post('/zaymadmin/toggleblock/', {id}).then((res) => {
        return res
    })
}

export function EditUserArea(id) {
    return axios.post('/edit_area/', {id}).then((res) => {
        return res
    })
} 

export function createService(service) {
    const formData = new FormData() 
    formData.append('image', service.image);
    formData.append('service', service.service);
    formData.append('business_name', service.businessName);
    formData.append('description', service.description);
    formData.append('area', service.areaQuery);
    return axios.post('/services/create/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        return res
    })
} 


export function GetProviderServices() {
    return axios.get('/providers/get_services/').then((res) => {
        return res
    })
} 

export function GetServicesAdmin() {
    return axios.get('/services/get_services/').then((res) => {
        return res
    })
} 


export function AllowPermit(id) {
    return axios.post('/services/allow_permit/', {id}).then((res) => {
        return res
    })
} 


export function UpdateProfileImage(image) {
    const formData = new FormData()
    formData.append('image', image)
    return axios.post('/update_profile_pic/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        return res
    })
} 

export function GetServiceTypes() {
    return axios.get('/services/get_types/').then((res) => {
        return res
    })
} 


export function HideServiceTypes(id) {
    return axios.post('/services/hide_types/', {id}).then((res) => {
        return res
    })
} 

export function UnHideServiceTypes(id) {
    return axios.post('/services/unhide_types/', {id}).then((res) => {
        return res
    })
} 


