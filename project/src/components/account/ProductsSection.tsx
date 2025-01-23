import React, { useState } from 'react';
import { Product } from '../../types';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import AddProduct from '../../pages/AddProduct';

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

interface EditModalProps {
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

function EditModal({ product, onClose, onSave }: EditModalProps) {
  const [editedProduct, setEditedProduct] = useState(product);
  const [sizes, setSizes] = useState(product.sizes.join(', '));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...editedProduct,
      sizes: sizes.split(',').map(size => size.trim()).filter(Boolean)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Edit Product</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={editedProduct.title}
              onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={editedProduct.imageUrl}
              onChange={(e) => setEditedProduct({ ...editedProduct, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="S, M, L, XL"
              required
            />
          </div>
          
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              value={editedProduct.stock}
              onChange={(e) => setEditedProduct({ ...editedProduct, stock: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div> */}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ProductsSection({ products, onEdit, onDelete}: Props) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [addProduct,setAddproduct]=useState<boolean>(false)

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    onEdit(updatedProduct);
    setEditingProduct(null);
  };
  // console.log(products)
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={()=>setAddproduct(!addProduct)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {!products || !Array.isArray(products)?<div>There is no products..</div>:products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={product.imageUrl[0]}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">Stock: {product.stock}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-2 py-1 text-sm bg-gray-100 rounded"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {editingProduct && (
        <EditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveEdit}
        />
      )}
      {
        addProduct && <AddProduct setAddProduct={setAddproduct} />
      }
    </div>
  );
}