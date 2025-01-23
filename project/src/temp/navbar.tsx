import React, { useState } from 'react';
// import { a } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
// import { useCart } from '../shrefre/useCart';
// import { useAuth } from '../shrefre/useAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // const cart = useCart((state) => state.items);
  // const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auhref px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">StyleVibe</h1>
            </a>
          </div>

          {/* Deskhrefp Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 hrefp-2.5 h-5 w-5 text-gray-400" />
            </div>

            <a href="/" className="text-gray-900 hover:text-gray-700">Home</a>
            <a href="/about" className="text-gray-900 hover:text-gray-700">About</a>
            <a href="/contact" className="text-gray-900 hover:text-gray-700">Contact</a>

            {/* <a href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-900" />
              {cart.length > 0 && (
                <span className="absolute -hrefp-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </a> */}

            {/* {user ? (
              <div className="relative group">
                <buthrefn className="flex items-center space-x-2">
                  <User className="h-6 w-6 text-gray-900" />
                </buthrefn>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl hidden group-hover:block">
                  <buthrefn
                    onClick={() => signOut()}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Sign out
                  </buthrefn>
                </div>
              </div>
            ) : (
              <a href="/login" className="flex items-center space-x-2">
                <User className="h-6 w-6 text-gray-900" />
              </a>
            )} */}
          </div>

          {/* Mobile menu buthrefn */}
          {/* <div className="sm:hidden flex items-center">
            <buthrefn
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </buthrefn>
          </div> */}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </a>
            <a
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              About
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Contact
            </a>
            {/* <a
              href="/cart"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Cart ({cart.length})
            </a>
            {!user && (
              <a
                href="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Login
              </a>
            )}
            {user && (
              <buthrefn
                onClick={() => signOut()}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Sign out
              </buthrefn>
            )} */}
          </div>
        </div>
      )}
    </nav>
  );
}




[
  { "url": "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww", "alt":"Awesome for cold days"},
  { "url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", "alt": "White t-shirt front view"},
  { "url": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800", "alt": "White t-shirt back view"},
  { "url": "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800", "alt": "White t-shirt detail view"},
],




/** 
* Paste one or more documents here
*/
{
  "title": "Vintage Graphic Tee",
  "description": "A classic vintage graphic tee with a cool retro design. Perfect for casual outings and laid-back weekends.",
  "price": 19.99,
  "sizes": ["S", "M", "L", "XL"],
 " colors": ["Red", "Black", "White"],
 " category": "Casual",
  "imageUrl": [
    { "url": "https://example.com/images/vintage-graphic-tee-front.jpg", "alt": "Front view of the Vintage Graphic Tee" },
    {" url": "https://example.com/images/vintage-graphic-tee-back.jpg", "alt": "Back view of the Vintage Graphic Tee" }
  ],
  "stock": 100,
  "isAvailable": true,
 " createdAt": new Date(),
  "updatedAt": new Date(),
  "_id": {
    "$oid": "676c55c96d0bb5c30b414d7a"
  }
}




"title":"Vintage Graphic Tee",
  "description":"A classic vintage graphic tee with a cool retro design. Perfect for casual outings and laid-back weekends.","price":19.99,
  "sizes":["S","M","L","XL"],
  "colors":["Red","Black","White"],
  "category":"Casual",
  "imageUrl":["https://example.com/images/vintage-graphic-tee.jpg"],"stock":100,
  "isAvailable":true}




  "title": "Vintage Graphic Tee",
  "description": "A classic vintage graphic tee with a cool retro design. Perfect for casual outings and laid-back weekends.",
  "price": 19.99,
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Red", "Black", "White"],
  "category": "Casual",
  "imageUrl": "https://example.com/images/vintage-graphic-tee.jpg",
  "stock": 100,
  "isAvailable": true,




  'use client'

import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function AddProduct() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrls, setImageUrls] = useState([''])
  const [sizes, setSizes] = useState([''])
  const [category, setCategory] = useState('')
  const [colors, setColors] = useState([''])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your API
    console.log({
      title,
      description,
      price: parseFloat(price),
      imageUrl: imageUrls,
      sizes,
      category,
      colors
    })
    // Redirect to products page or show success message
    router.push('/products')
  }

  const handleArrayInput = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => {
      const newArray = [...prev]
      newArray[index] = value
      return newArray
    })
  }

  const addArrayInput = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ''])
  }

  const removeArrayInput = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>Enter the details for the new product.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Image URLs</Label>
              {imageUrls.map((url, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={url}
                    onChange={(e) => handleArrayInput(index, e.target.value, setImageUrls)}
                    placeholder="Enter image URL"
                  />
                  <Button type="button" variant="outline" onClick={() => removeArrayInput(index, setImageUrls)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => addArrayInput(setImageUrls)}>
                Add Image URL
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Sizes</Label>
              {sizes.map((size, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={size}
                    onChange={(e) => handleArrayInput(index, e.target.value, setSizes)}
                    placeholder="Enter size"
                  />
                  <Button type="button" variant="outline" onClick={() => removeArrayInput(index, setSizes)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => addArrayInput(setSizes)}>
                Add Size
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Colors</Label>
              {colors.map((color, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={color}
                    onChange={(e) => handleArrayInput(index, e.target.value, setColors)}
                    placeholder="Enter color"
                  />
                  <Button type="button" variant="outline" onClick={() => removeArrayInput(index, setColors)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => addArrayInput(setColors)}>
                Add Color
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Product</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

