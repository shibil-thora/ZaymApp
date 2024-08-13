import {createSlice} from '@reduxjs/toolkit' 

const INITIAL_STATE = {
    user: {
        username: '', 
        email: '', 
        is_authenticated: false,
        is_active: false,
        is_superuser: false, 
        is_provider: false, 
        is_premium: false, 
        area: {}, 
        pro_pic: '', 
        notificationCount: 1, 
        chatCount: 1, 
    }
} 

export const authSlice = createSlice({
    name: 'auth', 
    initialState: INITIAL_STATE, 
    reducers: {
        changeAuthMode: (state, action) => {
            state.user.username = action.payload.username; 
            state.user.email = action.payload.email; 
            state.user.is_authenticated = action.payload.is_authenticated; 
            state.user.is_active = action.payload.is_active;
            state.user.is_superuser = action.payload.is_superuser; 
            state.user.is_provider = action.payload.is_provider;
            state.user.is_premium = action.payload.is_premium;
            state.user.area = action.payload.area; 
            state.user.pro_pic = action.payload.pro_pic;
        },
        logOut: (state, action) => {
            localStorage.setItem('access', ''); 
            localStorage.setItem('refresh', ''); 
            state.user = {
                username: '', 
                email: '',  
                is_authenticated: false,
                is_active: false, 
                is_superuser: false, 
                is_provider: false, 
                is_premium: false, 
                area: {}, 
                pro_pic: '',
                notificationCount: 1, 
                chatCount: 1, 
            }
        }, 
        changeArea: (state, action) => {
            state.user.area = action.payload;
        }, 
        changeToProvider: (state, action) => {
            state.user.is_provider = action.payload;
        }, 
        updateProPic: (state, action) => {
            state.user.pro_pic = action.payload; 
        },
        changeToPremium: (state, action) => {
            state.user.is_premium = action.payload; 
        }
    }
}) 

export const {changeAuthMode, logOut, changeArea, changeToProvider, updateProPic, changeToPremium} = authSlice.actions
export default authSlice.reducer