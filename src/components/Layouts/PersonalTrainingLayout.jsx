import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import DashboardHeader from "../Dashboard/DashboardHeader";

const PersonalTrainingLayout = () => {

  return (
    <div className=''>
      {/* Dynamic Header Title */}
      <DashboardHeader role="Trainee" header="Dashboard"/>
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default PersonalTrainingLayout;