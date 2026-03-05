import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Timer from '../../components/student/Timer';
import QuestionBoard from '../../components/student/QuestionBoard';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { mockExams, mockQuestions } from '../../utils/mockData';

const Exam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    const foundExam = mockExams.find((e) => e.id === parseInt(examId));
    setExam(foundExam);
    setQuestions(mockQuestions);
  }, [examId]);

  const handleAnswerChange = (questionId, answerId) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };

  const handleTimeUp = () => {
    alert('Time is up! Your exam will be submitted automatically.');
    handleSubmitExam();
  };

  const handleSubmitClick = () => {
    setShowSubmitModal(true);
  };

  const handleSubmitExam = () => {
    // TODO: Submit answers to API
    console.log('Submitting answers:', answers);
    navigate(`/student/result/${examId}`);
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  if (!exam) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={{ name: 'Student User' }} isAdmin={false} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{exam.title}</h1>
          <p className="text-gray-600">
            Progress: {answeredCount}/{totalQuestions} questions answered
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Timer Sidebar */}
          <div className="lg:col-span-1">
            <Timer duration={exam.duration} onTimeUp={handleTimeUp} />
            
            <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
              <h3 className="font-semibold mb-2">Exam Info</h3>
              <div className="text-sm space-y-2">
                <p>Subject: <span className="font-semibold">{exam.subject}</span></p>
                <p>Total Points: <span className="font-semibold">{exam.totalPoints}</span></p>
                <p>Duration: <span className="font-semibold">{exam.duration} min</span></p>
              </div>
            </div>
          </div>

          {/* Question Board */}
          <div className="lg:col-span-3">
            <QuestionBoard
              questions={questions}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleSubmitClick}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            />
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Exam"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSubmitExam}>
              Submit
            </Button>
          </>
        }
      >
        <p>
          You have answered {answeredCount} out of {totalQuestions} questions.
        </p>
        {answeredCount < totalQuestions && (
          <p className="text-red-600 mt-2">
            Warning: You have not answered all questions!
          </p>
        )}
        <p className="mt-4">Are you sure you want to submit your exam?</p>
      </Modal>
    </div>
  );
};

export default Exam;
