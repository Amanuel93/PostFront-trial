import React, { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import DashboardHeader from "../Dashboard/DashboardHeader";
import { useDispatch, useSelector } from 'react-redux';

const PersonalTrainingLayout = () => {
    const { user } = useSelector((state) => state.auth);
    console.log(user)

  return (
    <div className=''>
      {/* Dynamic Header Title */}
      <DashboardHeader role={user?.name} header="Dashboard"/>
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default PersonalTrainingLayout;