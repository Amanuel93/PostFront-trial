
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import {
  fetchTrainingByIdStart,
  resetTraining,
} from '../../redux/trainingSlice';
import { fetchTrainingChapterByIdStart } from '../../redux/chapterSlice';
import { startTrainingStart } from '../../redux/startTraining'; // import the correct action

export default function TrainingCard() {
  const dispatch = useDispatch();
  const [passcode, setPasscode] = useState('');
  const { trainingId } = useParams();
  const { training, loading, error } = useSelector((state) => state.training);
  const { loading: startLoading, progress, error: startError } = useSelector((state) => state.startTraining);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset training data in Redux before fetching new data
    dispatch(resetTraining());

    if (trainingId) {
      dispatch(fetchTrainingByIdStart({ id: trainingId }));
    }
  }, [dispatch, trainingId]);


  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleStartTraining = () => {
    dispatch(startTrainingStart({ trainingId, passcode,trainingName:training?.title }));
  };

  console.log(training?.title);

  if(progress){
    navigate(`Training/${trainingId}/details`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {training && (
          <>
            {/* Training Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {training.title}
            </h2>

            {/* Training Description */}
            <p className="text-gray-700 mb-4">{training?.description}</p>

            {/* Training Department and Position */}
            <div className="text-gray-600 text-sm mb-4">
              <p>
                <strong className="font-bold">Department:</strong> {training?.department}
              </p>
              <p>
                <strong>Position:</strong> {training?.position}
              </p>
            </div>

            {/* Training Dates */}
            <div className="flex justify-between text-gray-600 text-sm mb-4">
              <p>
                <strong>Start Date:</strong>{' '}
                {new Date(training.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {new Date(training.endDate).toLocaleDateString()}
              </p>
            </div>

            {/* Passcode Input */}
            <div className="mb-4">
              <label
                htmlFor="passcode"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Enter Passcode to Start Training
              </label>
              <input
                type="text"
                id="passcode"
                value={passcode}
                onChange={handlePasscodeChange}
                className="w-full px-3 py-2 bg-gray-400 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-black/90"
                placeholder="Enter passcode"
              />
            </div>

            {/* Start Training Button */}
            <button
              onClick={handleStartTraining}
              className="w-full bg-indigo-600 text-white py-2 rounded-md text-center font-medium hover:bg-indigo-700 transition-colors"
              disabled={!passcode || startLoading}
            >
              {startLoading ? 'Starting...' : 'Start Training'}
            </button>

            {/* Show Progress */}
            {progress && (
              <div className="mt-4">
                <p>Training Progress: {progress}%</p>
              </div>
            )}

            {/* Show Error */}
            {startError && <p className="text-red-500 mt-4">{startError}</p>}
          </>
        )}
      </div>
    </div>
  );
}
