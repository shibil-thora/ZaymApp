import React, {useState} from 'react' 
import useRazorpay from 'react-razorpay' 
import axios from 'axios'

function PremiumMenu() {

  const [amount, setAmount] = useState(1); 
  const [Razorpay] = useRazorpay(); 

  function razorpayPayment() {
    axios.post('http://127.0.0.1:8000/razorpay/order/create/', {
      amount: amount, 
      currency: "INR", 
    }).then((res) => {
      console.log(res)  
      const orderId = res.data.data.id; 
      const options = {
        key: "your razor pay secret key",
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
          color: "#3399cc",
        },
      };
  
      const rzpay = new Razorpay(options);
      rzpay.open();
    })
  }

  function completePayment (payment_id, order_id, signature) {
    axios.post('http://127.0.0.1:8000/razorpay/order/complete/', {
      payment_id, 
      order_id, 
      signature,
    }).then((res) => {
      console.log(res)
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