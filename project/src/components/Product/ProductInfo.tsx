import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../store/useAuth';
import toast from 'react-hot-toast';
import { useCart } from '../../store/useCart';

interface ProductInfoProps {
  id:string;
  title: string;
  price: number;
  description: string;
  sizes: string[];
}

const ProductInfo = ({ title, price, description, sizes, id }: ProductInfoProps) => {
  const {token} = useAuth()
  const [loading,setLoading]=useState(false)
  const [selectedSize, setSelectedSize] = React.useState('S');
  const [selectedColor,setSelectedColor]=useState("")
  const {addItem} = useCart()
  const data={ tshirtId:id,
    size:selectedSize,
    color:selectedColor,
    quantity:1,}
    const handleAddToCart = () => {
      setLoading(true);
      addItem(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  return (
    <div className="space-y-6">
      {
        loading && <div className='fixed inset-0 z-50 bg-black bg-opacity-50'>
          <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-2xl font-semibold text-gray-900">${price}</p>
      </div>

      <p className="text-base text-gray-700">{description}</p>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              value={selectedSize}
              onClick={() => setSelectedSize(size)}
              className={`flex items-center justify-center rounded-md py-2 px-4 text-sm font-medium uppercase
                ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-900" onClick={handleAddToCart}>
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        <button className="flex items-center justify-center p-3 rounded-lg border border-gray-300 hover:bg-gray-50">
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;