import React, { useEffect, useState } from 'react'
import { GetAreaList } from '../../ApiServices/ApiServices'

function ResultBox(props) {
  const [areas, setAreas] = useState([])

    useEffect(() => {
      console.log('send request')
      GetAreaList().then((res) => {
        setAreas(res.data.areas)  
      })
    }, [props.showAreaSearch])

    function handleAreaClick(area_id) {
      props.handleAreaClick(area_id)
    }

  return (
    <div className="my-2 h-32 rounded-md overflow-y-scroll bg-gray-50 shadow-md border border-orange-500 sm:w-3/4">
        { areas.filter((area) => area.area_name.toLowerCase().includes(props.areaQuery.toLowerCase()))
        .map((area) => (
          <p 
          key={area.id} tabIndex={0} 
          onClick={() => handleAreaClick(area)}
          className='text-sm px-4 cursor-pointer hover:font-medium hover:bg-cyan-300'>{area.area_name}</p>
        ))
          
        }
    </div>
  )
}

export default ResultBox