import React from 'react'
import Card from './Card';
import DashboardHeader from './DashboardHeader'
import Piechart from './Piechart'
import Barchart from './Barchart'
import Table from './Table1'

const Dashboard = () => {
  const stat =  { 
    totalTraining: "100",
    totalQuestions:"100",
    totalTrainees:"100",
    totalAdmins:"100"
  }
  return (
    <div className=''>
       <DashboardHeader header="Dashboard" role="Admin"/>
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
