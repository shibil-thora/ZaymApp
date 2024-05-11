import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../Redux/AuthSlice'
import { useNavigate } from 'react-router-dom'

function UserMenu() {
    const state = useSelector(state => state.auth) 
    const dispatch = useDispatch()
    const navigate = useNavigate('/')

    function handleLogout() {
        dispatch(logOut()); 
        navigate('/')
    }
  return (
    <>
    <div className="flex flex-col h-full w-full">
        <div className="w-3/4 border-b border-gray-200 mx-8 py-4 ">
            <h1 className="text-3xl font-bold text-orange-60">Profile Details</h1>
        </div>
        <div className="my-2 mx-8"> 
            <h2 className="text-black font-medium">username: </h2>
            <input type="text" 
            required
            className="rounded-md px-2 py-2 shadow-md w-full sm:w-3/4  border border-orange-500
             bg-white-200 focus:outline-none focus:ring-0"/>
        </div>
        <div className="my-2  mx-8"> 
            <h2 className="text-black font-medium">email: </h2>
            <input type="text" 
            required
            readOnly
            value={state.user.email ? state.user.email: 'hi'}
            className="rounded-md px-2 py-2 bg-orange-100 shadow-md w-full sm:w-3/4  border border-orange-500
             bg-white-200 focus:outline-none focus:ring-0"/>
        </div>
        <div className="w-3/4 border-b border-gray-200 mx-8 py-4 ">
            <h1 className="text-2xl font-bold text-orange-60">Area Details</h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mx-8 w-3/4">
            {/* state */}
            <div className="my-2 flex-grow"> 
                <h2 className="text-black font-medium">state: </h2>
                <input type="text" 
                required
                className="rounded-md px-2 py-2 shadow-md w-full  border border-orange-500
                bg-white-200 focus:outline-none focus:ring-0"/>
            </div> 
            {/* dist */}
            <div className="my-2 flex-grow"> 
                <h2 className="text-black font-medium">district: </h2>
                <input type="text" 
                required
                className="rounded-md px-2 py-2 shadow-md w-full  border border-orange-500
                bg-white-200 focus:outline-none focus:ring-0"/>
            </div> 
        </div> 
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mx-8 w-3/4">
            {/* sub dist */}
            <div className="my-4 flex-grow"> 
                <h2 className="text-black font-medium">sub district: </h2>
                <input type="text" 
                required
                className="rounded-md px-2 py-2 shadow-md w-full  border border-orange-500
                bg-white-200 focus:outline-none focus:ring-0"/>
            </div> 
            {/* dist */}
            <div className="my-4 flex-grow"> 
                <h2 className="text-black font-medium">village: </h2>
                <input type="text" 
                required
                className="rounded-md px-2 py-2 shadow-md w-full  border border-orange-500
                bg-white-200 focus:outline-none focus:ring-0"/>
            </div> 
        </div>  
        <div className="div flex mx-8 mt-4">
            <button 
            onClick={()=> handleLogout()}
            className="text-white bg-red-600 hover:bg-red-500 shadow-md rounded-lg px-8 py-2"><i className="fas fa-sign-out-alt"></i> signout</button>
        </div>
         
    </div>
    </>
  )
}

export default UserMenu