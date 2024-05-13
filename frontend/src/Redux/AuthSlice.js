import {createSlice} from '@reduxjs/toolkit' 

const INITIAL_STATE = {
    user: {
        username: '', 
        email: '', 
        is_authenticated: false,
        is_superuser: false, 
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
           
        },
        logOut: (state, action) => {
            localStorage.setItem('access', ''); 
            localStorage.setItem('refresh', ''); 
            state.user = {
                username: '', 
                email: '',  
                is_authenticated: false,
                is_superuser: false, 
            }
        }
    }
}) 

export const {changeAuthMode, logOut} = authSlice.actions
export default authSlice.reducer