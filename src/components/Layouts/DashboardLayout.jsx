import React, { useState } from "react";
import { Outlet } from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar'
import DashboardNav from "../Dashboard/DashboardNav";

const DashboardLoayout = ({Menus}) => {
  return (
    <div className='flex flex-col lg:flex-row dark:bg-dark dark:text-white'>
      <div className="hidden lg:flex">
        <Sidebar Menus={Menus} />
      </div>
      <div className="lg:hidden">
       <DashboardNav/>
      </div>
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLoayout