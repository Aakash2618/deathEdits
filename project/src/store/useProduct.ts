import { create } from "zustand";
import { Product } from "../types";
import axios from "axios";
import { products } from "../data/Product";
import toast from "react-hot-toast";

type store={
    products:Product[];
    setProducts: (products: Product[]) => void;
    addProduct: (formData:FormData)=>Promise<void>
    deleteProduct:(_id:string)=>void;
}

console.log(products)

const productStore=create<store>((set)=>({
    products:[],
    setProducts:(products:Product[])=>set({products}),
    deleteProduct:async(_id:string)=>{
        try {
            const response=await axios.delete(import.meta.env.VITE_API_URL+`/products/${_id}`,{
                headers:{
                    "content-type":"application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            set({products:response.data})
            toast.success(`Item deleted successfully with id :- ${_id}`)
        } catch (error) {
            console.log(error);
        }
    },
    addProduct:async(formData)=>{
        try {
              const response = await axios.post(import.meta.env.VITE_API_URL+'/products/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': localStorage.getItem('token')
                },
              });
              console.log(response)
              set({products:[...products,response.data]})
            } catch (err: unknown) {
            //   setError(err.response.data.message || 'Failed to upload photos. Please try again.');
              console.error('Upload error:', err);
            } finally {
            //   setUploading(false);
            }
    }
}))

export default productStore;