import React, { useRef, useState } from 'react' 
import { useEffect } from 'react' 
import ResultBox from '../AreaResultBox/ResultBox' 
import ServiceResultBox from '../ServiceResultBox/ResultBox'
import { GetDisplayServiceList } from '../../ApiServices/ApiServices'
import { baseURL } from '../../Axios/axios'
import { useNavigate } from 'react-router-dom' 
import {useSelector} from 'react-redux'

function ServiceList() {  
  const [showSearchForm, setSearchForm] = useState(false)
  const [showServiceBox, setShowServiceBox] = useState(false)
  const [areaQuery, setAreaQuery] = useState('') 
  const [serviceQuery, setServiceQuery] = useState('');
  const [services, setServices] = useState([]) 
  const [searchServices, setSearchServices] = useState([]); 
  const navigate = useNavigate() 
  const state = useSelector(state => state.auth) 
  const [loading, setLoading] = useState(false); 
  

  useEffect(() => { 
    setLoading(true)
    GetDisplayServiceList().then((res) => {
      setServices(res.data)
      setSearchServices(res.data)
      console.log(res.data) 
      console.log(state) 
      setLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }, []) 


  function handleAreaClick(area) {
    setSearchForm(false);
    setAreaQuery(area.area_name) 
    const new_services = services.filter(service => service.get_areas.some(a => a.area_data.id == area.id)) 
    console.log(services, 'services')
    setSearchServices(new_services)
    console.log(area)
  } 

  function handleServiceClick(service) {
    setShowServiceBox(false)
    setServiceQuery(service.business_name) 
    navigate('/user/serviceview/', {state: service})
  }
    
  return (
    <>  
    {loading && 
    <div className="Loading flex flex-col inset-0 fixed bg-teal-300 z-50 backdrop-blur-md bg-opacity-50">
        <div className="mx-auto my-auto">
            <div role="status">
            <svg aria-hidden="true" class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
    }
     

    <div className="mx-12">
        <section className="flex flex-col sm:flex-row mx-auto my-8 max-w-6xl">
            <div class="mb-5 flex">
            <h2 className="bg-white px-3 pt-3 rounded-md  mx-2 fas fa-location text-center"></h2>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input
            type="text"
            value={areaQuery}
            onFocus={() => !showServiceBox && setSearchForm(true)}
            onChange={(e) => setAreaQuery(e.target.value)}
            className="block w-5/6 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Serch location here..." />  
            
            </div>
            <div class="mb-5 flex">
            <h2 className="bg-white px-3 pt-3 rounded-md  mx-2 fa fa-book text-center"></h2>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input
            type="text" 
            value={serviceQuery}
            onFocus={() => !showSearchForm && setShowServiceBox(true)}
            onChange={(e) => setServiceQuery(e.target.value)}
            className="block w-5/6 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Search for service..." />  

            </div>
        </section>
        <div className="div mx-20">
        {showSearchForm && <ResultBox
            handleAreaClick={handleAreaClick}
            areaQuery={areaQuery}
             />
            }
        </div> 
        <div className="div mx-20">
        {showServiceBox && <ServiceResultBox
            handleAreaClick={handleServiceClick}
            serviceQuery={serviceQuery}
            areaQuery={areaQuery} 
            services={searchServices}
             />
            }
        </div>
        
    </div>

    {!showServiceBox && !showSearchForm &&
      <h1 className="text-2xl font-medium mx-16 text-gray-500">All services</h1> }
    <div className="flex flex-row opacity-80  h-76 max-w-6xl my-12 rounded-xl sm:mx-auto
    mx-12 overflow-x-scroll scroll-smooth ease-in-out bg-white bg-opacity-20
    hide-scrollbar border border-black border-opacity-10 p-2 
    shadow-lg">
    <div className="py-4 sm:px-8 mx-auto">
    <ul className="list-none my-8 flex flex-row items-center">
    {services.filter(service => service.get_user.username != state.user.username)
    .map(service => (
      <li tabIndex={0} key={service.id}
      onClick={() => navigate('/user/serviceview/',{state: service})}
      className="sm:w-48 flex flex-col justify-between rounded-lg border border-black border-opacity-20
      shadow-md sm:h-48 w-36 h-36 my-8 mx-8 bg-white focus:outline-orange-500 cursor-pointer zoom-hover-md">
        <div className="shadow-md rounded-lg w-full h-2/3">
          <img src={`${baseURL}${service.cover_image}`} alt="service image" className="rounded-t-md h-full w-full" />
        </div>
        <div className="div mx-auto my-2 w-5/6 h-1/6">
        <h2 className="font-medium sm:text-md text-sm">{service.business_name}</h2>
        <h2 className="font-medium text-orange-600 sm:text-md text-sm">({service.service_type})</h2>
        </div>
      </li>
    ))
    } 

    
     
    </ul> 
    </div>
 
       
    </div>

    <h1 className="text-2xl font-medium mx-16 text-gray-500">Featured services</h1> 
    <div className="flex flex-row opacity-80  h-76 max-w-6xl my-12 rounded-xl sm:mx-auto
    mx-12 overflow-x-scroll scroll-smooth ease-in-out bg-gradient-to-br from-yellow-300 to-red-400 bg-opacity-100
    hide-scrollbar border border-black border-opacity-10 p-2 
    shadow-lg"> 
    <div className="py-4 sm:px-8 mx-auto">
    <ul className="list-none my-8 flex flex-row items-center">
    {services.filter(service => service.get_user.is_premium == true)
    .filter(service => service.get_user.username != state.user.username)
    .map(service => (
      <li tabIndex={0} key={service.id}
      onClick={() => navigate('/user/serviceview/',{state: service})}
      className="sm:w-48 flex flex-col justify-between rounded-lg border border-black border-opacity-20
      shadow-md sm:h-48 w-36 h-36 my-8 mx-8 bg-white focus:outline-orange-500 cursor-pointer zoom-hover-md">
        <div className="shadow-md rounded-lg w-full h-2/3">
          <img src={`${baseURL}${service.cover_image}`} alt="service image" className="rounded-t-md h-full w-full" />
        </div>
        <div className="div mx-auto my-2">
        <h2 className="font-medium sm:text-md text-sm">{service.business_name}</h2>
        <h2 className="font-medium text-orange-600 sm:text-md text-sm">({service.service_type}) <i className='fas fa-crown'></i>
        </h2>
        </div>
      </li>
    ))
    } 

    
     
    </ul> 
    </div>
 
       
    </div>
    </>
  )
}

export default ServiceList 
