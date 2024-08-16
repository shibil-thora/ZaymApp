import React, { useEffect, useState } from 'react'
import {GetNotifications, SeeNotification} from '../../ApiServices/ApiServices'
import { baseURL } from '../../Axios/axios';
import {formattedDate} from '../../Validations/DateValidation'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { minusNotiCount } from '../../Redux/AuthSlice';

function NotificationMenu(props) { 
    const [notifications, setNotifications] = useState();  
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        GetNotifications().then((res) => {
            setNotifications(res.data)
        })
    }, []) 

    function handleNotiClick(noti) {
        dispatch(minusNotiCount()); 
        SeeNotification(noti.id).then((res) => {
            if (!noti.message.includes('sent')) navigate('/profile/provider/'); 
            else navigate('/chat/users/')
        })
    }

  return (
    <div className="flex flex-col inset-0 fixed mt-20 z-20">
        {/* heading */}
    <div className="sm:w-1/2 md:w-1/3 w-full shadow-xl h-12 
      sm:ms-auto sm:me-8 rounded-t-md bg-gray-100 border-b border-gray-300">
    <div className="w-full mb-2 flex justify-between mt-2">
    <h1 className="text-xl text-gray-600 me-8 font-medium mx-4">Notifications</h1>
            <button 
                onClick={() => props.setShowNotification(false)}
                className="zoom-hover bg-orange-600 shadow-md 
                mx-2 px-2 rounded-md hover:bg-red-600 active:bg-orange-700">
                    <i className="fa fa-close text-white"></i>
            </button>
            
             
           
        </div>
    </div>
    {/* notification session */}
    <div className="sm:w-1/2 md:w-1/3 w-full shadow-xl h-2/3 overflow-y-scroll appscroll bg-white sm:ms-auto sm:me-8 rounded-b-md">
        
        {notifications?.map((noti) => (
             <div className="my-2 py-2 mx-2 flex space-x-2 border-b hover:bg-slate-50">
                <div className="image w-12 h-12 mx-2">
                    <img src={noti.informer_data.profile_picture ? `${baseURL}${noti.informer_data.profile_picture}` : `https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg`} 
                    className="w-12 rounded-full h-12"
                    alt="" />
                </div>
                <div className="flex flex-col w-4/6">
                    <p className="text w-full text-gray-700 text-left">{noti.message}</p>
                    <div className="time text-slate-500"><small>{formattedDate(noti.date)}</small></div>
                </div>  
                <div className="flex flex-col justify-center">
                <button 
                onClick={() => handleNotiClick(noti)}
                className="bg-sky-700 rounded-lg px-2 ms-2  mx-auto
                  zoom-hover hover:bg-sky-600 active:bg-sky-800
                 text-white">
                  <span><i className='fas fa-eye'></i></span>
                </button> 
                </div>
            </div>
        ))}

       

    </div>
    
    </div>
  )
}

export default NotificationMenu