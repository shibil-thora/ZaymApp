import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { baseURL } from '../../Axios/axios'
import ResultBox from '../AreaResultBox/ResultBox' 
import Modal from '../Modal/Modal'
import { AddServiceArea, DeleteServiceArea } from '../../ApiServices/ApiServices'


function ProfileServiceView(props) {
    const location = useLocation()
    const [showAddForm, setShowAddForm] = useState(false); 
    const [areaQuery, setAreaQuery] = useState('');
    const [showAreaSearch, setShowAreaSearch] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [serviceAreas, setServiceAreas] = useState([]); 

    useEffect(() => {
        setServiceAreas(location.state.service.get_areas)
    }, [])

    function handleAreaClick(area) {
        setShowAreaSearch(false)
        setAreaQuery(area.area_name) 
        setShowModal(true); 
    }

    function handleAddArea() {
        console.log(location)
        AddServiceArea(location.state.service.id, areaQuery).then((res) => {
            setShowModal(false); 
            setShowAddForm(false);
            setServiceAreas([...serviceAreas, res.data.id])
        })
    }

    function handleDeleteArea(area_id) {
        DeleteServiceArea(area_id).then((res) => {
            console.log(res) 
            setServiceAreas(serviceAreas.filter(area => area != res.data.area_id))
        })
    }

  return (
    <> 
     {showModal && <Modal 
    text={`Add area "${areaQuery}"`}
    handleApprove={handleAddArea} 
    approveText='Yes'
    cancelText='No'
    handleCancel={() => {setShowModal(false)}}
    />}
     <div className="flex flex-col opacity-80  sm:max-w-6xl my-12 rounded-xl mx-auto
        sm:mx-12 overflow-x-scroll scroll-smooth ease-in-out bg-white bg-opacity-20
        hide-scrollbar border border-black border-opacity-10 p-2
        shadow-lg">
        <div className="py-8 flex sm:flex-row flex-col space-y-4 justify-center space-x-2 flex-grow w-full mx-auto rounded-xl">
            <div className="div w-full sm:w-1/2 sm:mx-8 mx-auto">
                <img src={`${baseURL}${location.state?.service.cover_image}`} alt="" className="rounded-xl"/>
            </div>
            <div className="div flex flex-col sm:w-1/2 space-y-4 sm:mx-8 mx-auto">
                <h1 className="text-5xl text-cyan-700 ring-offset-2 ring-offset-black font-bold text-left">
                {location.state?.service.business_name.toUpperCase()}
                </h1>
                <h1 className="text-left">{location.state?.service.description}</h1>
            </div>
        </div>

        <div className="py-4 sm:px-8 flex-grow w-full mx-auto rounded-xl border border-black h-32">
    
        </div>

        <div className="flex flex-col space-y-3 my-4 mx-1"> 
        <h1 className="font-semibold">Areas</h1>
        {serviceAreas.map(area => (
        <small className="flex space-x-3"> 
        <button className="px-1 cursor-default">
        <i className="fas fa-circle text-black my-auto"></i>
        </button>
        <h1 className="text-cyan-700 font-medium bg-sky-100  px-1 shadow-sm">
            {location.state.areas?.find(a => a.id == area)?.area_name + ' '}
        </h1>
        <button 
        onClick={() => handleDeleteArea(area)}
        className="bg-sky-100 px-1 hover:bg-sky-200 active:bg-sky-300">
        <i className="fas fa-trash text-red-600 my-auto"></i>
        </button>
        </small>
        ))}
        </div>
        {serviceAreas.length < 3 && 
          <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="mx-1 mt-4 text-white py-1 w-32 active:bg-cyan-900 font-medium zoom-hover rounded shadow-md hover:bg-cyan-800 bg-cyan-700">
           {showAddForm ? 'cancel': 'Add Area'} <span> {!showAddForm && <i className="fas fa-map"></i>}</span>
        </button> } 

        {showAddForm && 
        <>
        <input type="text" 
        required
        value={areaQuery} 
        placeholder='search area...'
        onFocus={() => setShowAreaSearch(true)}
        onChange={(e) => setAreaQuery(e.target.value)}
        className="px-2 py-2 my-4 mx-1 shadow-md sm:w-3/4  border border-cyan-500
        bg-white-200 focus:outline-none focus:ring-0 rounded-md"/> 
        <div className="flex-grow mx-1">
        {showAreaSearch && 
        <ResultBox areaQuery={areaQuery} 
        handleAreaClick={handleAreaClick}
        showAreaSearch={showAreaSearch}/>
        }
        </div>
        </>
        }
        </div>
    </>
  )
}

export default ProfileServiceView