import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import StatCard from '../../components/admin/StatCard';
import { mockStats } from '../../utils/mockData';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    setStats(mockStats);
  }, []);

  if (!stats) {
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
              Dashboard
            </h1>
            <p className="text-gray-600">
              Overview of your exam system
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              icon="👥"
              color="blue"
              trend={{ value: '+12%', isPositive: true }}
            />
            <StatCard
              title="Total Exams"
              value={stats.totalExams}
              icon="📝"
              color="green"
              trend={{ value: '+5', isPositive: true }}
            />
            <StatCard
              title="Active Exams"
              value={stats.activeExams}
              icon="✅"
              color="yellow"
            />
            <StatCard
              title="Avg Score"
              value={`${stats.averageScore}%`}
              icon="📊"
              color="purple"
              trend={{ value: '+3%', isPositive: true }}
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Recent Submissions</h2>
              <div className="space-y-4">
                {stats.recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold">{submission.studentName}</p>
                      <p className="text-sm text-gray-600">{submission.examTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{submission.score}%</p>
                      <p className="text-xs text-gray-500">{submission.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Upcoming Exams</h2>
              <div className="space-y-4">
                {stats.upcomingExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold">{exam.title}</p>
                      <p className="text-sm text-gray-600">{exam.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{exam.date}</p>
                      <p className="text-xs text-gray-500">{exam.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
