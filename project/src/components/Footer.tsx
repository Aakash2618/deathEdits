import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

export default function Footer(){
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Truck className="w-8 h-8 text-white" />
              <div>
                <h4 className="font-semibold text-white">Free Shipping</h4>
                <p className="text-sm">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <RefreshCw className="w-8 h-8 text-white" />
              <div>
                <h4 className="font-semibold text-white">Easy Returns</h4>
                <p className="text-sm">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <ShieldCheck className="w-8 h-8 text-white" />
              <div>
                <h4 className="font-semibold text-white">Secure Shopping</h4>
                <p className="text-sm">Best security features</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <CreditCard className="w-8 h-8 text-white" />
              <div>
                <h4 className="font-semibold text-white">Flexible Payment</h4>
                <p className="text-sm">Multiple payment options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed mb-4">
              Crafting premium quality t-shirts since 2010. We believe in sustainable fashion and exceptional customer service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">123 Fashion Street, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span className="text-sm">contact@tshirtstore.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Men's Collection</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Women's Collection</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-center md:text-right">
              © 2024 T-Shirt Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
