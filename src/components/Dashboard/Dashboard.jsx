import React from 'react'
import Card from './Card';
import DashboardHeader from './DashboardHeader'
import Piechart from './Piechart'
import Barchart from './Barchart'
import Table from './Table1'
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const stat =  { 
    totalTraining: "100",
    totalQuestions:"100",
    totalTrainees:"100",
    totalAdmins:"100"
  }
  const { user } = useSelector((state) => state.auth);
  return (
    <div className=''>
       <DashboardHeader header="Dashboard" role={user?.name}/>
      <div className="px-4 py-8">
       <Card stat = {stat}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 px-4">
        <Piechart/>
        <Barchart/>
      </div>
      <div className=" flex flex-col px-4 mt-2">
        <h1 className='font-medium'>Planned Trainings</h1>
        <Table/>
      </div>
    </div>
  )
}

export default Dashboard
