
import React, { useState } from 'react';
import Deletealert from './Deletealert'
import { useNavigate, useParams } from 'react-router-dom';
import {  fetchChapterByIdStart,resetChapter } from '../../redux/chapterSlice';
import { useDispatch, useSelector } from "react-redux";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";

const ChapterContent = () => {
    const [showQuestions, setShowQuestions] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { chapterId } = useParams();

    const { chapter, loading, error} = useSelector((state) => state.chapter);
     React.useEffect(() => {

        // Reset training data in Redux before fetching new data
        dispatch(resetChapter());

        if (chapterId) {
            dispatch(fetchChapterByIdStart({ id: chapterId }));
        }
     }, [dispatch, chapterId]);
     
     console.log(chapter)

    const questions = chapter?.Questions || [];

    const onDelete = (index) => {
        setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
    };

    const  Navigate = () => {
        navigate(`/Dashboard/add/question/${chapterId}`);
      };

    const docs = [
        { 
            // uri: chapterd.readingMaterial,
            uri: `http://localhost:5000/${chapter?.readingMaterial.replace(/\\/g, '/')}`,
            fileType: "pdf",
        }
    ];

    return (
        <div className="max-w-6xl mx-auto mt-2 px-6 bg-white rounded-lg shadow-lg p-2">
            <button
                onClick={() => setShowQuestions(!showQuestions)}
                className="mb-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 transition duration-200"
            >
                {showQuestions ? "View Reading Material" : "View Questions"}
            </button>

            {!showQuestions ? (
                <div className="mt-1 p-0 m-0">
                    <DocViewer 
                      key={showQuestions ? 'questions' : 'readingMaterial'}
                      documents={docs} 
                    //   initialActiveDocument={docs[1]}
                      style={{ height:"100%",padding:0, margin: 0 }}
                      pluginRenderers={DocViewerRenderers} 
                      onError={(error) => console.error("DocViewer Error:", error)}
                      config={{ header: { disableHeader: true } }}
                      />
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Questions</h2>
                    <ul className="space-y-4">
                        {questions.map((question, index) => (
                            <li key={index} className="p-4 bg-indigo-100 rounded-lg shadow">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-800">{`Q${index + 1}: ${question.questionText}`}</p>
                                    <button
                                        onClick={() => onDelete(index)}
                                        className="text-red-600 font-semibold hover:underline"
                                    >
                                       <Deletealert onDelete={() => onDelete(index)} section='question'/>
                                    </button>
                                </div>
                                
                                {question.type === "multiple-choice" && (
                                    <ul className="pl-4 mt-2 space-y-1 text-gray-600 list-none">
                                        {/* <li>A: {question.optionA}</li>
                                        <li>B: {question.optionB}</li>
                                        <li>C: {question.optionC}</li>
                                        <li>D: {question.optionD}</li> */}
                                        {question.options?.map((option, index) => (
                                        <li
                                         key={index}
                                         className="pl-4 text-gray-700 flex items-center space-x-2"
                                        >
                                       {/* Display the alphabet letter */}
                                       <span className="font-bold">
                                        {String.fromCharCode(65 + index)}:
                                       </span>
                                      {/* Display the name */}
                                      <span>{option}</span>
                                     </li>
                                       ))}
                                    </ul>
                                    )}
                                  {question.type === "true-false" && (
                                    <p className="mt-2 text-gray-600">Type: True/False</p>
                                )}
                             <p className="mt-2 text-sm text-black"><span className='text-green-800'>Correct Answer: </span>{question.correctAnswer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
              {
                showQuestions
                  &&
              <div className="w-full flex justify-end" onClick={Navigate}>
                <button className='bg-black text-white p-3 rounded-sm mt-2'>Add other question</button>
              </div>
            }
        </div>
     );
   };

export default ChapterContent;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchChapterByIdStart, resetChapter } from '../../redux/chapterSlice';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const ChapterContent = () => {
//     const [showQuestions, setShowQuestions] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { chapterId } = useParams();
    
//     const { chapter, loading, error } = useSelector((state) => state.chapter);
    
//     useEffect(() => {
//         dispatch(resetChapter());
//         if (chapterId) {
//             dispatch(fetchChapterByIdStart({ id: chapterId }));
//         }
//     }, [dispatch, chapterId]);
    
//     const questions = chapter?.Questions || [];
//     const readingMaterialPath = chapter?.readingMaterial ? chapter.readingMaterial.replace(/\\/g, '/') : '';
//     const pdfUrl = readingMaterialPath ? `http://localhost:5000${readingMaterialPath}` : '';

//     // Log the pdfUrl for debugging
//     console.log("PDF URL:", pdfUrl);

//     const onDelete = (index) => {
//         setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
//     };

//     const handleNavigate = () => {
//         navigate(`/Dashboard/add/question/${chapterId}`);
//     };

//     return (
//         <div className="max-w-6xl mx-auto mt-2 px-6 bg-white rounded-lg shadow-lg p-2">
//             <button
//                 onClick={() => setShowQuestions(!showQuestions)}
//                 className="mb-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 transition duration-200"
//             >
//                 {showQuestions ? "View Reading Material" : "View Questions"}
//             </button>

//             {!showQuestions ? (
//                 <div className="mt-1">
//                     {pdfUrl ? (
//                         <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//                           <Viewer fileUrl={pdfUrl} />
//                         </Worker>
                    
//                     ) : (
//                         <p className="text-red-500">No valid reading material available.</p>
//                     )}
//                 </div>
//             ) : (
//                 <div className="mt-6 space-y-4">
//                     <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Questions</h2>
//                     <ul className="space-y-4">
//                         {questions.map((question, index) => (
//                             <li key={index} className="p-4 bg-indigo-100 rounded-lg shadow">
//                                 <div className="flex justify-between items-center">
//                                     <p className="font-semibold text-gray-800">{`Q${index + 1}: ${question.questionText}`}</p>
//                                     <button
//                                         onClick={() => onDelete(index)}
//                                         className="text-red-600 font-semibold hover:underline"
//                                     >
//                                         <Deletealert onDelete={() => onDelete(index)} section="question" />
//                                     </button>
//                                 </div>
                                
//                                 {question.type === "multiple-choice" && (
//                                     <ul className="pl-4 mt-2 space-y-1 text-gray-600 list-none">
//                                         {question.options?.map((option, idx) => (
//                                             <li key={idx} className="pl-4 text-gray-700 flex items-center space-x-2">
//                                                 <span className="font-bold">{String.fromCharCode(65 + idx)}:</span>
//                                                 <span>{option}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}

//                                 {question.type === "true-false" && (
//                                     <p className="mt-2 text-gray-600">Type: True/False</p>
//                                 )}
                                
//                                 <p className="mt-2 text-sm text-black">
//                                     <span className='text-green-800'>Correct Answer: </span>{question.correctAnswer}
//                                 </p>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
            
//             {showQuestions && (
//                 <div className="w-full flex justify-end" onClick={handleNavigate}>
//                     <button className='bg-black text-white p-3 rounded-sm mt-2'>Add another question</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChapterContent;
