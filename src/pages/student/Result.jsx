import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { examResult as defaultExamResult } from '../../data/studentExamResultData';
import { getCurrentUser, logout, getUserAvatar } from '../../utils/auth';
import '../../styles/studentDashboard.css';
import './Result.css';

function Result() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromHistory = searchParams.get('from') === 'history';

  // Navbar state (when from history)
  const user = getCurrentUser();
  const avatarUrl = getUserAvatar();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const username = user?.username || 'Student';
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const navLinks = [
    { label: 'Trang chủ', path: '/student' },
    { label: 'Lịch sử thi', path: '/student/history' },
  ];

  useEffect(() => {
    function handleClick(e) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Load result data
  let examResult = defaultExamResult;
  const storedResult = sessionStorage.getItem('lastExamResult');
  if (storedResult) {
    try {
      examResult = JSON.parse(storedResult);
    } catch (e) {
      // fallback to default
    }
  }

  const totalQuestions = examResult.questions.length;
  const correctCount = examResult.questions.filter(
    (q) => q.selectedAnswer === q.correctAnswer
  ).length;
  const wrongCount = totalQuestions - correctCount;
  const score = Number(((correctCount / totalQuestions) * 10).toFixed(1));
  const isPassed = score >= examResult.passScore;

  // Ring animation
  const ringRadius = 58;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const targetOffset = ringCircumference - (correctCount / totalQuestions) * ringCircumference;

  const [ringOffset, setRingOffset] = useState(ringCircumference); // start empty

  useEffect(() => {
    // Small delay to trigger CSS transition
    const timer = setTimeout(() => {
      setRingOffset(targetOffset);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetOffset]);

  const handleBackToDashboard = () => {
    sessionStorage.removeItem('lastExamResult');
    navigate(fromHistory ? '/student/history' : '/student');
  };

  return (
    <div className={`result-page${fromHistory ? ' with-navbar' : ''}`}>
      {/* Student Navbar (when from history) */}
      {fromHistory && (
        <header className="sd-navbar">
          <div className="sd-navbar-inner">
            <div className="sd-navbar-brand">
              <img src="/ptit-logo.png" alt="PTIT Logo" style={{ height: '32px', width: 'auto' }} />
              <span className="sd-brand-name">Hệ thống thi trực tuyến PTIT</span>
            </div>
            <nav className="sd-nav-links">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  className={`sd-nav-link${link.label === 'Lịch sử thi' ? ' active' : ''}`}
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="sd-navbar-right">
              <button className="sd-icon-btn" aria-label="Thông báo">
                <ion-icon name="notifications" style={{ fontSize: 'inherit' }}></ion-icon>
                <span className="sd-badge">3</span>
              </button>
              <div className="sd-profile-wrap" ref={profileMenuRef}>
                <button
                  className="sd-profile-btn"
                  onClick={() => setProfileMenuOpen((v) => !v)}
                  aria-expanded={profileMenuOpen}
                  aria-label="Tài khoản"
                >
                  <div className="sd-avatar">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="sd-avatar-img" />
                    ) : (
                      <ion-icon name="person-circle" style={{ fontSize: 'inherit' }}></ion-icon>
                    )}
                  </div>
                </button>
                {profileMenuOpen && (
                  <div className="sd-dropdown">
                    <div className="sd-dropdown-user">
                      <div className="sd-dropdown-avatar">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="Avatar" className="sd-dropdown-avatar-img" />
                        ) : (
                          <ion-icon name="person-circle" style={{ fontSize: 'inherit' }}></ion-icon>
                        )}
                      </div>
                      <div>
                        <div className="sd-dropdown-name">{displayName}</div>
                        <div className="sd-dropdown-role">Sinh viên</div>
                      </div>
                    </div>
                    <div className="sd-dropdown-divider" />
                    <button className="sd-dropdown-item" onClick={() => { setProfileMenuOpen(false); navigate('/profile'); }}>
                      <ion-icon name="person" style={{ fontSize: 'inherit' }}></ion-icon> Tài khoản
                    </button>
                    <button className="sd-dropdown-item sd-dropdown-item--disabled" disabled>
                      <ion-icon name="settings" style={{ fontSize: 'inherit' }}></ion-icon> Cài đặt
                    </button>
                    <div className="sd-dropdown-divider" />
                    <button className="sd-dropdown-logout" onClick={handleLogout}>
                      <ion-icon name="log-out" style={{ fontSize: 'inherit' }}></ion-icon> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="result-wrapper">
        {/* Back button */}
        <div className="result-back-row">
          <button className="result-back-btn" onClick={handleBackToDashboard}>
            <ion-icon name="arrow-back"></ion-icon>
            Quay lại Trang chủ
          </button>
        </div>

        {/* Summary Card */}
        <section className="result-summary">
          <div className="result-summary-accent"></div>
          <div className="result-summary-body">
            <div className="summary-header">
              <div>
                <h1>KẾT QUẢ BÀI THI</h1>
                <p>Bạn đã hoàn thành bài thi {examResult.examName}.</p>
              </div>
              <div className={`result-status ${isPassed ? 'pass' : 'fail'}`}>
                <span className="status-icon">{isPassed ? '✓' : '✕'}</span>
                <span>{isPassed ? 'Đạt' : 'Không đạt'}</span>
              </div>
            </div>

            <div className="result-overview">
              {/* Score Ring */}
              <div className="score-ring-card">
                <div className="score-ring-wrap">
                  <svg viewBox="0 0 150 150" className="score-ring-svg">
                    <circle cx="75" cy="75" r={ringRadius} className="score-ring-track" />
                    <circle
                      cx="75"
                      cy="75"
                      r={ringRadius}
                      className={`score-ring-fill${!isPassed ? ' fail-color' : ''}`}
                      style={{
                        strokeDasharray: ringCircumference,
                        strokeDashoffset: ringOffset,
                      }}
                    />
                  </svg>
                  <div className="score-ring-center">
                    <strong className={!isPassed ? 'fail-color' : ''}>{score}</strong>
                    <span>trên 10</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="result-stats-grid">
                <div className="result-stat-item">
                  <div className="stat-label success">
                    <span className="stat-dot"></span>
                    SỐ CÂU ĐÚNG
                  </div>
                  <div className="stat-value">{correctCount}</div>
                </div>
                <div className="result-stat-item">
                  <div className="stat-label danger">
                    <span className="stat-dot"></span>
                    SỐ CÂU SAI
                  </div>
                  <div className="stat-value">{wrongCount}</div>
                </div>
                <div className="result-stat-item">
                  <div className="stat-label info">
                    <ion-icon name="time-outline"></ion-icon>
                    THỜI GIAN LÀM BÀI
                  </div>
                  <div className="stat-value">
                    {examResult.durationMinutes}
                    <small>phút</small>
                  </div>
                </div>
                <div className="result-stat-item">
                  <div className="stat-label neutral">
                    <ion-icon name="list-outline"></ion-icon>
                    TỔNG SỐ CÂU
                  </div>
                  <div className="stat-value">{totalQuestions}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Review Section */}
        <section className="result-review">
          <div className="review-header">
            <h2>XEM LẠI BÀI LÀM</h2>
            <div className="review-legend">
              <div className="review-legend-item">
                <span className="review-legend-dot correct"></span>
                <span>Đúng</span>
              </div>
              <div className="review-legend-item">
                <span className="review-legend-dot wrong"></span>
                <span>Sai</span>
              </div>
            </div>
          </div>

          {examResult.questions.map((question) => {
            const hasAnswer = question.selectedAnswer && question.selectedAnswer !== '';
            const isCorrect = hasAnswer && question.selectedAnswer === question.correctAnswer;
            const status = isCorrect ? 'correct' : 'wrong';

            return (
              <article key={question.id} className={`review-question ${status}`}>
                <header>
                  <span className="question-label">Câu hỏi {question.id}</span>
                  <span className="review-status-icon">
                    {isCorrect ? '✓' : '✕'}
                  </span>
                </header>
                <p className="review-text">{question.text}</p>
                <div className="review-options">
                  {question.options.map((option) => {
                    const isSelected = hasAnswer && option === question.selectedAnswer;
                    const isAnswer = option === question.correctAnswer;

                    // Determine option style class
                    let optionClass = 'review-option';
                    if (isSelected && isCorrect) {
                      optionClass += ' user-correct';
                    } else if (isSelected && !isCorrect) {
                      optionClass += ' user-wrong';
                    } else if (isAnswer && !isCorrect) {
                      optionClass += ' correct-answer';
                    }

                    // Determine radio style
                    let radioClass = 'review-radio';
                    if (isSelected && isCorrect) {
                      radioClass += ' filled correct-radio';
                    } else if (isSelected && !isCorrect) {
                      radioClass += ' filled wrong-radio';
                    } else if (isAnswer && !isCorrect) {
                      radioClass += ' filled correct-radio';
                    }

                    // Determine badge text
                    let badge = null;
                    if (isSelected && isCorrect) {
                      badge = (
                        <span className="review-option-badge">
                          <ion-icon name="checkmark-outline"></ion-icon>
                          ĐÁP ÁN CỦA BẠN
                        </span>
                      );
                    } else if (isSelected && !isCorrect) {
                      badge = (
                        <span className="review-option-badge">
                          <ion-icon name="close-outline"></ion-icon>
                          ĐÁP ÁN CỦA BẠN
                        </span>
                      );
                    } else if (isAnswer && !isCorrect) {
                      badge = (
                        <span className="review-option-badge">
                          <ion-icon name="checkmark-outline"></ion-icon>
                          ĐÁP ÁN ĐÚNG
                        </span>
                      );
                    }

                    return (
                      <div key={`${question.id}-${option}`} className={optionClass}>
                        <div className="review-option-left">
                          <span className={radioClass}>
                            {radioClass.includes('filled') && (
                              <ion-icon name={radioClass.includes('wrong') ? 'close' : 'checkmark'}></ion-icon>
                            )}
                          </span>
                          <span className="review-option-text">{option}</span>
                        </div>
                        {badge}
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Result;
