import React from 'react'

function Modal(props) {
  return (
    <div className="fixed inset-0 flex justify-center bg-black  bg-opacity-60 z-20">
        
        <div className="bg-white flex shadow-lg flex-col space-y-3 justify-center sm:w-1/2 w-full h-1/3 rounded-xl my-auto">
            <div className="m-2 rounded-xl flex flex-col border border-black flex-grow justify-center">
                <h2 className="text-gray-700 text-2xl font-bold mx-auto">{props.text}</h2> 
                <div className="mx-auto">
                    <button 
                    onClick={() => props.handleCancel()}
                    className=" font-medium shadow-lg
                    text-white mx-4 h-8 mt-4  bg-lime-500  px-4 py-0 
                    rounded-md hover:bg-lime-600 focus:outline-orange-500 focus:outline-none">{props.cancelText}</button>
                    <button 
                    onClick={() => props.handleApprove()}
                    className=" font-medium shadow-lg
                    text-white mx-4 h-8 mt-4 bg-red-500  px-4 py-0 
                    rounded-md hover:bg-red-600 focus:outline-orange-500 focus:outline-none">{props.approveText}</button>
                </div>
            </div>
            
            
        </div>
    </div>
  )
}

export default Modal