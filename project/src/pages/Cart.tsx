// import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../store/useCart';
import { useAuth } from '../store/useAuth';
import { useState } from 'react';


// interface CartProps {
//   items: CartItem[];
//   onRemoveFromCart: (id: string) => void;
//   onUpdateQuantity: (id: string, quantity: number) => void;
// }

export default function Cart() {
  // const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [qty,setQty]=useState(1)
  let {items,removeItem,updateQuantity} = useCart()
  let {token} = useAuth()
  // console.log(items)

  if (items.length === 0 || null) {
    return (
      <div className="text-center py-8">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Cart is empty</h3>
        <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto no-scrollbar">
      {/* <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2> */}
      <p>Cart Items</p>
      <div className="space-y-4">
        {items.map((item) => {
          if (!item.tshirt) {
            removeItem(item._id)
            return;
          } else {
            return(
              <div key={item._id} className="flex items-center gap-4 py-4 border-b">
            <img
              src={item.tshirt.imageUrl[0]}
              alt={"dfdsfkdlf"}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.tshirt.title}</h3>
              <p className="text-sm text-gray-500">
                Size: {item.size} | Color: {item.color}
              </p>
              <div className="mt-1 flex items-center gap-2">
                {/* <select
                  value={item.quantity}
                  // onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                  className="rounded border p-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select> */}
                {/* <button>-</button> */}
                <button type="button" id="decrement-button" onClick={(e)=>setQty(qty-1)} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  {/* <input value={item.quantity}/> */}
                  <input type="text" id="counter-input" className="w-4 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" readOnly placeholder="" value={qty} required />
                <button type="button" id="increment-button" onClick={()=>setQty(qty+1)} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
              </div>
                <span className="text-gray-600">${item.tshirt.price * item.quantity}</span>
            </div>
            <button
              onClick={() => removeItem(item._id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
            )
          }
})}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          {/* <span>${total.toFixed(2)}</span> */}
          {}
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  );
}