import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, getUserAvatar } from '../../utils/auth';
import { EXAM_HISTORY } from '../../data/examHistoryData';
import { examResult as defaultExamResult } from '../../data/studentExamResultData';
import '../../styles/student/studentDashboard.css';
import '../../styles/student/ExamHistory.css';

const CATEGORY_MAP = {
  PRACTICE: { label: 'Luyện tập', className: 'practice' },
  MIDTERM: { label: 'Giữa kỳ', className: 'midterm' },
  FINAL: { label: 'Cuối kỳ', className: 'final' },
};

const FILTER_TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pass', label: 'Đạt' },
  { key: 'fail', label: 'Không đạt' },
];

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function ExamHistory() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const avatarUrl = getUserAvatar();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const username = user?.username || 'Student';
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const navLinks = [
    { label: 'Trang chủ', path: '/student' },
    { label: 'Lịch sử thi', path: '/student/history' },
  ];

  // Close profile menu on outside click
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

  const filteredHistory = useMemo(() => {
    return EXAM_HISTORY.filter((item) => {
      const matchesSearch = item.examName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'pass' && item.passed) ||
        (filter === 'fail' && !item.passed);
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  // Stats
  const totalExams = EXAM_HISTORY.length;
  const passedCount = EXAM_HISTORY.filter((e) => e.passed).length;
  const failedCount = totalExams - passedCount;
  const avgScore =
    totalExams > 0
      ? (EXAM_HISTORY.reduce((sum, e) => sum + e.score, 0) / totalExams).toFixed(1)
      : '0';

  const handleViewResult = (historyItem) => {
    const resultData = {
      ...defaultExamResult,
      examName: historyItem.examName,
      examCode: historyItem.examCode,
      submittedAt: historyItem.submittedAt,
      durationMinutes: historyItem.durationMinutes,
    };
    sessionStorage.setItem('lastExamResult', JSON.stringify(resultData));
    navigate('/student/result?from=history');
  };

  return (
    <div className="eh-page">
      {/* Student Navbar */}
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

      <main className="eh-main">
        {/* Page Header */}
        <div className="eh-page-header eh-animate" style={{ animationDelay: '0ms' }}>
          <h1>Lịch sử thi</h1>
          <p>Xem lại tất cả bài thi bạn đã hoàn thành.</p>
        </div>

        {/* Stats */}
        <div className="eh-stats">
          <div className="eh-stat-card eh-animate" style={{ animationDelay: '60ms' }}>
            <div className="eh-stat-icon blue">
              <ion-icon name="document-text-outline"></ion-icon>
            </div>
            <div className="eh-stat-body">
              <p className="eh-stat-label">Tổng bài thi</p>
              <p className="eh-stat-value">{totalExams}</p>
            </div>
          </div>
          <div className="eh-stat-card eh-animate" style={{ animationDelay: '120ms' }}>
            <div className="eh-stat-icon green">
              <ion-icon name="checkmark-circle-outline"></ion-icon>
            </div>
            <div className="eh-stat-body">
              <p className="eh-stat-label">Đạt</p>
              <p className="eh-stat-value">{passedCount}</p>
            </div>
          </div>
          <div className="eh-stat-card eh-animate" style={{ animationDelay: '180ms' }}>
            <div className="eh-stat-icon red">
              <ion-icon name="close-circle-outline"></ion-icon>
            </div>
            <div className="eh-stat-body">
              <p className="eh-stat-label">Không đạt</p>
              <p className="eh-stat-value">{failedCount}</p>
            </div>
          </div>
          <div className="eh-stat-card eh-animate" style={{ animationDelay: '240ms' }}>
            <div className="eh-stat-icon purple">
              <ion-icon name="trending-up-outline"></ion-icon>
            </div>
            <div className="eh-stat-body">
              <p className="eh-stat-label">Điểm TB</p>
              <p className="eh-stat-value">{avgScore}</p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="eh-filter-bar eh-animate" style={{ animationDelay: '300ms' }}>
          <div className="eh-search-wrap">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="Tìm kiếm bài thi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="eh-filter-tabs">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`eh-filter-tab${filter === tab.key ? ' active' : ''}`}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* History Table */}
        <div className="eh-table-card eh-animate" style={{ animationDelay: '380ms' }}>
          {filteredHistory.length === 0 ? (
            <div className="eh-empty">
              <ion-icon name="search-outline"></ion-icon>
              <p>Không tìm thấy bài thi nào phù hợp.</p>
            </div>
          ) : (
            <table className="eh-table">
              <thead>
                <tr>
                  <th>Bài thi</th>
                  <th>Loại</th>
                  <th>Ngày thi</th>
                  <th>Chi tiết</th>
                  <th>Điểm</th>
                  <th>Kết quả</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => {
                  const cat = CATEGORY_MAP[item.category] || CATEGORY_MAP.PRACTICE;
                  const iconName = {
                    PRACTICE: 'code-slash-outline',
                    MIDTERM: 'school-outline',
                    FINAL: 'trophy-outline',
                  }[item.category] || 'document-text-outline';
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="eh-exam-info">
                          <div className={`eh-exam-icon-wrap ${cat.className}`}>
                            <ion-icon name={iconName}></ion-icon>
                          </div>
                          <div className="eh-exam-text">
                            <span className="eh-exam-name">{item.examName}</span>
                            <span className="eh-exam-code">{item.examCode}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`eh-category-badge ${cat.className}`}>
                          <ion-icon name={iconName}></ion-icon>
                          {cat.label}
                        </span>
                      </td>
                      <td>
                        <div className="eh-date">{formatDate(item.submittedAt)}</div>
                        <div className="eh-date-sub">{formatTime(item.submittedAt)}</div>
                      </td>
                      <td>
                        <div className="eh-stats-cell">
                          <span>
                            <ion-icon name="time-outline"></ion-icon>
                            {item.durationMinutes} phút
                          </span>
                          <span>
                            <ion-icon name="help-circle-outline"></ion-icon>
                            {item.totalQuestions} câu
                          </span>
                          <span>
                            <ion-icon name="checkmark-outline"></ion-icon>
                            {item.correctCount}/{item.totalQuestions}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="eh-score-wrap">
                          <span className={`eh-score ${item.passed ? 'pass' : 'fail'}`}>
                            {item.score}
                          </span>
                          <span className="eh-score-max">/10</span>
                        </div>
                      </td>
                      <td>
                        <span className={`eh-pass-badge ${item.passed ? 'pass' : 'fail'}`}>
                          <ion-icon name={item.passed ? 'checkmark-circle' : 'close-circle'}></ion-icon>
                          {item.passed ? 'Đạt' : 'Không đạt'}
                        </span>
                      </td>
                      <td>
                        <button className="eh-view-btn" onClick={() => handleViewResult(item)}>
                          <ion-icon name="eye-outline"></ion-icon>
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
