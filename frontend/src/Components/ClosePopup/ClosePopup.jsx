import React from 'react'

function ClosePopup(props) {
  return (
    <>
    <div className="inset-0 fixed z-20 flex flex-col justify-end">
        <div className="bg-black bg-opacity-30 h-24 text-center rounded-md flex flex-col shadow-md w-1/2 mx-auto mb-12">
            <div className="w-fullbg-black flex justify-between m-2">
                <button className="rounded bg-white px-2 invisible">X invisible</button>
                <button
                onClick={() => props.onClose()}
                className="rounded bg-black text-white px-2 hover:bg-opacity-60 bg-opacity-50 shadow-md">X</button>
            </div> 
            <h2 className="text-white mb-4 text-md font-medium">{props.text}</h2>
    
        </div>
    </div>
    </>
  )
}

export default ClosePopup