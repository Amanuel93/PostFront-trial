import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchTraineeInfoStart, fetchTraineeStart } from "../../redux/traineeSice";

 const TraineeDetail = () => {
  const dispatch = useDispatch();
  const { traineeId } = useParams(); // Get the trainee ID from the URL
  const { trainee, traineeInfo, loading } = useSelector((state) => state.trainees);

  React.useEffect(() => {
    dispatch(fetchTraineeStart({ id: traineeId })); // Fetch trainee details
    dispatch(fetchTraineeInfoStart({ id: traineeId })); // Fetch trainee progress info
  }, [dispatch, traineeId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const image = trainee?.image ? `http://localhost:5000/${trainee?.image.replace(/\\/g, "/")}` : '';

  return (
    <div className="container mx-auto p-4">
      {/* Trainee Profile */}
      <div className="bg-white shadow-md rounded-lg py-6 mb-8">
        <div className="flex flex-col md:flex-row md:space-x-8 mb-4 px-2">
          {image && (
            <img
              src={image}
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover mr-4 border border-black p-1"
            />
          )}
          {/* Trainee's basic info */}
          <div>
            <h2 className="text-2xl font-semibold">{trainee?.name}</h2>
            <p className="text-black">
              Email: <span className="text-gray-600">{trainee?.email}</span>
            </p>
            <p className="text-black">
              Role: <span className="text-gray-600">{trainee?.role}</span>
            </p>
            <p
              className={`mt-2 ${trainee?.isVerified ? "text-green-500" : "text-red-500"}`}
            >
              {trainee?.isVerified ? "Verified" : "Not Verified"}
            </p>
          </div>
          {/* Additional details */}
          <div>
            <h2 className="text-black">
              Department: <span className="text-gray-600">{trainee?.department}</span>
            </h2>
            <p className="text-black">
              Position: <span className="text-gray-600">{trainee?.position}</span>
            </p>
            <p className="text-black">
              Branch: <span className="text-gray-600">{trainee?.branch}</span>
            </p>
            <p className="text-black">
              Years of Experience: <span className="text-gray-600">{trainee?.years_of_experience}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Trainings */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Enrolled Trainings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {traineeInfo?.map((training, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold mb-2">
                {training?.Training?.title || "Training Title"}
              </h4>
              <div className="grid grid-cols-2">
                <div>
                  <p className="text-gray-600">
                    Start Date: {new Date(training?.Training?.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    End Date: {new Date(training?.Training?.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Score: {training?.score || "N/A"}%</p>
                  <p className="text-gray-600">
                    Pass Status: {training?.pass ? "Passed" : "Failed"}
                  </p>
                </div>
              </div>
              <p
                className={`mt-2 font-bold ${
                  training?.status === "completed" ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {training?.status.charAt(0).toUpperCase() + training?.status.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TraineeDetail;

