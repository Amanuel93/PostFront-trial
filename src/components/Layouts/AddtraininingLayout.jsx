// import React, { useState, useEffect } from "react";
// import { Outlet, useLocation, useNavigate } from 'react-router-dom'
// import { StepperWithContent } from "./components/Dashboard/Stepper";
// import DashboardHeader from "./components/Dashboard/DashboardHeader";


// const AddtrainingLayout = () => {

//     const navigate = useNavigate();
//     const location = useLocation();
   
//   const getHeaderTitle = () => {
//     if (location.pathname === '/Dashboard/add') {
//       return "Create Training";
//     } else if (location.pathname === '/Dashboard/add/chapter') {
//       return " Create Chapter";
//     } else if (location.pathname === '/Dashboard/add/question') {
//       return "Add Question";
//     } 
//     return "Training";
//   };

//   useEffect(() => {
//     // Redirect to /Dashboard/add if the current path is not /Dashboard/add
//     if (location.pathname !== '/Dashboard/add') {
//       navigate('/Dashboard/add', { replace: true });
//     }
//   }, [location.pathname, navigate]);

//   return (
//     <div className=''>
//       {/* <DashboardHeader header="Create Training"/>   */}
//       <DashboardHeader header={getHeaderTitle()} />
//       <StepperWithContent/>
//       <div className="h-screen flex-1 overflow-y-auto">
//         <Outlet/>
//       </div>
//     </div>
//   )
// }

// export default AddtrainingLayout

import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { StepperWithContent } from "../Dashboard/Stepper";
import DashboardHeader from "../Dashboard/DashboardHeader";

const AddtrainingLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the dynamic title based on the current path
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/Dashboard/add':
        return "Create Training";
      case '/Dashboard/add/chapter':
        return "Create Chapter";
      case '/Dashboard/add/question':
        return "Add Question";
      default:
        return "Training";
    }
  };


  return (
    <div className=''>
      {/* Dynamic Header Title */}
      <DashboardHeader header={getHeaderTitle()} role="Admin"/>
      {/* Stepper Component */}
      <StepperWithContent />
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AddtrainingLayout;
