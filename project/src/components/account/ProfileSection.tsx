import React, { useEffect, useState } from 'react';
import { User } from '../../types/index';
import { Save } from 'lucide-react';
import { userStore } from '../../store/Users';
import {useAuth} from '../../store/useAuth'

// interface Props {
//   user: User;
//   onUpdate: (user: User) => void;
// }

export function ProfileSection() {
  const userData = useAuth().user
  const user = userData?JSON.parse(userData):null;
  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [editedUser, setEditedUser] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    address: user.address,
    phone: user.phone
  });
  const { updateUser } = userStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUser(editedUser);
      setLoading(false)
    }, 1000);
  };
  useEffect(() => {
    const hasChanges = user.first_name !== editedUser.first_name || user.last_name !== editedUser.last_name || user.address !== editedUser.address || user.phone !== editedUser.phone;
    setIsDisabled(!hasChanges)
  }, [editedUser]);
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl text-gray-500">{user.first_name[0].toUpperCase()}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.first_name + " " + user.last_name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={editedUser.first_name}
              onChange={(e) => setEditedUser({ ...editedUser, first_name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={editedUser.last_name}
              onChange={(e) => setEditedUser({ ...editedUser, last_name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-1 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type='Tel'
              value={editedUser.phone}
              onChange={(e) => setEditedUser({ ...editedUser, phone: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            value={editedUser.address}
            onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${isDisabled ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
      {
        loading && <div className='fixed inset-0 z-50 bg-black bg-opacity-50'>
          <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
    </form>
  );
}