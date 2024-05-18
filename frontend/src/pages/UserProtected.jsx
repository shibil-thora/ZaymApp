import React, { useState, useEffect } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { userStatus } from '../ApiServices/ApiServices' 
import { useNavigate } from 'react-router-dom';
import { changeAuthMode, logOut } from '../Redux/AuthSlice'

function UserProtected(props) {
    const dispatch = useDispatch(); 
    const state = useSelector(state => state.auth); 
    const navigate = useNavigate(); 

    useEffect(() => {
        userStatus().then((res) => {
            if (res.status == 200) {
            dispatch(changeAuthMode(res.data.user))
            }
          }).catch((err) => { 
            if (err.response.status == 401) {
                dispatch(logOut())
                navigate('/login/', {replace: true})
            }
          })
    }, [])  
    
    useEffect(() => {
      if(!(state.user.is_authenticated && state.user.is_active)) {
        navigate('/login/', {replace: true})
      }
    }, [])


  return (
    <props.component rightMenu={props.rightMenu}/>
  )
}

export default UserProtected