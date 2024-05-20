import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {SendOTP, signUpUser} from '../ApiServices/ApiServices'
import OTP from '../Components/OTP/OTP';

function Signup() {
  const [username, setUsername] = useState('');
  const [userError, setUserError] = useState('');
  const [emailError, setEmailError] = useState(''); 
  const [passError, setPassError] = useState('');
  const [pass1, setPass1] = useState(''); 
  const [email, setEmail] = useState('');
  const [pass2, setPass2] = useState(''); 
  const navigate = useNavigate(); 
  const [showOTP, setShowOTP] = useState(false);

  function handleRegisterClick() {
    signUpUser({username, email, pass1, pass2}).then((res) => {
      setUserError('')
      setEmailError('')
      setPassError('')
      handleSendOTP();
    }).catch((err) => {
      console.log(err)
      const errorMessage = err.response.data.detail; 
      if (errorMessage.includes('username')) {
        setUserError(errorMessage);
        setEmailError('')
        setPassError('')
      }
      else if (errorMessage.includes('email')) {
        setUserError();
        setEmailError(errorMessage)
        setPassError('')
      }
      else if (errorMessage.includes('password')) {
        setUserError('');
        setEmailError('')
        setPassError(errorMessage)
      }
    })
  }

  function handleSendOTP() {
    SendOTP(email).then((res) => {
      setShowOTP(true)
    }) 
  }
  
  return (
    <>
    <div className="flex justify-center min-h-screen">
        {!showOTP &&
        <div className="flex flex-col justify-center w-full mx-auto">
          <div className=" w-full flex justify-center mb-2">
            <button 
            onClick={() => {
              navigate('/login/', {replace: true})
            }}
            className="rounded-md  bg-white p-2 shadow-md bg-opacity-20 hover:bg-opacity-50"><i className="fas fa-sign-out font-bold text-orange-600 rotate-180"></i> back</button>
          </div>
            <div className="bg-white flex flex-col mx-auto justify-center space-y-2 w-3/4 sm:w-80 h-2/3 rounded-md bg-opacity-20 shadow-md sm:h-3/4">
                <div className="mx-auto "> 
                  <p className="mb-1 font-semibold">username</p>
                  <input type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="rounded-md px-2 py-2 shadow-md bg-black text-gray-700 bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                  <h6 className="text-center text-red-600"><small>{userError}</small></h6>
                </div> 
                <div className="mx-auto"> 
                  <p className="mb-1 font-semibold">email</p>
                  <input type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-md px-2 py-2 shadow-md bg-black text-gray-700 bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                  <h6 className="text-center text-red-600"><small>{emailError}</small></h6>
                </div> 
                <div className="mx-auto"> 
                  <p className="mb-1 font-semibold">password</p>
                  <input type="password" 
                  value={pass1} 
                  onChange={(e) => setPass1(e.target.value)}
                  required
                  className="rounded-md  px-2 py-2 shadow-md bg-black bg-opacity-20 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"/>

                </div>
                <div className="mx-auto"> 
                  <p className="mb-1 font-semibold">confirm password</p>
                  <input type="password" 
                  value={pass2} 
                  onChange={(e) => setPass2(e.target.value)}
                  required
                  className="rounded-md px-2 py-2 shadow-md bg-black bg-opacity-20 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                  <h6 className="text-center text-red-600"><small>{passError}</small></h6>
                </div>
                <div className="mx-auto flex flex-col">
                  <button 
                  onClick={() => handleRegisterClick()}
                  className=" font-medium shadow-lg
                  text-black mx-4 h-8 mt-4 bg-black bg-opacity-20  px-4 py-0 
                  rounded-md hover:bg-orange-600 focus:outline-orange-500 focus:outline-none zoom-hover">Register</button>
                </div>
            </div>
             
        </div>}
        {showOTP &&
        <OTP user={{username, email, pass1, pass2}} />
        }
    </div> 
    </>
  )
}

export default Signup