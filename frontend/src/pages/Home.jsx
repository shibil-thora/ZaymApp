import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ServiceList from '../Components/ServiceListing/ServiceList'
import { useState, useEffect } from 'react'
import { userStatus } from '../ApiServices/ApiServices'
import { useDispatch } from 'react-redux'
import { changeAuthMode } from '../Redux/AuthSlice'
import { useNavigate } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  return (
    <>
    <Navbar />
    <ServiceList />
    </>
  )
}

export default Home