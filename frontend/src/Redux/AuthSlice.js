import {createSlice} from '@reduxjs/toolkit' 

const INITIAL_STATE = {
    user: {
        username: '', 
        email: '', 
        is_authenticated: false,
        is_superuser: false, 
        is_provider: false, 
        area: {}, 
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
            state.user.is_superuser = action.payload.is_superuser; 
            state.user.is_provider = action.payload.is_provider;
            state.user.area = action.payload.area;
        },
        logOut: (state, action) => {
            localStorage.setItem('access', ''); 
            localStorage.setItem('refresh', ''); 
            state.user = {
                username: '', 
                email: '',  
                is_authenticated: false,
                is_superuser: false, 
                is_provider: false, 
                area: {}, 
            }
        }, 
        changeArea: (state, action) => {
            state.user.area = action.payload;
        }
    }
}) 

export const {changeAuthMode, logOut, changeArea} = authSlice.actions
export default authSlice.reducer