import React from 'react'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../Axios/axios';
import { useSelector } from 'react-redux';

function AdminNavbar() {
    const navigate = useNavigate(); 
    const state = useSelector(state => state.auth)

  return (
    <>
    <div className="bg-gradient-to-br from-green-700 to-green-600 shadow-md 
    border-b-4 border-green-300
    top-0 sticky z-10">

        <div className="max-w-6xl flex justify-between md:mx-auto mx-8 py-2 ">
            <h2 className="text-4xl ms-2 font-black cursor-pointer text-gray-200">ZaymApp Admin</h2> 
            <div className="hidden md:block">
                <section className="flex justify-between flex-grow space-x-8 mt-3 items-center">
                    
                </section>
            </div> 
            <div className="flex">
              <div className="md:flex rotate-hover hidden hover:cursor-pointer w-8 h-8 zoom-hover shadow-lg bg-black bg-opacity-20 rounded-full hover:bg-orange-600 mt-2 justify-center">   
                <i className="text-white mt-2 fas fa-bell"></i> 
              </div>
        
              <button 
            onClick={() => { navigate('/profile/user/', {replace: true}) }}
            className='w-12 sm:flex sm:justify-center h-12 zoom-hover hidden md:block hover:cursor-pointer shadow-lg rounded-full focus:outline-white border-4 hover:border-4 hover:border-orange-600 md:mx-4 bg-white'>
              <div>
              <img 
              className="rounded-full mb-3 "
              src={state.user.pro_pic ? `${baseURL}${state.user.pro_pic}` : 'https://png.pngitem.com/pimgs/s/146-1468281_profile-icon-png-transparent-profile-picture-icon.png'} alt="" />
              </div>
            </button>  </div>
            
            {/* mobile part */}
            <button 
            className='md:hidden text-4xl font-bold md:mx-4 text-white'>&#9776;</button>
        </div>
    </div>
    </>
  )
}

export default AdminNavbar