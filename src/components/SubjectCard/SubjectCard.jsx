import React from "react";
import { motion } from "framer-motion";
import { FaComputer, FaBook } from "react-icons/fa6";
import { MdOutlineCrisisAlert,MdComputer } from "react-icons/md";
import { FaPeoplePulling } from "react-icons/fa6";
import { CgArrangeBack } from "react-icons/cg";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { GrOrganization } from "react-icons/gr";

const subjectList = [
  {
    id: 1,
    name: "Organization culture",
    icon: <GrOrganization />,
    color: "#0063ff",
    delay: 0.2,
  },
  {
    id: 2,
    name: "Customer service",
    icon: <FaArrowsDownToPeople />,
    color: "#00c986",
    delay: 0.3,
  },
  {
    id: 3,
    name: "Change management",
    icon: <FaComputer />,
    color: "#922aee",
    delay: 0.4,
  },
  {
    id: 4,
    name: "Leadership skill",
    icon: <FaPeoplePulling />,
    color: "#ea7516",
    delay: 0.5,
  },
  {
    id: 5,
    name: "People management",
    icon: <BsPeopleFill />,
    color: "#075267",
    delay: 0.6,
  },
  {
    id: 6,
    name: "Basic computer skill",
    icon: <MdComputer />,
    color: "#986d1d",
    delay: 0.7,
  },
  {
    id: 7,
    name: "Basic kaizen",
    icon: <CgArrangeBack />,
    color: "#b93838",
    delay: 0.8,
  },
  {
    id: 8,
    name: "Crisis management",
    icon: <MdOutlineCrisisAlert />,
    color: "#464646",
    delay: 0.9,
  },
];

const SubjectCard = () => {
  return (
    <>
      <div className="container py-14 md:py-14" id="Trainings">
        {/* header section */}
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-orange-500">
            Our trainings
          </h1>
          <p className="font-semibold text-3xl">
            Find Online Training in Any Department
          </p>
        </div>
        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
          {subjectList.map((subject) => {
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: subject.delay,
                }}
                className="border rounded-lg border-secondary/20 p-4 flex justify-start items-center gap-4 shadow-black/50 shadow-xl hover:!scale-105 hover:shadow-2xl duration-200 cursor-pointer"
              >
                <div
                  style={{
                    color: subject.color,
                    backgroundColor: subject.color + "20",
                  }}
                  className="w-16 h-16 rounded-md flex justify-center items-center"
                >
                  {subject.icon}
                </div>
                <p>{subject.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SubjectCard;
