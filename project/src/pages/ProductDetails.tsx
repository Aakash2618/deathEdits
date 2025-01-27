import React, { useEffect, useState } from 'react';
import ProductImages from '../components/Product/ProductImages';
import ProductInfo from '../components/Product/ProductInfo';
import SimilarProducts from '../components/Product/SimilarProducts';
import { similarProducts } from '../data/mockData';
import { Product } from '../types';
import { useParams } from 'react-router-dom';
import productStore from '../store/useProduct';

const ProductDetails = () => {
  const { id } = useParams();
  const products = productStore((state) => state.products);
  let productData: Product | undefined = products.find((product) => product._id === id);
  return (
    <div className="min-h-screen bg-white md:mx-10">
      <div className="container mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ProductImages images={productData?productData.imageUrl:[]} alt={productData?productData.title:""} />
          <ProductInfo
            id={productData?productData._id:""}
            title={productData?productData.title:""}
            price={productData?productData.price:NaN}
            description={productData?productData.description:""}
            sizes={productData?productData.sizes:["S","M","L","XL"]}
          />
        </div>

        {/* Similar Products Section */}
        <SimilarProducts products={similarProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
