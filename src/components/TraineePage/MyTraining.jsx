
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTraineesTrainingStart } from '../../redux/traineeSice'; // Adjust the path to your slice
import Loading from '../Common/Loading';
import { TiFolderOpen } from "react-icons/ti";

const MyTraining = () => {
  // const { id } = useParams();
  const dispatch = useDispatch();

  // Get the training data and loading state from the Redux store
  const { trainings, loading} = useSelector((state) => state.trainees);
  console.log(trainings)
  console.log(loading)
  // Fetch the trainee's training data when the component mounts
  useEffect(() => {
    dispatch(fetchTraineesTrainingStart());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {/* Loading state */}
      {/* {!trainings && <p className="text-center text-blue-500">You havent taken any training yet</p>} */}

      {/* Error state */}
      {/* { error && <div className="h-60 flex items-center justify-center text-red-500">Check your internet connection!</div>} */}

      {/* Trainings */}
      {!loading && trainings?.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Enrolled Trainings</h3>
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

      {/* loading Trainings */}
      {loading && (
       <div className="">
        <h3 className="text-xl font-semibold mb-4">Enrolled Training</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <Loading/>
             </div>
            ))}
        </div>
      </div>
      )}

      {!loading && !trainings && 
      // <p className="text-center text-blue-500">You havent taken any training yet</p>
      <div className="h-96 space-y-2 flex flex-col justify-center items-center">
        <TiFolderOpen className='text-9xl text-gray-500'/>
        <h1 className='text-gray-500'>You haven't taken any training yet.</h1>
      </div>
      }
    </div>
  );
};

export default MyTraining;


