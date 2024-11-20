import React from 'react'
import { SlPower } from "react-icons/sl";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/authSlice'; 

const DashboardHeader = ({header,role,logo}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/')
  }

  return (
    // <div className='md:flex justify-between px-4 pt-6 pb-2 hidden shadow-gray-400 shadow-2xl'>
    <div className='flex ${style} justify-between px-4 pt-6 pb-2 shadow-gray-400 shadow-2xl'>
      {
       !logo 
        ?
      <h1 className='font-medium text-sm md:text-lg'>{header}</h1>
         :
      <Link to="/">
       <img src={logo} alt="Ethiopost logo"  className="h-14 w-14 rounded-full"/>
      </Link>
      }
      <div className="flex  space-x-4 pr-3">
        <div className="flex items-center space-x-2">
            <BsPersonCircle/>
            <h1>{role}</h1>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogout}>
            <SlPower className='text-red-600'/>
            <h1>Logout</h1>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader