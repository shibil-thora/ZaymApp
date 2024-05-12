import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { userStatus } from '../ApiServices/ApiServices'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import { changeAuthMode } from '../Redux/AuthSlice'

function Profile(props) { 
    const state = useSelector(state => state.auth)
    const navigate = useNavigate() 
    const dispatch = useDispatch()

    useEffect(() => {
        userStatus().then((res) => {
            if (res.status == 200) {
            dispatch(changeAuthMode(res.data.user))
            }
          }).catch((err) => {
            console.log(err)
            navigate('/')
          })
    }, [])

  return (
    <>
    <Navbar /> 
    <div className="flex flex-col  sm:flex-row  bg-opacity-30 max-w-6xl mx-auto min-h-screen">
        <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 m-1">
            <div className="bg-white flex flex-col justify-center space-y-4 rounded-md shadow-md m-2 flex-grow">
                <section className=" my-8 sm:my-0 h-3/4 flex flex-col justify-center gap-8">
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
            <div className="bg-white flex flex-col rounded-md shadow-md m-2 flex-grow">
                <button className="border-b text-gray-600 border-gray-200 mx-3 flex-grow ">
                    <h2 className="h2 zoom-hover">Profile details</h2>
                </button>
                <button className="border-b  text-gray-600 border-gray-200 mx-3 flex-grow ">
                <h2 className="h2 zoom-hover">Services management</h2>
                </button>
                <button className=" text-gray-600 mx-3 flex-grow zoom-hover">change password</button>
                 
            </div>
        </div>
        <div className="w-full flex-grow flex sm:w-1/2 md:w-3/4">
            <div className="flex-grow my-3 sm:me-3 sm:mx-0 me-1 mx-3 rounded-md shadow-md bg-white">
                {<props.rightMenu />}
                
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile