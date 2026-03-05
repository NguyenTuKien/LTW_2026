import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import ExamCard from '../../components/student/ExamCard';
import { mockExams } from '../../utils/mockData';

const Home = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // TODO: Replace with actual API call
    setExams(mockExams);
  }, []);

  const handleStartExam = (examId) => {
    navigate(`/student/exam/${examId}`);
  };

  const filteredExams = exams.filter((exam) => {
    if (filter === 'all') return true;
    return exam.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={{ name: 'Student User' }} isAdmin={false} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Available Exams
          </h1>
          <p className="text-gray-600">
            Select an exam to begin your test
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Exams
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded ${
              filter === 'active'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded ${
              filter === 'upcoming'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onStartExam={handleStartExam}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No exams available at this time
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
