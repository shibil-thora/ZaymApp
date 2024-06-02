import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useLocation } from 'react-router-dom'
import { baseURL } from '../Axios/axios'
import Carousal from '../Components/Carousal/Carousal'

function ServiceView() {
    const location = useLocation();
    useEffect(() => {
        console.log(location.state)
    }, []) 
    console.log(window.innerWidth)

  return (
    <>
    <Navbar /> 
        <div className="flex flex-col opacity-80  sm:max-w-6xl my-12 rounded-xl mx-auto
        sm:mx-12 overflow-x-scroll scroll-smooth ease-in-out bg-white bg-opacity-20
        hide-scrollbar border border-black border-opacity-10 p-2
        shadow-lg">
        <div className="py-8 flex sm:flex-row flex-col space-y-4 justify-center space-x-2 flex-grow w-full mx-auto rounded-xl">
            <div className="div w-full sm:w-1/2 sm:mx-8 mx-auto">
                <img src={`${baseURL}${location.state.cover_image}`} alt="" className="rounded-xl"/>
            </div>
            <div className="div flex flex-col sm:w-1/2 space-y-4 sm:mx-8 mx-auto">
                <h1 className="text-5xl text-cyan-600 ring-offset-2 ring-offset-black font-bold text-left">
                {location.state.business_name.toUpperCase()}
                </h1>
                <h1 className="text-left">{location.state.description}</h1>
                <div className="h-full flex space-x-4">

                <button 
                onClick={() => handleLoginClick()}
                className=" font-bold shadow-lg
                text-orange-600 my-2 w-1/2 bg-white py-0 text-3xl
                rounded-md hover:bg-opacity-80 focus:outline-orange-500 focus:outline-none">
                Knock <span><i className="fas fa-bell"></i></span>
                </button>
                <button 
                onClick={() => handleLoginClick()}
                className=" font-bold shadow-lg
                my-2 w-1/2 sm:h-auto py-4 bg-white text-3xl
                rounded-md text-green-700 hover:bg-opacity-80 focus:outline-green-700 focus:outline-none">
                Chat <span><i className="fas fa-comment"></i></span>
                </button>
               
                </div>
            </div>
        </div>

        <div className="py-4 sm:px-8 flex-grow h-full w-full mx-auto rounded-xl">
            {/* carousal */} 
            <Carousal />
            {/* carousal */} 
        </div>
    
        
        </div>
    <Footer />
    </>
  )
}

export default ServiceView