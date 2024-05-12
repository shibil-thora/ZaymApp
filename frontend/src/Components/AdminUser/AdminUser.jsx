import React from 'react'

function AdminUser() {
  return (
     <>
    <div className="flex p-4 flex-col h-screen">
        <div className="w-full mb-3 flex items-center space-x-2">
            <h2 className="fas fa-search bg-white p-3 border border-black"></h2>
        <input type="text" 
            required
            placeholder='Search user...'
            className=" px-2 py-2 shadow-md w-full sm:w-1/2  border border-black
            focus:border focus:border-orange-600 
             bg-white-200 focus:outline-none focus:ring-0"/>
        </div>
    <div className="overflow-y-scroll hide-scrollbar flex-growp-4">
      <table className="min-w-full text-left w-full shadow-lg">
        <thead>
          <tr className="text-xs text-white font-semibold border bg-fuchsia-900">
            <th className="px-6 py-4 border border-black ">username</th>
            <th className="px-6 py-4 border border-black ">Gmail</th>
            <th className="px-6 py-4 border border-black ">Block</th>
            <th className="px-6 py-4 border border-black ">Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200 bg-white">
            <td className="px-6 py-4 border border-black">kareem</td>
            <td className="px-6 py-4 border border-black">kareem@gmail.com</td>
            <td className="px-6 py-4 border border-black">
            <button 
            className="hidden md:block font-medium zoom-hover
             text-white mt-2 bg-green-700  px-4 py-1 mx-auto
              focus:outline-white hover:opacity-90">Activate</button>
            </td>

            <td className="px-6 py-4 border text-green-700 font-bold border-black">Blocked</td>
          </tr>
          
        </tbody>
      </table>
      
    </div>
    </div>
     </>
  )
}

export default AdminUser