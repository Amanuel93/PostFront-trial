import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../../redux/stepperSlice';
import { useNavigate } from 'react-router-dom';
import {
  createQuestionStart,
  updateQuestionStart,
  deleteQuestionStart
} from '../../redux/questionSlice';

const Form = ({ chapterId, type }) => {
  // State for questions array
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '', // New field for correct answer
      type
    },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const steps = useSelector((state) => state.stepper.steps);
  const { loading, error,success,showNext } = useSelector((state) => state.questions);
  const { trainingId } = useSelector((state) => state.training);

  const handleNext = () => {
    dispatch(nextStep());
  };

  const addChapter = () => {
    dispatch(prevStep());
    navigate(`/Dashboard/add/chapter/${trainingId}`);
  };

  // Handle change for each question's inputs
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  // Handle correct answer selection
  const handleCorrectAnswerChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = e.target.value;
    setQuestions(updatedQuestions);
  };

  // Add new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '', // New field for correct answer
        type
      },
    ]);
  };

  // Remove a question
  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Updated backend request format if backend expects { questions: [...] }
    const formattedQuestions = {
    questions: questions.map((question) => {
    const options = [question.optionA, question.optionB, question.optionC, question.optionD];
    const correctAnswerText = options.find(option => option === question.correctAnswer);

    return {
      questionText: question.questionText,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: correctAnswerText, // Send the actual option text
      type: question.type,
        };
       }),
     };
      
      // Dispatch the action with the correctly formatted questions
      dispatch(createQuestionStart({ chapterId, questions: formattedQuestions }));
    };

     // Update a specific question
    const handleUpdateQuestion = (questionId, updatedData) => {
      dispatch(updateQuestionStart({ id: questionId, data: updatedData }));
    };

  // Delete a specific question
  const handleDeleteQuestion = (questionId) => {
    dispatch(deleteQuestionStart({ id: questionId }));
  };



  return (
    <div className="min-h-screen flex justify-center pt-12">
      <div className="px-8 rounded-lg shadow-lg w-full">
         {/* Success/Error Messages */}
         {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
         {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {questions.map((question, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <h3 className="text-gray-800 font-semibold mb-2">Question {index + 1}</h3>

              {/* Question Text */}
              <div className="md:col-span-2 mb-4">
                <label className="block text-gray-600 font-semibold mb-1" htmlFor={`description-${index}`}>
                  Question Text
                </label>
                <textarea
                  id={`description-${index}`}
                  name="questionText"
                  value={question.questionText}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                  placeholder="Enter your question"
                  rows="4"
                  required
                />
              </div>

              {/* Options A-D */}
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

              {/* Correct Answer */}
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

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove Question
                </button>
                {index === questions.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-yellow-300 text-black px-4 py-2 rounded-lg"
                  >
                    Add Question
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-700 text-white px-6 py-2 rounded-lg mt-4"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Questions'}
          </button>

          {/* Error message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <div className="mt-4 flex justify-between px-4 py-2 sm:px-8">
             {
              showNext
               &&
            <button
              onClick={addChapter}
              className="w-18 px-2 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65"
            >
              Add chapter
            </button>
             }

            <button
              className="w-14 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65"
            >
              Finish
            </button>
        </div>
      </div>
    </div>
  );
};

export default Form;