import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../../redux/stepperSlice';
import { useNavigate } from 'react-router-dom';
import {
  createQuestionStart,
  clearStatus,
  updateQuestionStart,
  deleteQuestionStart
} from '../../redux/questionSlice';
import Spinners from '../Common/spinner';

const EncodeSection = ({ chapterId}) => {
  // State for multiple-choice and true/false questions
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      type: '' // Tracks whether it's "multiple-choice" or "true-false"
    },
  ]);
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const steps = useSelector((state) => state.stepper.steps);
  const { loading, error, success, showNext } = useSelector((state) => state.questions);
  const { trainingId } = useSelector((state) => state.training);

  // const handleNext = () => {
  //   dispatch(nextStep());
  // };

  const addChapter = () => {
    dispatch(prevStep());
    navigate(`/Dashboard/add/chapter/${trainingId}`);
  };

  // Handle input changes for multiple-choice and true/false questions
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };


  // Handle correct answer selection for multiple-choice questions
  const handleCorrectAnswerChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = e.target.value;
    setQuestions(updatedQuestions);
  };

  // Add a new question of the specified type
  const handleAddQuestion = (questionType) => {
    const newQuestion = questionType === 'multiple-choice' ? {
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      type: 'multiple-choice',
    } : {
      questionText: '',
      correctAnswer: '',
      type: 'true-false',
    };

    console.log(questionType)
    setQuestions([...questions, newQuestion]);
  };

  // Remove a question
  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedQuestions = {
        questions: questions.map((question) => {
          if (question.type === 'multiple-choice') {
            const options = [question.optionA, question.optionB, question.optionC, question.optionD];
            const correctAnswerText = options.find(option => option === question.correctAnswer);
            return {
              questionText: question.questionText,
              optionA: question.optionA,
              optionB: question.optionB,
              optionC: question.optionC,
              optionD: question.optionD,
              correctAnswer: correctAnswerText,
              type: question.type,
            };
          }
          return {
            questionText: question.questionText,
            correctAnswer: question.correctAnswer,
            type: 'true-false',
          };
        }),
      };
      
    console.log(formattedQuestions);
    dispatch(createQuestionStart({ chapterId, questions: formattedQuestions,trainingId }));
  };

  useEffect(()=>{
      if(success){
        setIsDisabled(true)
      }
    },[success])

  useEffect(() => {
      // Clear success or error messages after 2 seconds
      if (success || error) {
        const timer = setTimeout(() => {
          dispatch(clearStatus());
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [success, error, dispatch]);

  return (
    <div className="min-h-screen flex justify-center pt-3">
      <div className="px-8 rounded-lg shadow-lg w-full">
        {success && <p className="bg-green-200 text-green-700 max-w-md p-2 rounded-sm">{success}</p>}
        {error && <p className="bg-red-200 text-red-700 max-w-md p-2 rounded-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 pt-2">
          {questions.map((question, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <h3 className="text-gray-800 font-semibold mb-2">Question {index + 1}</h3>
              
              {/* Question Text */}
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold mb-1">Question Text</label>
                <textarea
                  name="questionText"
                  value={question.questionText}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your question"
                  rows="4"
                  required
                />
              </div>

              {question.type === 'multiple-choice' ? (
                <>
                  {/* Options A-D for multiple-choice questions */}
                  {['A', 'B', 'C', 'D'].map((option, optIndex) => (
                    <div key={optIndex} className="mb-4">
                      <label className="block text-gray-600 font-semibold mb-1">{`Option ${option}`}</label>
                      <input
                        type="text"
                        name={`option${option}`}
                        value={question[`option${option}`]}
                        onChange={(e) => handleChange(index, e)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder={`Enter option ${option}`}
                        required
                      />
                    </div>
                  ))}

                  {/* Correct Answer Selection */}
                  <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-1">Correct Answer</label>
                    <select
                      name="correctAnswer"
                      value={question.correctAnswer}
                      onChange={(e) => handleCorrectAnswerChange(index, e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Select correct answer</option>
                      {['A', 'B', 'C', 'D'].map((option) => (
                        <option key={option} value={question[`option${option}`]}>
                          Option {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  {/* Correct Answer for true/false questions */}
                  <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-1">Correct Answer</label>
                    <select
                      name="correctAnswer"
                      value={question.correctAnswer}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Select Correct Answer</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove Question
                </button>
              </div>
            </div>
          ))}

          {/* Add Question Buttons for Multiple Choice and True/False */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleAddQuestion('multiple-choice')}
              className="bg-yellow-300 text-black px-4 py-2 rounded-lg"
            >
              Add Multiple Choice Question
            </button>
            <button
              type="button"
              onClick={() => handleAddQuestion('true-false')}
              className="bg-green-300 text-black px-4 py-2 rounded-lg"
            >
              Add True/False Question
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-700 text-white px-6 py-2 rounded-lg mt-4 disabled:bg-indigo-200 disabled:cursor-not-allowed"
            disabled={loading || isDisabled}
          >
            {loading ? <Spinners/> : 'Submit Questions'}
          </button>

          {/* Navigation Buttons */}
          <div className="mt-4 flex justify-between px-4 py-2 sm:px-8">
            {showNext && (
              <button
                onClick={addChapter}
                className="w-18 px-2 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65"
              >
                Add chapter
              </button>
            )}
            {/* <button
              className="w-14 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65"
            >
              Finish
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EncodeSection;
