// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchTrainingByIdStart,
//   resetTraining,
// } from '../../redux/trainingSlice';

// const TrainingsDetail = () => {
//   const dispatch = useDispatch();
//   const { training, loading, error } = useSelector((state) => state.training);
//   const { trainingId } = useParams();
//   const [timeLeft, setTimeLeft] = useState(null); // State to track time left
//   const [timeUp, setTimeUp] = useState(false); // State to track if time is up

//   // Function to convert hour:minute format to milliseconds
//   const convertDurationToMilliseconds = (duration) => {
//     const [hours, minutes] = duration.split(':').map(Number);
//     return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000); // Convert to ms
//   };

//   useEffect(() => {
//     // Reset training data in Redux before fetching new data
//     dispatch(resetTraining());

//     if (trainingId) {
//       dispatch(fetchTrainingByIdStart({ id: trainingId }));
//     }
//   }, [dispatch, trainingId]);

//   useEffect(() => {
//     // Check if there's a saved time left in localStorage
//     const savedTimeLeft = localStorage.getItem('timeLeft');
//     if (savedTimeLeft) {
//       setTimeLeft(Number(savedTimeLeft));
//     } else if (training && training.duration) {
//       const durationMs = convertDurationToMilliseconds(training.duration);
//       setTimeLeft(durationMs);
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime <= 1000) {
//           clearInterval(timer);
//           setTimeUp(true);
//           localStorage.removeItem('timeLeft'); // Remove time from localStorage once time is up
//           return 0;
//         }
//         const newTime = prevTime - 1000;
//         localStorage.setItem('timeLeft', newTime); // Save the new time in localStorage
//         return newTime;
//       });
//     }, 1000);

//     return () => clearInterval(timer); // Cleanup timer on component unmount
//   }, [training]);

//   // Format timeLeft into HH:MM:SS
//   const formatTimeLeft = (time) => {
//     const hours = Math.floor(time / (60 * 60 * 1000));
//     const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
//     const seconds = Math.floor((time % (60 * 1000)) / 1000);

//     return `${hours.toString().padStart(2, '0')}:${minutes
//       .toString()
//       .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {training && (
//           <>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Training Details
//             </h2>
//             <p className="text-gray-600 mb-4">
//               <strong>Title:</strong> {training.title}
//             </p>
//             <p className="text-gray-600 mb-4">
//               <strong>Description:</strong> {training.description}
//             </p>
//             <p className="text-gray-600 mb-4">
//               <strong>Duration:</strong> {training.duration}
//             </p>

//             {/* Timer Display */}
//             <div className="text-center">
//               {timeUp ? (
//                 <p className="text-red-500 text-lg font-bold">Time is up!</p>
//               ) : (
//                 <p className="text-green-600 text-lg font-bold">
//                   Time Left: {timeLeft !== null ? formatTimeLeft(timeLeft) : 'N/A'}
//                 </p>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrainingsDetail;





// import React, { useState} from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchChapterByIdStart, resetChapter, fetchTrainingChapterByIdStart } from '../../redux/chapterSlice';
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// // import "@cyntler/react-doc-viewer/dist/index.css";

// const  TrainingsDetail = () => {
//     const [answers, setAnswers] = useState({});
//     const [showReadingMaterial, setShowReadingMaterial] = useState(true);
//     const [currentChapterIndex, setCurrentChapterIndex] = useState(0); 
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { trainingId } = useParams();  // Added trainingId for navigation
    
//     const { trainingChapter, chapter, loading, error } = useSelector((state) => state.chapter);
   
//     // const chapterId = 3
//     const chapterId = trainingChapter?.chapters?.[currentChapterIndex]?.id;

//     // Fetch chapter data
//     React.useEffect(() => {
//         dispatch(resetChapter());
//         if (chapterId) {
//             dispatch(fetchChapterByIdStart({ id:chapterId }));
//         }
//     }, [dispatch, chapterId]);

//     // Fetch all chapters when component mounts
//    React.useEffect(() => {
//     if (trainingId) {
//         dispatch(fetchTrainingChapterByIdStart({id: trainingId}));
//         }
//     }, [dispatch, trainingId]);

//     const handleAnswerChange = (questionId, answer) => {
//         setAnswers((prevAnswers) => ({
//             ...prevAnswers,
//             [questionId]: answer,
//         }));
//     };

//     const handleSubmit = () => {
//         // Here you would send the answers to the backend
//         console.log(answers);
//     };

//     const handleNextChapter = () => {
//         setCurrentChapterIndex((prevIndex) => prevIndex + 1); // Decrement the index
//      };

//     console.log(chapter)
//     console.log(trainingChapter);
//     console.log(chapterId)
//     const questions = chapter?.Questions || [];
//     // const readingMaterialUri = `http://localhost:5000/${chapter?.readingMaterial.replace(/\\/g, '/')}`;

//     const docs = [
//       { 
//           uri: `http://localhost:5000/${chapter?.readingMaterial.replace(/\\/g, '/')}`,
//           fileType: "pdf",
//       }
//     ];
//     // Check if this is the last chapter
//     const isLastChapter = false; // You can dynamically set this based on the total number of chapters
//     const totalChapters = 5; // Set the total number of chapters for this training (can come from your backend)

//     return (
//         <div className="max-w-6xl mx-auto mt-2 px-6 bg-white rounded-lg shadow-lg p-2">
//             <button
//                 onClick={() => setShowReadingMaterial(!showReadingMaterial)}
//                 className="mb-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 transition duration-200"
//             >
//                 {showReadingMaterial ? "View Questions" : "View Reading Material"}
//             </button>

//             {!showReadingMaterial ? (
//                 <div className="mt-6 space-y-4">
//                     <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Questions</h2>
//                     <form className='space-y-3'>
//                         {questions.map((question, index) => (
//                             <div key={index} className="p-4 bg-indigo-100 rounded-lg shadow">
//                                 <div className="flex justify-between items-center">
//                                     <p className="font-semibold text-gray-800">{`Q${index + 1}: ${question.questionText}`}</p>
//                                 </div>
//                                 {question.type === "multiple-choice" && (
//                                     <ul className="pl-4 mt-2 space-y-1 text-gray-600 list-none">
//                                         {question.options?.map((option, i) => (
//                                             <li key={i} className="pl-4 text-gray-700 flex items-center space-x-2">
//                                                 <input
//                                                     type="radio"
//                                                     id={`question${index}-option${i}`}
//                                                     name={`question${index}`}
//                                                     value={option}
//                                                     checked={answers[`question${index}`] === option}
//                                                     onChange={() => handleAnswerChange(`question${index}`, option)}
//                                                     className="mr-2"
//                                                 />
//                                                 <label htmlFor={`question${index}-option${i}`}>{option}</label>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                                 {question.type === "true-false" && (
//                                     <div className="mt-2">
//                                         <label>
//                                             <input
//                                                 type="radio"
//                                                 name={`question${index}`}
//                                                 value="true"
//                                                 checked={answers[`question${index}`] === 'true'}
//                                                 onChange={() => handleAnswerChange(`question${index}`, 'true')}
//                                                 className="mr-2"
//                                             />
//                                             True
//                                         </label>
//                                         <label className="ml-4">
//                                             <input
//                                                 type="radio"
//                                                 name={`question${index}`}
//                                                 value="false"
//                                                 checked={answers[`question${index}`] === 'false'}
//                                                 onChange={() => handleAnswerChange(`question${index}`, 'false')}
//                                                 className="mr-2"
//                                             />
//                                             False
//                                         </label>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </form>
//                 </div>
//             ) : (
//                 <div className="mt-6 p-0 m-0">
//                     <DocViewer 
//                         // documents={[{ uri: readingMaterialUri, fileType: "pdf" }]} 
//                         documents={docs} 
//                         pluginRenderers={DocViewerRenderers} 
//                         style={{ height: "100%", padding: 0, margin: 0 }}
//                         onError={(error) => console.error("DocViewer Error:", error)}
//                         config={{ header: { disableHeader: true } }}
//                     />
//                 </div>
//             )}

//             <div className="flex justify-between mt-4">
//                 <button
//                     onClick={handleSubmit}
//                     className="bg-green-500 text-white py-2 px-4 rounded-full"
//                 >
//                     Submit Answers
//                 </button>

//                 <button
//                     onClick={handleNextChapter}
//                     className={`bg-blue-500 text-white py-2 px-4 rounded-full ${isLastChapter ? 'bg-gray-500 cursor-not-allowed' : ''}`}
//                     disabled={isLastChapter}
//                 >
//                     {isLastChapter ? "End of Training" : "Next Chapter"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default  TrainingsDetail;




// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { 
//   fetchChapterByIdStart, 
//   resetChapter, 
//   fetchTrainingChapterByIdStart, 
//   submitChapterAnswerStart
// } from '../../redux/chapterSlice'; // Assuming slices include both actions
// import { saveTrainingAnswersStart } from '../../redux/trainingSlice';
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

// const TrainingsDetail = () => {
//   const [answers, setAnswers] = useState({}); // Tracks current chapter answers
//   const [trainingAnswers, setTrainingAnswers] = useState([]); // Tracks all chapters for the training
//   const [showReadingMaterial, setShowReadingMaterial] = useState(true);
//   const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { trainingId } = useParams();

//   const { trainingChapter, chapter, loading, error } = useSelector((state) => state.chapter);

//   const chapterId = trainingChapter?.chapters?.[currentChapterIndex]?.id;

//   // Fetch chapter data
//   React.useEffect(() => {
//     dispatch(resetChapter());
//     if (chapterId) {
//       dispatch(fetchChapterByIdStart({ id: chapterId }));
//     }
//   }, [dispatch, chapterId]);

//   // Fetch all chapters when component mounts
//   React.useEffect(() => {
//     if (trainingId) {
//       dispatch(fetchTrainingChapterByIdStart({ id: trainingId }));
//     }
//   }, [dispatch, trainingId]);

//   const handleAnswerChange = (questionId, answer) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: answer,
//     }));
//   };
//   console.log(answers)

//   const formatAnswers = (answers, questions) => {
//     return Object.entries(answers).map(([key, value]) => {
//       const questionIndex = parseInt(key.replace('question', ''), 10);
//       const questionId = questions[questionIndex]?.id; // Match with the actual question ID
//       return {
//         questionId,
//         selectedOption: value,
//       };
//     });
//   };
  
//   // Submit answers for the current chapter
//   const handleChapterSubmit = () => {
//     if (chapterId && chapter?.Questions) {
//       const formattedAnswers = formatAnswers(answers, chapter.Questions);
//       dispatch(submitChapterAnswerStart({ chapterId, answers: formattedAnswers }));
//       setTrainingAnswers((prev) => [...prev, { chapterId, answers: formattedAnswers }]);
//       setAnswers({}); // Reset chapter answers
//     }
//   };
  
//   // Submit all training-level answers
//   const handleTrainingSubmit = () => {
//     if (trainingId && trainingAnswers.length > 0) {
//       dispatch(saveTrainingAnswersStart({ trainingId, answers: trainingAnswers }));
//     }
//   };

//   const handleNextChapter = () => {
//     setCurrentChapterIndex((prevIndex) => prevIndex + 1); // Increment chapter index
//   };

//   const docs = [
//     {
//       uri: `http://localhost:5000/${chapter?.readingMaterial.replace(/\\/g, '/')}`,
//       fileType: "pdf",
//     },
//   ];

//   // Check if this is the last chapter
//   const isLastChapter = currentChapterIndex >= (trainingChapter?.chapters?.length || 1) - 1;

//   return (
//     <div className="max-w-6xl mx-auto mt-2 px-6 bg-white rounded-lg shadow-lg p-2">
//       <button
//         onClick={() => setShowReadingMaterial(!showReadingMaterial)}
//         className="mb-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 transition duration-200"
//       >
//         {showReadingMaterial ? "View Questions" : "View Reading Material"}
//       </button>

//       {!showReadingMaterial ? (
//         <div className="mt-6 space-y-4">
//           <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Questions</h2>
//           <form className="space-y-3">
//             {chapter?.Questions?.map((question, index) => (
//               <div key={index} className="p-4 bg-indigo-100 rounded-lg shadow">
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold text-gray-800">{`Q${index + 1}: ${question.questionText}`}</p>
//                 </div>
//                 {question.type === "multiple-choice" && (
//                   <ul className="pl-4 mt-2 space-y-1 text-gray-600 list-none">
//                     {question.options?.map((option, i) => (
//                       <li key={i} className="pl-4 text-gray-700 flex items-center space-x-2">
//                         <input
//                           type="radio"
//                           id={`question${index}-option${i}`}
//                           name={`question${index}`}
//                           value={option}
//                           checked={answers[`question${index}`] === option}
//                           onChange={() => handleAnswerChange(`question${index}`, option)}
//                           className="mr-2"
//                         />
//                         <label htmlFor={`question${index}-option${i}`}>{option}</label>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 {question.type === "true-false" && (
//                   <div className="mt-2">
//                     <label>
//                       <input
//                         type="radio"
//                         name={`question${index}`}
//                         value="true"
//                         checked={answers[`question${index}`] === 'true'}
//                         onChange={() => handleAnswerChange(`question${index}`, 'true')}
//                         className="mr-2"
//                       />
//                       True
//                     </label>
//                     <label className="ml-4">
//                       <input
//                         type="radio"
//                         name={`question${index}`}
//                         value="false"
//                         checked={answers[`question${index}`] === 'false'}
//                         onChange={() => handleAnswerChange(`question${index}`, 'false')}
//                         className="mr-2"
//                       />
//                       False
//                     </label>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </form>
//         </div>
//       ) : (
//         <div className="mt-6 p-0 m-0">
//           <DocViewer
//             documents={docs}
//             pluginRenderers={DocViewerRenderers}
//             style={{ height: "100%", padding: 0, margin: 0 }}
//             onError={(error) => console.error("DocViewer Error:", error)}
//             config={{ header: { disableHeader: true } }}
//           />
//         </div>
//       )}

//       <div className="flex justify-between mt-4">
//         <button
//           onClick={handleChapterSubmit}
//           className="bg-green-500 text-white py-2 px-4 rounded-full"
//         >
//           Submit Chapter Answers
//         </button>

//         <button
//           onClick={handleNextChapter}
//           className={`bg-blue-500 text-white py-2 px-4 rounded-full ${isLastChapter ? 'bg-gray-500 cursor-not-allowed' : ''}`}
//           disabled={isLastChapter}
//         >
//           {isLastChapter ? "End of Training" : "Next Chapter"}
//         </button>

//         {isLastChapter && (
//           <button
//             onClick={handleTrainingSubmit}
//             className="bg-purple-500 text-white py-2 px-4 rounded-full"
//           >
//             Submit Training Answers
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrainingsDetail;



import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChapterByIdStart,
  resetChapter,
  fetchTrainingChapterByIdStart,
  submitChapterAnswerStart,
} from "../../redux/chapterSlice";
import { saveTrainingAnswersStart } from "../../redux/trainingSlice";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const TrainingsDetail = () => {
  const [answers, setAnswers] = useState({});
  const [trainingAnswers, setTrainingAnswers] = useState([]);
  const [showReadingMaterial, setShowReadingMaterial] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { trainingId } = useParams();

  const { trainingChapter, chapter, loading, error } = useSelector(
    (state) => state.chapter
  );

  const chapterId = trainingChapter?.chapters?.[currentChapterIndex]?.id;

  const formatAnswers = (answers, questions) => {
    return {
      answers: Object.entries(answers).map(([key, value]) => {
        const questionIndex = parseInt(key.replace("question", ""), 10);
        const questionId = questions[questionIndex]?.id;

        return {
          questionId,
          selectedOption: value,
        };
      }),
    };
  };

  useEffect(() => {
    dispatch(resetChapter());
    if (chapterId) {
      dispatch(fetchChapterByIdStart({ id: chapterId }));
    }
  }, [dispatch, chapterId]);

  useEffect(() => {
    if (trainingId) {
      dispatch(fetchTrainingChapterByIdStart({ id: trainingId }));
    }
  }, [dispatch, trainingId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleChapterSubmit = () => {
    if (chapterId && chapter?.Questions) {
      const formattedAnswers = formatAnswers(answers, chapter.Questions);
      console.log(formattedAnswers);
      dispatch(submitChapterAnswerStart({ chapterId, ...formattedAnswers }));
      setTrainingAnswers((prev) => [...prev, { chapterId, ...formattedAnswers }]);
      setAnswers({});
    }
  };

  const handleTrainingSubmit = () => {
    if (trainingId && trainingAnswers.length > 0) {
      dispatch(saveTrainingAnswersStart({ trainingId, answers: trainingAnswers }));
    }
  };

  const handleNextChapter = () => {
    setCurrentChapterIndex((prevIndex) => prevIndex + 1);
  };

  const docs = [
    {
      uri: `http://localhost:5000/${chapter?.readingMaterial.replace(/\\/g, "/")}`,
      fileType: "pdf",
    },
  ];

  const isLastChapter = currentChapterIndex >= (trainingChapter?.chapters?.length || 1) - 1;

  return (
    <div className="max-w-6xl mx-auto mt-2 px-6 bg-white rounded-lg shadow-lg p-2">
      <button
        onClick={() => setShowReadingMaterial(!showReadingMaterial)}
        className="mb-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 transition duration-200"
      >
        {showReadingMaterial ? "View Questions" : "View Reading Material"}
      </button>

      {!showReadingMaterial ? (
        <div className="mt-6 space-y-4">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Questions</h2>
          <form className="space-y-3">
            {chapter?.Questions?.map((question, index) => (
              <div key={index} className="p-4 bg-indigo-100 rounded-lg shadow">
                <p className="font-semibold text-gray-800">{`Q${index + 1}: ${question.questionText}`}</p>
                {question.type === "multiple-choice" && (
                  <ul className="pl-4 mt-2 space-y-1 text-gray-600 list-none">
                    {question.options?.map((option, i) => (
                      <li key={i} className="pl-4 text-gray-700 flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`question${index}-option${i}`}
                          name={`question${index}`}
                          value={option}
                          checked={answers[`question${index}`] === option}
                          onChange={() => handleAnswerChange(`question${index}`, option)}
                          className="mr-2"
                        />
                        <label htmlFor={`question${index}-option${i}`}>{option}</label>
                      </li>
                    ))}
                  </ul>
                )}
                {question.type === "true-false" && (
                  <div className="mt-2">
                    <label>
                      <input
                        type="radio"
                        name={`question${index}`}
                        value="true"
                        checked={answers[`question${index}`] === "true"}
                        onChange={() => handleAnswerChange(`question${index}`, "true")}
                        className="mr-2"
                      />
                      True
                    </label>
                    <label className="ml-4">
                      <input
                        type="radio"
                        name={`question${index}`}
                        value="false"
                        checked={answers[`question${index}`] === "false"}
                        onChange={() => handleAnswerChange(`question${index}`, "false")}
                        className="mr-2"
                      />
                      False
                    </label>
                  </div>
                )}
              </div>
            ))}
          </form>
        </div>
      ) : (
        <div className="mt-6">
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            style={{ height: "100%" }}
            config={{ header: { disableHeader: true } }}
          />
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleChapterSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded-full"
        >
          Submit Chapter Answers
        </button>

        <button
          onClick={handleNextChapter}
          className={`bg-blue-500 text-white py-2 px-4 rounded-full ${isLastChapter ? "bg-gray-500 cursor-not-allowed" : ""}`}
          disabled={isLastChapter}
        >
          {isLastChapter ? "End of Training" : "Next Chapter"}
        </button>

        {isLastChapter && (
          <button
            onClick={handleTrainingSubmit}
            className="bg-purple-500 text-white py-2 px-4 rounded-full"
          >
            Submit Training Answers
          </button>
        )}
      </div>
    </div>
  );
};

export default TrainingsDetail;
