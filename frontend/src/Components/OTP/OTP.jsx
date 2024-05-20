import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { RegisterUser, VerifyOTP } from '../../ApiServices/ApiServices';
import { SendOTP } from '../../ApiServices/ApiServices';
import { useNavigate } from 'react-router-dom';

function OTP(props) {
    const TIME_DURATION = 60;
    const [otp, setOtp] = useState('');
    const [OTPError, setOTPError] = useState(''); 
    const intervalID = useRef(null); 
    const [timer, setTimer] = useState(TIME_DURATION);  
    const time = useRef(TIME_DURATION); 
    const [showResend, setShowResend] = useState(false);  
    const [isRunning, setRunning] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
      if (isRunning) {
        intervalID.current = setInterval(() => {
          if (time.current > 0) {
          setTimer(t => t - 1); 
          time.current--
          } 
          else{
            setRunning(false); 
          } 
        }, 1000)
      }
      else {
        setShowResend(true)
        clearInterval(intervalID.current)
        time.current = TIME_DURATION; 
      }
      
      return () => {
          clearInterval(intervalID.current); 
      }
    }, [isRunning])

    function handleVerifyClick() {
        VerifyOTP(props.user.email, otp).then((res) => {
          console.log(res) 
          RegisterUser(props.user).then((res) => {
            console.log(res); 
            navigate('/login/', {replace: true})
          })
        }).catch((err) => {
          console.log(err) 
          if (err.response.status == 401) {
            setOTPError(err.response.data.detail)
            setRunning(false); 
          }
        })
    }

    function handleResendClick() {
      SendOTP(props.user.email).then((res) => {
        time.current = TIME_DURATION; 
        setRunning(true);  
        setOTPError('');
        setTimer(TIME_DURATION); 
        setOtp('');
        setShowResend(false); 
      })
    }

  return (
    <div className="flex flex-col justify-center mx-auto w-full">
        <div className="bg-white flex flex-col zoom-hover justify-center sm:w-80 space-y-2 w-5/6 mx-auto rounded-md bg-opacity-20 shadow-md h-48">
        <div className="mx-auto "> 
                  <p className="mb-1 text-center font-semibold">OTP</p>
                  <input type="text" 
                  value={otp} 
                  onChange={(e) => {
                    if(!isNaN(e.target.value)){
                    setOtp(e.target.value)
                    }
                  }}
                  maxLength={6}
                  required 
                  className="rounded-md px-2 py-2 shadow-md bg-black text-gray-700 bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                  <h6 className="text-center text-red-600"><small>{OTPError}</small></h6>
                  <h6 className="text-center flex justify-between">
                    <small className="invisible">0:35</small>
        
                    <small className="text-black text-opacity-50 mx-1 font-thin">{otp.length} / 6</small>
                    </h6>
                </div> 
                <div className="mx-auto flex flex-col">
                  {!showResend && <button 
                  onClick={() => handleVerifyClick()}
                  className=" font-medium shadow-lg
                  text-black mx-4 h-8 bg-black bg-opacity-20  px-4 py-0 
                  rounded-md hover:bg-orange-600 focus:outline-orange-500 focus:outline-none zoom-hover">
                  Verify</button>}
                  {showResend && <button 
                  onClick={() => handleResendClick()}
                  className=" font-medium shadow-lg
                  text-black mx-4 h-8 bg-black bg-opacity-20  px-4 py-0 
                  rounded-md hover:bg-orange-600 focus:outline-orange-500 focus:outline-none zoom-hover">
                    Resend</button>}
                   {!showResend && <small className="mx-auto mt-1 text-green-700">00 : {`${timer}`.length == 1 ? `0${timer}` : timer}</small>}
                </div>
        </div>
    </div>
  )
}

export default OTP