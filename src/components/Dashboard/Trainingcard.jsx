import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Deletealert from './Deletealert'
import Editdrawer from './Editdrawer'
import { fetchTrainingsStart, deleteTrainingStart } from '../../redux/trainingSlice'
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import OptionMenu from './OptionMenu'

const Trainingcard = ({item}) => {

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTrainingStart({ id }));
  };

  const handleOptionMenuClick = (e) => {
    // Prevent the click from triggering the Link navigation
    e.preventDefault();
    e.stopPropagation();
  };

  return (
  // <Link to={`/Dashboard/trainings/${item.id}`}>
  <div key={item.id} className="bg-white shadow-2xl rounded-lg px-4 pt-6 py-2 max-w-sm transition-transform transform hover:scale-105 hover:shadow-2xl">
    <Link to={`/Dashboard/trainings/${item.id}`}>
    <div className="flex justify-between items-center text-lg font-bold mb-2 text-indigo-700" >
      {item.title}
      {/* <div className=""  onClick={handleOptionMenuClick}>
       <OptionMenu id={item.id} />
      </div> */}
    </div>
      <p className="text-gray-600 text-justify">{item.description}</p>
    <div className="mt-3">
      <span className="block text-sm font-semibold text-gray-500">Department: <span className="text-gray-700"> {item.department}</span></span>
    </div>
    <div className="mt-3">
      <span className="block text-sm font-semibold text-gray-500">Position:  <span className="text-gray-700"> {item.position}</span></span>
    </div>
    <div className="mt-3">
      <span className="block text-sm font-semibold text-gray-500">Duration:  <span className="text-gray-700"> {item.duration}</span></span>
    </div>
    <div className="mt-3">
      <span className="block text-sm font-semibold text-gray-500">Passcode:  <span className="text-gray-700"> {item.passcode}</span></span>
    </div>
    <div className="flex justify-between">
     <div className="mt-3">
      <span className="block text-sm font-semibold text-gray-500">Start-date:  <span className="text-gray-700"> {item.startDate}</span></span>
     </div>
     <div className="mt-3">
      <span className="block text-sm font-semibold text-gray-500">End-date:  <span className="text-gray-700"> {item.endDate}</span></span>
     </div>
    </div>
    </Link>
    <div className="flex justify-between mt-2">
      <div className="flex space-x-4 px-2">
       <Editdrawer id={item.id}/>
       <h1 className='text-red-600'>
       <Deletealert onDelete={() => handleDelete(item.id)} />
      </h1>
     </div>
     <div className=""  onClick={handleOptionMenuClick}>
       <OptionMenu id={item.id} />
     </div>
   </div>
  </div> 
  // </Link>
  )
}

export default Trainingcard
