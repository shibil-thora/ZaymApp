import React, { useRef, useState } from 'react' 
import { useEffect } from 'react' 
import ResultBox from '../AreaResultBox/ResultBox' 
import ServiceResultBox from '../ServiceResultBox/ResultBox'
import { GetDisplayServiceList } from '../../ApiServices/ApiServices'
import { baseURL } from '../../Axios/axios'
import { useNavigate } from 'react-router-dom'

function ServiceList() {  
  const [showSearchForm, setSearchForm] = useState(false)
  const [showServiceBox, setShowServiceBox] = useState(false)
  const [areaQuery, setAreaQuery] = useState('') 
  const [serviceQuery, setServiceQuery] = useState('');
  const [services, setServices] = useState([]) 
  const [searchServices, setSearchServices] = useState([]); 
  const navigate = useNavigate()
  

  useEffect(() => {
    GetDisplayServiceList().then((res) => {
      setServices(res.data)
      setSearchServices(res.data)
      console.log(res.data)
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
    {services.map(service => (
      <li tabIndex={0} key={service.id}
      onClick={() => navigate('/user/serviceview/',{state: service})}
      className="sm:w-48 flex flex-col justify-between rounded-lg border border-black border-opacity-20
      shadow-md sm:h-48 w-36 h-36 my-8 mx-8 bg-white focus:outline-orange-500 cursor-pointer zoom-hover-md">
        <div className="shadow-md rounded-lg w-full h-2/3">
          <img src={`${baseURL}${service.cover_image}`} alt="service image" className="rounded-t-md h-full w-full" />
        </div>
        <div className="div mx-auto my-2">
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
