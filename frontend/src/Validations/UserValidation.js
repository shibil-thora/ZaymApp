import * as yup from 'yup'; 


export const userSchema = yup.object().shape({
    username: yup.string().required('username is required'), 
    email: yup.string().email('invalid email').required('email is required'), 
    pass1: yup.string().min(5).max(10).required(), 

})