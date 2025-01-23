import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface SimilarProductsProps {
  products: Product[];
}

const SimilarProducts = ({ products }: SimilarProductsProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -280 : 280;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
      
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-64"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover object-center hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SimilarProducts;