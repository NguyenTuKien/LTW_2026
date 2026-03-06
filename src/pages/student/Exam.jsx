import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EXAMS_BY_ID } from '../../data/examQuestionsData';
import { getCurrentUser } from '../../utils/auth';
import '../../styles/student/Exam.css';

const Exam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const examData = EXAMS_BY_ID[examId];

  const [questions] = useState(examData ? examData.questions : []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(examData ? examData.duration * 60 : 0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Submit handler
  const handleSubmit = useCallback(() => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    // Build result data matching studentExamResultData format
    const resultData = {
      examName: examData.title,
      examCode: examId.toUpperCase(),
      studentName: user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'Student',
      studentCode: 'B20DCCN123',
      submittedAt: new Date().toISOString(),
      durationMinutes: Math.ceil((examData.duration * 60 - timeLeft) / 60),
      passScore: 5,
      questions: questions.map((q, i) => {
        const selectedLabel = answers[i] || null;
        const selectedOption = selectedLabel ? q.options.find(o => o.label === selectedLabel) : null;
        const correctOption = q.options.find(o => o.label === q.correctAnswer);
        return {
          id: i + 1,
          topic: examData.title.split(' - ')[0],
          text: q.text,
          options: q.options.map(o => o.text),
          selectedAnswer: selectedOption ? selectedOption.text : '',
          correctAnswer: correctOption ? correctOption.text : '',
          explanation: '',
        };
      }),
    };

    // Store result in sessionStorage for Result page to consume
    sessionStorage.setItem('lastExamResult', JSON.stringify(resultData));
    navigate('/student/result');
  }, [isSubmitted, examData, examId, user, timeLeft, questions, answers, navigate]);

  useEffect(() => {
    if (!examData || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examData, isSubmitted, handleSubmit]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleJumpToQuestion = (index) => {
    setCurrentIndex(index);
  };

  const handleAnswerSelect = (optionLabel) => {
    setAnswers({ ...answers, [currentIndex]: optionLabel });
  };

  const handleToggleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentIndex)) {
      newFlagged.delete(currentIndex);
    } else {
      newFlagged.add(currentIndex);
    }
    setFlagged(newFlagged);
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercentage = questions.length ? (answeredCount / questions.length) * 100 : 0;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = flagged.size;

  const getQuestionStatus = (index) => {
    if (index === currentIndex) return 'current';
    if (flagged.has(index) && answers[index]) return 'answered flagged';
    if (answers[index]) return 'answered';
    if (flagged.has(index)) return 'flagged';
    return 'unanswered';
  };

  if (!examData) {
    return (
      <div className="exam-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Không tìm thấy bài thi</h2>
          <p>Bài thi bạn đang tìm không tồn tại.</p>
          <button onClick={() => navigate('/student')} style={{ marginTop: '16px', padding: '10px 24px', cursor: 'pointer' }}>
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const totalSeconds = examData.duration * 60;
  const timePercent = (timeLeft / totalSeconds) * 100;
  const isTimeLow = timePercent <= 10;
  const isTimeMed = timePercent <= 25 && !isTimeLow;

  return (
    <div className="exam-container">
      <header className="exam-header">
        <div className="exam-header-left">
          <div className="exam-logo">
            <img src="/ptit-logo.png" alt="PTIT Logo" style={{ height: '32px', width: 'auto' }} />
          </div>
          <h1 className="exam-header-title">Hệ thống thi trực tuyến PTIT</h1>
        </div>
        <div className="exam-header-center">
          <h2 className="exam-title">{examData.title}</h2>
        </div>
        <div className="exam-header-right">
          <div className={`exam-timer${isTimeLow ? ' timer-danger' : isTimeMed ? ' timer-warning' : ''}`}>
            <span className="material-symbols-outlined">timer</span>
            <span className="timer-display">{formatTime(timeLeft)}</span>
          </div>
          <button className="exam-submit-btn" onClick={() => setShowSubmitModal(true)}>
            Nộp bài
          </button>
        </div>
      </header>

      <div className="exam-content">
        <aside className="exam-sidebar">
          <div className="sidebar-profile">
            <div
              className="profile-avatar"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuACWa1C7EZ7cdqZtutPr1BwnaOyPtPaCM1PnigzZVrR23Zs_WxNyweUvkl3UUlsiV09qoNsoM659MXQ1tcjQi3EJENqUL-QmSOMhVDAqCudKSdY_CxgKohzzI6PP8HmBljQzvmhrOIkQvDQiaWp9s7igOgFtJYT-Gnpv7sfMVOCQe_mdrxcjfmDf_me8HU3W-5JnyyqAuivxS2d6DTMKGJuTt7PNminRXUU-czPd3vno-3lVZ-AMap-3NWFn_Up-jkAK32tD6AmOoY")' }}
            ></div>
            <div className="profile-info">
              <h3 className="profile-name">{user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'Student'}</h3>
              <p className="profile-code">Mã SV: B20DCCN123</p>
            </div>
          </div>

          <div className="sidebar-progress">
            <div className="progress-header">
              <span>Tiến độ</span>
              <span className="progress-count">Câu hỏi {answeredCount} / {questions.length}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          <div className="sidebar-questions">
            <h3 className="questions-title">DANH SÁCH CÂU HỎI</h3>

            <div className="questions-legend">
              <div className="legend-item">
                <span className="legend-icon answered"></span>
                <span>Đã làm</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon flagged"></span>
                <span>Đã đánh dấu</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon current"></span>
                <span>Đang chọn</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon unanswered"></span>
                <span>Chưa làm</span>
              </div>
            </div>

            <div className="questions-grid">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`question-number ${getQuestionStatus(index)}`}
                  onClick={() => handleJumpToQuestion(index)}
                >
                  {index + 1}
                  {flagged.has(index) && (
                    <span className="flag-icon material-symbols-outlined">flag</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="exam-main">
          <div className="question-container">
            <div className="question-header">
              <h2 className="question-number-title">Câu hỏi {currentIndex + 1}</h2>
              <button
                className={`flag-btn ${flagged.has(currentIndex) ? 'flagged' : ''}`}
                onClick={handleToggleFlag}
              >
                <span className="material-symbols-outlined">flag</span>
                <span>Đánh dấu câu hỏi</span>
              </button>
            </div>

            <div className="question-text">
              <p>{currentQuestion.text}</p>
            </div>

            <div className="options-list">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.label}
                  className={`option-item ${answers[currentIndex] === option.label ? 'selected' : ''}`}
                >
                  <div className="option-label">{option.label}</div>
                  <input
                    type="radio"
                    name={`question-${currentIndex}`}
                    checked={answers[currentIndex] === option.label}
                    onChange={() => handleAnswerSelect(option.label)}
                  />
                  <span className="option-text">{option.text}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            <button
              className="nav-btn prev-btn"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Quay lại
            </button>
            <button
              className="nav-btn next-btn"
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
            >
              Tiếp theo
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </main>
      </div>

      {showSubmitModal && (
        <div className="exam-modal-overlay" onClick={() => setShowSubmitModal(false)}>
          <div className="exam-modal" onClick={(e) => e.stopPropagation()}>
            <div className="exam-modal-icon">
              <span className="material-symbols-outlined">assignment_turned_in</span>
            </div>
            <h3>Xác nhận nộp bài</h3>

            <div className="exam-modal-stats">
              <div className="exam-modal-stat">
                <span className="modal-stat-value answered-val">{answeredCount}</span>
                <span className="modal-stat-label">Đã làm</span>
              </div>
              <div className="exam-modal-stat">
                <span className="modal-stat-value unanswered-val">{unansweredCount}</span>
                <span className="modal-stat-label">Chưa làm</span>
              </div>
              <div className="exam-modal-stat">
                <span className="modal-stat-value flagged-val">{flaggedCount}</span>
                <span className="modal-stat-label">Đánh dấu</span>
              </div>
            </div>

            <p className="exam-modal-total">
              Tổng: <strong>{answeredCount}/{questions.length}</strong> câu đã trả lời
            </p>

            {unansweredCount > 0 && (
              <div className="exam-modal-warning">
                <span className="material-symbols-outlined">warning</span>
                <span>Bạn còn <strong>{unansweredCount} câu</strong> chưa trả lời. Bạn có chắc chắn muốn nộp?</span>
              </div>
            )}

            <div className="exam-modal-actions">
              <button className="exam-modal-cancel" onClick={() => setShowSubmitModal(false)}>
                Tiếp tục làm bài
              </button>
              <button className="exam-modal-confirm" onClick={handleSubmit}>
                <span className="material-symbols-outlined">send</span>
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;
