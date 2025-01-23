import { ShoppingCart as CartIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from "lucide-react"
import { useCart } from '../store/useCart';
import { useAuth } from '../store/useAuth';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartItemCount: number;
  isMobileMenuOpen:boolean;
  setIsMobileMenuOpen:(isMobileMenuOpen:boolean)=>void;
}

export default function Navbar({ cartItemCount,isMobileMenuOpen, setIsMobileMenuOpen }: NavbarProps) {
  const navigate=useNavigate()
  const onCartClick = useCart(state => state.onCartClick)
  const [isOpenNav,setIsOpenNav]=useState(false)
  const {user, signOut}=useAuth();
  
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* <Menu onClick={()=>setIsOpenNav(!isOpenNav)} className="h-6 w-6 text-gray-600 sm:hidden" /> */}
            <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden fixe top-4 left-4 z-50 p-2 mt-2 rounded-md bg-white"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-6 h-6 text-gray-600" />
                    ) : (
                      <Menu className="w-6 h-6 text-gray-600" />
                    )}
                  </button>
            <h1 className="text-2xl font-bold text-gray-800 ml-2">ThreadCraft</h1>
          </div>
          <div className="hidden sm:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">New Arrivals</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">Men</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">Women</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">Sale</Link>
          </div>

          {/* <button 
            onClick={onCartClick}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button> */}
          <div className='flex gap-3 items-center'>
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <User className="h-6 w-6 text-gray-600" />
                </button>
                <div className="absolute right-0 w-48 mt-0 py-2 bg-white rounded-lg shadow-xl hidden group-hover:block transition duration-300">
                  <button
                    onClick={()=>navigate("/account")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Account
                  </button>
                  <button
                    onClick={() => {signOut(); navigate("/")}}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2">
                <User className="h-6 w-6 text-gray-900" />
              </Link>
            )}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <CartIcon size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            {/* Mobile menu */}
          </div>

        </div>
      </div>
      {isOpenNav && (
              <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1 transform transition-transform duration-500 ease-in-out transition-y-full">
                  <Link
                    to="/"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Cart ({3})
                  </Link>
                  {!true && (
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Login
                    </Link>
                  )}
                  {true && (
                    <button
                      // onClick={() => signOut()}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Sign out
                    </button>
                  )}
                </div>
              </div>
            )}
    </nav>
  );
}