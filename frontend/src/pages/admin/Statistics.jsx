import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import { mockStatistics } from '../../utils/mockData';

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    // TODO: Replace with actual API call
    setStatistics(mockStatistics);
  }, [selectedPeriod]);

  if (!statistics) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={{ name: 'Admin User' }} isAdmin={true} />
      
      <div className="flex">
        <Sidebar isAdmin={true} />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Statistics & Analytics
            </h1>
            <p className="text-gray-600">
              Detailed insights into exam performance
            </p>
          </div>

          {/* Period Filter */}
          <div className="mb-6 flex gap-2">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded capitalize ${
                  selectedPeriod === period
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <h3 className="text-lg font-semibold mb-2">Total Submissions</h3>
              <p className="text-4xl font-bold text-blue-600">
                {statistics.totalSubmissions}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                +{statistics.submissionsGrowth}% from last {selectedPeriod}
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">Average Score</h3>
              <p className="text-4xl font-bold text-green-600">
                {statistics.averageScore}%
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {statistics.scoreChange > 0 ? '+' : ''}{statistics.scoreChange}% from last {selectedPeriod}
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-2">Pass Rate</h3>
              <p className="text-4xl font-bold text-purple-600">
                {statistics.passRate}%
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {statistics.passRateChange > 0 ? '+' : ''}{statistics.passRateChange}% from last {selectedPeriod}
              </p>
            </Card>
          </div>

          {/* Subject Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <h2 className="text-xl font-bold mb-4">Performance by Subject</h2>
              <div className="space-y-4">
                {statistics.subjectPerformance.map((subject) => (
                  <div key={subject.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">{subject.name}</span>
                      <span className="text-gray-600">{subject.average}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${subject.average}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4">Top Performing Students</h2>
              <div className="space-y-3">
                {statistics.topStudents.map((student, index) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0
                            ? 'bg-yellow-400 text-yellow-900'
                            : index === 1
                            ? 'bg-gray-300 text-gray-700'
                            : index === 2
                            ? 'bg-orange-300 text-orange-900'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="font-semibold">{student.name}</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      {student.averageScore}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Trends */}
          <Card>
            <h2 className="text-xl font-bold mb-4">Exam Difficulty Analysis</h2>
            <div className="space-y-4">
              {statistics.examDifficulty.map((exam) => (
                <div key={exam.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{exam.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Avg: {exam.averageScore}%
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          exam.difficulty === 'easy'
                            ? 'bg-green-100 text-green-800'
                            : exam.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {exam.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Attempts: </span>
                      <span className="font-semibold">{exam.attempts}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Pass Rate: </span>
                      <span className="font-semibold">{exam.passRate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Time: </span>
                      <span className="font-semibold">{exam.avgTime} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Statistics;
