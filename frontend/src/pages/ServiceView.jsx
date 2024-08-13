import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import { baseURL } from '../Axios/axios'
import Carousal from '../Components/Carousal/Carousal'
import { GetOneService, KnockService } from '../ApiServices/ApiServices'
import { useSelector } from 'react-redux'
import { GetUserRoom } from '../ApiServices/ApiServices' 
import { liveSocket2 as live } from '../Components/ContextComp/ContextComp'

function ServiceView() {
    const location = useLocation();
    const state = useSelector(state => state.auth);  
    const [knocked, setKnocked] = useState(false); 
    const navigate = useNavigate();  
    const [service, setService] = useState({})
  

    useEffect(() => {
        GetOneService(location.state.id).then((res) => {
            setService(res.data)
            const knocked = res.data.get_knocks.filter(knock => knock.user_data.username == state.user.username)
            if (knocked.length !== 0) {
                setKnocked(true); 
            }
        })
    }, [])
 

    function handleKnock() {
        if(!knocked) {
        KnockService(state.user.username, location.state.id).then((res) => {
            setKnocked(true); 
            live.send(JSON.stringify({
                message_type: 'knock', 
                from_user: state.user, 
                to_user: service.get_user, 
                message: `${state.user.username} has knocked on ${service.business_name}`
            }))
        })
        }
    }

    function handleChatClick() { 
        GetUserRoom(location.state.get_user.id).then((res) => {
            navigate(`/chat/users/${res.data}`)
          })
    }

  return (
    <>
    <Navbar /> 
        <div className="flex flex-col opacity-80  sm:max-w-6xl my-12 rounded-xl mx-auto
        sm:mx-12 overflow-x-scroll scroll-smooth ease-in-out bg-white bg-opacity-20
        hide-scrollbar border border-black border-opacity-10 p-2
        shadow-lg">
        <div className="py-8 flex sm:flex-row flex-col space-y-4 justify-center space-x-2 flex-grow w-full mx-auto rounded-xl">
            <div className="div w-full sm:w-1/2 sm:mx-8 mx-auto">
                <img src={`${baseURL}${location.state.cover_image}`} alt="" className="rounded-xl"/>
            </div>
            <div className="div flex flex-col sm:w-1/2 space-y-4 sm:mx-8 mx-auto">
                <h1 className="text-5xl text-cyan-600 ring-offset-2 ring-offset-black font-bold text-left">
                {location.state.business_name.toUpperCase()}
                </h1>
                <h1 className="text-left">{location.state.description}</h1>
                <div className="h-full flex space-x-4">

                <button 
                onClick={() => handleKnock()}
                className={`font-bold shadow-lg
                text-orange-600 my-2 w-1/2 ${knocked ? `bg-orange-300` : `bg-white`} py-0 text-3xl
                rounded-md hover:bg-opacity-80 focus:outline-none`}>
                {knocked ? 'Knocked' :'Knock'} <span><i className="fas fa-bell"></i></span>
                </button>

                <button 
                onClick={() => handleChatClick()}
                className=" font-bold shadow-lg
                my-2 w-1/2 sm:h-auto py-4 bg-white text-3xl
                rounded-md text-green-700 hover:bg-opacity-80 focus:outline-green-700 focus:outline-none">
                Chat <span><i className="fas fa-comment"></i></span>
                </button>
               
                </div>
            </div>
        </div>

        <div className="py-4 sm:px-8 flex-grow w-full mx-auto rounded-xl">
            {/* carousal */} 
            <div className="w-3/6 mx-auto">
            <Carousal slides={location.state.get_images}/>
            </div>
            {/* carousal */} 
        </div>
    
        
        </div>
    <Footer />
    </>
  )
}

export default ServiceView