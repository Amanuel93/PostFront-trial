// import React from 'react';
// import { useParams } from 'react-router-dom';


// const mockTrainings= [
//   { title: "Basic computer skills", startDate: "2024-01-10", endDate: "2024-01-20", status: "completed" },
//   { title: "People managment", startDate: "2024-02-05", endDate: "2024-02-15", status: "in-progress" },
// ];

// const MyTraning = () => {
//   const { id } = useParams();  

//   return (
//     <div className="container mx-auto p-4">

//       {/* Trainings */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h3 className="text-xl font-semibold mb-4">Trainings Taken</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {mockTrainings.map((training, index) => (
//             <div key={index} className="border p-4 rounded-lg shadow-sm">
//               <h4 className="text-lg font-semibold mb-2">{training.title}</h4>
//               <div className="grid grid-cols-2">
//                 <div className="">
//                   <p className="text-gray-600">Start Date: {training.startDate}</p>
//                   <p className="text-gray-600">End Date: {training.endDate}</p>
//                 </div>
//                 <div className="">
//                   <p className="text-gray-600">Pass Status: Passed</p>
//                   <p className="text-gray-600">Score: 70%</p>
//                 </div>
//               </div>
//               <p className={`mt-2 font-bold ${training.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
//                 {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyTraning;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTraineesTrainingStart } from '../../redux/traineeSice'; // Adjust the path to your slice

const MyTraining = () => {
  // const { id } = useParams();
  const dispatch = useDispatch();

  // Get the training data and loading state from the Redux store
  const { trainings, loading, error } = useSelector((state) => state.trainees);
  console.log(trainings)

  // Fetch the trainee's training data when the component mounts
  useEffect(() => {
    // if (id) {
    // }
    dispatch(fetchTraineesTrainingStart());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {/* Loading state */}
      {loading && <p className="text-center text-blue-500">Loading trainings...</p>}

      {/* Error state */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Trainings */}
      {!loading && !error && trainings?.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Trainings Taken</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainings.map((training, index) => (
              <div key={index} className="border px-2 [y-4] rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">{training?.trainingName}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600"><span className='text-black'>Start Date:</span> {training?.startTime}</p>
                    <p className="text-gray-600"><span className='text-black'>End Date:</span>{training?.endTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><span className='text-black'>Score:</span> {training?.score || 'N/A'}</p>
                    <p className="text-gray-600"><span className='text-black'>Status:</span> {training?.status || 'N/A'}</p>
                    <p className="text-gray-600">
                     <span className='text-black'>Pass status:</span> {training?.pass ? "Passed" : "Failed"}
                  </p>
                  </div>
                </div>
                <p
                  className={`mt-2 font-bold ${
                    training?.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                  }`}
                >
                  {training?.status.charAt(0).toUpperCase() + training?.status.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Trainings */}
      {!loading && !error && trainings?.length === 0 && (
        <p className="text-center text-gray-500">No trainings found for this trainee.</p>
      )}
    </div>
  );
};

export default MyTraining;


