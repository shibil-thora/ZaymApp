import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetMessages } from '../../ApiServices/ApiServices'
import { baseURL, domainPort } from '../../Axios/axios'
import { useSelector } from 'react-redux'

function ChatSubMenu() {
    const param = useParams() 
    const [room, setRoom] = useState({}); 
    const [text, setText] = useState(''); 
    const state = useSelector(state => state.auth)

    useEffect(() => {
        GetMessages(param.id).then((res) => {
            console.log(res.data) 
            setRoom(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [param])

    const socket = new WebSocket(`ws://${domainPort}/chat/room/?f=${room?.fellow_user}&t=${localStorage.getItem('access')}`)

    useEffect(() => {

        socket.onopen = function(e) {
            console.log('chat socket connected')
        }

        socket.onclose = function(e) {
            console.log('chat socket disconnected')
        }

        socket.onmessage = function(e) {
            const data = e.data
            const messageObj = JSON.parse(data)
            console.log(messageObj)
            console.log(room?.fellow_user_data?.username, messageObj.fellow) 
            if (room.fellow_user_data?.username == messageObj.fellow) {
                setRoom({...room, messages:[...room.messages, 
                    {   
                        date: Date(), 
                        message: messageObj.message,  
                    }
                ]})
                setText(''); 
            }
        }

    }, [])


    function createMessage() {
        console.log('sent a message')
        socket.send(JSON.stringify({
            'message': text ,
            'user': room.user,
            'fellow': room.fellow_user, 
            'room_id': room.id
        })); 
        setRoom({...room, messages:[...room.messages, 
            {   
                date: Date(), 
                message: text,  
            }
        ]})
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
                <h1 className=" text-lime-700 text-sm">online</h1>
                </div>
            </div>
        </div>

        <div className="messages flex-grow m-5">
            
            {room.messages?.map((message) => (
                <>
                {message.sender_id == room.fellow_user && 
                     <div className="left mb-3 w-2/3  flex ">

                         <h1 className="mx-4 p-2 my-auto text-sm rounded-xl shadow-md bg-cyan-200 bg-opacity-50 text-gray-600">{message.message}</h1>
                     </div>
                }
                {message.sender_id != room.fellow_user &&
                <div className="right mb-3 w-2/3 ms-auto  flex justify-end">
                
                    <h1 className="mx-4 p-2 my-auto text-gray-700 rounded-xl shadow-md bg-gray-200 text-sm">{message.message}</h1>
                </div>}
                </>
            ))}
            

        </div>

        <div className="flex flex-col bottom-0 sticky">
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