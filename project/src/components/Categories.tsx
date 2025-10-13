import React, { useState } from 'react'
import ProductCard from './ProductCard';
import { Product } from '../types';


interface myComponentProp{
    title:string;
    products:Product[];
}

export default function Categories({title,products}:myComponentProp) {
    console.log(products)
    // const [cartItems, setCartItems] = useState<Product[]>(products);
    return (
        <>
            <div className="bg-white rounded-lg shado sm:overflow-hidden mt-8 pb-5 border-b">
                <h2 className="text-2xl font-semibold mb-6">{title}</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
            {/* <div className="bg-white rounded-lg shado sm:overflow-hidden mt-8">
                <h2 className="text-2xl font-semibold mb-6">Our Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {cartItems.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div> */}
        </>
    )
}
