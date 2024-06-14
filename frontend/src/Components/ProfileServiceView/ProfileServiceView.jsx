import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { baseURL } from '../../Axios/axios'
import ResultBox from '../AreaResultBox/ResultBox' 
import Modal from '../Modal/Modal'
import { AddServiceArea, AddServiceImage, DeleteServiceArea, DeleteServiceImage } from '../../ApiServices/ApiServices'
import { useSelector } from 'react-redux' 
import Modal2 from '../Modal2/Modal2'


function ProfileServiceView(props) {
    const location = useLocation()
    const state = useSelector(state => state.auth)
    const [showAddForm, setShowAddForm] = useState(false); 
    const [areaQuery, setAreaQuery] = useState('');
    const [showAreaSearch, setShowAreaSearch] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [serviceAreas, setServiceAreas] = useState([]); 
    const [serviceImages, setServiceImages] = useState([]); 
    const [showPremiumModal, setShowPremiumModal] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        setServiceAreas(location.state.service.get_areas);
        setServiceImages(location.state.service.get_images);
    }, [])

    function handleAreaClick(area) {
        setShowAreaSearch(false)
        setAreaQuery(area.area_name) 
        setShowModal(true); 
    }

    function handleAddArea() {
        console.log(location.state.service.id) 
        console.log(areaQuery)
        AddServiceArea(location.state.service.id, areaQuery).then((res) => {
            setShowModal(false); 
            setShowAddForm(false); 
            console.log(res.data)
            setServiceAreas([...serviceAreas, res.data])
        }).catch((err) => {
            if (err.response.data.detail == 'not a premium account') {
                setShowPremiumModal(true); 
            }
        })
    }

    function handleDeleteArea(area_id) {
        DeleteServiceArea(area_id).then((res) => {
            console.log(res.data.area_id.area_data.id) 
            setServiceAreas(serviceAreas.filter(area => area.area_data.id != res.data.area_id.area_data.id))
        })
    }

    function handleDeleteImage(image_id) {
        DeleteServiceImage(image_id).then((res) => {
            console.log(res.data.image_id) 
            setServiceImages(serviceImages.filter((image) => image.id != res.data.image_id))
        })
    }

    function handleAddImage(e) {
        console.log(e.target.files[0])  
        console.log('came here')
        AddServiceImage(location.state.service.id, e.target.files[0]).then((res) => {
            setServiceImages([...serviceImages, {id: res.data.id, service: res.data.service, image: res.data.image.slice(6, res.data.image.length)}])
        }).catch((err) => {
            if (err.response.data.detail == 'not a premium account') {
                setShowPremiumModal(true); 
            }
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
     {showPremiumModal && <Modal 
    text={`You are not a premium provider`}
    handleApprove={() => {navigate('/profile/premium/', {replace: true})}} 
    approveText={<span>Go Premium <i className="fas fa-crown"></i></span>}
    cancelText='Cancel'
    handleCancel={() => {
        setShowPremiumModal(false) 
        setShowModal(false)
        setShowAddForm(false)
    }}
    />}
     <div className="flex flex-col opacity-80  sm:max-w-6xl my-4 rounded-xl mx-auto
        sm:mx-4 overflow-x-scroll scroll-smooth ease-in-out bg-white bg-opacity-20
        hide-scrollbar border border-black border-opacity-10 p-2
        shadow-lg h-screen">
        <div className="py-8 flex sm:flex-row flex-col space-y-4 justify-center space-x-2 flex-grow w-full mx-auto rounded-xl">
            <div className="div w-full sm:w-1/2 sm:mx-8 mx-auto">
                <img src={`${baseURL}${location.state?.service.cover_image}`} alt="" className="rounded-xl"/>
            </div>
            <div className="div flex flex-col sm:w-1/2 space-y-4 sm:mx-8 mx-auto">
                <h1 className="text-5xl text-cyan-700 ring-offset-2 ring-offset-black font-bold text-left">
                {location.state?.service.business_name.toUpperCase()}
                {state.user.is_premium &&
                <span className="font-medium inset-0 bg-gradient-to-r from-lime-400 to-red-600 text-white px-2 py-1 rounded-full
                text-sm mx-4 shadow-md cursor-default"><i className="fas fa-crown"></i> 
                </span>}
                </h1>
                <h1 className="text-left">{location.state?.service.description}</h1>
            </div>
        </div>

        <div className="py-4 sm:px-1 flex-grow w-full mx-auto rounded-xl space-y-2">
        <h1 className="font-semibold">Images</h1>
        <div className="flex flex-col space-y-3 w-full justify-start">
        {serviceImages.map(image => (
        <div className="flex space-x-3"> 
            <div className="text-cyan-700 font-medium w-1/3 rounded-lg shadow-sm">
                <div className="h-1/6">
                    <img src={`${baseURL}/media/${image.image}`} className="rounded-lg" alt="" />
                </div>
            </div>
            <button 
            onClick={() => handleDeleteImage(image.id)}
            className="bg-red-700 px-1 h-1/2 rounded-md hover:bg-red-800 active:bg-red-600">
            <i className="fas fa-close p-1 text-white my-auto"></i>
            </button>
        </div> 
        ))}
        </div>

        

        <div className=" w-32 mx-1 ">
            <input
                onChange={(e) => {handleAddImage(e)}}
                type="file"
                id="fileInput2"
                className="hidden"
                accept="image/*"
            />
            <label htmlFor="fileInput2" className="flex justify-between items-center px-4 py-3 shadow-md bg-orange-600 rounded-lg border border-orange-500 cursor-pointer hover:bg-orange-700">
                <span className="text-sm font-medium text-gray-200 text-center">Update</span>
                <span className="fas fa-camera text-3xl text-gray-200 filename"></span>
            </label>
        </div>


        </div>

        <div className="flex flex-col space-y-3 my-4 mx-1"> 
        <h1 className="font-semibold">Areas</h1>
        {serviceAreas.map(area => (
        <small className="flex space-x-3"> 
        <button className="px-1 cursor-default">
        <i className="fas fa-circle text-black my-auto"></i>
        </button>
        <h1 className="text-cyan-700 font-medium border-b px-1 shadow-sm">
            {area.area_data.area_name}
        </h1>
        <button 
        onClick={() => handleDeleteArea(area)}
        className="bg-red-700  px-1 rounded-md hover:bg-red-800 active:bg-red-600">
        <i className="fas fa-close p-1 text-white my-auto"></i>
        </button>
        </small>
        ))}
        </div>
        
          <button 
          onClick={() => {
            setShowAddForm(!showAddForm)
          }}
          className="mx-1 mt-4 text-white py-1 w-32 active:bg-cyan-900 font-medium zoom-hover rounded shadow-md hover:bg-cyan-800 bg-cyan-700">
           {showAddForm ? 'cancel': 'Add Area'} <span> {!showAddForm && <i className="fas fa-map"></i>}</span>
        </button> 

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