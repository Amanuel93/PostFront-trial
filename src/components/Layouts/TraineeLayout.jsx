import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardHeader from "../Dashboard/DashboardHeader";

const TraineeLayout = () => {

  return (
    <div className=''>
      {/* Dynamic Header Title */}
      <DashboardHeader header="Trainees" role="Admin"/>
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default TraineeLayout;