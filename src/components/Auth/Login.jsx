import React, { useState,useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/ethiopost_logo.jfif';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserStart } from '../../redux/authSlice'; // Adjust the path based on your file structure
import Spinners from '../Common/spinner';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch login action
    dispatch(loginUserStart({ email, password }));
  };

  // Redirect user after successful login
  useEffect(() => {
    if (user) {
      if (user.role === 'trainee') {
        navigate('/Trainee');
      } else {
        navigate('/Dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
           <img src={logo} alt="Logo" className="w-28 h-28 object-cover" />
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Log In to Your Account</h2>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="example@mail.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="********"
              required
            />
            <div
              className="absolute right-3 top-10 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600">{error}</p>}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? <Spinners className=""/> : 'Log In'}
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="flex justify-between items-center text-sm text-gray-500 mt-6">
          <Link to="/Forgot-Password" className="text-indigo-600 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

