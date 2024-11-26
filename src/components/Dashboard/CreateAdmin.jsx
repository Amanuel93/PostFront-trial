// import React, { useState } from 'react';
// import { RiAdminLine } from "react-icons/ri";
// import { useDispatch, useSelector } from 'react-redux';
// import { createAdminStart } from '../../redux/createAdminSlice'; // Adjust the import path
// import DashboardHeader from './DashboardHeader';

// const CreateAdminForm = () => {
//   const dispatch = useDispatch();
//   const { loading, error, successMessage } = useSelector((state) => state.admin);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createAdminStart(formData));
//   };

//   return (
//     <div className="">
//       <DashboardHeader header="Setting" role="Super-admin" />
//       <div className="min-h-screen flex items-center justify-center px-6">
//         <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl px-8 py-16">
//           <div className="flex space-x-2">
//             <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Admin</h2>
//             <RiAdminLine className="text-3xl" />
//           </div>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter Admin's Name"
//                   className="w-full bg-gray-200 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter Admin's Email"
//                   className="w-full bg-gray-200 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
//                 <input
//                   type="text"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="+251-912-121-415"
//                   className="w-full bg-gray-200 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
//                 <input
//                   type="text"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter Admin's Password"
//                   className="w-full bg-gray-200 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//                   required
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className={`w-full ${
//                 loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'
//               } text-white font-medium py-2 rounded-md transition duration-200`}
//               disabled={loading}
//             >
//               {loading ? 'Creating...' : 'Create Admin'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAdminForm;

import React, { useState, useEffect } from 'react';
import { RiAdminLine } from "react-icons/ri";
import DashboardHeader from './DashboardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { createAdminStart, clearStatus} from '../../redux/createAdminSlice';

import { useNavigate } from 'react-router-dom';

const CreateAdminForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, error } = useSelector((state) => state.admin);

  const [localMessage, setLocalMessage] = useState(null);

  useEffect(() => {
    if (successMessage || error) {
      setLocalMessage(successMessage || error);
      const timer = setTimeout(() => {
        setLocalMessage(null);
        dispatch(clearStatus());
        navigate('/Dashboard/admins'); 
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdminStart(formData));
  };

  return (
    <div className="">
      <DashboardHeader header="Setting" role="Super-admin" />
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl px-8 py-16">
          <div className="flex space-x-2">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Admin</h2>
            <RiAdminLine className='text-3xl' />
          </div>
          {localMessage && (
            <div
              className={`text-center mb-4 py-2 rounded-md ${
                successMessage ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
              }`}
            >
              {localMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter Admins Name'
                  className="w-full bg-gray-200 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter Admins email'
                  className="w-full bg-gray-200 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='+251-912-121-415'
                  className="w-full bg-gray-200 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter Admins Password'
                  className="w-full bg-gray-200 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white font-medium py-2 rounded-md hover:bg-indigo-600 transition duration-200"
            >
              Create Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminForm;


