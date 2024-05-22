import React, { useState } from 'react'
import { ChangePassword } from '../../ApiServices/ApiServices';
import { useNavigate } from 'react-router-dom';

function ProfilePasswordMenu() {
  const [currentError, setCurrentError] = useState(''); 
  const [newError, setNewError] = useState('');
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState(''); 
  const [confirm, setConfirm] = useState(''); 
  const navigate = useNavigate();

  function onSubmit() {
    if (newPass != confirm) {
      setCurrentError('')
      setNewError('passwords do not match')
    }
    else {
      ChangePassword(current, newPass).then((res) => {
        console.log(res)
        navigate('/profile/user/', {replace: true})
      }).catch((err) => {
        console.log(err)
        const error = err.response.data.detail 
        if (error.includes('current')) {
          setCurrentError(error)
        }
        if (error.includes('short')) { 
          setCurrentError('')
          setNewError(error)
        }
      })
    }
  }

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="bg-cyan-200 sm:w-2/3 w-full rounded-md shadow-md mx-auto px-4">
      <div className="my-4 flex-grow mt-4"> 
                <h2 className="text-black font-medium mb-1">Current password</h2>
                <input type="password" 
                required
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className=" px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0 rounded-md"/>
                <h1 className="text-sm text-red-600 text-center">{currentError}</h1>
      </div>
      <div className="my-4 flex-grow"> 
                <h2 className="text-black font-medium mb-1">New password</h2>
                <input type="password" 
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className=" px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0 rounded-md"/>
                <h1 className="text-sm text-red-600 text-center"></h1>
      </div>
      <div className="my-4 flex-grow"> 
                <h2 className="text-black font-medium mb-1">Confirm new password</h2>
                <input type="password" 
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className=" px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0 rounded-md"/>
                <h1 className="text-sm text-red-600 text-center">{newError}</h1>
      </div>
      <div className="my-4 flex-grow text-center"> 
      <button 
      onClick={() => onSubmit()}
      className="mx-auto mt-4 text-white w-40 py-2 active:bg-cyan-900 font-medium zoom-hover rounded shadow-md hover:bg-cyan-800 bg-cyan-700">
        Change
      </button> 
      </div>
      </div>
    </div>
  )
}

export default ProfilePasswordMenu