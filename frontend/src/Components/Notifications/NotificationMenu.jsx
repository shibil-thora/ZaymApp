import React from 'react'

function NotificationMenu(props) {
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
        <div className="my-2 py-2 mx-2 flex space-x-4">
            <div className="image w-12 h-12 mx-2">
                <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" 
                className="w-12 rounded-full h-12"
                alt="" />
            </div>
            <div className="flex flex-col">
                <p className="text w-2/3 text-left">A person from mars knoked you a message</p>
                <div className="time"></div>
            </div>
        </div>
        <div className="my-2 py-2 mx-2 flex space-x-4">
            <div className="image w-12 h-12 mx-2">
                <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" 
                className="w-12 rounded-full h-12"
                alt="" />
            </div>
            <div className="flex flex-col">
                <p className="text w-2/3 text-left">A person from mars knoked you a message</p>
                <div className="time"></div>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default NotificationMenu