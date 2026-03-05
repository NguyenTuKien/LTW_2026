import React, { useState } from 'react';
import Button from '../common/Button';

const QuestionBoard = ({ questions, answers, onAnswerChange, onSubmit, currentQuestion, setCurrentQuestion }) => {
  const question = questions[currentQuestion];

  const handleAnswerSelect = (questionId, answerId) => {
    onAnswerChange(questionId, answerId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Question Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded ${
                answers[q.id]
                  ? 'bg-green-500 text-white'
                  : currentQuestion === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <span className="text-sm text-gray-600">
            Points: {question.points}
          </span>
        </div>
        <p className="text-gray-800 mb-4">{question.text}</p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <label
              key={option.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                answers[question.id] === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={answers[question.id] === option.id}
                onChange={() => handleAnswerSelect(question.id, option.id)}
                className="mr-3"
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        {currentQuestion === questions.length - 1 ? (
          <Button variant="success" onClick={onSubmit}>
            Submit Exam
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionBoard;
