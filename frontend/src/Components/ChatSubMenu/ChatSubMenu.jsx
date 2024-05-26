import React from 'react'

function ChatSubMenu() {
  return (
    <>
    <div className="flex flex-col h-full justify-between bg-cyan-50">
        <div className="flex flex-col bg-sky-400">
            <div className="rounded-md p-2  mx-3 flex">
                <div className="">
                    <img 
                    className="w-12 h-12 rounded-full"
                    src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'/>
                </div>
                <div className="names mx-4">
                <h1 className="font-semibold text-lg text-gray-100">Kanakarajan ksrd</h1>
                <h1 className=" text-lime-100 text-sm">online</h1>
                </div>
            </div>
        </div>

        <div className="messages flex-grow m-5 ">
            <div className="left p-1 mb-3 w-2/3 rounded-r-md bg-blue-200 flex">
            <div className="">
                    <img 
                    className="w-8 h-8 rounded-full"
                    src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'/>
                </div>
                <h1 className="mx-4 my-auto text-gray-600">hi</h1>
            </div>
            <div className="right p-1 mb-3 w-2/3 ms-auto rounded-l-md bg-yellow-100 flex">
            <div className="">
                    <img 
                    className="w-8 h-8 rounded-full"
                    src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'/>
                </div>
                <h1 className="mx-4 my-auto text-gray-600">hi</h1>
            </div>
        </div>

        <div className="flex flex-col bottom-0 sticky">
        <div className="mx-auto w-full p-3 flex">
                <div tabIndex={0} className=" flex w-full 
                focus:border-sky-400 rounded 
                focus:outline-none focus:border-1">
                <h1 className="bg-white px-4 py-2  flex-grow"><i className="fas fa-search opacity-60"></i></h1>
                <input
                type="text"
                className="block  py-2 w-full focus:outline-none flex-grow rounded-r-md"
                placeholder="Search" /> 
                </div> 
            
            </div>
        </div>
    </div>
    </>
  )
}

export default ChatSubMenu