export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string[];
  sizes: string[];
  category: string;
  colors: string[];
  // created_at: string;
}
export interface CartProduct{
  color:string;
  quantity:number;
  size:string;
  tshirt:{
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string[];
  }
}

export interface CartItem extends CartProduct {
  user: string;
  color:string;
  quantity:number;
  size:string;
  _id:string;
}

export interface User {
  id: string;
  email: string;
  first_name:string;
  last_name:string;
  password:string;
  phone:number;
  address:string;
  role?:string;
  // created_at: string;
  }
