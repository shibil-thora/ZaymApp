import React, { useState } from 'react'

function OTP() {
    const [otp, setOtp] = useState('');
    const [OTPError, setOTPError] = useState('');
  return (
    <div className="flex flex-col justify-center mx-auto w-full">
        <div className="bg-white flex flex-col zoom-hover justify-center sm:w-80 space-y-2 w-5/6 mx-auto rounded-md bg-opacity-20 shadow-md h-48">
        <div className="mx-auto "> 
                  <p className="mb-1 text-center font-semibold">OTP</p>
                  <input type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="rounded-md px-2 py-2 shadow-md bg-black text-gray-700 bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                  <h6 className="text-center text-red-600"><small>{OTPError}</small></h6>
                  <h6 className="text-center "><small>0:35</small></h6>
                </div> 
                <div className="mx-auto flex flex-col">
                  <button 
                  className=" font-medium shadow-lg
                  text-black mx-4 h-8 mt-2 bg-black bg-opacity-20  px-4 py-0 
                  rounded-md hover:bg-orange-600 focus:outline-orange-500 focus:outline-none zoom-hover">Verify</button>
                </div>
        </div>
    </div>
  )
}

export default OTP