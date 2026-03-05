import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const ExamCard = ({ exam, onStartExam }) => {
  return (
    <Card className="hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{exam.title}</h3>
          <p className="text-gray-600 mt-1">{exam.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          exam.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {exam.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-sm">
          <span className="text-gray-600">Duration:</span>
          <span className="ml-2 font-semibold">{exam.duration} minutes</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Questions:</span>
          <span className="ml-2 font-semibold">{exam.totalQuestions}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Total Points:</span>
          <span className="ml-2 font-semibold">{exam.totalPoints}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Subject:</span>
          <span className="ml-2 font-semibold">{exam.subject}</span>
        </div>
      </div>
      
      <Button 
        variant="primary" 
        onClick={() => onStartExam(exam.id)}
        disabled={exam.status !== 'active'}
        className="w-full"
      >
        {exam.status === 'active' ? 'Start Exam' : 'Not Available'}
      </Button>
    </Card>
  );
};

export default ExamCard;
