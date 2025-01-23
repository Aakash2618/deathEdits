import React, { useEffect, useState } from 'react';
import ProductImages from '../components/Product/ProductImages';
import ProductInfo from '../components/Product/ProductInfo';
import SimilarProducts from '../components/Product/SimilarProducts';
import { similarProducts } from '../data/mockData';
// import { products } from '../data/Product';
import { Product } from '../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import productStore from '../store/useProduct';
import { useCart } from '../store/useCart';
import Cart from './Cart';
import { ShoppingCart, X } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const products = productStore((state) => state.products);
  let productData: Product = products.find((product) => product._id === id);
  return (
    <div className="min-h-screen bg-white md:mx-10">
      <div className="container mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ProductImages images={productData.imageUrl} />
          <ProductInfo
            id={productData._id}
            title={productData.title}
            price={productData.price}
            description={productData.description}
            sizes={productData.sizes}
          />
        </div>

        {/* Similar Products Section */}
        <SimilarProducts products={similarProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
