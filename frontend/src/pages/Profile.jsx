import React from 'react'
import Navbar from '../Components/Navbar/Navbar'

function Profile() {
  return (
    <>
    <Navbar /> 
    <div className="flex flex-col  sm:flex-row  bg-opacity-30 max-w-6xl mx-auto min-h-screen">
        <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 m-1">
            <div className="bg-white flex flex-col justify-center space-y-4 rounded-md shadow-md m-2 flex-grow">
                <section className=" my-4 sm:my-0 h-3/4 flex flex-col justify-center gap-8">
                <img className="w-40 h-40 mx-auto border border-black shadow-lg rounded-full" 
                src="http://127.0.0.1:8000/media/profile_pics/donglee.jpg" /> 
                <div className="zoom-hover">


                    <div className="custom-file-input w-1/2 mx-auto">
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept="image/*"
                        />
                        <label htmlFor="fileInput" className="flex justify-between items-center px-4 py-3 shadow-md rounded-lg border border-orange-500 cursor-pointer hover:bg-gray-100">
                            <span className="text-sm font-medium text-gray-700 text-center">Update</span>
                            <span className="fas fa-camera text-3xl text-orange-600 filename"></span>
                        </label>
                    </div>

                
             </div>
             </section>
            </div>
            <div className="bg-white rounded-md shadow-md m-2 flex-grow"></div>
        </div>
        <div className="w-full flex-grow flex sm:w-1/2 md:w-3/4">
            <div className="flex-grow my-3 sm:me-3 sm:mx-0 me-1 mx-3 rounded-md shadow-md bg-white"></div>
        </div>
    </div>
    </>
  )
}

export default Profile