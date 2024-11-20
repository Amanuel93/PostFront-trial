import React, { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { MdDashboardCustomize } from 'react-icons/md';
import { IoAdd, IoDocumentsOutline,IoArrowBackCircleSharp } from 'react-icons/io5';
import { IoIosSettings } from "react-icons/io";
import { FaPeopleLine } from 'react-icons/fa6';
import { MdComputer, MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import DashboardReponsive from "../Dashboard/DashboardResponsive";
import { Link } from "react-router-dom";
import logo from '../../assets/ethiopost_logo.jfif';

const DashboardNav = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const links = [
        { title: 'Dashboard', icon: <MdDashboardCustomize className='text-3xl' />, link: '/Dashboard' },
        { title: 'Trainees', icon: <FaPeopleLine className='text-3xl' />, link: '/Dashboard/trainee' },
        { title: 'Add Training', icon: <IoAdd className='text-3xl' />, link: '/Dashboard/add' },
        { title: 'Trainings', icon: <IoDocumentsOutline className='text-3xl' />, link: '/Dashboard/trainings' },
        { title: 'Settings', icon: <IoIosSettings className='text-3xl' />, link: '/Dashboard/setting' },
    ];
  return (
    <div
      className="relative z-10 shadow-md  w-full dark:bg-black dark:text-white duration-300 dark:gray-900 py-4
    "
    >
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-14 w-14 rounded-full" />
            <Link to="/" className="font-bold font-sans text-2xl">POETS</Link>
          </div>
          
          {/* Mobile view  */}
          <div className="flex items-center gap-4 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {/* Mobile Hamburger icon */}
            {!isOpen ? <MdMenu className="text-4xl" /> : <IoMdClose className="text-4xl" />}
          </div>
        </div>
      </div>
      <DashboardReponsive isOpen={isOpen} setIsOpen={setIsOpen} links={links} />
    </div>
  );
};

export default DashboardNav;