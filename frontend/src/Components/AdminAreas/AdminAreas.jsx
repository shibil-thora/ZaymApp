import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal';

function AdminAreas() {

   
  return (
     <>
      
    <div className="flex p-4 flex-col h-screen">
        <div className="w-full mb-3 flex items-center space-x-2">
            <h2 className="fas fa-search bg-white p-3 border border-black"></h2>
        <input type="text" 
            required
            
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
            <tr className="border-b border-gray-200 bg-white">
            <td className="px-6 py-4 border border-black">users</td>
            <td className="px-6 py-4 border border-black">service.business_name</td>
            <td className="px-6 py-4 border border-black">service</td> 
            <td className={`px-6 py-4 border border-black`}>hi</td>
            <td className="px-6 py-4 border border-black">
            <button 
             
            className={`font-medium zoom-hover
             text-white ${true ? 'bg-green-700': 'bg-fuchsia-900'}  px-4 py-1
              focus:outline-white hover:bg-opacity-90`}>{true ? 'Permitted': 'Requested'}</button>
            </td>
          </tr>
          
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