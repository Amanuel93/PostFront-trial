import React from 'react'
import { AiOutlineNotification } from "react-icons/ai";
import AvailableTrainingsList from './AvailableTrainingsList';
import { Link } from 'react-router-dom';

const TrainingsList = () => {
  return (
    <div className='flex flex-col items-center justify-center px-2'>
      <div className="flex space-x-4 justify-start p-4 border-2 border-gray-800 mt-2 rounded-md">
        <AiOutlineNotification className='font-bold'/>
        <h1>Please <Link className='text-indigo-500 underline underline-offset-2' to="Complete-profile">complete your profile To Enroll</Link></h1>
      </div>
       <AvailableTrainingsList/>
    </div>
  )
}

export default TrainingsList
