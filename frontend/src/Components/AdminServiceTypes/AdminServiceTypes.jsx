import React, { useEffect, useState } from 'react'
import { GetServiceTypes, HideServiceTypes, UnHideServiceTypes } from '../../ApiServices/ApiServices';
import Modal from '../Modal/Modal';
import { useRef } from 'react';

function AdminServiceTypes() {
    const [query, setQuery] = useState('');
    const [types, setTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const currentType = useRef(null);
    
    useEffect(() => {
        GetServiceTypes().then((res) => {
            setTypes(res.data);
            console.log(types)
        })
    }, [])

    function handleHideClick(type) {
        currentType.current = type
        setShowModal(true)
    }

    function handleHideSubmit() {
        let apiCall;
        if (currentType.current.is_hidden) apiCall = UnHideServiceTypes; 
        else apiCall = HideServiceTypes; 

        apiCall(currentType.current.id).then((res) => {
            const new_types = [...types] 
            const index = new_types.findIndex(type => type.id == res.data.id) 
            new_types[index] = res.data 
            setTypes(new_types)
            setShowModal(false)
        })
    }
  return (
    <>
     {showModal && <Modal 
     text={currentType.current.is_hidden ? 'are you sure about unhiding this type' : 'are you sure about hiding this type'} 
     approveText='yes'
     cancelText='cancel'
     handleApprove={handleHideSubmit}
     handleCancel={() => setShowModal(false)}
     />}
    <div className="flex p-4 flex-col h-screen">
        <div className="w-full mb-3 flex items-center space-x-2">
            <h2 className="fas fa-search bg-white p-3 border border-black"></h2>
        <input type="text" 
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search user...'
            className=" px-2 py-2 shadow-md w-full sm:w-1/2  border border-black
            focus:border focus:border-orange-600 
             bg-white-200 focus:outline-none focus:ring-0"/>
        </div>
    <div className="overflow-y-scroll hide-scrollbar flex-growp-4">
      <table className="min-w-full text-left w-full shadow-lg">
        <thead>
          <tr className="text-xs text-white font-semibold border bg-rose-900">
            <th className="px-6 py-4 border border-black text-center">name of type</th>
            <th className="px-6 py-4 border border-black text-center">edit</th>
            <th className="px-6 py-4 border border-black text-center">Force hide</th>
             
          </tr>
        </thead>
        <tbody> 
            {types.filter((type) => type.service_name.toLowerCase().includes(query.toLowerCase()))
            .map((type) => (
                <tr className="border-b border-gray-200 bg-white">
                <td className="px-6 py-2 border border-black text-center">{type.service_name}</td>
                <td className="px-6 py-2 border border-black text-center">
                <button 
                className="font-medium zoom-hover
                 text-white mt-2 px-4 py-1 mx-auto
                  focus:outline-white bg-indigo-800 hover:opacity-90">Edit</button>
                </td>
                <td className="px-6  border border-black text-center">
                <button 
                onClick={() => handleHideClick(type)}
                className={`font-medium zoom-hover
                 text-white mt-2 px-4 py-1 mx-auto
                  focus:outline-white ${type.is_hidden ?'bg-red-700': 'bg-red-500'} hover:opacity-90`}>{type.is_hidden ? 'unhide': 'hide'}</button>
                  <h2 className="text-sm text-gray-500">({type.is_hidden ? 'hidden': 'not hidden'})</h2>
                </td>
              </tr>
            ))}
          
          
          
          
        </tbody>
      </table>
      
    </div>
    </div>
     </>
  )
}

export default AdminServiceTypes