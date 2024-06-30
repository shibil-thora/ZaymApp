import React, {useEffect, useState} from 'react' 
import useRazorpay from 'react-razorpay' 
import axios from 'axios'
import { baseURL } from '../../Axios/axios';
import {useDispatch, useSelector} from 'react-redux'
import {changeToPremium} from '../../Redux/AuthSlice'
import { useNavigate } from 'react-router-dom';
import { getMemberShipList } from '../../ApiServices/ApiServices';

function PremiumMenu() {

  const [Razorpay] = useRazorpay(); 
  const state = useSelector(state => state.auth)
  const dipatch = useDispatch(); 
  const navigate = useNavigate();  
  const [memberships, setMemberships] = useState([]); 
  const [selectedMemberShip, setSelectedMemberShip] = useState({}); 

  useEffect(() => {
    if (state.user.is_premium) {
      navigate('/'); 
    }
  }, []) 

  useEffect(() => {
    getMemberShipList().then((res) => {
      setMemberships(res.data);  
      setSelectedMemberShip(res.data[0])
    })
  }, [])

  function razorpayPayment() {
    axios.post(`${baseURL}/razorpay/order/create/`, {
      amount: selectedMemberShip.charge, 
      currency: "INR", 
    }).then((res) => {
      console.log(res)  
      const orderId = res.data.data.id; 
      const options = {
        key: res.data.key,
        name: "ZaymApp",
        description: "Premium payment",
        image: "https://example.com/your_logo",
        order_id: orderId,
        handler: (res) => {
          console.log(res); 
          completePayment(res.razorpay_payment_id, res.razorpay_order_id, res.razorpay_signature); 
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#EA580C"
        },
      };
  
      const rzpay = new Razorpay(options);
      rzpay.open();
    })
  }

  function completePayment (payment_id, order_id, signature) {
    axios.post(`${baseURL}/razorpay/order/complete/`, {
      payment_id, 
      order_id, 
      signature, 
      amount: selectedMemberShip.charge, 
      user: state.user.username,
    }).then((res) => {
      console.log(res); 
      dipatch(changeToPremium(true));  
      navigate('/', {replace: true}); 
    })
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      { memberships ?
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-left text-gray-800">
          Premium Membership
        </h1>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Premium featured recommendation</li>
          <li>Unlimited areas and service images</li>
          <li>Membership costs only {selectedMemberShip.charge} &#8377;</li>
          <li>{selectedMemberShip.number_of_days} days validity</li>
          <li>Unlimited service permits</li>
        </ul>
        <div className="flex space-x-4 mt-2 mb-4 justify-between">

        
          {memberships?.map((membership) => (
            <div 
            onClick={() => setSelectedMemberShip(membership)}
            className={`border flex flex-col p-2 rounded-md
            cursor-pointer active:bg-lime-300 flex-grow ${membership.id == selectedMemberShip.id ? 'bg-yellow-200': 'bg-white'}
            hover:bg-lime-200`}>
            <h1 className="font-medium mx-auto text-red-700"><small>{membership.name}</small></h1> 
            <p className="mx-auto">{membership.charge} &#8377;</p>
            </div>  
          ))}
          
          
         

        </div>
        <button 
        onClick={() => razorpayPayment()}
        className="w-full hover:opacity-90 active:opacity-95 font-medium
        bg-gradient-to-r from-lime-400 to-red-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
         <i className="fas fa-crown"></i>  Buy Premium for {selectedMemberShip.charge} &#8377;
        </button> 
        
      </div> : 'loading...'}
    </div>
    
    </>
  )
}

export default PremiumMenu