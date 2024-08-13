import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetMessages } from '../../ApiServices/ApiServices'
import { baseURL, domainPort } from '../../Axios/axios'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { formattedDate } from '../../Validations/DateValidation' 

function ChatSubMenu() {
    const param = useParams() 
    const [room, setRoom] = useState({}); 
    const [text, setText] = useState(''); 
    const state = useSelector(state => state.auth);
    const new_message = useRef(''); 
    const socket = useRef(null);
    const [messages, setMessages] = useState([]);  
    const chatDiv = useRef(null); 

    useEffect(() => {
        GetMessages(param.id).then((res) => {
            setRoom(res.data)
            setMessages(res.data.messages) 
            socket.current = new WebSocket(`ws://${domainPort}/ws/chat/room/?f=${res.data.fellow_user}&t=${localStorage.getItem('access')}`)
            console.log(room, 'room data')
            socket.current.onopen = function(e) {
                console.log('chat socket connected')
            }
    
            socket.current.onclose = function(e) {
                console.log('chat socket disconnected')
            }
            console.log(messages)
            socket.current.onmessage = function(e) {
                const data = e.data
                const messageObj = JSON.parse(data)
                const repeated = messages.filter( message => message.id === messageObj.message.id ) 
                console.log(repeated.length)
                console.log(messageObj, 'on message rendered')  
                console.log(repeated)
                setMessages(m => [...m.filter(message => message.id !== messageObj.message.id), messageObj.message])
                chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
            }
    
        }).catch((err) => {
            console.log(err)
        })
    }, [param])

    function createMessage() {
        console.log('sent a message')
        socket.current.send(JSON.stringify({
            'message': text ,
            'sender_id': room.user, 
            'receiver_id': room.fellow_user,
        })); 
        setText(''); 
    }

  return (
    <>
    <div className="flex flex-col h-full justify-between bg-white">
        <div className="flex flex-col bg-white border-b border-black border-opacity-15">
            <div className="rounded-md p-2  mx-3 flex">
                <div className="">
                    <img 
                    className="w-12 h-12 rounded-full"
                    src={room.fellow_user_data?.profile_picture ? `${baseURL}${room.fellow_user_data?.profile_picture}` : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}/>
                </div>
                <div className="names mx-4">
                <h1 className="font-semibold text-lg text-sky-700">{room.fellow_user_data?.username}</h1>
                <h1 className=" text-lime-700 text-sm">available</h1>
                </div>
            </div>
        </div>

        <div ref={chatDiv} className="messages flex flex-col overflow-y-auto h-screen flex-grow m-5 hide-scrollbar">
            
            {messages?.map((message) => (
                <>
                {message.sender_id != room.user && 
                     <div className="left mb-3 w-2/3  flex ">

                         <h1 className="mx-4 p-2 my-auto text-sm flex space-x-2 rounded-xl shadow-md bg-cyan-200 bg-opacity-50 text-gray-600">
                         <p>{message.message}</p>
                        <p><small className="text-gray-400">{formattedDate(message.date)}</small></p>
                         </h1>
                     </div>
                }
                {message.sender_id == room.user &&
                <div className="right mb-3 w-2/3 ms-auto  flex justify-end">
                
                    <h1 className="mx-4 p-2 my-auto flex space-x-2 text-gray-700 rounded-xl shadow-md bg-gray-200 text-sm">
                        <p>{message.message}</p>
                        <p><small className="text-gray-400">{formattedDate(message.date)}</small></p>
                    </h1>
                </div>}
                </>
            ))}
            

        </div>

        <div className="flex flex-col bottom-0 sticky bg-white">
        <div className="mx-auto w-full p-3 flex">
                <div tabIndex={0} className=" flex w-full 
                focus:border-sky-400 rounded mx-2 shadow-md
                focus:outline-none focus:border-1">
                <h1 className="bg-sky-700 bg-opacity-30 px-4 py-2  rounded-l-md flex-grow"><i className="fas fa-search opacity-60"></i></h1>
                <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="block  py-2 w-full focus:outline-none flex-grow bg-sky-700 bg-opacity-30 rounded-r-md"
                placeholder="Search" /> 
                </div> 
                <button 
                onClick={() => createMessage()}
                className="zoom-hover bg-orange-600 shadow-md
                mx-2 px-4 py-2 rounded-md hover:bg-opacity-90 active:bg-orange-700">
                    <i className="fa fa-paper-plane text-xl"></i>
                </button>
            
            </div>
        </div>
    </div>
    </>
  )
}

export default ChatSubMenu