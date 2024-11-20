import React from 'react'
import { IoCarSport } from "react-icons/io5";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { FaPeopleLine } from 'react-icons/fa6';
import { IoDocumentsOutline } from 'react-icons/io5';
import { BsPeopleFill } from "react-icons/bs";

const Card = ({stat}) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {/* Total cars */}
      <div className="flex justify-around shadow-2xl bg-indigo-900 py-2 text-white rounded-lg">
        <div className="md:text-[60px] text-[30px]">
          <IoDocumentsOutline/>
        </div>
        <div className="flex flex-col">
          <h1 className=' md:text-[24px] text-12px'>{stat.totalTraining}</h1>
          <p className=' md:text-[22px] text-[16px]'>Trainings</p>
        </div>
      </div>

      {/* Total requests */}
      <div className="flex justify-around shadow-2xl bg-indigo-900 py-2 text-white rounded-lg">
        <div className="md:text-[60px] text-[30px]">
          < FaFileCircleQuestion />
        </div>
        <div className="flex flex-col">
          <h1 className=' md:text-[24px] text-12px'>{stat.totalQuestions}</h1>
          <p className=' md:text-[22px] text-[16px]'>Questions</p>
        </div>
      </div>

      {/* Approved requests */}
      <div className="flex justify-around shadow-2xl bg-indigo-900 py-2 text-white rounded-lg">
        <div className="md:text-[60px] text-[30px]">
          <FaPeopleLine/>
        </div>
        <div className="flex flex-col">
          <h1 className='md:text-[24px] text-12px'>{stat.totalTrainees}</h1>
          <p className=' md:text-[22px] text-[16px]'>Trainees</p>
        </div>
      </div>

       {/* Rejected requests */}
      <div className="flex justify-around shadow-2xl bg-indigo-900 py-2 text-white rounded-lg">
        <div className="md:text-[60px] text-[30px]">
          <BsPeopleFill/>
        </div>
        <div className="flex flex-col">
          <h1 className='md:text-[24px] text-12px'>{stat.totalAdmins}</h1>
          <p className='md:text-[22px] text-[16px]'>Admins</p>
        </div>
      </div>
    </div>
  )
}

export default Card