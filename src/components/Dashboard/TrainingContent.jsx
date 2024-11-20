// import React from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import {
//     fetchTrainingByIdStart,
//     updateTrainingStart,
//     fetchTrainingsStart,
//     clearStatus,
//   } from "../../redux/trainingSlice";

// // Sample chapter data
// const chapters = [
//     { id: 5, title: 'Introduction', chapterNumber: '1' },
//     { id: 6, title: 'Getting Started', chapterNumber: '2' },
//     { id: 7, title: 'Advanced Topics', chapterNumber: '3' },
//     // Add more chapters as needed
// ];

// // Component to display a list of chapters
// const ChapterList = () => {
//     const navigate = useNavigate();
//     const { trainingId } = useParams();
//     const dispatch = useDispatch();

//     const { training, loading, success, error } = useSelector(
//       (state) => state.training
//     );

    
   

//     const id = trainingId

//     React.useEffect(() => {
//         if (id && !training) {
//           dispatch(fetchTrainingByIdStart({ id }));
//         }
//       }, [id, dispatch, training]);

//       console.log(training)

//     // Sort chapters by chapterNumber
//     const sortedChapters = [...chapters].sort((a, b) => parseInt(a.chapterNumber) - parseInt(b.chapterNumber));

//     return (
//         <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//             {/* Back Button */}
//             <button
//                 onClick={() => navigate('/Dashboard/trainings')}
//                 className="mb-6 px-4 py-2 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition duration-200"
//             >
//                 ← Back to Trainings
//             </button>

//             {/* Title */}
//             <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">Chapters</h1>

//             {/* Chapter List */}
//             <ul className="space-y-4">
//                 {sortedChapters.map((chapter) => (
                
//                     <Link to={`/Dashboard/trainings/${trainingId}/chapter/${chapter.id}`} key={chapter.id} className="flex items-center space-x-4 p-4 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition duration-200">
//                         <span className="text-xl font-bold text-indigo-700">{`Chapter ${chapter.chapterNumber}`}</span>
//                         <span className="text-lg text-gray-700">{chapter.title}</span>
//                    </Link>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ChapterList;

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchTrainingByIdStart, resetTraining } from "../../redux/trainingSlice";

const ChapterList = () => {
    const navigate = useNavigate();
    const { trainingId } = useParams();
    const dispatch = useDispatch();

    const { training, loading, error} = useSelector((state) => state.training);

    React.useEffect(() => {

        // Reset training data in Redux before fetching new data
        dispatch(resetTraining());

        if (trainingId) {
            dispatch(fetchTrainingByIdStart({ id: trainingId }));
        }
    }, [dispatch, trainingId]);

    // Log the training data to check if it's being fetched correctly
    console.log("Training data:", training);

    // Sort chapters by chapterNumber, if they exist
    // const sortedChapters = training?.Chapters?.sort((a, b) => parseInt(a.chapterNumber) - parseInt(b.chapterNumber)) || [];
    const sortedChapters = training?.Chapters
    ? [...training.Chapters].sort((a, b) => parseInt(a.chapterNumber) - parseInt(b.chapterNumber))
    : [];
    
    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            {/* Back Button */}
            <button
                onClick={() => navigate('/Dashboard/trainings')}
                className="mb-6 px-4 py-2 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition duration-200"
            >
                ← Back to Trainings
            </button>

            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">Chapters</h1>

            {/* Display loading, error, or chapters */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <ul className="space-y-4">
                {sortedChapters.map((chapter) => (
                    <Link to={`/Dashboard/trainings/${trainingId}/chapter/${chapter.id}`} key={chapter.id} className="flex items-center space-x-4 p-4 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition duration-200">
                        <span className="text-xl font-bold text-indigo-700">{`Chapter ${chapter.chapterNumber}`}</span>
                        <span className="text-lg text-gray-700">{chapter.title}</span>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default ChapterList;

