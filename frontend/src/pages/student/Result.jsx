import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { mockExams } from '../../utils/mockData';

const Result = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const foundExam = mockExams.find((e) => e.id === parseInt(examId));
    setExam(foundExam);

    // Mock result data
    setResult({
      score: 85,
      totalPoints: 100,
      correctAnswers: 17,
      totalQuestions: 20,
      timeTaken: 45,
      percentage: 85,
      passed: true,
      submittedAt: new Date().toISOString(),
    });
  }, [examId]);

  if (!exam || !result) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={{ name: 'Student User' }} isAdmin={false} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Exam Result
            </h1>
            <p className="text-gray-600">{exam.title}</p>
          </div>

          {/* Result Card */}
          <Card className="mb-6">
            <div className="text-center">
              <div
                className={`inline-block px-6 py-3 rounded-full text-2xl font-bold mb-4 ${
                  result.passed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {result.passed ? '✓ PASSED' : '✗ FAILED'}
              </div>
              
              <div className="text-6xl font-bold text-gray-800 mb-2">
                {result.percentage}%
              </div>
              
              <p className="text-xl text-gray-600">
                {result.score} / {result.totalPoints} points
              </p>
            </div>
          </Card>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Correct Answers:</span>
                  <span className="font-semibold">{result.correctAnswers} / {result.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Score:</span>
                  <span className="font-semibold">{result.score} / {result.totalPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-semibold">{result.percentage}%</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Exam Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-semibold">{exam.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Taken:</span>
                  <span className="font-semibold">{result.timeTaken} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{exam.duration} minutes</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button variant="primary" onClick={() => navigate('/student/home')}>
              Back to Home
            </Button>
            <Button variant="secondary" onClick={() => navigate('/student/results')}>
              View All Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
