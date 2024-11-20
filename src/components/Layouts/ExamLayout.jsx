import React, { useEffect } from "react";
import { Outlet} from 'react-router-dom';
import DashboardHeader from "../Dashboard/DashboardHeader"
import { useDispatch, useSelector } from 'react-redux';

const ExamLayout = () => {
    const { trainingName } = useSelector((state) => state.startTraining);
    const { user } = useSelector((state) => state.auth);
    console.log(trainingName)
    console.log(user)
  return (
    <div>
       {/* Dynamic Header Title */}
       <div className="px-3">
        <DashboardHeader header={trainingName} role={user?.name}/>
       </div>
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default ExamLayout
