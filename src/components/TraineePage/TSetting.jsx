import React, { useState } from 'react';
import { IoKeySharp } from "react-icons/io5";

const TSetting = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = formData;

    // Validation check: Passwords should match
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('All fields are required.');
      return;
    }

    console.log('Updating password...', formData);

    setError('');
    setSuccess('Password updated successfully.');
  };

  return (
    <div>
     <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex space-x-2">
         <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Password</h2>
         < IoKeySharp className='text-2xl font-bold'/>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter current password"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="confirmNewPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Confirm new password"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-900 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default TSetting;

