import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, getUserAvatar } from '../../utils/auth';
import './Navbar.css';

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

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

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const avatarUrl = getUserAvatar();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const username = user?.username || 'Admin';
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  const roleName = user?.role === 'admin' ? 'Quản trị viên' : 'Sinh viên';

  // Close dropdown on outside click
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

  return (
    <header className="navbar">
      <div className="navbar-search">
        <span className="material-symbols-outlined navbar-search-icon">search</span>
        <input className="navbar-search-input" placeholder="Tìm kiếm tv, sinh viên, báo cáo..." type="text" />
      </div>
      <div className="navbar-actions">
        <button className="navbar-btn navbar-btn-primary">
          <span className="material-symbols-outlined">add</span>
          Tạo Kỳ thi
        </button>
        <button className="navbar-btn navbar-btn-secondary">
          <span className="material-symbols-outlined">person_add</span>
          Thêm SV
        </button>
        <button className="navbar-notification">
          <span className="material-symbols-outlined">notifications</span>
          <span className="navbar-notification-badge">17</span>
        </button>

        {/* Profile menu */}
        <div className="navbar-profile" ref={profileMenuRef}>
          <button
            className="navbar-profile-btn"
            onClick={() => setProfileMenuOpen((v) => !v)}
            aria-expanded={profileMenuOpen}
            aria-label="Tài khoản"
          >
            <div className="navbar-profile-avatar-circle">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="navbar-avatar-img" />
              ) : (
                <IconUser />
              )}
            </div>
          </button>

          {profileMenuOpen && (
            <div className="navbar-dropdown">
              <div className="navbar-dropdown-user">
                <div className="navbar-dropdown-avatar">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="navbar-dropdown-avatar-img" />
                  ) : (
                    <IconUser />
                  )}
                </div>
                <div>
                  <div className="navbar-dropdown-name">{displayName}</div>
                  <div className="navbar-dropdown-role">{roleName}</div>
                </div>
              </div>
              <div className="navbar-dropdown-divider" />
              <button className="navbar-dropdown-item" onClick={() => { setProfileMenuOpen(false); navigate('/profile'); }}>
                <IconAccount /> Tài khoản
              </button>
              <button className="navbar-dropdown-item navbar-dropdown-item--disabled" disabled>
                <IconSettings /> Cài đặt
              </button>
              <div className="navbar-dropdown-divider" />
              <button className="navbar-dropdown-logout" onClick={handleLogout}>
                <IconLogout /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
