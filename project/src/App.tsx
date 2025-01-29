import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import axios from 'axios';
import productStore from './store/useProduct';
import Cart from './pages/Cart';
import { Product } from './types';
import ProductDetails from './pages/ProductDetails';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from './store/useCart';
import { useAuth } from './store/useAuth';
import AccountPage from './pages/AccountPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const setProducts=productStore(state=>state.setProducts)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user,token}=useAuth()
  const { isCart, items, onCartClick,initializeCart } = useCart((state) => state)

  const isTokenExpired = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
    return decodedToken.exp * 1000 < Date.now(); // Check if expired
  };
  
  const localStorageToken:string | null = localStorage.getItem('token');
  if (token && isTokenExpired(token)) {
    // Token is expired, clear it and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    window.location.href = '/login'; // Redirect to login page
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(import.meta.env.VITE_API_URL+'/products');
        setProducts(response.data);
        // setLoading(false);  // Stop loading
      } catch (err) {
        console.log('Failed to fetch data');
        toast.error("Failed to fetch..")
        // setLoading(false);  // Stop loading
      }
    };
    fetchProducts();
    initializeCart();
  },[user]);

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <div className="min-h-screen flex flex-col">
        <Navbar cartItemCount={items.length} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="flex-grow">
        <div className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isCart ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  <h2 className="text-lg font-semibold">Your Cart</h2>
                </div>
                <button
                  onClick={onCartClick}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
                <Cart/>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path='/account' element={<AccountPage isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>} />
            {/* <Route
              path="/checkout"
              element={
                <AuthGuard>
                  <Checkout />
                </AuthGuard>
              }
            /> */}
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
     </BrowserRouter>
  );
}

export default App;