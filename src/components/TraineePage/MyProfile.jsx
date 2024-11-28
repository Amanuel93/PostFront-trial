import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const MyProfile = () => {

  const { user, loading, error } = useSelector((state) => state.auth);

  // React.useEffect(() => {
  //   dispatch(fetchTraineeProfileStart()); // Fetch trainee progress info
  // }, [dispatch]);
    console.log(user)

    // console.log(profile?.data)
    const image = user?.image ? `http://localhost:5000/${user?.image.replace(/\\/g, "/")}` : '';
 
  return (
    <div className="max-w-3xl mx-auto mt-12 p-4 lg:p-8 bg-white shadow-md rounded-md">
      {/* user Header */}
      <div className="flex flex-col items-center border-b border-gray-200 pb-6">
        <img
          className="w-28 h-28 rounded-full border-4 border-white shadow-md mb-4"
          src={image}
          alt="user"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
        <p className="text-gray-500">{user?.position || 'Position'}</p>
        <p className="text-gray-500">{user?.branch || 'Branch'}</p>
        <span
          className={`mt-3 px-4 py-1 text-sm font-medium rounded-full ${
            user?.isVerified ? 'text-green-700 bg-green-200' : 'text-red-700 bg-red-200'
          }`}
        >
          {user?.isVerified ? 'Verified' : 'Unverified'}
        </span>
      </div>

      {/* user Details */}
      <div className="mt-6 px-4 py-4 space-y-6 shadow-black shadow-2xl rounded-sm">
        <div className="text-gray-700">
          <p className="text-sm font-semibold text-gray-600">Contact Information</p>
          <div className="mt-1">
            <p>Email: <span className="text-gray-800">{user?.email}</span></p>
            <p>Phone: <span className="text-gray-800">{user?.phone}</span></p>
          </div>
        </div>
        
        <div className="text-gray-700">
          <p className="text-sm font-semibold text-gray-600">Work Information</p>
          <div className="mt-1">
            <p>Department: <span className="text-gray-800">{user?.department || 'N/A'}</span></p>
            <p>Years of Experience: <span className="text-gray-800">{user?.years_of_experience || 'N/A'} years</span></p>
            <p>Experience Details: <span className="text-gray-800">{user?.experience_detail || 'No additional details'}</span></p>
          </div>
        </div>

        {/* Join Date */}
        <div className="text-gray-600 text-sm mt-2">
          <p>Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile
