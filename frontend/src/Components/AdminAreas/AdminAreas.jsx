import React, { useEffect, useRef, useState } from 'react'
import Modal from '../Modal/Modal';
import { GetAreaList } from '../../ApiServices/ApiServices';
import { BanArea, PermitArea } from '../../ApiServices/ApiServices'; 
import Modal2 from '../Modal2/Modal2';

function AdminAreas() {
    const [areas, setAreas] = useState([]);  
    const [areaQuery, setAreaQuery] = useState('');
    const currentArea = useRef()
    const [showModal, setShowModal] = useState(false); 

    useEffect(() => {
        GetAreaList().then((res) => {
            setAreas(res.data.areas); 
        })
    }, [])

    function handlePermitSubmit() {
        let apiCall;
        if (currentArea.current.permit) apiCall = BanArea; 
        else apiCall = PermitArea; 

        apiCall(currentArea.current.id).then((res) => {
            const new_areas = [...areas] 
            const index = new_areas.findIndex(area => area.id == res.data.id) 
            new_areas[index] = res.data 
            setAreas(new_areas)
            setShowModal(false)
        })
    }

    function handlePermitClick(type) {
        currentArea.current = type
        setShowModal(true)
    }
   
  return (
     <>
      {showModal && <Modal2 
     text={currentArea.current.permit ? 'are you sure about banning this area' : 'are you sure about permitting this area'} 
     approveText='yes'
     cancelText='cancel'
     handleApprove={handlePermitSubmit}
     handleCancel={() => setShowModal(false)}
     />}
    <div className="flex p-4 flex-col h-screen">
        <div className="w-full mb-3 flex items-center space-x-2">
            <h2 className="fas fa-search bg-white p-3 border border-black"></h2>
        <input type="text" 
            required
            value={areaQuery}
            onChange={(e) => setAreaQuery(e.target.value)}
            placeholder='Search provider...'
            className=" px-2 py-2 shadow-md w-full sm:w-1/2  border border-black
            focus:border focus:border-orange-600 
             bg-white-200 focus:outline-none focus:ring-0"/>
        </div>
    <div className="overflow-y-scroll hide-scrollbar flex-growp-4">
      <table className="min-w-full text-left w-full shadow-lg">
        <thead>
          <tr className="text-xs text-white font-semibold border bg-cyan-900">
            <th className="px-6 py-4 border border-black ">Village</th>
            <th className="px-6 py-4 border border-black ">Sub dist</th>
            <th className="px-6 py-4 border border-black ">dist</th>
            <th className="px-6 py-4 border border-black ">state</th>
            <th className="px-6 py-4 border border-black ">Actions</th>
          </tr>
        </thead>
        <tbody>
            {areas.filter((area) => area.area_name.toLowerCase().includes(areaQuery.toLowerCase()))
            .map((area) => (
                <tr className="border-b border-gray-200 bg-white">
                <td className="px-6 py-4 border border-black">{area.village}</td>
                <td className="px-6 py-4 border border-black">{area.sub_dist}</td>
                <td className="px-6 py-4 border border-black">{area.dist}</td> 
                <td className={`px-6 py-4 border border-black`}>{area.state}</td>
                <td className="px-6 py-4 border border-black">
                <button 
                onClick={() => handlePermitClick(area)}
                className={`font-medium zoom-hover
                 text-white mt-2 px-4 py-1 mx-auto
                  focus:outline-white ${area.permit ?'bg-red-700': 'bg-red-500'} hover:opacity-90`}>{area.permit ? 'Ban': 'Release'}</button>
                  <h2 className="text-sm text-gray-500">({area.permit ? 'has permit': 'Banned'})</h2>
                </td>
                </tr>
            ) )}
          
        </tbody>
      </table>

      {/* add button */}
      <div className="my-4">
      <button 
             
             className={`font-medium zoom-hover
              text-white ${true ? 'bg-green-700': 'bg-fuchsia-900'}  px-4 py-1
               focus:outline-white hover:bg-opacity-90`}>{true ? 'Add area + ': 'Requested'}</button>
      </div>
      
    </div>
    </div>
     </>
  )
}

export default AdminAreas