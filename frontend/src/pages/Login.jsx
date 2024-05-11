import React, {useState} from 'react' 
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../ApiServices/ApiServices' 
import {useDispatch} from 'react-redux' 
import { changeAuthMode } from '../Redux/AuthSlice' 
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Login() {
    const navigate = useNavigate(); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');  
    const [error, setError] = useState('');
    const dispatch = useDispatch(); 
    const state = useSelector(state => state.auth) 

    useEffect(() => {
      if (state.user.is_authenticated) {
      navigate('/')
    }
    }, [])
    
    function handleLoginClick() { 
      if (!username || !password) {
        setError('empty inputs')
      }
      else{
        loginUser({username: username, password: password}).then((res) => {
          setError('')
          dispatch(changeAuthMode(res.data.user)) 
          localStorage.setItem('refresh', res.data.refresh); 
          localStorage.setItem('access', res.data.access); 
          navigate('/')
        }).catch((err) => {
          setError(err.response.data.detail)
        })
      }
    }

  return (
    <>
    <div className="flex justify-center min-h-screen">
           
        <div className="flex flex-col justify-center mx-auto">
            <div className="bg-white flex flex-col justify-center space-y-4 sm:w-80 rounded-md bg-opacity-20 shadow-md sm:h-80 zoom-hover">
                <div className="mx-auto"> 
                  <p className="mb-1">username</p>
                  <input type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="rounded-md px-2 py-2 shadow-md bg-black bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                </div> 
                <div className="mx-auto"> 
                  <p className="mb-1">password</p>
                  <input type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-md px-2 py-2 shadow-md bg-black bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
            
                </div>
                <div className="mx-auto flex flex-col"> 
                  <h6 className="text-center text-red-600"><small>{error}</small></h6>
                  <button 
                  onClick={() => handleLoginClick()}
                  className=" font-medium shadow-lg
                  text-black mx-4 h-8 mt-4 bg-black bg-opacity-20  px-4 py-0 
                  rounded-md hover:bg-orange-600 focus:outline-orange-500 ">Login</button>
                </div>
            </div>
        </div>
    </div> 

    
    </>
  )
}

export default Login