import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileStart} from '../../redux/authSlice';
import Spinners from '../Common/spinner';
import { Spinner } from "@material-tailwind/react";
 
const MyProfile = () => {
  const dispatch = useDispatch();

  const { user, loading, error,profile } = useSelector((state) => state.auth);

    console.log(user);
    useEffect(() => {
        dispatch (getProfileStart());
      }, [dispatch]);
      
      console.log(profile);
    // console.log(profile?.data)
    const image = profile?.image ? `http://localhost:5000/${profile?.image.replace(/\\/g, "/")}` : '';
 
  return (
  <div className="flex justify-center items-center">
    {
    !loading ?
    <div className="max-w-3xl mx-auto mt-12 p-4 lg:p-8 bg-white shadow-md rounded-md">
      <div className="flex flex-col items-center border-b border-gray-200 pb-6">
        <img
          className="w-28 h-28 rounded-full border-4 border-white shadow-md mb-4"
          src={image}
          alt="user"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{profile?.name}</h2>
        <p className="text-gray-500">{profile?.position || 'Position'}</p>
        <p className="text-gray-500">{profile?.branch || 'Branch'}</p>
        <span
          className={`mt-3 px-4 py-1 text-sm font-medium rounded-full ${
            profile?.isVerified ? 'text-green-700 bg-green-200' : 'text-red-700 bg-red-200'
          }`}
        >
          {profile?.isVerified ? 'Verified' : 'Unverified'}
        </span>
      </div>

      {/* profile Details */}
      <div className="mt-6 px-4 py-4 space-y-6 shadow-black shadow-2xl rounded-sm">
        <div className="text-gray-700">
          <p className="text-sm font-semibold text-gray-600">Contact Information</p>
          <div className="mt-1">
            <p>Email: <span className="text-gray-800">{profile?.email}</span></p>
            <p>Phone: <span className="text-gray-800">{profile?.phone}</span></p>
          </div>
        </div>
        
        <div className="text-gray-700">
          <p className="text-sm font-semibold text-gray-600">Work Information</p>
          <div className="mt-1">
            <p>Department: <span className="text-gray-800">{profile?.department || 'N/A'}</span></p>
            <p>Years of Experience: <span className="text-gray-800">{profile?.years_of_experience || 'N/A'} years</span></p>
            <p>Purpose: <span className="text-gray-800">{profile?.experience_detail || 'No additional details'}</span></p>
          </div>
        </div>

        {/* Join Date */}
        <div className="text-gray-600 text-sm mt-2">
          <p>Member since {new Date(profile?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
    :
    <div className="flex flex-col w-96 h-screen items-center justify-center space-y-4">
       <Spinner className="h-16 w-16" color="indigo"/>
    </div>
    } 
   </div>
  );
}

export default MyProfile

