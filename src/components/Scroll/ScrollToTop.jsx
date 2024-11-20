import React, { useEffect, useState } from "react";
import { FaAnglesUp } from "react-icons/fa6";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);
  
    const handleScroll = () => {
      if (window.scrollY > 300) { // Adjust this value to control when the arrow appears
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    visible && (
    <div
      className="fixed bottom-10 right-10 bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer shadow-lg transition duration-300 hover:bg-indigo-800 z-50"
      onClick={scrollToTop}
    >
     <FaAnglesUp />
    </div>
    )
  );
};

export default ScrollToTop;
