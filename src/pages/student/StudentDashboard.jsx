import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, getUserAvatar } from '../../utils/auth';
import '../../styles/studentDashboard.css';

// ─── Mock Data ─────────────────────────────────────────────────────────────────

// Status keys: 'ready' | 'notStarted' | 'inactive' | 'expired'
const STATUS_MAP = {
  ready:      { label: 'Sẵn sàng',       className: 'status-ready' },
  notStarted: { label: 'Chưa bắt đầu',   className: 'status-not-started' },
  inactive:   { label: 'Không hoạt động', className: 'status-inactive' },
  expired:    { label: 'Đã hết hạn',      className: 'status-expired' },
};

const CATEGORY_MAP = {
  PRACTICE: 'Luyện tập',
  MIDTERM:  'Giữa kỳ',
  FINAL:    'Cuối kỳ',
};

const MOCK_EXAMS = [
  {
    id: 1, title: 'Cấu trúc dữ liệu và Giải thuật - Bài luyện tập 1',
    category: 'PRACTICE', status: 'ready', duration: 60, questions: 40, openDate: null,
  },
  {
    id: 2, title: 'Hệ quản trị Cơ sở dữ liệu - Thi giữa kỳ',
    category: 'MIDTERM', status: 'notStarted', duration: 90, questions: 60, openDate: '15/10/2023 08:00',
  },
  {
    id: 3, title: 'Mạng máy tính - Thi cuối kỳ',
    category: 'FINAL', status: 'ready', duration: 120, questions: 100, openDate: null,
  },
  {
    id: 4, title: 'Công nghệ phần mềm - Bài kiểm tra thử',
    category: 'PRACTICE', status: 'ready', duration: 45, questions: 30, openDate: null,
  },
  {
    id: 5, title: 'Hệ điều hành - Bài luyện tập',
    category: 'PRACTICE', status: 'inactive', duration: 30, questions: 20, openDate: '20/10/2023 10:00',
  },
  {
    id: 6, title: 'An toàn thông tin - Thi giữa kỳ',
    category: 'MIDTERM', status: 'expired', duration: 75, questions: 50, openDate: '01/09/2023 08:00',
  },
];

const UPCOMING_DEADLINES = [
  { id: 1, title: 'Thi giữa kỳ CSDL', detail: 'Ngày mai, 08:00', urgent: true },
  { id: 2, title: 'Nộp đồ án Web', detail: '18/10, 23:59', urgent: false },
  { id: 3, title: 'Luyện tập Mạng', detail: '22/10, 14:00', urgent: false },
];

const RECENT_EXAMS = [
  { id: 1, title: 'Toán rời rạc - Bài 1', detail: 'Hoàn thành hôm qua', score: 9.5, maxScore: 10, good: true },
  { id: 2, title: 'Hệ điều hành - Bài 3', detail: 'Hoàn thành 12/10', score: 8.0, maxScore: 10, good: true },
  { id: 3, title: 'Lập trình C++ - Bài 2', detail: 'Hoàn thành 10/10', score: 6.5, maxScore: 10, good: false },
];

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconList = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const IconLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconUnlock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 0 9.9-1" />
  </svg>
);

const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconHistory = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
  </svg>
);

const IconDoc = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconAccount = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1.08 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08z" />
  </svg>
);

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const IconDeadlineCalendar = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ─── Exam Card ─────────────────────────────────────────────────────────────────

function ExamCard({ exam }) {
  const [hovered, setHovered] = useState(false);

  const categoryClass = {
    PRACTICE: 'badge-practice',
    MIDTERM: 'badge-midterm',
    FINAL: 'badge-final',
  }[exam.category] || 'badge-practice';

  const statusInfo = STATUS_MAP[exam.status] || STATUS_MAP.ready;
  const canStart = exam.status === 'ready';

  const statusIcon = {
    ready: <IconUnlock />,
    notStarted: <IconCalendar />,
    inactive: <IconLock />,
    expired: <IconLock />,
  }[exam.status];

  return (
    <div
      className={`exam-card${hovered ? ' hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="exam-card-header">
        <span className={`category-badge ${categoryClass}`}>{CATEGORY_MAP[exam.category] || exam.category}</span>
        <span className={`status-badge ${statusInfo.className}`}>
          {statusIcon}
          {statusInfo.label}
        </span>
      </div>

      <h3 className="exam-card-title">{exam.title}</h3>

      <div className="exam-card-meta">
        <span className="meta-item"><IconClock /> {exam.duration} phút</span>
        <span className="meta-item"><IconList /> {exam.questions} câu</span>
      </div>

      {canStart ? (
        <button
          className="btn-start-exam"
          onClick={() => alert(`Bắt đầu bài thi: ${exam.title}`)}
        >
          Bắt đầu thi
        </button>
      ) : (
        <div className="exam-opens-notice">
          {exam.status === 'expired' ? 'Đã hết hạn' : `Mở lúc: ${exam.openDate}`}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [activeNav, setActiveNav] = useState('Trang chủ');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const statusDropdownRef = useRef(null);

  const avatarUrl = getUserAvatar();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target)) {
        setStatusDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter logic
  const filteredExams = MOCK_EXAMS.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || exam.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const username = user?.username || 'Student';
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  const navLinks = ['Trang chủ', 'Bài thi', 'Kết quả'];
  const categories = [
    { key: 'all', label: 'Tất cả' },
    { key: 'PRACTICE', label: 'Luyện tập' },
    { key: 'MIDTERM', label: 'Giữa kỳ' },
    { key: 'FINAL', label: 'Cuối kỳ' },
  ];
  const statuses = [
    { key: 'all', label: 'Tất cả' },
    { key: 'ready', label: 'Sẵn sàng' },
    { key: 'notStarted', label: 'Chưa bắt đầu' },
    { key: 'inactive', label: 'Không hoạt động' },
    { key: 'expired', label: 'Đã hết hạn' },
  ];
  const currentStatusLabel = statuses.find(s => s.key === statusFilter)?.label || 'Tất cả';

  return (
    <div className="sd-root">
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header className="sd-navbar">
        <div className="sd-navbar-inner">
          {/* Logo */}
          <div className="sd-navbar-brand">
            <Logo />
            <span className="sd-brand-name">Hệ thống thi trực tuyến PTIT</span>
          </div>

          {/* Nav links */}
          <nav className="sd-nav-links">
            {navLinks.map((label) => (
              <button
                key={label}
                className={`sd-nav-link${activeNav === label ? ' active' : ''}`}
                onClick={() => setActiveNav(label)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="sd-navbar-right">
            <button className="sd-icon-btn" aria-label="Thông báo">
              <IconBell />
              <span className="sd-badge">3</span>
            </button>

            {/* Profile menu */}
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
                    <IconUser />
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
                        <IconUser />
                      )}
                    </div>
                    <div>
                      <div className="sd-dropdown-name">{displayName}</div>
                      <div className="sd-dropdown-role">Sinh viên</div>
                    </div>
                  </div>
                  <div className="sd-dropdown-divider" />
                  <button className="sd-dropdown-item" onClick={() => { setProfileMenuOpen(false); navigate('/profile'); }}>
                    <IconAccount /> Tài khoản
                  </button>
                  <button className="sd-dropdown-item sd-dropdown-item--disabled" disabled>
                    <IconSettings /> Cài đặt
                  </button>
                  <div className="sd-dropdown-divider" />
                  <button className="sd-dropdown-logout" onClick={handleLogout}>
                    <IconLogout /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Page Body ───────────────────────────────────────────── */}
      <main className="sd-main">
        {/* Welcome */}
        <section className="sd-welcome">
          <div>
            <h1 className="sd-welcome-title">Xin chào, {displayName}!</h1>
          </div>
          <p className="sd-welcome-sub">Tổng quan tiến độ học tập của bạn.</p>
        </section>

        {/* Stats */}
        <div className="sd-stats">
          <div className="sd-stat-card animate-in" style={{ animationDelay: '0ms' }}>
            <div className="sd-stat-icon"><IconDoc /></div>
            <div className="sd-stat-body">
              <p className="sd-stat-label">SỐ BÀI THI ĐÃ LÀM</p>
              <p className="sd-stat-value">12</p>
            </div>
          </div>
          <div className="sd-stat-card animate-in" style={{ animationDelay: '80ms' }}>
            <div className="sd-stat-icon"><IconDeadlineCalendar /></div>
            <div className="sd-stat-body">
              <p className="sd-stat-label">HẠN CHÓT SẮP TỚI</p>
              <p className="sd-stat-value">3</p>
            </div>
          </div>
          <div className="sd-stat-card animate-in" style={{ animationDelay: '160ms' }}>
            <div className="sd-stat-icon"><IconHistory /></div>
            <div className="sd-stat-body">
              <p className="sd-stat-label">HOẠT ĐỘNG GẦN ĐÂY</p>
              <p className="sd-stat-value sd-stat-value--text">Toán rời rạc - Bài 1</p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="sd-filter-bar animate-in" style={{ animationDelay: '220ms' }}>
          <div className="sd-search-wrap">
            <IconSearch />
            <input
              className="sd-search-input"
              type="text"
              placeholder="Tìm kiếm bài thi theo tên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="student-search-input"
            />
          </div>

          <div className="sd-filter-right">
            <div className="sd-category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`sd-cat-btn${categoryFilter === cat.key ? ' active' : ''}`}
                  onClick={() => setCategoryFilter(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="sd-status-dropdown" ref={statusDropdownRef}>
              <button
                className="sd-status-btn"
                onClick={() => setStatusDropdownOpen((v) => !v)}
              >
                Trạng thái: {currentStatusLabel} <IconChevron />
              </button>
              {statusDropdownOpen && (
                <div className="sd-status-menu">
                  {statuses.map((s) => (
                    <button
                      key={s.key}
                      className={`sd-status-option${statusFilter === s.key ? ' active' : ''}`}
                      onClick={() => { setStatusFilter(s.key); setStatusDropdownOpen(false); }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content: Exams + Sidebar */}
        <div className="sd-content-layout">
          {/* Exams Section */}
          <section className="sd-exams-section">
            <h2 className="sd-section-title">Danh sách bài thi</h2>

            {filteredExams.length === 0 ? (
              <div className="sd-no-results">
                <p>Không tìm thấy bài thi nào phù hợp.</p>
              </div>
            ) : (
              <div className="sd-exams-grid">
                {filteredExams.map((exam, i) => (
                  <div
                    key={exam.id}
                    className="animate-in"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <ExamCard exam={exam} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className="sd-sidebar">
            {/* Hạn chót sắp tới */}
            <div className="sd-sidebar-card animate-in" style={{ animationDelay: '100ms' }}>
              <h3 className="sd-sidebar-title">
                <span className="sd-sidebar-title-icon"><IconCalendar /></span>
                Hạn chót sắp tới
              </h3>
              <div className="sd-deadline-list">
                {UPCOMING_DEADLINES.map((d) => (
                  <div key={d.id} className={`sd-deadline-item${d.urgent ? ' sd-deadline-item--urgent' : ''}`}>
                    <div className={`sd-deadline-icon${d.urgent ? ' sd-deadline-icon--urgent' : ''}`}>
                      <IconCalendar />
                    </div>
                    <div className="sd-deadline-body">
                      <p className="sd-deadline-name">{d.title}</p>
                      <p className="sd-deadline-detail">{d.detail}</p>
                    </div>
                    {d.urgent && <span className="sd-deadline-badge">Gấp</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Bài thi gần đây */}
            <div className="sd-sidebar-card animate-in" style={{ animationDelay: '200ms' }}>
              <h3 className="sd-sidebar-title">
                <span className="sd-sidebar-title-icon"><IconHistory /></span>
                Bài thi gần đây
              </h3>
              <div className="sd-recent-list">
                {RECENT_EXAMS.map((r) => (
                  <div key={r.id} className="sd-recent-item">
                    <div className="sd-recent-info">
                      <p className="sd-recent-name">{r.title}</p>
                      <p className="sd-recent-detail">{r.detail}</p>
                      <div className="sd-recent-progress-bar">
                        <div
                          className={`sd-recent-progress-fill${r.good ? ' good' : ' warning'}`}
                          style={{ width: `${(r.score / r.maxScore) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className={`sd-recent-score${r.good ? ' good' : ' warning'}`}>{r.score}/{r.maxScore}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
