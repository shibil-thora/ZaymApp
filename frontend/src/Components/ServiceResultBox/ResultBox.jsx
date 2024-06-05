import React, { useEffect, useState } from 'react'
import { GetDisplayServiceList } from '../../ApiServices/ApiServices'


function ServiceResultBox(props) {

    function handleAreaClick(area_id) {
      props.handleAreaClick(area_id)
    }

  return (
    <div className="my-2 h-32 rounded-md overflow-y-scroll bg-gray-50 shadow-md border border-orange-500 sm:w-3/4">
        { props.services?.filter((service) => service.business_name?.toLowerCase().includes(props.serviceQuery?.toLowerCase()))
        .map((service) => (
          <p 
          key={service.id} tabIndex={0} 
          onClick={() => handleAreaClick(service)}
          className='text-sm px-4 cursor-pointer hover:font-medium hover:bg-cyan-300'>{service.business_name}</p>
        ))
          
        }
    </div>
  )
}

export default ServiceResultBox