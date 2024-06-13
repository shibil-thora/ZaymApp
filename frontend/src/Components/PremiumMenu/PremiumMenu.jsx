import React, {useState} from 'react' 
import useRazorpay from 'react-razorpay' 
import axios from 'axios'
import { baseURL } from '../../Axios/axios';
import {useDispatch, useSelector} from 'react-redux'
import {changeToPremium} from '../../Redux/AuthSlice'

function PremiumMenu() {

  const [amount, setAmount] = useState(100); 
  const [Razorpay] = useRazorpay(); 
  const state = useSelector(state => state.auth)
  const dipatch = useDispatch(); 

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
      console.log(res)
      dipatch(changeToPremium(true))
    })
  }

  return (
    <>
    <button 
    onClick={() => razorpayPayment()}
    className="bg-green-500 p-4 rounded-lg shadow-md m-3 hover:bg-opacity-80 active:bg-green-600">
    pay</button>
    </>
  )
}

export default PremiumMenu