import React, { useEffect, useState } from 'react'
import { AddServiceType, EditServiceType, GetServiceTypes, HideServiceTypes, UnHideServiceTypes } from '../../ApiServices/ApiServices';
import Modal from '../Modal/Modal';
import { useRef } from 'react';
import EditType from '../EditType/EditType';
import AddType from '../AddType/AddType';

function AdminServiceTypes() {
    const [query, setQuery] = useState('');
    const [types, setTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const currentType = useRef(null);
    const [editType, setEditType] = useState('');
    const [addType, setAddType] = useState('');  
    const [showAddForm, setShowAddForm] = useState(false); 
    const [showEditForm, setShowEditForm] = useState(false);
    
    useEffect(() => {
        GetServiceTypes().then((res) => {
            setTypes(res.data.service_all);
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

    function onEditSubmit() {
      EditServiceType(editType).then((res) => {
        console.log(res) 
        const new_types = [...types] 
        const index = new_types.findIndex(type => type.id == res.data.id) 
        new_types[index] = res.data  
        setTypes(new_types)
        setShowEditForm(false)
      })
    }

    function onAddSubmit() {
      console.log(addType) 
      AddServiceType(addType).then((res) => {
        setTypes([...types, res.data])
      }) 
      setShowAddForm(false); 
    }

  return (
    <>
    {showEditForm && 
    <EditType editQuery={editType} 
    onEditSubmit={onEditSubmit} close={setShowEditForm}
    setEditQuery={setEditType}/> 
    }
    {showAddForm && 
    <AddType addQuery={addType} 
    onAddSubmit={onAddSubmit} close={setShowAddForm}
    setAddQuery={setAddType}/> 
    }
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
                onClick={() => {
                  setEditType(type)
                  setShowEditForm(true)
                }}
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
       {/* add button */}
  
      <button 
      onClick={() => {
        setShowAddForm(true); 
      }}
      className={`font-medium my-2
      text-white bg-green-700 px-4 py-1
        focus:outline-white hover:bg-opacity-90`}>Add type +</button>

    </div>
    </div>
     </>
  )
}

export default AdminServiceTypes