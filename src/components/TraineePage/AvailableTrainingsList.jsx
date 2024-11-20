
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTrainingsStart, deleteTrainingStart } from '../../redux/trainingSlice';

// const AvailableTrainingsList = () => {
//   const dispatch = useDispatch();
//   const [activeFilter, setActiveFilter] = useState("");
//   const { trainings, loading, error } = useSelector((state) => state.training);
//   const [filteredTraining, setFilteredTraining] = useState(trainings);

//   React.useEffect(() => {
//     dispatch(fetchTrainingsStart());
//   }, [dispatch]);

//   const TrainingNames = [...new Set(trainings.map(training => training.department))];
//   console.log(trainings);

//   // Filter cars based on selected name
//   const filterByName = (department) => {
//     if (department === "") {
//       setFilteredTraining(trainings);
//     } else {
//       const filtered = trainings.filter((training) => training.department === department);
//       setFilteredTraining(filtered);
//     }
//     setActiveFilter(department); // Set active filter
//   };

//   return (
//     <div className="pt-8 flex flex-col">
//       <div className="container h-screen">
//         {/* Heading */}
//         <h1 className="text-2xl sm:text-3xl font-semibold font-serif mb-3">
//           Currently Available Trainings
//         </h1>

//         {/* Filter Buttons */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           <button
//             className={`px-4 py-2 rounded-lg border ${activeFilter === "" ? "bg-indigo-800 text-white dark:text-white" : "bg-gray-200 dark:text-black"}`}
//             onClick={() => filterByName("")}
//           >
//             All
//           </button>
//           {TrainingNames.map((department) => (
//             <button
//               key={department}
//               className={`px-4 py-2 rounded-lg border ${activeFilter === department ? "bg-indigo-800 text-white" : "bg-gray-200 dark:text-black"}`}
//               onClick={() => filterByName(department)}
//             >
//               {department}
//             </button>
//           ))}
//         </div>

//         {/* Training Listing */}
//         <div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-16">
//             {filteredTraining.map((item) => (
//               <div key={item.id} className="bg-white shadow-2xl rounded-lg px-4 pt-6 py-2 max-w-sm transition-transform transform hover:scale-105 hover:shadow-2xl">
//               <div className="text-lg font-bold mb-2 text-indigo-700">{item.title}</div>
//                 <p className="text-gray-600 text-justify">{item.description}</p>
//               <div className="mt-3">
//                 <span className="block text-sm font-semibold text-gray-500">Department:<span className="text-gray-700"> {item.department}</span></span>
//               </div>
//               <div className="mt-3">
//                 <span className="block text-sm font-semibold text-gray-500">Position:  <span className="text-gray-700"> {item.position}</span></span>
//               </div>
//               <div className="mt-3">
//                 <span className="block text-sm font-semibold text-gray-500">Duration:  <span className="text-gray-700"> {item.duration}</span></span>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <div className="flex space-x-4 px-2">
//                  <Link to={`/Trainee/${item.id}/passcode`}>
//                   <button>Enroll</button>
//                  </Link>
//                </div>
//              </div>
//             </div> 
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailableTrainingsList ;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainingsStart } from '../../redux/trainingSlice';

const AvailableTrainingsList = () => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('');
  const { trainings, loading, error } = useSelector((state) => state.training);
  const [filteredTraining, setFilteredTraining] = useState([]);

  useEffect(() => {
    dispatch(fetchTrainingsStart());
  }, [dispatch]);

  // Sync filteredTraining with trainings whenever trainings changes
  useEffect(() => {
    setFilteredTraining(trainings);
  }, [trainings]);

  const TrainingNames = [...new Set(trainings.map((training) => training.department))];

  // Filter trainings based on selected department
  const filterByName = (department) => {
    if (department === '') {
      setFilteredTraining(trainings);
    } else {
      const filtered = trainings.filter((training) => training.department === department);
      setFilteredTraining(filtered);
    }
    setActiveFilter(department);
  };

  return (
    <div className="pt-8 flex flex-col">
      <div className="container h-screen">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold font-serif mb-3">
          Currently Available Trainings
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-lg border ${
              activeFilter === '' ? 'bg-indigo-800 text-white' : 'bg-gray-200 text-black'
            }`}
            onClick={() => filterByName('')}
          >
            All
          </button>
          {TrainingNames.map((department) => (
            <button
              key={department}
              className={`px-4 py-2 rounded-lg border ${
                activeFilter === department ? 'bg-indigo-800 text-white' : 'bg-gray-200 text-black'
              }`}
              onClick={() => filterByName(department)}
            >
              {department}
            </button>
          ))}
        </div>

        {/* Training Listing */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && filteredTraining.length === 0 && (
          <p className="text-gray-500">No trainings available.</p>
        )}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-16">
            {filteredTraining.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-2xl rounded-lg px-4 pt-6 py-2 max-w-sm transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-lg font-bold mb-2 text-indigo-700">{item.title}</div>
                <p className="text-gray-600 text-justify">{item.description}</p>
                <div className="mt-3">
                  <span className="block text-sm font-semibold text-gray-500">
                    Department:
                    <span className="text-gray-700"> {item.department}</span>
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-sm font-semibold text-gray-500">
                    Position: <span className="text-gray-700"> {item.position}</span>
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-sm font-semibold text-gray-500">
                    Duration: <span className="text-gray-700"> {item.duration}</span>
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex space-x-4 px-2">
                    <Link to={`/Trainee/${item.id}/passcode`}>
                      <button>Enroll</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableTrainingsList;
