import React from 'react'

function Navbar() {
  return (
    <>
    <div className="bg-gradient-to-br from-cyan-500 to-teal-300 shadow-md top-0 sticky z-10">
        <div className="max-w-5xl flex justify-between sm:mx-auto mx-8 py-2">
            <h2 className="text-4xl font-mono sm:mx-4 font-semibold text-white">ZaymApp</h2> 
            <div className='w-12 h-12 hidden sm:block rounded-full sm:mx-4 bg-white'></div>
            <button className='sm:hidden text-4xl font-bold sm:mx-4 text-white'>&#9776;</button>
        </div>
    </div>
    </>
  )
}

export default Navbar