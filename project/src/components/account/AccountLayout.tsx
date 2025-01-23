import React from 'react';
import { User, Package, Settings, ShoppingBag, Users, LayoutDashboard, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function AccountLayout({ 
  activeTab, 
  setActiveTab, 
  isAdmin,
  isMobileMenuOpen,
  setIsMobileMenuOpen 
}: Props) {
  const userTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'allOrders', label: 'All Orders', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  const tabs = isAdmin=='admin' ? [...userTabs, ...adminTabs] : userTabs;
  const navigate=useNavigate()

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {/* <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button> */}

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">My Account</h2>
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}