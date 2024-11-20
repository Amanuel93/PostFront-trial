
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/ethiopost_logo.jfif';
import { Link} from 'react-router-dom';
import { resetPasswordStart } from '../../redux/authSlice'; // Adjust to your actual action
import Spinners from '../Common/spinner';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.auth);
  const { token } = useParams(); // Assuming token is passed in the URL

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(confirmPassword === e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordMatch && password) {
      dispatch(resetPasswordStart({ token,password }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-28 h-28 object-cover" />
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Reset Password</h2>
        <p className="text-center text-gray-500 mb-6">Enter your new password below.</p>

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="New Password"
              required
            />
            <div
              className="absolute right-3 top-10 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${
                passwordMatch ? 'border-gray-300' : 'border-red-500'
              } rounded-md focus:outline-none focus:border-indigo-500`}
              placeholder="Confirm Password"
              required
            />
            <div
              className="absolute right-3 top-10 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {!passwordMatch && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              disabled={loading || !passwordMatch || !password}
            >
              {loading ? <Spinners /> : 'Reset Password'}
            </button>
          </div>
        </form>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mt-4 text-center text-green-600">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Footer Text */}
        <div className="text-center text-sm text-gray-500 mt-6">
          Back to{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
