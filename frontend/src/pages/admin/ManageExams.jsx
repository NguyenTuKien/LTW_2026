import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ExamForm from '../../components/admin/ExamForm';
import { mockExams } from '../../utils/mockData';

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: Replace with actual API call
    setExams(mockExams);
  }, []);

  const handleCreateExam = () => {
    setSelectedExam(null);
    setIsModalOpen(true);
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      // TODO: API call to delete exam
      setExams(exams.filter((e) => e.id !== examId));
    }
  };

  const handleSubmitExam = (examData) => {
    if (selectedExam) {
      // Update existing exam
      setExams(exams.map((e) => (e.id === selectedExam.id ? { ...examData, id: e.id } : e)));
    } else {
      // Create new exam
      setExams([...exams, { ...examData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={{ name: 'Admin User' }} isAdmin={true} />
      
      <div className="flex">
        <Sidebar isAdmin={true} />
        
        <main className="flex-1 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Manage Exams
              </h1>
              <p className="text-gray-600">
                Create and manage your exams
              </p>
            </div>
            <Button variant="primary" onClick={handleCreateExam}>
              + Create New Exam
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Exams List */}
          <div className="space-y-4">
            {filteredExams.map((exam) => (
              <Card key={exam.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {exam.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          exam.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {exam.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{exam.description}</p>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>📚 {exam.subject}</span>
                      <span>⏱️ {exam.duration} min</span>
                      <span>❓ {exam.totalQuestions} questions</span>
                      <span>📊 {exam.totalPoints} points</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="primary"
                      onClick={() => handleEditExam(exam)}
                      className="text-sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteExam(exam.id)}
                      className="text-sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No exams found</p>
            </div>
          )}
        </main>
      </div>

      {/* Exam Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExam ? 'Edit Exam' : 'Create New Exam'}
      >
        <ExamForm
          exam={selectedExam}
          onSubmit={handleSubmitExam}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ManageExams;
