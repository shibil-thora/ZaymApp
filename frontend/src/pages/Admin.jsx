import React from 'react'
import AdminNavbar from '../Components/AdminNav/AdminNavbar'
import { useNavigate } from 'react-router-dom'

function Admin(props) {
    const navigate = useNavigate(); 

  return (
    <>
    <div className="flex flex-col w-full min-h-screen">
    <AdminNavbar /> 
    <div className="flex flex-grow">
        <div className="w-1/4 bg-gradient-to-br flex border-r-4 shadow-lg border-green-300 flex-col from-green-700 to-green-500">
            <div tabIndex={1}
            onClick={() => {
                navigate('/admin/dashboard/', {replace: true})
            }}
             className="bg-black mt-2 mx-2 py-4 bg-opacity-30 
            focus:outline-0 focus:border focus:border-orange-600 cursor-pointer
            hover:bg-opacity-50 shadow-md border-green-600">
                <h2 className="text-xl font-bold mx-8 text-gray-200">DashBoard</h2>
            </div>
            <div tabIndex={1} 
            onClick={() => {
                navigate('/admin/users/', {replace: true})
            }}
            className="bg-black mx-2 mt-1 py-4 bg-opacity-30 
            focus:outline-0 focus:border focus:border-orange-600 cursor-pointer
            hover:bg-opacity-50 shadow-md border-green-600">
                <h2 className="text-xl font-bold mx-8 text-gray-200">Users</h2>
            </div>
            <div tabIndex={1} 
            onClick={() => {
                navigate('/admin/providers/', {replace: true})
            }}
            className="bg-black mx-2 mt-1 py-4 bg-opacity-30 
            focus:outline-0 focus:border focus:border-orange-600 cursor-pointer
            hover:bg-opacity-50 shadow-md border-green-600">
                <h2 className="text-xl font-bold mx-8 text-gray-200">Providers</h2>
            </div>
            <div tabIndex={1} 
            onClick={() => {
                navigate('/admin/providers/')
            }}
            className="bg-black mx-2 mt-1 py-4 bg-opacity-30 
            focus:outline-0 focus:border focus:border-orange-600 cursor-pointer
            hover:bg-opacity-50 shadow-md border-green-600">
                <h2 className="text-xl font-bold mx-8 text-gray-200">Areas</h2>
            </div>
        </div>
        <div className="w-3/4 "> 
            {<props.rightMenu />}
        </div>
    </div>
    </div>
    </>
  )
}

export default Admin