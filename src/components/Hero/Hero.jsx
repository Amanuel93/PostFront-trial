import React from "react";
import HeroImg from "../../assets/HeroSection2.jpg";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideRight } from "../../utility/animation";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        {/* brand info */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
          <div className="text-center md:text-left space-y-6">
            <motion.p
              variants={SlideRight(0.4)}
              initial="hidden"
              animate="visible"
              className="text-orange-600 uppercase font-semibold"
            >
             Commitment to Excellence Guaranteed
            </motion.p>
            <motion.h1
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-5xl font-semibold lg:text-6xl !leading-tight"
            >
              Find Your Perfect <span className="text-indigo-900">Training</span>
            </motion.h1>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
            >
              Our platform, designed specifically for post office workers, helps you find the perfect tutor for your training needs—completely free and private.
            </motion.p>
            {/* button section */}
            <motion.div
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="flex gap-8 justify-center md:justify-start !mt-8 items-center"
            >
              <Link to="/Trainee">
               <button className="bg-yellow-600 p-3 rounded-lg">Get Started</button>
              </Link>
              <button className="flex justify-end items-center gap-2 font-semibold">
                <span className="w-10 h-10 bg-secondary/15 rounded-full flex justify-center items-center">
                  <FaPlay className="text-secondary" />
                </span>
                See how it works
              </button>
            </motion.div>
          </div>
        </div>
        {/* Hero image */}
        <div className="flex justify-center items-center pb-2">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            src={HeroImg}
            alt=""
            className="w-[250px] md:w-[500px] xl:w-[500px]"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
