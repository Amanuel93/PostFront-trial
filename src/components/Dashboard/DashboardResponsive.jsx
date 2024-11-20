import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DashboardResponsive = ({ isOpen, setIsOpen, links}) => {
    const navigate = useNavigate();

    const handleLinkClick = (link) => {
      setIsOpen(false); // Close the menu
      navigate(link); // Navigate to the link
    };
  
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 lg:hidden mt-2"
        >
          <div className="text-xl font-semibold uppercase bg-yellow-500 text-black py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
             {links.map((linkObj, index) => (
                <li key={index} onClick={() => handleLinkClick(linkObj.link)}>
                  {linkObj.title}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardResponsive;

