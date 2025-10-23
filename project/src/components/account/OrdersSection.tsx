import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';

interface Props {
  orders: Order[];
  showCustomer?: boolean;
}

export function OrdersSection({ orders, showCustomer }: Props) {
  const [ordersData,setOrdersData]=useState([])
  const [loading, setLoading] = useState(true);
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL+"/orders/",{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          }
        });
        console.log(res)
        if (res.data) {
          console.log(res.data)
          setOrdersData(res.data);
        }
      } catch (err) {
        console.log(err);
        alert("Failed to fetch orders");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchOrders();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {ordersData.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>
              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(order.status)}
              <span className="capitalize">{order.status}</span>
            </div>
          </div>

          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex justify-between">
                <div>
                  <p className="font-medium">{item.tshirt.title}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                </div>
                <div className="text-right">
                  <p>${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${order.total}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}