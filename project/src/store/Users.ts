import axios from "axios";
import { create } from "zustand";
import {User} from "../types/index"
import toast from "react-hot-toast";

interface updateUserProp{
    first_name:string,
    last_name:string,
    address:string,
    phone:number
}

interface userMethod{
    users:User[];
    updateUser:(editedUser:updateUserProp)=>void;
    allUsers:()=>void;
}


export const userStore=create<userMethod>((set,get)=>({
    users:[],
    allUsers:async()=>{
        try {
            const response=await axios.get(import.meta.env.VITE_API_URL+"/users/",{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":localStorage.getItem("token")
                }
            })
            console.log(response)
            set({users:response.data})
        } catch (error) {
            console.log(error);
            toast.error("There is error into fetching all the users")
        }
    },
    updateUser:async(editedUser)=>{
        try {
            const response=await axios.patch(import.meta.env.VITE_API_URL+"/users/profile",editedUser,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":localStorage.getItem("token")
                }
            })
            localStorage.setItem("user",JSON.stringify(response.data))
            toast.success("Profile Update Successfully..")
        } catch (error) {
            console.log(error);
            toast.error("There is error to update the user..")
        }
    }
}))