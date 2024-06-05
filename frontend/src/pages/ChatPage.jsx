import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { GetAvailableChats } from '../ApiServices/ApiServices';
import { baseURL } from '../Axios/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { formattedDate } from '../Validations/DateValidation';

function ChatPage(props) {
    const [chats, setChats] = useState([]); 
    const navigate = useNavigate(); 
    const param = useParams();  
    const [query, setQuery] = useState(''); 
    console.log(param)

    useEffect(() => {
        GetAvailableChats().then((res) => {
            setChats(res.data)
        })
    }, [])
  return (
    <>
    <Navbar />
    {/*  */}
    <div className="flex sm:flex-row flex-col w-full min-h-screen ">
        <div className="lg:w-1/4 hidden sm:flex sm:w-1/3 flex-col justify-start w-full flex-grow bg-white  border-r border-black border-opacity-5">
            {/* chat search */}
            <div className="mx-auto w-full p-3">
                <div tabIndex={0} className=" flex w-full 
                focus:border-sky-400 rounded shadow-md
                focus:outline-none focus:border-1">
                <h1 className="bg-gray-200 px-4 py-2 rounded-l-md flex-grow"><i className="fas fa-search opacity-60"></i></h1>
                <input
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="block bg-gray-200 py-2 w-full rounded-r-md focus:outline-none flex-grow"
                placeholder="Search" /> 
                </div> 
            
            </div>
            {/* recent chats */}
            <div className="mx-auto w-full h-5/6 overflow-y-scroll hide-scrollbar flex-col mt-4">
                {chats.filter((chat) => chat.fellow_user_data.username.toLowerCase().includes(query.toLowerCase()))
                .map((chat) => (
                    <div tabIndex={0} key={chat.id}
                    onClick={() => navigate(`/chat/users/${chat.id}/`)}
                    className={`hover:bg-teal-100 ${chat.id == param.id && 'bg-teal-100'} rounded-md p-3 my-1 mx-3 flex
                    focus:outline-none border-b shadow-sm
                    cursor-pointer  `}>
                        <div className="">
                            <img 
                            className="w-12 h-12 rounded-lg"
                            src={chat.fellow_user_data.profile_picture ? `${baseURL}${chat.fellow_user_data.profile_picture}` : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}/>
                        </div>
                        <div className="names mx-4 flex flex-col w-4/6">
                        <h1 className="font-semibold text-lg text-sky-700">{chat.fellow_user_data.username}</h1>
                        {chat.last_message.map((message) => (<div key={message.id} className=" text-lime-600 text-sm flex justify-between w-full space-x-2">
                            <p>{message.message.slice(0, 18)}{message.message.length > 18 && '...'}</p>
                            <p className="text-gray-400"><small>{formattedDate(message.date)}</small></p>
                            </div>))}
                        </div>
                        <div className="time text-gray-500">
                            
                        </div>
                        
                    </div>
                ))
                
                }
               
            </div>
        </div>
        <div className="lg:w-3/4 sm:w-2/3 w-full flex-grow  bg-white shadow-md bg-opacity-80">
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