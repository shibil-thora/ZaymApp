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

export function GetDisplayServiceList() {
    return BaseAxios.get(`${baseURL}/display_service_list`).then((res) => {
        return res
    })
}

export function SendOTP(email) {
    return BaseAxios.post(`${baseURL}/send_otp`, {email}).then((res) => {
        return res
    })
}

export function VerifyOTP(email, otp) {
    return BaseAxios.post(`${baseURL}/verify_otp`, {email, otp}).then((res) => {
        return res
    })
}

export function RegisterUser(user) {
    return BaseAxios.post(`${baseURL}/register/`, user).then((res) => {
        return res
    })
} 


//first we are checking the status of the current user if the access token is outdated we will get the 
// refresh token on the catch session. ====USER STATUS SESSION====

export function userStatus() {
    return axios.get('/user_status/').then((res) => {
        return res
    }).catch((err) => { 
        console.log(err)
        if (err.response.status == 401){
            const refresh = localStorage.getItem('refresh') 
            return BaseAxios.post(`${baseURL}/api/token/refresh`, {refresh}).then((res) => {
                localStorage.setItem('access', res.data.access); 
                console.log('refreshed'); 
                return axios.get('/user_status/').then((res) => {
                    return res
                })
            }) 
        }
        else{
            console.log('here')
            throw err
        }
       
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


export function EditService(service) {
    const formData = new FormData() 
    formData.append('image', service.image);
    formData.append('service', service.service);
    formData.append('business_name', service.businessName);
    formData.append('description', service.description);
    formData.append('id', service.id);
    return axios.post('/services/edit/', formData, {
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

export function AddServiceArea(service_id, area_name) {
    return axios.post('/providers/add_service_area/', {service_id, area_name}).then((res) => {
        return res
    })
} 

export function DeleteServiceArea(area_id) {
    return axios.post('/providers/delete_service_area/', {area_id}).then((res) => {
        return res
    })
} 

export function AddServiceImage(service_id, image) { 
    const formData = new FormData(); 
    formData.append('service_id', service_id); 
    formData.append('image', image); 
    return axios.post('/providers/add_service_image/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        return res
    })
}  

export function DeleteServiceImage(image_id) {
    return axios.post('/providers/delete_service_image/', {image_id}).then((res) => {
        return res
    })
} 

export function ChangePassword(current_pass, new_pass) {
    return axios.post('/change_password/', {current_pass, new_pass}).then((res) => {
        return res
    })
} 

export function EditServiceType(type) {
    return axios.post('services/edit_types/', {type}).then((res) => {
        return res
    })
} 

export function AddServiceType(service_name) {
    return axios.post('services/add_types/', {service_name}).then((res) => {
        return res
    })
} 

export function GetAvailableChats() {
    return axios.get('chat/get_chats/').then((res) => {
        return res
    })
} 

export function GetMessages(chat_id) {
    return axios.post('chat/get_messages/', {chat_id}).then((res) => {
        return res
    })
} 

export function BanArea(id) {
    return axios.post('/services/ban_area/', {id}).then((res) => {
        return res
    })
} 

export function PermitArea(id) {
    return axios.post('/services/permit_area/', {id}).then((res) => {
        return res
    })
} 