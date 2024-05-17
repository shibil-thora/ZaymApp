import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../Redux/AuthSlice'
import { useNavigate } from 'react-router-dom'  
import ClosePopup from '../ClosePopup/ClosePopup'
import ResultBox from '../AreaResultBox/ResultBox'
import ServiceForm from '../ServiceForm/ServiceForm'
import { GetProviderServices } from '../../ApiServices/ApiServices'
import { baseURL } from '../../Axios/axios'

function ProviderMenu(props) {
    const state = useSelector(state => state.auth) 
    const dispatch = useDispatch()
    const navigate = useNavigate('/')  
    const [showForm, setShowForm] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false); 
    const [services, setServices] = useState([]);

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
      console.log(service, 'provider menu')
      setShowForm(false); 
      setServices([...services, service])
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
          <div className="my-2 mx-8 flex flex-col space-y-2"> 
           {services.map((service) => (
            <div key={service.id} className="w-full bg-gray-200 shadow-md p-2 rounded-md flex space-x-4">
            <img className="w-30 h-20 rounded cursor-pointer mt-2"
            src={`${baseURL}/${service.cover_image}/`} />
            <div className="w-2/4">
              <h2 className="font-bold text-xl">{service.business_name} ( <span className="text-orange-600">{service.service_type}</span> ) </h2>
              <h3 className="text-sm">{service.description} </h3>
            </div>
            {service.permit && <div className="flex flex-col flex-grow space-y-2 ">
              <button className="text-white w-3/4 mx-auto font-medium zoom-hover rounded shadow-md hover:bg-orange-600 bg-orange-500">View service
               
              </button>
              <button className="text-white w-3/4 mx-auto font-medium zoom-hover rounded shadow-md hover:bg-cyan-800 bg-cyan-700">Edit service
               
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
           
       

        
          </div>

          <div className="w-3/4 border-b border-gray-200 mx-8 py-4 ">
              <h1 className="text-2xl font-bold text-gray-700">Knocked Users</h1>
          </div>
          <div className="bg-gray-300 flex rounded-md mx-4 h-36">
            <div className="bg-gray-50 rounded-md shadow-md w-32 h-32 justify my-auto mx-2"></div>
            <div className="bg-gray-50 rounded-md shadow-md w-32 h-32 justify my-auto mx-2"></div>
  
          </div>
          
          
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