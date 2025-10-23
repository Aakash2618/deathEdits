// src/components/CheckoutForm.js
import React, { useState } from 'react';

const Payment = ({ amount=1000 }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (event:any) => {
    event.preventDefault();

    setLoading(true);

    try {
      // Fetch order details from the backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!data || !data.id) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: 'your-razorpay-key-id', // Replace with your Razorpay Key ID
        amount: amount * 100, // Razorpay expects the amount in paise
        currency: 'INR',
        order_id: data.id,
        name: 'T-Shirt Purchase',
        description: 'Payment for T-Shirt',
        handler: function (response) {
          alert('Payment Successful!');
          // Handle the successful payment here, e.g., send payment details to the server
        },
        prefill: {
          name: 'T-Shirt Customer',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Checkout</h2>
        <p className="text-center text-gray-500 mt-2">Complete your purchase and get your awesome t-shirt delivered!</p>
        
        <form onSubmit={handlePayment} className="mt-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="amount" className="font-medium text-gray-600">Total Amount</label>
              <p className="text-xl font-bold text-indigo-600">₹{amount}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <label htmlFor="card" className="font-medium text-gray-600">Card Information</label>
              <div id="card-element" className="bg-gray-200 w-full p-3 rounded-md"></div>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          
          <button
            type="submit"
            className={`mt-6 w-full bg-indigo-600 text-white py-3 rounded-md text-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
