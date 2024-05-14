import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../Redux/AuthSlice'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import ResultBox from '../AreaResultBox/ResultBox'
import { useMemo } from 'react'
import { EditUserArea } from '../../ApiServices/ApiServices'

// user menu of profile
function UserMenu(props) {
    const state = useSelector(state => state.auth) 
    const dispatch = useDispatch()
    const navigate = useNavigate('/')
    const [showModal, setShowModal] = useState(false) 
    const [showAreaSearch, setShowAreaSearch] = useState(false)
    const [areaQuery, setAreaQuery] = useState('');

    function handleLogoutClick() {
        setShowModal(true)
    }

    function handleLogout() {
        dispatch(logOut()); 
        navigate('/login', {replace: true})
    }

    function handleAreaClick(area_id) {
        console.log(area_id) 
        EditUserArea().then((res) => {
            console.log(res)
        })
    }

  return (
    <>
    {showModal && <Modal 
    text='Are you leaving? see you soon.'
    handleApprove={handleLogout} 
    approveText='signout'
    cancelText='stay'
    handleCancel={() => {setShowModal(false)}}
    />}
    
    <div className="flex flex-col h-screen overflow-y-scroll hide-scrollbar  w-full">
        <div className="w-3/4 border-b border-gray-200 mx-8 py-4 ">
            <h1 className="text-3xl font-bold text-gray-700">Profile details</h1>
        </div>
        <div className="my-2 mx-8"> 
            <h2 className="text-black font-medium">username: </h2>
            <input type="text" 
            value={state.user.username} 
            readOnly
            required
            className="rounded-md px-2 py-2 shadow-md w-full sm:w-3/4  border border-orange-500
             bg-white-200 focus:outline-none focus:ring-0 bg-orange-100"/>
        </div>
        <div className="my-2  mx-8"> 
            <h2 className="text-black font-medium">email: </h2>
            <input type="text" 
            required
            readOnly
            value={state.user.email ? state.user.email: 'hi'}
            className="rounded-md px-2 py-2 bg-orange-100 shadow-md w-full sm:w-3/4  border border-orange-500
             bg-white-200 focus:outline-none focus:ring-0"/>
        </div>
        <div className="border-b sm:w-3/4 border-gray-200 mx-8 py-4 ">
            <h1 className="text-2xl font-bold text-gray-700">Your area</h1>
            </div>

            <div className="flex flex-col mx-8 my-4">
                <div className="flex">
            {!showAreaSearch &&<input type="text" 
            value={state.user.area ? `${state.user.area.village} - ${state.user.area.dist} - ${state.user.area.state}` : 'None'} 
            readOnly
            required
            className="rounded-md px-2 py-2 shadow-md w-full sm:w-3/4  border border-orange-500
             bg-white-200 focus:outline-none focus:ring-0 bg-orange-100"/>}

              {showAreaSearch && <input type="text" 
            value={areaQuery} 
            onChange={(e) => setAreaQuery(e.target.value)}
            required
            className="rounded-md px-2 py-2 shadow-md w-full sm:w-3/4  border border-orange-500
             bg-white-200 focus:outline-none focus:ring-0 bg-white"/>}

             <button 
                onClick={() => {
                    setShowAreaSearch(!showAreaSearch)
                    setAreaQuery(state.user.area.area_name)
                }}
                className=" font-medium shadow-lg
                text-white mx-4 h-8 p-2 bg-red-500  px-4 py-0 
                rounded-md hover:bg-red-600 focus:outline-orange-500 focus:outline-none">
                    {showAreaSearch ? 'cancel' : 'change'}
                </button> 
                </div>

                {showAreaSearch && 
                <ResultBox areaQuery={areaQuery} 
                handleAreaClick={handleAreaClick}
                showAreaSearch={showAreaSearch}/>
             }
             </div>
         
       
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mx-8 w-3/4">
            {/* state */}
            <div className="my-2 flex-grow"> 
                <h2 className="text-black font-medium">state: </h2>
                <input type="text" 
                required
                readOnly
                className=" cursor-default px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0"/>
            </div> 
            {/* dist */}
            <div className="my-2 flex-grow"> 
                <h2 className="text-black font-medium">district: </h2>
                <input type="text" 
                required
                readOnly
                className=" cursor-default px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0"/>
            </div> 
        </div> 
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mx-8 w-3/4">
            {/* sub dist */}
            <div className="my-4 flex-grow"> 
                <h2 className="text-black font-medium">sub district: </h2>
                <input type="text" 
                required
                readOnly
                className=" cursor-default px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0"/>
            </div> 
            {/* dist */}
            <div className="my-4 flex-grow"> 
                <h2 className="text-black font-medium">village: </h2>
                <input type="text" 
                required
                readOnly
                className=" cursor-default px-2 py-2 shadow-md w-full  border border-cyan-500
                bg-white-200 focus:outline-none focus:ring-0"/>
            </div> 
        </div>  
        <div className="div flex mx-8 mt-4">
            <button 
            onClick={()=> handleLogoutClick()}
            className="text-white bg-red-600 hover:bg-red-500 shadow-md rounded-lg mb-4 px-8 py-2 zoom-hover"><i className="fas fa-sign-out-alt"></i> signout</button>
        </div>
         
    </div>
    </>
  )
}

export default UserMenu