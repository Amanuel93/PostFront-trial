import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../../redux/stepperSlice';
import { useNavigate } from 'react-router-dom';


const TrueFalseForm = ({ chapterId,type }) => {
  // State for questions array
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      correctAnswer: '', // 'true' or 'false' field for correct answer
    },
  ]);

  // Handle input changes for questions
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  // Add new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        correctAnswer: '',
      },
    ]);
  };

  // Remove question
  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(questions); // Logic to handle submission
  };

  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const steps = useSelector((state) => state.stepper.steps);

  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handlePrev = () => {
    dispatch(prevStep());
    navigate('/Dashboard/add/chapter');
  };

  return (
    <div className="min-h-screen flex justify-center pt-12">
      <div className="px-8 rounded-lg shadow-lg w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {questions.map((question, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <h3 className="text-gray-800 font-semibold mb-2">Question {index + 1}</h3>

              {/* Question Text */}
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold mb-1">
                  Question Text
                </label>
                <textarea
                  name="description"
                  value={question.description}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your True/False question"
                  rows="2"
                  required
                />
              </div>

              {/* True/False Selection */}
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold mb-1">
                  Correct Answer
                </label>
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

              {/* Remove Question Button */}
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  Remove Question
                </button>
              )}
            </div>
          ))}

          {/* Add New Question Button */}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-indigo-900 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300"
          >
            Add Another Question
          </button>
          <div className="mt-4 flex justify-between px-4 py-2 sm:px-8">
            <button
              onClick={handlePrev}
              disabled={activeStep === 0}
              className="w-14 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65"
            >
              Prev
            </button>
            <div className="flex space-x-2">
             <button
              className="w-18 px-2 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65"
             >
              Add chapter
             </button>
             <button
              className="w-14 py-2 rounded-sm sm:w-32 bg-gray-900 text-white disabled:opacity-65"
             >
              Finish
             </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrueFalseForm;
