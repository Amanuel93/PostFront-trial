import React from "react";
import { NavbarMenuResponsive } from "../../mockData/data.js";
import { Link } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";

const ResponsiveMenu = ({ isOpen,setIsOpen }) => {
  const handleLinkClick = (link) => {
    setIsOpen(false); // Close the menu
  };
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 lg:hidden"
        >
          <div className="text-xl font-semibold uppercase bg-yellow-500 text-black py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
             {NavbarMenuResponsive.map((item, index) => (
                <li key={index} onClick={() => handleLinkClick()}>
                  <Link to={item.link} className="hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
