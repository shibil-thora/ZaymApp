import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../Redux/AuthSlice'
import { useNavigate } from 'react-router-dom'  
import ClosePopup from '../ClosePopup/ClosePopup'
import ServiceForm from '../ServiceForm/ServiceForm'
import ServiceEditForm from '../ServiceEditForm/ServiceEditForm'
import { GetAreaList, GetAvailableChats, GetProviderServices } from '../../ApiServices/ApiServices'
import { GetUserRoom } from '../../ApiServices/ApiServices'
import { baseURL } from '../../Axios/axios' 

function ProviderMenu(props) {
    const state = useSelector(state => state.auth) 
    const dispatch = useDispatch()
    const navigate = useNavigate('/')  
    const [showForm, setShowForm] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false); 
    const [services, setServices] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false); 
    const [EditService, setEditService] = useState({});

    function invokePopUp() {
      setShowPopUp(true);
    } 

    useEffect(() => {
      GetProviderServices().then((res) => {
        setServices(res.data); 
        console.log(res.data)
      }).catch((err) => { 
        if (err.response.status == 401) {
          dispatch(logOut())
          navigate('/login/', {replace: true})
      }
      })
    }, [])  

    function handleFormSubmit(service) {
      setShowForm(false); 
      setServices([...services, service])
    }
    
    function handleEditFormSubmit(service) {
      console.log(service, 'provider menu')
      setShowEditForm(false);  
      const new_services = [...services] 
      const index = services.findIndex(s => s.id == service.id)
      new_services[index] = service 
      setServices(new_services)
    }

    function handleChatClick(user) {
      GetUserRoom(user.id).then((res) => {
        navigate(`/chat/users/${res.data}`)
      })
    }

    return (
      <>
        {showPopUp && <ClosePopup 
      text='Your request has been succesfully sent! admin will respond soon,'
      onClose={() => {
        setShowPopUp(false) 
      }}
      />}

      {state.user.is_provider && 
      <div className="flex flex-col h-screen overflow-y-scroll hide-scrollbar w-full">
          <div className=" border-b border-gray-200 mx-8 py-4 ">
              <h1 className="text-3xl font-bold text-gray-700 text-orange-60">Your Services</h1>
          </div>
          <div className="my-2 mx-8 flex flex-col space-y-4"> 
           {services.map((service) => (
            <div key={service.id} className="w-full bg-gray-200 shadow-md p-2 rounded-md flex space-x-4">
            <img className="w-30 h-20 rounded cursor-pointer mt-2"
            src={`${baseURL}${service.cover_image}/`} />
            <div className="w-2/4">
              <h2 className="font-bold text-xl">{service.business_name} ( <span className="text-orange-600">{service.service_type}</span> ) </h2>
              <h3 className="text-sm">{service.description} </h3>
              <h3 className="text-sm"><span className="font-medium">Areas: </span>
              {service.get_areas.map(area => (
                <small> 
                <span className="text-cyan-700 font-medium bg-white rounded px-1 mx-1 shadow-sm">
                  {area.area_data.village}
                </span>
                </small>
              ))}
             </h3>
            </div>
            {service.permit && <div className="flex flex-col flex-grow space-y-2 ">
              <button 
               onClick={() => {
                navigate('/provider/viewservice/', {state: {service}})
              }}
              className="text-white w-3/4 mx-auto font-medium zoom-hover rounded shadow-md hover:bg-orange-600 bg-orange-500">
                View service
              </button>
              <button 
              onClick={() => {
                setEditService(service) 
                setShowEditForm(true)
              }}
              className="text-white w-3/4 mx-auto font-medium zoom-hover rounded shadow-md hover:bg-cyan-800 bg-cyan-700">
                Edit service
              </button>
              <div className="text-lime-600 w-3/4 text-center cursor-default mx-auto font-medium rounded">Active</div>
            </div>}
            {!service.permit &&
            <div className="flex flex-col flex-grow space-y-2">
              <div className="rounded-full -rotate-45 text-center text-white bg-red-600 flex font-bold flex-col justify-center h-20 w-20">
                NO PERMIT
              </div>
            </div>
            }
           </div>
           ))
          }
            <div>
            {showEditForm &&
            <ServiceEditForm
            setShowForm={setShowEditForm}
            service={EditService}
            handleFormSubmit={handleEditFormSubmit}/>
              }
            </div>
          </div> 


          <div className="w-3/4 border-b border-gray-200 mx-8 py-4 ">
              <h1 className="text-2xl font-bold text-gray-700">Knocked Customers</h1>
          </div>
          <div className="my-3 flex w-6/6 rounded-md mx-4 h-36">  
          {services.map(service => (  
            <>
            {service.get_knocks.map(knock => (
               <div className="bg-gray-200 rounded-md flex flex-col justify-evenly py-1 shadow-md w-32 h-32 justify my-auto mx-2">
                <div className=" w-16 h-16 rounded-full mx-auto shadow border border-black border-opacity-30">
                  <img src={`${baseURL}${knock.user_data.profile_picture}`} className="rounded-full" />
                </div> 
                <h2 className="mx-auto font-medium opacity-70"></h2> 
                <button 
                onClick={() => handleChatClick(knock.user_data)}
                className="bg-green-700 rounded-lg w-5/6 mx-auto
                  zoom-hover hover:bg-green-600 active:bg-green-800
                 text-white">
                  <span><i className="fa fa-comment text-sm"></i><small className="font-medium">&nbsp;&nbsp;{knock.user_data.username }</small></span>
                </button> 
                <small className="mx-auto font-thin">({service.business_name})</small>

               </div>
            ))}
           
            </>
            
          ))}
          
          </div>
          <button 
          onClick={() => setShowForm(!showForm)}
          className="mx-8 mt-4 text-white w-48 py-2 active:bg-cyan-900 font-medium zoom-hover rounded shadow-md hover:bg-cyan-800 bg-cyan-700">
           {showForm ? 'close form': 'Add service'} <span> <i className="fas fa-book"></i></span>
          </button> 
          {!showForm && <h1 className="mx-8 text-green-500 text-sm"><small>{services.length < 3 ? 3 - services.length: 0}
          &nbsp; more free services available for you</small></h1>}
          {showForm &&
          <ServiceForm 
          invokePopUp={invokePopUp}
          setShowForm={setShowForm}
          handleFormSubmit={handleFormSubmit}/>
          }
  
          
          
      </div>}
      {!state.user.is_provider && 
      <div className="flex flex-col mt-12 h-screen overflow-y-scroll hide-scrollbar w-full">
        <div className="mx-auto text-center">
          <h2 className="mx-auto font-medium text-lg">You are not a service provider </h2>
          <h2 className="mx-auto font-medium text-md text-orange-600">Start providing a service </h2>
          <button 
          onClick={() => setShowForm(!showForm)}
          className=" font-medium shadow-lg
          text-white mx-4 h-8 p-2 bg-red-500 my-4 px-4 py-0 fademan
          rounded-md hover:bg-red-600 zoom-hover focus:outline-orange-500 focus:outline-none">
              {showForm ? 'close form': 'add a service'}
          </button> 
        </div> 
        {showForm &&
         <ServiceForm 
         invokePopUp={invokePopUp}
         handleFormSubmit={handleFormSubmit}/>
        }
      
      </div>
      } 
      </>
    )
}

export default ProviderMenu