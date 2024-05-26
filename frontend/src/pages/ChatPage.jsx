import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { GetAvailableChats } from '../ApiServices/ApiServices';
import { baseURL } from '../Axios/axios';
import { useNavigate, useParams } from 'react-router-dom';

function ChatPage(props) {
    const [chats, setChats] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        GetAvailableChats().then((res) => {
            console.log(res.data)
            setChats(res.data)
        })
    }, [])
  return (
    <>
    <Navbar />
    {/*  */}
    <div className="flex sm:flex-row flex-col w-full min-h-screen ">
        <div className="lg:w-1/4 sm:w-1/3 flex flex-col justify-start w-full flex-grow bg-slate-200 border-r border-gray-200  shadow-lg bg-opacity-80">
            {/* chat search */}
            <div className="mx-auto w-full p-3 flex">
                <div tabIndex={0} className=" flex w-full 
                focus:border-sky-400 rounded 
                focus:outline-none focus:border-1">
                <h1 className="bg-white px-4 py-2 rounded-l-md flex-grow"><i className="fas fa-search opacity-60"></i></h1>
                <input
                type="text"
                className="block  py-2 w-full focus:outline-none flex-grow"
                placeholder="Search" /> 
                </div> 
            
            </div>
            {/* recent chats */}
            <div className="mx-auto w-full h-5/6 overflow-y-scroll hide-scrollbar flex-col mt-4">
                {chats.map((chat) => (
                    <div tabIndex={0} 
                    onClick={navigate('')}
                    className="hover:bg-white rounded-md p-3 my-1 mx-3 flex
                    focus:outline-none focus:border-sky-700 focus:border
                    cursor-pointer ">
                        <div className="">
                            <img 
                            className="w-12 h-12 rounded-full"
                            src={chat.fellow_user_data.profile_picture ? `${baseURL}${chat.fellow_user_data.profile_picture}` : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}/>
                        </div>
                        <div className="names mx-4">
                        <h1 className="font-semibold text-lg text-sky-700">{chat.fellow_user_data.username}</h1>
                        {chat.messages.map((message) => (<h1 className=" text-gray-700 text-sm">{message.message}</h1>))}
                        </div>
                        <div className="time text-gray-500">
                            <p className=""><small>02:47</small></p>
                        </div>
                        
                    </div>
                ))
                
                }
               
            </div>
        </div>
        <div className="lg:w-3/4 hidden sm:block sm:w-2/3 w-full flex-grow  bg-white shadow-md bg-opacity-80">
            {props.subMenu ? <props.subMenu /> : <>
            <div className="flex-grow h-full flex flex-col justify-start">
                <img 
                className="mx-auto w-1/3 mt-20"
                src="https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png" alt="" />
            </div>
            </>}
        </div>
    </div>
    {/*  */}
    </>
  )
}

export default ChatPage