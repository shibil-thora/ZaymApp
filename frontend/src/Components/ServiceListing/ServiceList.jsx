import React, { useRef, useState } from 'react' 
import { useEffect } from 'react'
import axios from 'axios' 
import ResultBox from '../AreaResultBox/ResultBox'
import { GetDisplayServiceList } from '../../ApiServices/ApiServices'
import { baseURL } from '../../Axios/axios'
import { useNavigate } from 'react-router-dom'

function ServiceList() {  
  const [showSearchForm, setSearchForm] = useState(false)
  const [areaQuery, setAreaQuery] = useState('') 
  const [services, setServices] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    GetDisplayServiceList().then((res) => {
      setServices(res.data)
      console.log(services)
    }).catch((err) => {
      console.log(err)
    })
  }, []) 

  useEffect(() => {
    axios.get(`${baseURL}/testm`).then((res) => {
      console.log(res, 'here')
    })
  }, [])

  function handleAreaClick(area) {
    setSearchForm(false);
    setAreaQuery(area.area_name)
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
            onFocus={() => setSearchForm(true)}
            onChange={(e) => setAreaQuery(e.target.value)}
            className="block w-5/6 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Serch location here..." />  
            
            </div>
            <div class="mb-5 flex">
            <h2 className="bg-white px-3 pt-3 rounded-md  mx-2 fa fa-book text-center"></h2>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input
            type="text"
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
        
    </div>

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
        <div className="shadow-md rounded-lg">
          <img src={`${baseURL}/media/${service.cover_image}`} alt="service image" className="rounded-t-md" />
        </div>
        <div className="div mx-auto my-2">
        <h2 className="font-medium ">{service.business_name}</h2>
        <h2 className="font-medium text-orange-600">({service.service_type})</h2>
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