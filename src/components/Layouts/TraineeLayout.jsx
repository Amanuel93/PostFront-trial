import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardHeader from "../Dashboard/DashboardHeader";
import { useDispatch, useSelector } from 'react-redux';

const TraineeLayout = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className=''>
      {/* Dynamic Header Title */}
      <DashboardHeader header="Trainees" role={user?.name}/>
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default TraineeLayout;