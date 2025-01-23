import { create } from 'zustand';
import { User } from '../types';
import axios from 'axios';
import toast from 'react-hot-toast';


interface AuthStore {
  user: string | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean | undefined>;
  signUp: (email: string, password: string, first_name:string,last_name:string,phone:number,address:string) => Promise<boolean | undefined>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: localStorage.getItem("user") || null,
  loading:true,
  token: localStorage.getItem("token")||null,
  signIn: async (email, password) => {
    try {
      const response=await axios.post(import.meta.env.VITE_API_URL+"/auth/login",{
        email,
        password,
      })
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("user",JSON.stringify(response.data.user))
      set({ user: JSON.stringify(response.data.user), loading: false ,token:response.data.token});
      return response.data.user?true:false;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  },
  signUp: async (email, password, first_name,last_name,phone,address) => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/auth/register", {
        email,
        password,
        first_name,
        last_name,
        phone,
        address
      });
  
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      set({ user: JSON.stringify(res.data.user), loading: false, token: res.data.token });
  
      toast.success("Account created successfully!");
      return res.data.user ? true : false;
    } catch (error) {
      // throw error;
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  },
  signOut: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null ,token:null});
  },
  setUser: (user) => set({ user }),
}));