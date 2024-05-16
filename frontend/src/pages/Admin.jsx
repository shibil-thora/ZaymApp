import React, {useEffect} from 'react'
import AdminNavbar from '../Components/AdminNav/AdminNavbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userStatus } from '../ApiServices/ApiServices';
import { changeAuthMode } from '../Redux/AuthSlice';

function Admin(props) {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth)

    useEffect(() => {
        userStatus().then((res) => {
          if (res.status == 200) {
          dispatch(changeAuthMode(res.data.user))
          }
        }).catch((err) => {
            console.log(err)
          navigate('/login/', {replace: true})
        })
      }, [])

    useEffect(() => {
        if (!state.user.is_superuser) {
            navigate('/login/', {replace: true})
        }
    }, [])

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
                navigate('/admin/servicetypes/')
            }}
            className="bg-black mx-2 mt-1 py-4 bg-opacity-30 
            focus:outline-0 focus:border focus:border-orange-600 cursor-pointer
            hover:bg-opacity-50 shadow-md border-green-600">
                <h2 className="text-xl font-bold mx-8 text-gray-200">Service types</h2>
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