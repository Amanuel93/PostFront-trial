// import React from 'react'
// import DashboardHeader from './DashboardHeader'
// import Deletealert from './Deletealert'
// import Trainingcard from './Trainingcard'


// const Trainings = () => {
//    const item = [
//     { id: "1", title: "Organization culture", description: "A highly experienced HR manager with over 10 years in the industry.", department: "HR", position: "Manager", duration: "2:30" },
//     { id: "2", title: "People Management", description: "Skilled IT developer specializing in full-stack development.", department: "IT", position: "Developer", duration: "2:30" },
//     { id: "3", title: "General Auditing Basics", description: "Financial analyst with a deep understanding of data analytics and reporting.", department: "Finance", position: "Analyst", duration: "2:30" },
//     { id: "4", title: "Crisis management", description: "Dynamic sales executive focused on driving revenue and customer relationships.", department: "Sales", position: "Executive", duration: "2:30" },
//     { id: "5", title: "Basic postal knowledge", description: "Marketing coordinator with a talent for creative strategy and brand development.", department: "Marketing", position: "Coordinator", duration: "2:30" },
//     { id: "6", title: "Basic computer skill", description: "A highly experienced HR manager with over 10 years in the industry.", department: "HR", position: "Manager", duration: "2:30" },
//     { id: "7", title: "Change management", description: "Skilled IT developer specializing in full-stack development.", department: "IT", position: "Developer", duration: "2:30" },
//     { id: "8", title: "Leadership skill", description: "Financial analyst with a deep understanding of data analytics and reporting.", department: "Finance", position: "Analyst", duration: "2:30" },
//     { id: "9", title: "Conflict management", description: "Dynamic sales executive focused on driving revenue and customer relationships.", department: "Sales", position: "Executive", duration: "2:30" }
//   ]
  
//   return (
//      <div>
//        <DashboardHeader header="Trainings" role="Admin"/>
//        <div className="min-h-screen px-4 py-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
//         {/* <Deletealert /> */}
//         {item.map((item,index) => (
//          <Trainingcard item={item} key={index} />
//         ))}
//        </div>
//       </div>
//     </div>
//   )
// }

// export default Trainings

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import Trainingcard from './Trainingcard';
import { fetchTrainingsStart, deleteTrainingStart } from '../../redux/trainingSlice';
import Deletealert from './Deletealert';

const Trainings = () => {
  const dispatch = useDispatch();
  const { trainings, loading, error } = useSelector((state) => state.training);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTrainingsStart());
  }, [dispatch]);
  console.log(trainings)

  return (
    <div>
      <DashboardHeader header="Trainings" role={user?.name} />
      <div className="min-h-screen px-4 py-10">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {trainings.map((item) => (
              <Trainingcard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainings;

