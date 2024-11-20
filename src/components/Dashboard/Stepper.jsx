// StepperWithContent.js
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Stepper, Step, Button, Typography } from '@material-tailwind/react';
// import { IoDocumentsOutline } from 'react-icons/io5';
// import { GrChapterAdd } from "react-icons/gr";
// import { FaFileCircleQuestion } from "react-icons/fa6";
// import { setActiveStep, nextStep, prevStep } from '../../redux/stepperSlice';
// import { useNavigate } from 'react-router-dom';

// export function StepperWithContent() {
//   const dispatch = useDispatch();
//   const activeStep = useSelector((state) => state.stepper.activeStep);
//   const steps = useSelector((state) => state.stepper.steps);

//   const navigate = useNavigate();

//   const navigateToTraining = () => {
//     navigate('/Dashboard/add')
//   };

//   const navigateToChapter = () => {
//     navigate('/Dashboard/add/chapter')
//   };

//   const navigateToQuestion = () => {
//     navigate('/Dashboard/add/question')
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-24 py-4 lg:py-8">
//       <Stepper activeStep={activeStep}>
//         <Step onClick={() => dispatch(setActiveStep(0))}>
//           <IoDocumentsOutline className="h-5 w-5 sm:h-6 sm:w-6" />
//           <div className="absolute -bottom-[3.5rem] sm:-bottom-[4rem] w-max text-center" onClick={navigateToTraining}>
//             <Typography
//               variant="h6"
//               className={`${
//                 activeStep === 0 ? 'text-blue-gray-700' : 'text-gray-500'
//               } text-sm sm:text-base lg:text-lg`}
//             >
//               Step 1
//             </Typography>
//             <Typography
//               className={`font-normal ${
//                 activeStep === 0 ? 'text-blue-gray-700' : 'text-gray-500'
//               } text-xs sm:text-sm lg:text-base`}
//             >
//               Create Training.
//             </Typography>
//           </div>
//         </Step>
//         <Step onClick={() => dispatch(setActiveStep(1))}>
//           <GrChapterAdd className="h-5 w-5 sm:h-6 sm:w-6" />
//           <div className="absolute -bottom-[3.5rem] sm:-bottom-[4rem] w-max text-center" onClick={navigateToChapter}>
//             <Typography
//               variant="h6"
//               className={`${
//                 activeStep === 1 ? 'text-blue-gray-700' : 'text-gray-500'
//               } text-sm sm:text-base lg:text-lg`}
//             >
//               Step 2
//             </Typography>
//             <Typography
//               className={`font-normal ${
//                 activeStep === 1 ? 'text-blue-gray-700' : 'text-gray-500'
//               } text-xs sm:text-sm lg:text-base`}
//             >
//               Add Chapter
//             </Typography>
//           </div>
//         </Step>
//         <Step onClick={() => dispatch(setActiveStep(2))}>
//           <FaFileCircleQuestion className="h-5 w-5 sm:h-6 sm:w-6" />
//           <div className="absolute -bottom-[3.5rem] sm:-bottom-[4rem] w-max text-center" onClick={navigateToQuestion}>
//             <Typography
//               variant="h6"
//               className={`${
//                 activeStep === 2 ? 'text-blue-gray-700' : 'text-gray-500'
//               } text-xs sm:text-base lg:text-lg`}
//             >
//               Step 3
//             </Typography>
//             <Typography
//               className={`font-normal ${
//                 activeStep === 2 ? 'text-blue-gray-700' : 'text-gray-500'
//               } text-xs sm:text-sm lg:text-base`}
//             >
//              Add Questions
//             </Typography>
//           </div>
//         </Step>
//       </Stepper>
//     </div>
//   );
// }

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stepper, Step, Typography } from '@material-tailwind/react';
import { IoDocumentsOutline } from 'react-icons/io5';
import { GrChapterAdd } from "react-icons/gr";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { setActiveStep } from '../../redux/stepperSlice';
import { useNavigate } from 'react-router-dom';

export function StepperWithContent() {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.stepper.activeStep);

  const navigate = useNavigate();

  const handleStepClick = (step, path) => {
    dispatch(setActiveStep(step));  // Update the active step in Redux
    navigate(path);  // Navigate to the desired route
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-24 py-4 lg:py-8 z-50">
      <Stepper activeStep={activeStep}>
        <Step onClick={() => handleStepClick(0, '/Dashboard/add')}>
          <IoDocumentsOutline className="h-5 w-5 sm:h-6 sm:w-6" />
          <div className="absolute -bottom-[3.5rem] sm:-bottom-[4rem] w-max text-center bg-white">
            <Typography
              variant="h6"
              className={`${
                activeStep === 0 ? 'text-blue-gray-700' : 'text-gray-500'
              } text-sm sm:text-base lg:text-lg`}
            >
              Step 1
            </Typography>
            <Typography
              className={`font-normal ${
                activeStep === 0 ? 'text-blue-gray-700' : 'text-gray-500'
              } text-xs sm:text-sm lg:text-base`}
            >
              Create Training
            </Typography>
          </div>
        </Step>
        <Step onClick={() => handleStepClick(1, '/Dashboard/add/chapter')}>
          <GrChapterAdd className="h-5 w-5 sm:h-6 sm:w-6" />
          <div className="absolute -bottom-[3.5rem] sm:-bottom-[4rem] w-max text-center">
            <Typography
              variant="h6"
              className={`${
                activeStep === 1 ? 'text-blue-gray-700' : 'text-gray-500'
              } text-sm sm:text-base lg:text-lg`}
            >
              Step 2
            </Typography>
            <Typography
              className={`font-normal ${
                activeStep === 1 ? 'text-blue-gray-700' : 'text-gray-500'
              } text-xs sm:text-sm lg:text-base`}
            >
              Add Chapter
            </Typography>
          </div>
        </Step>
        <Step onClick={() => handleStepClick(2, '/Dashboard/add/question')}>
          <FaFileCircleQuestion className="h-5 w-5 sm:h-6 sm:w-6" />
          <div className="absolute -bottom-[3.5rem] sm:-bottom-[4rem] w-max text-center">
            <Typography
              variant="h6"
              className={`${
                activeStep === 2 ? 'text-blue-gray-700' : 'text-gray-500'
              } text-xs sm:text-base lg:text-lg`}
            >
              Step 3
            </Typography>
            <Typography
              className={`font-normal ${
                activeStep === 2 ? 'text-blue-gray-700' : 'text-gray-500'
              } text-xs sm:text-sm lg:text-base`}
            >
              Add Questions
            </Typography>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}

