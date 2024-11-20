
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { nextStep, prevStep } from '../../redux/stepperSlice';
// import { useNavigate } from 'react-router-dom';

// const Form = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     passcode: '',
//     department: '',
//     position: '',
//     startDate: '',
//     endDate: '',
//     duration: '', // Add duration field to the state
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // handle form submission logic here
//   };

//   const dispatch = useDispatch();
//   const activeStep = useSelector((state) => state.stepper.activeStep);
//   const steps = useSelector((state) => state.stepper.steps);
  
//   const navigate = useNavigate();

//   const handleNext = () => {
//     dispatch(nextStep());
//     navigate('/Dashboard/add/chapter');
//   };

//   const handlePrev = () => {
//     dispatch(prevStep());
//   };

//   return (
//     <div className="">
//       <div className="min-h-screen flex justify-center pt-12">
//         <div className="px-8 rounded-lg shadow-lg w-full">
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
//             {/* Title */}
//             <div>
//               <label className="block text-gray-600 font-semibold mb-[2px]" htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
//                 placeholder="Enter title"
//                 required
//               />
//             </div>

//             {/* Passcode */}
//             <div>
//               <label className="block text-gray-600 font-semibold mb-1" htmlFor="passcode">Passcode</label>
//               <input
//                 type="password"
//                 id="passcode"
//                 name="passcode"
//                 value={formData.passcode}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
//                 placeholder="Enter passcode"
//                 required
//               />
//             </div>

//             {/* Department */}
//             <div>
//               <label className="block text-gray-600 font-semibold mb-1" htmlFor="department">Department</label>
//               <input
//                 type="text"
//                 id="department"
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
//                 placeholder="Enter department"
//                 required
//               />
//             </div>

//             {/* Position */}
//             <div>
//               <label className="block text-gray-600 font-semibold mb-1" htmlFor="position">Position</label>
//               <input
//                 type="text"
//                 id="position"
//                 name="position"
//                 value={formData.position}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
//                 placeholder="Enter position"
//                 required
//               />
//             </div>

//             {/* Start Date, End Date, and Duration on the same row */}
//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-gray-600 font-semibold mb-1" htmlFor="startDate">Start Date</label>
//                 <input
//                   type="date"
//                   id="startDate"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 font-semibold mb-1" htmlFor="endDate">End Date</label>
//                 <input
//                   type="date"
//                   id="endDate"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 font-semibold mb-1" htmlFor="duration">Duration</label>
//                 <input
//                   // type="number"
//                   id="duration"
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
//                   placeholder="Enter duration"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div className="md:col-span-2">
//               <label className="block text-gray-600 font-semibold mb-1" htmlFor="description">Description</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
//                 placeholder="Enter a brief description"
//                 rows="4"
//                 required
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-900 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring focus:ring-indigo-300"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//           <div className="mt-4 flex justify-between px-4 sm:px-8">
//             <button onClick={handlePrev} disabled={activeStep === 0} size="sm" className="w-14 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65">
//               Prev
//             </button>
//             <button onClick={handleNext} disabled={activeStep === steps - 1} size="sm" className="w-14 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Form;

import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../../redux/stepperSlice';
import { useNavigate } from 'react-router-dom';
import { createTrainingStart,clearStatus } from '../../redux/trainingSlice'; // Import action
import Spinners from '../Common/spinner';

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    passcode: '',
    department: '',
    position: '',
    startDate: '',
    endDate: '',
    duration: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error, trainingId, showNext } = useSelector((state) => state.training);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTrainingStart(formData)); // Dispatch action to create training
    // navigate('/Dashboard/add/chapter'); // Redirect to next step on successful submission
    console.log(loading);
  };


  const activeStep = useSelector((state) => state.stepper.activeStep);
  const steps = useSelector((state) => state.stepper.steps);

  const handleNext = () => {
    dispatch(nextStep());
    navigate(`/Dashboard/add/chapter/${trainingId}`);
  };

  const handlePrev = () => {
    dispatch(prevStep());
  };

  useEffect(() => {
    // Clear success or error messages after 3 seconds
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <div className="min-h-screen flex justify-center pt-12">
      <div className="px-8 rounded-lg shadow-lg w-full">
         {/* Display Success or Error Message */}
         {success && <p className="text-green-600">{success}</p>}
         {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          {/* Title */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Passcode */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="passcode">Passcode</label>
            <input
              type="password"
              id="passcode"
              name="passcode"
              value={formData.passcode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter passcode"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter department"
              required
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter position"
              required
            />
          </div>

          {/* Start Date, End Date, and Duration */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-1" htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1" htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1" htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter duration"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-semibold mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter a brief description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-900 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              { loading ? <Spinners/> : 'Create Training' }
            </button>
          </div>
        </form>
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


