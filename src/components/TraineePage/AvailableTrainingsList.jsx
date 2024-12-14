
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainingsStart } from '../../redux/trainingSlice';
import PlannerAlert from './PlannerAlert';
import { Spinner } from "@material-tailwind/react";

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
        {loading && 
        <div className="flex flex-col w-96 h-60 items-center justify-center space-y-4">
           <Spinner className="h-16 w-16" color="indigo"/>
         </div>
         }
        {error && <p className="text-red-500">Check you internet connection.</p>}
        {!filteredTraining && (
          <div className="flex items-center justify-center h-60">
            <h1>No trainings available.</h1>
          </div>
        )}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-16">
            {filteredTraining.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-2xl rounded-lg px-4 pt-6 py-2 max-w-sm transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-lg mb-2 text-indigo-700 overflow-hidden whitespace-nowrap text-ellipsis">{item.title}</div>
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
                <div className="flex justify-between items-center mt-4">
                  <div className="">
                    <PlannerAlert id = {item.id} />
                  </div>
                  <div className="flex space-x-4 px-2">
                    <Link to={`/Trainee/${item.id}/passcode`}>
                      <button className='bg-indigo-500 text-white font-light px-6 py-1 rounded-sm'>Enroll</button>
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
