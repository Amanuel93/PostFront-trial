import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../../redux/stepperSlice';
import { createChapterStart, clearStatus } from '../../redux/chapterSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Spinners from '../Common/spinner';

const Form = () => {
  const [title, setTitle] = useState('');
  const [chapterNumber, setChapterNumber] = useState('');
  const [readingMaterial, setReadingMaterial] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trainingId } = useParams(); // Ensure `trainingId` is being passed correctly
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const steps = useSelector((state) => state.stepper.steps);
  const { success, error, chapterId, showNext,loading } = useSelector((state) => state.chapter);

  const handleFileChange = (e) => {
    setReadingMaterial(e.target.files[0]); // Make sure a file is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation to make sure all fields are filled out
    if (!title || !chapterNumber || !readingMaterial) {
      alert("Please fill out all fields.");
      return;
    }

    const chapterData = {
      title,
      chapterNumber,
      readingMaterial,
      trainingId, 
    };

    dispatch(createChapterStart(chapterData));
  };

  const handleNext = () => {
    dispatch(nextStep());
    navigate(`/Dashboard/add/question/${chapterId}`);
  };

  const handlePrev = () => {
    dispatch(prevStep());
    navigate(`/Dashboard/add/${trainingId}`);
  };

 useEffect(() => {
     // Clear success or error messages after 2 seconds
     if (success || error) {
       const timer = setTimeout(() => {
         dispatch(clearStatus());
       }, 2000);
       return () => clearTimeout(timer);
     }
   }, [success, error, dispatch]);

  useEffect(()=>{
      if(success){
        setIsDisabled(true)
      }
    },[success])

  return (
    <div className="min-h-screen flex justify-center pt-12">
      <div className="px-8 rounded-lg shadow-lg w-full">
         {/* Success/Error Messages */}
         {success && <p className="bg-green-200 text-green-700 max-w-md p-2 rounded-sm">{success}</p>}
         {error && <p className="bg-red-200 text-red-700 max-w-md p-2 rounded-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 pt-3">
          {/* Title */}
          <div>
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Chapter Number */}
          <div>
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="chapterNumber">Chapter Number</label>
            <input
              type="number"
              id="chapterNumber"
              value={chapterNumber}
              onChange={(e) => setChapterNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter chapter number"
              required
            />
          </div>

          {/* Reading Material (File) */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="readingMaterial">Reading Material</label>
            <input
              type="file"
              id="readingMaterial"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isDisabled}
              className="w-full bg-indigo-900 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring focus:ring-indigo-300 disabled:bg-indigo-200 disabled:cursor-not-allowed "
            >
              { loading ? <Spinners/> : 'Create chapter' }
            </button>
          </div>
        </form>

        {/* Step Navigation */}
        <div className="mt-4 flex justify-between px-4 sm:px-8">
          <button onClick={handlePrev} disabled={activeStep === 0} className="w-14 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65 invisible">
            Prev
          </button>
          {
           showNext
             &&
          <button onClick={handleNext} disabled={activeStep === steps - 1} className="w-14 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65">
            Next
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Form;

