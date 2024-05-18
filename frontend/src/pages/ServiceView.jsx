import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useLocation } from 'react-router-dom'
import { baseURL } from '../Axios/axios'

function ServiceView() {
    const location = useLocation();
    useEffect(() => {
        console.log(location.state)
    }, [])

  return (
    <>
    <Navbar /> 
        <div className="flex flex-col opacity-80  max-w-6xl my-12 rounded-xl sm:mx-auto
        mx-12 overflow-x-scroll scroll-smooth ease-in-out bg-white bg-opacity-20
        hide-scrollbar border border-black border-opacity-10 p-2
        shadow-lg">
        <div className="py-8 flex flex-rowsm:px-8 space-x-2 flex-grow w-full mx-auto rounded-xl">
            <div className="div w-1/2 mx-8">
                <img src={`${baseURL}/media/${location.state.cover_image}`} alt="" className="rounded-xl"/>
            </div>
            <div className="div flex flex-col w-1/2 space-y-4 mx-auto">
                <h1 className="text-5xl text-gray-600 ring-offset-2 ring-offset-black font-bold text-left">
                {location.state.business_name.toUpperCase()}
                </h1>
                <h1 className="text-left">{location.state.description}</h1>
                <div className="h-full flex space-x-4">

                <button 
                onClick={() => handleLoginClick()}
                className=" font-bold shadow-lg
                text-black my-2 w-1/2 bg-white py-0 text-3xl
                rounded-md hover:bg-opacity-80 focus:outline-orange-500 focus:outline-none">
                Knock
                </button>
                <button 
                onClick={() => handleLoginClick()}
                className=" font-medium shadow-lg
                text-black h-8 w-1/2 bg-black bg-opacity-20 py-0 
                rounded-md hover:bg-orange-600 focus:outline-orange-500 focus:outline-none">
                Login
                </button>
                </div>
            </div>
        </div>

        <div className="py-4 sm:px-8 flex-grow w-full mx-auto rounded-xl border border-black h-32">

        </div>
    
        
        </div>
    <Footer />
    </>
  )
}

export default ServiceView