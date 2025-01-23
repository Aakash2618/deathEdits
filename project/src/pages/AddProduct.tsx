import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Upload, Image as ImageIcon, Loader2, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import productStore from '../store/useProduct';

interface Product {
  title: string;
  description: string;
  price: number;
  sizes: string[];
  category: string;
}
interface prop{
   setAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct = ({ setAddProduct }:prop) => {
  const { token } = useAuth()
  const {addProduct} = productStore()
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [product, setProduct] = useState<Product>({
    title: '',
    description: '',
    price: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    category: '',
  });
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
      setError('');
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setError('Please select at least one photo');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('photos', file);
    });
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("category", product.category);
    formData.append("sizes", JSON.stringify(product.sizes));
    const res=await addProduct(formData)
    setTimeout(() => {
      setUploading(false);
      setAddProduct(false)
    }, 3000);
  };

  if (uploading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
      <div className="max-w-2xl mx-3 sm:mx-auto  p-6 bg-white border border-gray-200 rounded-lg shadow-md my-10">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold mb-6 text-cente text-gray-800">Create Product</h1>
          <button onClick={() => setAddProduct(false)} className="p-2 hover:bg-gray-100 rounded-full mb-2">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold text-gray-600 mb-2">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold text-gray-600 mb-2">Description:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-semibold text-gray-600 mb-2">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block font-semibold text-gray-600 mb-2">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-600 mb-2">Select Images:</label>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-5">
                <div className="mb-6">
                  <label
                    htmlFor="photos"
                    className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <Upload className="w-8 h-2  md:h-1 mx-auto mb-2 text-gray-400" />
                    <span className="text-gray-600">
                      Click to select photos or drag and drop them here
                    </span>
                    <input
                      type="file"
                      name='xyz'
                      id="photos"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  {files && (
                    <div className="mt-2 text-sm text-gray-600">
                      {files.length} file(s) selected
                    </div>
                  )}  
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                {/* <button
                  onClick={handleUpload}
                  disabled={uploading || !files}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Photos
                    </>
                  )}
                </button> */}

                {/* {uploadedUrls.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Uploaded Photos:</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedUrls.map((url, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={url}
                            alt={`Uploaded photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* <div className="mb-4">
          <label className="block font-semibold text-gray-600 mb-2">Colors:</label>
          {product.colors.map((color, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name="colors"
                value={color}
                onChange={(e) => handleChange(e, index)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('colors')} className="w-full bg-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-400 transition duration-200">Add Color</button>
        </div> */}
          {/* <div className="mb-4">
          <label htmlFor="sizes" className="block font-semibold text-gray-600 mb-2">Sizes:</label>
          <select
            id="sizes"
            name="sizes"
            multiple
            value={product.sizes}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          >
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
           <div className="mt-2 grid grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleChange(size)}
              className={`flex items-center justify-center rounded-md py-2 px-4 text-sm font-medium uppercase
                ${
                  product.sizes[1] === size
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
        </div> */}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-200">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;