import React, {useEffect, useState} from 'react' 
import useRazorpay from 'react-razorpay' 
import axios from 'axios'
import { baseURL } from '../../Axios/axios';
import {useDispatch, useSelector} from 'react-redux'
import {changeToPremium} from '../../Redux/AuthSlice'
import { useNavigate } from 'react-router-dom';

function PremiumMenu() {

  const [amount, setAmount] = useState(149); 
  const [Razorpay] = useRazorpay(); 
  const state = useSelector(state => state.auth)
  const dipatch = useDispatch(); 
  const navigate = useNavigate();  

  useEffect(() => {
    if (state.user.is_premium) {
      navigate('/'); 
    }
  }, [])

  function razorpayPayment() {
    axios.post(`${baseURL}/razorpay/order/create/`, {
      amount: amount, 
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
      amount, 
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
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-left text-gray-800">
          Premium Membership
        </h1>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Premium featured recommendation</li>
          <li>Unlimited areas and service images</li>
          <li>Membership costs only 149&#8377;</li>
          <li>Priority customer support</li>
          <li>Unlimited service permits</li>
        </ul>
        <button 
        onClick={() => razorpayPayment()}
        className="w-full hover:opacity-90 active:opacity-95 font-medium
        bg-gradient-to-r from-lime-400 to-red-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Buy Premium  <i className="fas fa-crown"></i> 
        </button>
      </div>
    </div>
    
    </>
  )
}

export default PremiumMenu