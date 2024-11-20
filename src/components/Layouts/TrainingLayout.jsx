import React from 'react'
import { Outlet } from 'react-router-dom';
import DashboardHeader from "../Dashboard/DashboardHeader";

const TrainingLayout = () => {
  return (
    <div>
      {/* <DashboardHeader header="Trainees" role="Admin"/> */}
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default TrainingLayout
