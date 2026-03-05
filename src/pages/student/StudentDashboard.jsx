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


const IconBell = () => <ion-icon name="notifications" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconUser = () => <ion-icon name="person-circle" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconLogout = () => <ion-icon name="log-out" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconSearch = () => <ion-icon name="search" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconClock = () => <ion-icon name="time" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconList = () => <ion-icon name="list" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconLock = () => <ion-icon name="lock-closed" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconUnlock = () => <ion-icon name="lock-open" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconCalendar = () => <ion-icon name="calendar" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconHistory = () => <ion-icon name="reload" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconDoc = () => <ion-icon name="document-text" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconChevron = () => <ion-icon name="chevron-down" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconAccount = () => <ion-icon name="person" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconSettings = () => <ion-icon name="settings" style={{ fontSize: 'inherit' }}></ion-icon>;
const Logo = () => <img src="/ptit-logo.png" alt="PTIT Logo" style={{ height: '32px', width: 'auto' }} />;
const IconDeadlineCalendar = () => <ion-icon name="calendar" style={{ fontSize: '32px', color: '#e53e3e' }}></ion-icon>;


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
