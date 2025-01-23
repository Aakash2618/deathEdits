import React, { useState } from 'react';

interface Image{
  image:string;
}

interface ProductImagesProps {
  images: Image[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const [mainImage, setMainImage] = useState<Image>(images[0]);

  return (
    <div className="space-y-4 md:space-y-0">
      <div className="aspect-square w-full overflow-hidden rounded-lg">
        <img
          src={`${mainImage}`}
          alt="kdjf"
          className="h-full w-full  md:h-[90%] md:w-[90%] object-cover object-center mx-auto md:mx-0"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`aspect-square overflow-hidden rounded-lg ${
              mainImage === image ? 'ring-2 ring-black' : ''
            }`}
          >
            <img
              src={`${image}`}
              alt="jsdfj"
              className="h-full w-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;