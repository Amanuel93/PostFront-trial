import React, { useState,useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/ethiopost_logo.jfif';
import { Link } from 'react-router-dom';
import Spinners from '../Common/spinner';
import {
  registerUserStart,
} from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const dispatch = useDispatch();
  const { loading, error, verificationToken } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordMatch && name && email && phone && password) {
      dispatch(
        registerUserStart({
          name,
          email,
          phone,
          password,
        })
      );
    }
  };

  // Navigate after successful registration
  useEffect(() => {
    if (verificationToken) {
      setTimeout(() => {
        navigate('/Login'); // Navigate to the Login page after a delay
      }, 2000); // Adjust the delay time as needed (2000 ms = 2 seconds)
    }
  }, [verificationToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-28 h-28 object-cover" />
          </Link>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create an Account</h2>

        {/* Sign-up Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Full Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="example@mail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="123-456-7890"
              required
            />
          </div>

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

          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full px-4 py-2 text-gray-700 bg-gray-50 border ${
                passwordMatch ? 'border-gray-300' : 'border-red-500'
              } rounded-md focus:outline-none focus:border-indigo-500`}
              placeholder="********"
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

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {verificationToken && (
            <p className="text-green-500 text-sm">Registration successful! Verify your email.</p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out text-center"
              disabled={!passwordMatch || loading}
            >
              {loading ? <Spinners className=""/> : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
