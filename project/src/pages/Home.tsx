import { useEffect, useState } from 'react';
// import { supabase } from '../lib/supabase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Cart from './Cart';
import { products as Products } from '../data/Product';
import Categories from '../components/Categories';
import axios from 'axios';
import productStore from '../store/useProduct';


export default function Home() {
  const categories:string[]=["Our Products", "Best Sellers","Best Hoddies","Printed T-shirt"]
  const [loading, setLoading] = useState(true);
  const products=productStore(state=>state.products)
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get<Product[]>('http://localhost:3000/api/products');
  //       console.log(response.data)
  //       setProducts(response.data);  // Set the fetched data into state
  //       setLoading(false);  // Stop loading
  //     } catch (err) {
  //       console.log('Failed to fetch data');  // Set error message
  //       setLoading(false);  // Stop loading
  //     }
  //   };
  //   fetchProducts();
  // },[]);
  setTimeout(() => {
    setLoading(false)
  }, 1000);
  // if(products){
  //   setLoading(false)
  // }
  // setLoading(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className=" max-w-7xl bg-grey-100 mx-auto px-4 py-8">
    <div className="flex gap-8">
      <div className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {categories.map((item,index)=>{
          return <Categories key={index} title={item} products={products}/>
        })}
      </div>
    </div>
    </main>
  );
}