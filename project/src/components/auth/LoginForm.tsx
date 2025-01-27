import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { login } from '../../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../store/useAuth';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const {signIn,user,signOut,loading,token}=useAuth()
  
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    await signOut();
    const res=await signIn(credentials.email,credentials.password)
    if (!res) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )
    }
    if(res){navigate("/")}
  }
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await login(credentials);
  //     localStorage.setItem('token', data.token);
  //     localStorage.setItem('user', JSON.stringify(data.user));
  //     toast.success('Login successful!');
  //     navigate('/products');
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Login failed');
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Sign in</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            // disabled={!loading}
          >
            Sign in
          </button>
          <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?{' '}
                  <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </a>
                </span>
              </div>
        </form>
      </div>
    </div>
  );
}