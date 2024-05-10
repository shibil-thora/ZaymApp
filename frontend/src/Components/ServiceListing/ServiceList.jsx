import React, { useRef, useState } from 'react' 
import { useEffect } from 'react'
import axios from 'axios'

function ServiceList() { 
    
  return (
    <>   
    <div className="mx-12">
        <section className="flex mx-auto my-8 max-w-6xl">
            <div class="mb-5 flex">
            <h2 className="bg-white px-3 pt-2 mx-2">🗺️</h2>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input
            type="text"
            className="block w-5/6 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Enter text here..." />  

            </div>
            <div class="mb-5 flex">
            <h2 className="bg-white">🗺️</h2>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input
            type="text"
            className="block w-5/6 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="Enter text here..." />  

            </div>
             
        </section>
    </div>

    <div className="flex flex-row opacity-80  h-76 max-w-6xl my-12 rounded-xl sm:mx-auto
    mx-12 overflow-x-scroll scroll-smooth ease-in-out
    hide-scrollbar border border-black p-2
    shadow-xl">
    <div className="py-4 sm:px-8 mx-auto">
    <ul className="list-none my-8 flex  flex-row items-center">
    <li className="sm:w-48 rounded-lg border border-black shadow-sm sm:h-48 w-36 h-36 my-8 mx-8 bg-white"></li>
    <li className="sm:w-48 rounded-lg border border-black shadow-sm sm:h-48 w-36 h-36 my-8 mx-8 bg-white"></li>
    <li className="sm:w-48 rounded-lg border border-black shadow-sm sm:h-48 w-36 h-36 my-8 mx-8 bg-white"></li>
    <li className="sm:w-48 rounded-lg border border-black shadow-sm sm:h-48 w-36 h-36 my-8 mx-8 bg-white"></li>
    <li className="sm:w-48 rounded-lg border border-black shadow-sm sm:h-48 w-36 h-36 my-8 mx-8 bg-white"></li>
    <li className="sm:w-48 rounded-lg border border-black shadow-sm sm:h-48 w-36 h-36 my-8 mx-8 bg-white"></li>
    <li className="sm:w-48 rounded-lg border border-black shadow-sm sm:h-48 w-36 h-36 my-8 mx-8 bg-white"></li>
    <li className="sm:w-48 rounded-lg border border-black shadow-sm sm:h-48 w-36 h-36 my-8 mx-8 bg-white"></li>
    <li className="sm:w-48 rounded-lg border border-black shadow-sm sm:h-48 w-36 h-36 my-8 mx-8 bg-white"></li>
 
     
     
     
    </ul> 
    </div>
 
       
    </div>
    </>
  )
}

export default ServiceList