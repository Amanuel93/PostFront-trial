import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeProfileStart } from '../../redux/authSlice';

export default function CompleteProfile() {
  const dispatch = useDispatch();
  const { successMessage, error } = useSelector((state) => state.auth);

  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [branch, setBranch] = useState('');
  const [gender, setGender] = useState('');
  const [years_of_experience, setExperienceYears] = useState('');
  const [experience_detail, setExperienceDescription] = useState('');
  const [bio, setBio] = useState('');
  const [birthplace, setBirthplace] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      department,
      position,
      branch,
      gender,
      years_of_experience,
      experience_detail,
      bio,
      birthplace,
      image,
    };
    console.log('Profile Data:', profileData);
    dispatch(completeProfileStart(profileData)); // Add your dispatch action here
  };

  return (
    <div className="flex min-h-screen bg-gray-50 p-4 md:pt-6">
      <div className="w-full max-w-3xl md:max-w-5xl px-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold text-left text-gray-800 mb-4 md:mb-1">
          Complete Your Profile
        </h2>

        {/* Display Success or Error Message */}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border bg-gray-200 rounded-md shadow-sm focus:ring-indigo-500"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 bg-gray-200 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <input
              type="text"
              placeholder="Enter your District and branch. Ex: Addis Ababa, Arada"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1 bg-gray-200 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 bg-gray-200 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="number"
              value={years_of_experience}
              onChange={(e) => setExperienceYears(e.target.value)}
              min="0"
              className="mt-1 bg-gray-200 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
            />
          </div>

          {/* Experience Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Your target (gaps to fill)</label>
            <textarea
              value={experience_detail}
              onChange={(e) => setExperienceDescription(e.target.value)}
              rows="3"
              className="mt-1 bg-gray-200 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
              className="mt-1 bg-gray-200 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* Birthplace */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Birthplace</label>
            <input
              type="text"
              value={birthplace}
              onChange={(e) => setBirthplace(e.target.value)}
              className="mt-1 bg-gray-200 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 bg-gray-200 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none"
            >
              Complete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
