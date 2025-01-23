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
  const [selectedSize, setSelectedSize] = React.useState('S');
  const [selectedColor,setSelectedColor]=useState("")
  const {addItem} = useCart()
  const data={ tshirtId:id,
    size:selectedSize,
    color:selectedColor,
    quantity:1,}

  return (
    <div className="space-y-6">
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
        <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-900" onClick={()=>addItem(data)}>
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