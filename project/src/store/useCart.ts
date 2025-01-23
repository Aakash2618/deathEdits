import { create } from 'zustand';
import { CartItem } from '../types';
import axios from 'axios';
import toast from 'react-hot-toast';

interface CartStore {
  items: CartItem[];
  isCart:boolean;
  // openCart:()=>void;
  // closeCart:()=>void;
  onCartClick:()=>void;
  initializeCart:()=>void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isCart:false,
  onCartClick:()=>{
    set({isCart:!get().isCart})
    },
  // openCart:()=>{
  //   set({isCart:true})
  //   },
  // closeCart:()=>{
  //   set({isCart:false})
  //   },
  initializeCart:async()=>{
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL+"/cart/",{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      // console.log(response.data)
      set({items:response.data.items})
    } catch (error) {
      console.log(error)
    }
  },
  addItem: async(data) => {
    try {
      const res=await axios.post(import.meta.env.VITE_API_URL+"/cart/add",data,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
      })
      set({items:res.data.items})
      toast.success("Item added successfully..")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    // set((state) => {
    //   const existingItem = state.items.find(
    //     (i) => 
    //       i.id === item.id && 
    //       i.selectedSize === item.selectedSize && 
    //       i.selectedColor === item.selectedColor
    //   );

    //   if (existingItem) {
    //     return {
    //       items: state.items.map((i) =>
    //         i === existingItem
    //           ? { ...i, quantity: i.quantity + item.quantity }
    //           : i
    //       ),
    //     };
    //   }

    //   return { items: [...state.items, item] };
    // });
  },
  removeItem: async(id) =>{
    try {
      const response=await axios.delete(import.meta.env.VITE_API_URL+`/cart/remove/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      set({items:response.data.items})
      toast.success("Item removed successfully..")
      } catch (error) {
        console.log(error)
      }
  },
  updateQuantity: async(id, quantity) =>{
    try {
      const response=await axios.patch(import.meta.env.VITE_API_URL+`/cart/update/${id}`,quantity,{
        headers:{
          'Content-Type': 'application/json',
        }
      })
    } catch (error) {
      
    }
  },
  clearCart: () => set({ items: [] }),
  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));