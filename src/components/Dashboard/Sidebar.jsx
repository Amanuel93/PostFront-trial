// export default Sidebar;
import React, { useState } from 'react';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { NavLink,Link } from 'react-router-dom';
import logo from '../../assets/ethiopost_logo.jfif';

const Sidebar = ({Menus}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={` ${open ? 'w-72' : 'w-20'} bg-yellow-50 h-screen pt-2 pb-5 relative duration-300`}>
      <IoArrowBackCircleSharp
        className={`absolute cursor-pointer -right-3 top-16 h-7 w-7 border-dark-purple border-2 rounded-full bg-white font-thin ${!open && 'rotate-180'}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center px-1">
        <img src={logo} alt="Logo" className={`h-14 w-14 rounded-full ${!open && 'h-10 w-10'}`} />
        <Link to = "/" className={`text-black origin-left font-bold text-2xl duration-200 !font-italic ${!open && 'hidden'}`}>
          POETS
        </Link>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.link}
            end={menu.link === '/Dashboard' || menu.link === '/Trainee'}
            className={({ isActive }) => 
              `flex items-center p-2 cursor-pointer hover:bg-light-white text-black text-sm gap-x-4 
              ${menu.gap ? 'mt-9' : 'mt-2'} ${isActive ? 'bg-indigo-900 border-solid border-l-8 border-yellow-600 text-white' : ''}`
            }
          >
            {menu.icon}
            <span className={`${!open && 'hidden'} origin-left duration-200 text-lg`}>
              {menu.title}
            </span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

