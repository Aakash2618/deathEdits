import React, { useState } from 'react';
import { AccountLayout } from '../components/account/AccountLayout';
import { ProfileSection } from '../components/account/ProfileSection';
import { OrdersSection } from '../components/account/OrdersSection';
import { ProductsSection } from '../components/account/ProductsSection';
import { Order, Product } from '../types1';
import { User} from "../types/index"
import {useAuth} from '../../src/store/useAuth'
import productStore from "../store/useProduct"

// Mock data - In a real app, this would come from an API

const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    status: 'delivered',
    items: [
      {
        id: '1',
        productId: '1',
        name: 'Classic White T-Shirt',
        quantity: 2,
        price: 29.99,
        size: 'L'
      }
    ],
    total: 59.98,
    createdAt: '2024-02-20T10:00:00Z'
  }
];
interface prop{
  isMobileMenuOpen:boolean;
  setIsMobileMenuOpen:(isMobileMenuOpen:boolean)=>void;
}

function AccountPage({ isMobileMenuOpen, setIsMobileMenuOpen }: prop) {
  const [activeTab, setActiveTab] = useState('profile');
  // const [user, setUser] = useState(mockUser); 
  const userData = useAuth().user
  const user = userData?JSON.parse(userData):null;
  const {products,deleteProduct} = productStore();
  // console.log(products)

  const handleUpdateProfile = (updatedUser: User) => {
    // setUser(updatedUser);
    // In a real app, this would make an API call
    alert('Profile updated successfully!');
  };

  const handleEditProduct = (product: Product) => {
    // In a real app, this would open a modal or navigate to edit page
    console.log('Edit product:', product);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id)
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      <AccountLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={user.role}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 px-4 py-8 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'profile' && (
            <ProfileSection />
          )}
          {activeTab === 'orders' && (
            <OrdersSection orders={mockOrders} />
          )}
          {activeTab === 'products' && user.role == "admin" && (
            <ProductsSection
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          )}
          {activeTab === 'allOrders' && user.role=="admin" && (
            <OrdersSection orders={mockOrders} showCustomer />
          )}
        </div>
      </main>
    </div>
  );
}

export default AccountPage;