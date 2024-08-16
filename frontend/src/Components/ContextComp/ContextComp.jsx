import React, { useEffect } from 'react' 
import { createContext } from 'react' 
import { domainPort } from '../../Axios/axios';

  
export let liveSocket2 =  new WebSocket(`wss://${domainPort}/ws/live/room/?f='nothing'&t=${localStorage.getItem('access')}`); 
 
function ContextComp() {
    console.log('rendering live...') 
    useEffect(() => {
    
         
    }, [])

  return (
     <></>
  )
}

export default ContextComp