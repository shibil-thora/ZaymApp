import React, { useState } from 'react'

function EditType(props) {
    const [error, setError] = useState('');

    function onSubmit() {
        props.onEditSubmit()
    }
  return (
    <div className="inset-0 fixed h-full flex flex-col justify-center bg-black bg-opacity-60 z-20">
        <div className="flex flex-col w-1/3 h-1/3 mx-auto bg-gray-200  shadow-lg pt-4">
        <div className="my-4 flex-grow mt-4 mx-8 text-center"> 
                <h2 className="text-black font-medium mb-1 text-center">Service type</h2>
        <input type="text" 
        required
        value={props.editQuery.service_name}
        onChange={(e) => props.setEditQuery({...props.editQuery, service_name: e.target.value})}
        className=" px-2 py-2 shadow-md w-full  border border-cyan-500
        bg-white-200 focus:outline-none focus:ring-0 "/>
        <h1 className="text-sm text-red-600 text-center">{error}</h1>
        <button
        onClick={() => onSubmit()}
      className="mx-auto mt-4 text-white w-40 py-2 active:bg-cyan-900 font-medium zoom-hover shadow-md hover:bg-cyan-800 bg-cyan-700">
        Save
      </button> 
      </div>
        </div>
    </div>
  )
}

export default EditType