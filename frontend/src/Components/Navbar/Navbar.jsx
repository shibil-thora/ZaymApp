import React from 'react' 
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../Redux/AuthSlice'

function Navbar() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const state = useSelector(state => state.auth); 

  return (
    <>
    <div className="bg-gradient-to-br from-cyan-500 to-teal-300 shadow-md 
    border-b-4 border-teal-200
    top-0 sticky z-10">

        <div className="max-w-6xl flex justify-between md:mx-auto mx-8 py-2 ">
            <h2 className="text-4xl ms-2 font-black cursor-pointer text-gray-200">ZaymApp</h2> 
            <div className="hidden md:block">
                <section className="flex justify-between space-x-8 mt-3 items-center">
                    <button 
                    onClick={() => {navigate('/')}}
                    className="text-white zoom-hover hover:shadow-lg hover:border focus:outline-white hover:border-slate-500 hover:opacity-90 rounded-md hover:cursor-pointer px-2 ">Home</button>
                    <button className="text-white zoom-hover  focus:outline-white hover:shadow-lg hover:border hover:border-slate-500 hover:opacity-90 rounded-md hover:cursor-pointer px-2 ">contact us</button>
                    <button 
                    className="text-white zoom-hover hover:shadow-lg hover:border focus:outline-white hover:border-slate-500 hover:opacity-90 rounded-md hover:cursor-pointer px-2 ">About us</button>
                  
                </section>
            </div> 
            <div className="flex">

              {state.user.is_authenticated && <div className="md:flex rotate-hover hidden hover:cursor-pointer w-8 h-8 zoom-hover shadow-lg bg-black bg-opacity-20 rounded-full hover:bg-orange-600 mt-2 justify-center">   
                <i className="text-white mt-2 fas fa-bell"></i> 
              </div>}

            {!state.user.is_authenticated && <button 
            onClick={() => navigate('login/')} 
            className="hidden md:block font-medium shadow-lg zoom-hover
             text-white mx-4 h-8 mt-2 bg-black bg-opacity-20  px-4 py-0 
             rounded-md focus:outline-white hover:bg-orange-600">Login</button>}

            <button 
            onClick={() => { navigate('/profile/user/', {replace: true}) }}
            className='w-12 h-12 hover:px-4 hover:py-4 hidden md:block zoom-hover hover:cursor-pointer shadow-lg rounded-full focus:outline-white border-4 hover:border-4 hover:border-orange-600 md:mx-4 bg-white'></button>
            </div>
            
            {/* mobile part */}
            <button 
            className='md:hidden text-4xl font-bold md:mx-4 text-white'>&#9776;</button>
        </div>
    </div>
    </>
  )
}

export default Navbar