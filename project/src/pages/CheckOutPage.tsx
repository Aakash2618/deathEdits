import { useState } from 'react';
import {useAuth} from '../store/useAuth'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../store/useCart';

export default function CheckOutPage() {
    const userData = useAuth().user
    const user = userData?JSON.parse(userData):null;
    const [loading, setLoading] = useState(false);
    const [errorr,setError]=useState(null)
    const location=useLocation()
    const amount=location.state.amount
    const navigate=useNavigate()
    const {initializeCart}=useCart()

    const handlePayment = async (event:any) => {
    event.preventDefault();

    setLoading(true);

    try {
      // Fetch order details from the backend
      const response = await axios.post(import.meta.env.VITE_API_URL+'/orders',JSON.stringify({amount}), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
      });


      if (!response || !response.data.id) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: "rzp_test_RWozigkMJ3eZDe",
        amount: amount * 100, // Razorpay expects the amount in paise
        currency: 'INR',
        order_id: response.data.id,
        name: 'T-Shirt Purchase',
        description: 'Payment for T-Shirt',
        handler: async function (response:any) {
        //   alert('Payment Successful!');
            const verifyRes = await axios.post(import.meta.env.VITE_API_URL+'/orders/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
            },{headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },});
          toast.success('Payment Success!')
          initializeCart()
          navigate('/')
          // Handle the successful payment here, e.g., send payment details to the server
        },
        prefill: {
          name: 'payment',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error:any) {
      setError(error.message);
      toast.error(errorr)
      setLoading(false);
    }
    setLoading(false)
  };
  return (
    <div className="bg-white sm:px-8 px-4 py-6 mx-12 my-6">
          <div className="max-w-screen-xl max-md:max-w-xl mx-auto">
              <div className="flex items-start mb-16">
                  <div className="w-full">
                      <div className="flex items-center w-full">
                          <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
                              <span className="text-sm text-white font-semibold">1</span>
                          </div>
                          <div className="w-full h-[3px] mx-4 rounded-lg bg-blue-600"></div>
                      </div>
                      <div className="mt-2 mr-4">
                          <h6 className="text-sm font-semibold text-slate-900">Cart</h6>
                      </div>
                  </div>
                  <div className="w-full">
                      <div className="flex items-center w-full">
                          <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
                              <span className="text-sm text-white font-semibold">2</span>
                          </div>
                          <div className="w-full h-[3px] mx-4 rounded-lg bg-slate-300"></div>
                      </div>
                      <div className="mt-2 mr-4">
                          <h6 className="text-sm font-semibold text-slate-900">Checkout</h6>
                      </div>
                  </div>
                  <div>
                      <div className="flex items-center">
                          <div className="w-8 h-8 shrink-0 mx-[-1px] bg-slate-300 p-1.5 flex items-center justify-center rounded-full">
                              <span className="text-sm text-white font-semibold">3</span>
                          </div>
                      </div>
                      <div className="mt-2">
                          <h6 className="text-sm font-semibold text-slate-400">Order</h6>
                      </div>
                  </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
                  <div className="lg:col-span-2">
                      <form>
                          <div>
                              <h2 className="text-xl text-slate-900 font-semibold mb-6">Delivery Details</h2>
                              <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                                  <div>
                                      <label className="text-sm text-slate-900 font-medium block mb-2">First Name</label>
                                      <input type="text" placeholder="Enter First Name" value={user.first_name} readOnly
                                          className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                  </div>
                                  <div>
                                      <label className="text-sm text-slate-900 font-medium block mb-2">Last Name</label>
                                      <input type="text" placeholder="Enter Last Name" value={user.last_name} readOnly
                                          className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                  </div>
                                  <div>
                                      <label className="text-sm text-slate-900 font-medium block mb-2">Email</label>
                                      <input type="email" placeholder="Enter Email" value={user.email} readOnly
                                          className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                  </div>
                                  <div>
                                      <label className="text-sm text-slate-900 font-medium block mb-2">Phone No.</label>
                                      <input type="number" placeholder="Enter Phone No." value={user.phone} readOnly
                                          className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                  </div>
                                  <div>
                                      <label className="text-sm text-slate-900 font-medium block mb-2">Address Line</label>
                                      <input type="text" placeholder="Enter Address Line" value={user.address}
                                          className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                  </div>
                                  <div>
                                      <label className="text-sm text-slate-900 font-medium block mb-2">City</label>
                                      <input type="text" placeholder="Enter City"
                                          className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                  </div>
                                  <div>
                                      <label className="text-sm text-slate-900 font-medium block mb-2">State</label>
                                      <input type="text" placeholder="Enter State"
                                          className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                  </div>
                                  <div>
                                      <label className="text-sm text-slate-900 font-medium block mb-2">Zip Code</label>
                                      <input type="text" placeholder="Enter Zip Code"
                                          className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>

                  <div className="relative">
                      <h2 className="text-xl text-slate-900 font-semibold mb-6">Order Summary</h2>
                      <ul className="text-slate-500 font-medium space-y-4">
                          <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-semibold text-slate-900">${amount}.00</span></li>
                          <li className="flex flex-wrap gap-4 text-sm">Discount <span className="ml-auto font-semibold text-slate-900">$0.00</span></li>
                          <li className="flex flex-wrap gap-4 text-sm">Shipping <span className="ml-auto font-semibold text-slate-900">$6.00</span></li>
                          <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-semibold text-slate-900">$5.00</span></li>
                          <hr className="border-slate-300" />
                          <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">Total <span className="ml-auto">${amount+11}.00</span></li>
                      </ul>
                      <div className="space-y-4 mt-8">
                          <button type="button" className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" disabled={loading} onClick={handlePayment}>{loading ? 'Processing…' : 'Pay Now'}</button>
                          <button type="button" className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-gray-100 hover:bg-gray-200 border border-gray-300 text-slate-900 cursor-pointer" onClick={()=>{navigate("/")}}>Continue Shopping</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}
