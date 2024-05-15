import React, { useEffect, useState } from 'react'
import { AllowPermit, GetServicesAdmin } from '../../ApiServices/ApiServices'
import Modal from '../Modal/Modal';

function AdminProvider() {
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentService, setCurrentService] = useState({});
    const [query, setQuery] = useState('');

  useEffect(() => {
    GetServicesAdmin().then((res) => {
      setServices(res.data.services);
      setUsers(res.data.users);
    })
  }, [])

  function handleApprove() {
    AllowPermit(currentService.id).then((res) => {
      console.log(res)
      setShowModal(false) 
      const new_services = [...services]
      const index = new_services.findIndex(service => service == currentService);
      new_services[index].permit = res.data.permit ;
      setServices(new_services);
    })
  }

  function  handleCancel() {
    setShowModal(false)
  }
  return (
     <>
     {showModal && <Modal 
     text={!currentService.permit ? 'are you sure to give permission?': 'area you sure to disallow permission'} 
     approveText='yes'
     cancelText='cancel'
     handleApprove={handleApprove}
     handleCancel={handleCancel}
     />}
    <div className="flex p-4 flex-col h-screen">
        <div className="w-full mb-3 flex items-center space-x-2">
            <h2 className="fas fa-search bg-white p-3 border border-black"></h2>
        <input type="text" 
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search provider...'
            className=" px-2 py-2 shadow-md w-full sm:w-1/2  border border-black
            focus:border focus:border-orange-600 
             bg-white-200 focus:outline-none focus:ring-0"/>
        </div>
    <div className="overflow-y-scroll hide-scrollbar flex-growp-4">
      <table className="min-w-full text-left w-full shadow-lg">
        <thead>
          <tr className="text-xs text-white font-semibold border bg-cyan-900">
            <th className="px-6 py-4 border border-black ">Provider name</th>
            <th className="px-6 py-4 border border-black ">Services</th>
            <th className="px-6 py-4 border border-black ">mail</th>
            <th className="px-6 py-4 border border-black ">Service status</th>
            <th className="px-6 py-4 border border-black ">Actions</th>
          </tr>
        </thead>
        <tbody>
          { services.filter(service => service.business_name.toLowerCase().includes(query.toLowerCase()))
          .map((service) => (
            <tr className="border-b border-gray-200 bg-white">
            <td className="px-6 py-4 border border-black">{users.find(user => user.id === service.user)?.username}</td>
            <td className="px-6 py-4 border border-black">{service.business_name} ({service.service_type})</td>
            <td className="px-6 py-4 border border-black">{users.find(user => service.user == user.id)?.email}</td> 
            <td className="px-6 py-4 border text-green-700 font-bold border-black">{service.permit ? 'Has Permit': 'no Permit'}</td>
            <td className="px-6 py-4 border border-black">
            <button 
            onClick={() => {
              setShowModal(true)
              setCurrentService(service)
            }}
            className={`hidden md:block font-medium zoom-hover
             text-white ${service.permit ? 'bg-green-700': 'bg-fuchsia-900'}  px-4 py-1
              focus:outline-white hover:bg-opacity-90`}>{service.permit ? 'Approved': 'Requested'}</button>
            </td>
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

export default AdminProvider