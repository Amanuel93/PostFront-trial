//Training detail 2
import React, { useState, useEffect, useMemo  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChapterByIdStart,
  resetChapter,
  fetchTrainingChapterByIdStart,
  submitChapterAnswerStart,
  resetChapterSubmission,
} from "../../redux/chapterSlice";
import { saveTrainingAnswersStart, fetchTrainingByIdStart, resetTraining } from "../../redux/trainingSlice";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { setTrainingAnswers } from "../../redux/timerSlice";

const TrainingsDetail = () => {
  const [answers, setAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [showReadingMaterial, setShowReadingMaterial] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [ isdisabled,setIsdisabled ] = useState(true)
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { trainingId } = useParams();

  // const { timeUp } = useSelector((state) => state.timer);
  // const timeLeft = useSelector((state) => state.timer.timeLeft);
  // console.log(timeLeft);
  
 
  const { chapterSubmissionStatus,trainingChapter, chapter, loading, error } = useSelector((state) => state.chapter);

  const chapterId = trainingChapter?.chapters?.[currentChapterIndex]?.id;
  console.log(chapterSubmissionStatus);

  // Utility: Format answers for submission
  const formatAnswers = (answers, questions) => {
    return {
      answers: Object.entries(answers)
        .map(([key, value]) => {
          const questionIndex = parseInt(key.replace("question", ""), 10);
          const question = questions?.[questionIndex];
          if (!question) return null;
          return { questionId: question.id, selectedOption: value };
        })
        .filter(Boolean), // Remove invalid mappings
    };
  };

  // Effect: Fetch training details
  useEffect(() => {
    dispatch(resetTraining());
    if (trainingId) {
      dispatch(fetchTrainingByIdStart({ id: trainingId }));
    }
  }, [dispatch, trainingId]);

  useEffect(() => {
    dispatch(setTrainingAnswers(submittedAnswers)); 
  }, [dispatch,submittedAnswers]);

  console.log(submittedAnswers)
  
  // Effect: Fetch chapter details
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
  
  // Event Handlers
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };
  
  const handleChapterSubmit = () => {
    if (chapterId && chapter?.Questions) {
      const formattedAnswers = formatAnswers(answers, chapter.Questions);
      dispatch(submitChapterAnswerStart({ chapterId, ...formattedAnswers }));
      setSubmittedAnswers((prev) => [...prev, ...formattedAnswers.answers]);
    }
  };

  
  const handleTrainingSubmit = () => {
    if (trainingId && submittedAnswers.length > 0) {
      dispatch(saveTrainingAnswersStart({ trainingId, answers: submittedAnswers }));
      // navigate("/trainings-summary");
    }
  };
  
  const handleNextChapter = () => {
    if (currentChapterIndex < (trainingChapter?.chapters?.length || 1) - 1) {
      setCurrentChapterIndex((prevIndex) => prevIndex + 1);
      // dispatch(resetChapterSubmission())
      setShowReadingMaterial(true); // Keep reading material visible
      setSubmitDisabled(false)
    }
  };

  useEffect(() => {
    if( !chapterSubmissionStatus?.canProceed){
      setAnswers({});
    }else{
      setIsdisabled(false)
      setSubmitDisabled(true)
      dispatch(resetChapterSubmission())
      setSubmitDisabled(true)
    }
  },[chapterSubmissionStatus?.canProceed])
  
  // const docs = [
  //   {
  //     uri: `http://localhost:5000/${chapter?.readingMaterial.replace(/\\/g, "/")}`,
  //     fileType: "pdf",
  //   },
  // ];

  const docs = useMemo(
    () => [
      {
        uri: `http://localhost:5000/${chapter?.readingMaterial.replace(/\\/g, "/")}`,
        fileType: "pdf",
      },
    ],
    [chapter?.readingMaterial]
  );
  
  const isLastChapter = currentChapterIndex >= (trainingChapter?.chapters?.length || 1) - 1;
  console.log(chapterSubmissionStatus)

  return (
    <div className="max-w-6xl mx-auto mt-2 px-6 bg-white rounded-lg shadow-lg p-2">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
         <div className="flex items-center justify-between">
          <button
            onClick={() => setShowReadingMaterial(!showReadingMaterial)}
            className="mb-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 transition duration-200"
          >
            {showReadingMaterial ? "View Questions" : "View Reading Material"}
          </button>
          {chapterSubmissionStatus && !chapterSubmissionStatus?.canProceed && <p className="text-white/90 bg-red-300 py-2 px-1 rounded-sm">You cannot proceed to the next chapter. Read the material and Try again!</p>}
         </div>
          {!showReadingMaterial ? (
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Questions</h2>
              <form className="space-y-3">
                {chapter?.Questions?.map((question, index) => (
                  <div key={index} className="p-4 bg-indigo-100 rounded-lg shadow flex flex-col">
                    <p className="font-semibold text-gray-800">{`Q${index + 1}: ${question.questionText}`}</p>
                    {question.type === "multiple-choice" && (
                      <ul className="mt-2 space-y-1 text-gray-600 list-none">
                        {question.options?.map((option, i) => (
                          <li key={i} className="pl-4 text-gray-700 flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`question${index}-option${i}`}
                              name={`question${index}`}
                              value={option}
                              checked={answers[`question${index}`] === option}
                              onChange={() => handleAnswerChange(`question${index}`, option)}
                              className="mr-2 w-4 h-4"
                            />
                            <label htmlFor={`question${index}-option${i}`}>{option}</label>
                          </li>
                        ))}
                      </ul>
                    )}
                    {question.type === "true-false" && (
                      <div className="mt-2 fle">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`question${index}`}
                            value="true"
                            checked={answers[`question${index}`] === "true"}
                            onChange={() => handleAnswerChange(`question${index}`, "true")}
                            className="w-4 h-4 mr-2"
                          />
                          True
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`question${index}`}
                            value="false"
                            checked={answers[`question${index}`] === "false"}
                            onChange={() => handleAnswerChange(`question${index}`, "false")}
                            className="w-4 h-4 mr-2 bg-indigo-900"
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
          {
            !showReadingMaterial &&
          <div className="flex justify-between mt-4">
            <button
              onClick={handleChapterSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded-full disabled:bg-green-200 disabled:cursor-not-allowed"
              disabled={submitDisabled}
            >
              Submit Chapter Answers
            </button>

            {!isLastChapter ? (
              <button
                onClick={handleNextChapter}
                className={`bg-blue-500 text-white py-2 px-4 rounded-full disabled:bg-blue-200 disabled:cursor-not-allowed`}
                disabled={isdisabled}
              >
                Next Chapter
              </button>
            ) : (
              <button
                onClick={handleTrainingSubmit}
                className={`bg-purple-500 text-white py-2 px-4 rounded-full disabled:bg-purple-200 disabled:cursor-not-allowed`}
                disabled={isdisabled}
              >
                Submit Training Answers
              </button>
              
            )}
          </div>
         }
        </>
      )}
    </div>
  );
};

export default TrainingsDetail;