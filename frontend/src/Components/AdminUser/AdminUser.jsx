import React, { useEffect, useState } from 'react'
import { getUsersList } from '../../ApiServices/ApiServices';
import { ToggleBlockUser } from '../../ApiServices/ApiServices';

function AdminUser() {
  const [users, setUsers] = useState([]); 
  const [query, setQuery] = useState('');

  useEffect(() => {
    getUsersList().then((res) => {
      setUsers(res.data.users) 
    })
  }, [])

  function toggleActivation(id) {
    ToggleBlockUser(id).then((res) => {
      const new_users = [...users];
      const change_id = new_users.findIndex(user => user.id === res.data.id) ;
      new_users[change_id].is_active = res.data.status; 
      setUsers([...new_users])
  
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
     <>
    <div className="flex p-4 flex-col h-screen">
        <div className="w-full mb-3 flex items-center space-x-2">
            <h2 className="fas fa-search bg-white p-3 border border-black"></h2>
        <input type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
          { users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase())).map((user) => (
             <tr key={user.id} className="border-b border-gray-200 bg-white">
             <td className="px-6 py-4 border border-black">{user.username}</td>
             <td className="px-6 py-4 border border-black">{user.email}</td>
             <td className="px-6 py-4 border border-black">
             <button 
             onClick={() => toggleActivation(user.id)}
             className={`font-medium zoom-hover
              text-white mt-2 ${user.is_active ? 'bg-red-600': 'bg-green-700'}  px-4 py-1 mx-auto
               focus:outline-white hover:opacity-90`}>{user.is_active ? 'block': 'activate'}</button>
             </td>
             <td className={`px-6 py-4 border ${user.is_active ? 'text-green-700': 'text-red-500'} font-bold border-black`}>
              {user.is_active? 'Active': 'blocked'}</td>
           </tr>
          ))
          }
          
          
        </tbody>
      </table>
      
    </div>
    </div>
     </>
  )
}

export default AdminUser