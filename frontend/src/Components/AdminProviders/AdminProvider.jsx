import React from 'react'

function AdminProvider() {
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
            <th className="px-6 py-4 border border-black ">Username</th>
            <th className="px-6 py-4 border border-black ">Services</th>
            <th className="px-6 py-4 border border-black ">Base area</th>
            <th className="px-6 py-4 border border-black ">Service status</th>
            <th className="px-6 py-4 border border-black ">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200 bg-white">
            <td className="px-6 py-4 border border-black">kareem</td>
            <td className="px-6 py-4 border border-black">barber, carpenter</td>
            <td className="px-6 py-4 border border-black">valiyad, ottathara</td>
            <td className="px-6 py-4 border text-green-700 font-bold border-black">Blocked</td>
            <td className="px-6 py-4 border border-black">
            <button 
            className="hidden md:block font-medium zoom-hover
             text-white bg-fuchsia-900  px-4 py-1
              focus:outline-white hover:bg-opacity-90">Requested</button>
            </td>
          </tr>
          
        </tbody>
      </table>
      
    </div>
    </div>
     </>
  )
}

export default AdminProvider