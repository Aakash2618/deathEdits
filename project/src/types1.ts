export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    address: string;
  }
  
  export interface Order {
    id: string;
    userId: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    items: OrderItem[];
    total: number;
    createdAt: string;
  }
  
  export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    name: string;
    size: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    sizes: string[];
    stock: number;
  }