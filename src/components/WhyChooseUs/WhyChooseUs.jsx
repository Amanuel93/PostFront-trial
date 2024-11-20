import React from "react";
import { GrYoga } from "react-icons/gr";
import { FaDumbbell } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";
import { FaComputer } from "react-icons/fa6";
import { FaCoins } from "react-icons/fa";
import { GiGymBag } from "react-icons/gi";
import { motion } from "framer-motion";
import { SlideLeft } from "../../utility/animation";

const WhyChooseData = [
  {
    id: 1,
    title: "Expert Instruction",
    desc: "Our training is delivered by qualified professionals from the post office, ensuring high-quality learning.",
    icon: <FaPeopleGroup />,
    bgColor: "#0063ff",
    delay: 0.3,
  },
  {
    id: 2,
    title: "Limited-Time Access",
    desc: "Participants can access training materials for a specified period, encouraging focused learning.",
    link: "/",
    icon: <LuClock3 />,
    bgColor: "#73bc00",
    delay: 0.6,
  },
  {
    id: 3,
    title: "Interactive Learning Tools",
    desc: "Engage with our digital platform, featuring interactive content and resources for effective learning.",
    link: "/",
    icon: <FaComputer />,
    bgColor: "#fa6400",
    delay: 0.9,
  },
  {
    id: 4,
    title: "Completely Free Program",
    desc: "All training resources and materials are provided at no cost to post office workers.",
    link: "/",
    icon: <FaCoins />,
    bgColor: "#fe6baa",
    delay: 0.9,
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-[#f9fafc]" id="Benefits">
      <div className="container py-24">
        {/* header section */}
        <div className="space-y-4 p-6 text-center max-w-[500px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-orange-600">
            Why Choose Us
          </h1>
          <p className="font-semibold text-3xl">
            Benefits of online training program with us
          </p>
        </div>
        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {WhyChooseData.map((item,index) => {
            return (
              <motion.div
                variants={SlideLeft(item.delay)}
                initial="hidden"
                whileInView={"visible"}
                key={index}
                className="space-y-4 p-6 rounded-xl shadow-black shadow-2xl"
              >
                {/* icon section */}
                <div
                  style={{ backgroundColor: item.bgColor }}
                  className="w-10 h-10 rounded-lg flex justify-center items-center text-white"
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
