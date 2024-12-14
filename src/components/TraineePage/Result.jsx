import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import logo from '../../assets/ethiopost_logo.jfif';
import { Link } from 'react-router-dom';

const Result = ({trainingSubmissionStatus,trainingName}) => {
    const { width, height } = useWindowSize()
  return (
    <div>
        {
         trainingSubmissionStatus?.pass ?
         <>
            <Confetti
             width={width}
             height={height}
            />
            <div className="h-screen flex flex-col items-center justify-center space-y-4">
                <div className="flex justify-between items-center">
                  <img src={logo} alt="" srcset="" className="w-24 h-24 object-cover" />
                </div>
                <h1 className='text-[30px]'>Congratulations!</h1>
               <h1>You have scored <span>{trainingSubmissionStatus?.score}</span> in your <span className='font-bold'>{trainingName}</span> training offered by Ethiopost on POETS platform.</h1>
               <h1 className='font-semibold text-indigo-500'>Keep up the great work and continue striving for excellence!</h1>
               <Link to='/Trainee/Mytraining'>
                <button className='bg-indigo-500 text-white px-6 py-2 rounded-sm mt-6'>Show Trainings</button>
               </Link>
            </div>
         </>
              :
             <div className="h-screen flex flex-col items-center justify-center">
              <h1>We're sorry you failed taking the training!</h1>
               <Link to='/Trainee/Mytraining'>
                <button className='bg-indigo-500 text-white px-6 py-2 rounded-sm mt-6'>Show Trainings</button>
               </Link>
             </div>
        }
    </div>
  )
}

export default Result
