import React, { useState, useEffect } from 'react';
import './Exam.css';

const Exam = () => {
  // Mock questions data - detailed for first 2, dummy for rest
  const [questions] = useState([
    {
      id: 1,
      text: 'In Java, which of the following keywords is used to prevent a method from being overridden by a subclass?',
      options: [
        { label: 'A', text: 'static' },
        { label: 'B', text: 'const' },
        { label: 'C', text: 'final' },
        { label: 'D', text: 'abstract' }
      ]
    },
    {
      id: 2,
      text: 'What is the main principle of Object-Oriented Programming that allows a subclass to provide a specific implementation of a method already defined in its superclass?',
      options: [
        { label: 'A', text: 'Encapsulation' },
        { label: 'B', text: 'Polymorphism' },
        { label: 'C', text: 'Inheritance' },
        { label: 'D', text: 'Abstraction' }
      ]
    },
    ...Array.from({ length: 28 }, (_, i) => ({
      id: i + 3,
      text: `Câu hỏi ${i + 3}: Lorem ipsum dolor sit amet, consectetur adipiscing elit?`,
      options: [
        { label: 'A', text: 'Đáp án A' },
        { label: 'B', text: 'Đáp án B' },
        { label: 'C', text: 'Đáp án C' },
        { label: 'D', text: 'Đáp án D' }
      ]
    }))
  ]);

  const [currentIndex, setCurrentIndex] = useState(4); // Starting at question 5 (index 4)
  const [answers, setAnswers] = useState({
    0: 'C',
    1: 'A',
    2: 'B',
    3: 'D'
  }); // Mock some answered questions
  const [flagged, setFlagged] = useState(new Set([2])); // Question 3 (index 2) is flagged
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds (01:30:00)

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentIndex(index);
  };

  // Answer selection handler
  const handleAnswerSelect = (optionLabel) => {
    setAnswers({ ...answers, [currentIndex]: optionLabel });
  };

  // Flag toggle handler
  const handleToggleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentIndex)) {
      newFlagged.delete(currentIndex);
    } else {
      newFlagged.add(currentIndex);
    }
    setFlagged(newFlagged);
  };

  // Submit handler
  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    const confirmed = window.confirm(
      `Bạn đã hoàn thành ${answeredCount}/${questions.length} câu hỏi.\nBạn có chắc chắn muốn nộp bài?`
    );
    if (confirmed) {
      alert('Đã nộp bài thành công!');
      // Here you would typically send the answers to the backend
    }
  };

  // Calculate progress
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / questions.length) * 100;

  // Get question status for styling
  const getQuestionStatus = (index) => {
    if (index === currentIndex) return 'current';
    if (answers[index]) return 'answered';
    if (flagged.has(index)) return 'flagged';
    return 'unanswered';
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="exam-container">
      {/* Header */}
      <header className="exam-header">
        <div className="exam-header-left">
          <div className="exam-logo">
            <img src="/ptit-logo.png" alt="PTIT Logo" style={{ height: '32px', width: 'auto' }} />
          </div>
          <h1 className="exam-header-title">Hệ thống thi trực tuyến PTIT</h1>
        </div>
        <div className="exam-header-center">
          <h2 className="exam-title">Thi giữa kỳ Lập trình hướng đối tượng</h2>
        </div>
        <div className="exam-header-right">
          <div className="exam-timer">
            <span className="material-symbols-outlined">timer</span>
            <span className="timer-display">{formatTime(timeLeft)}</span>
          </div>
          <button className="exam-submit-btn" onClick={handleSubmit}>
            Nộp bài
          </button>
        </div>
      </header>

      <div className="exam-content">
        {/* Sidebar */}
        <aside className="exam-sidebar">
          <div className="sidebar-profile">
            <div 
              className="profile-avatar"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuACWa1C7EZ7cdqZtutPr1BwnaOyPtPaCM1PnigzZVrR23Zs_WxNyweUvkl3UUlsiV09qoNsoM659MXQ1tcjQi3EJENqUL-QmSOMhVDAqCudKSdY_CxgKohzzI6PP8HmBljQzvmhrOIkQvDQiaWp9s7igOgFtJYT-Gnpv7sfMVOCQe_mdrxcjfmDf_me8HU3W-5JnyyqAuivxS2d6DTMKGJuTt7PNminRXUU-czPd3vno-3lVZ-AMap-3NWFn_Up-jkAK32tD6AmOoY")' }}
            ></div>
            <div className="profile-info">
              <h3 className="profile-name">Jane Student</h3>
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

        {/* Main content */}
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
    </div>
  );
};

export default Exam;
