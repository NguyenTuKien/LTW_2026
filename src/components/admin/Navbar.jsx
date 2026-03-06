import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, getUserAvatar } from '../../utils/auth';
import { useStudents } from '../../contexts/StudentContext';
import '../../styles/admin/Navbar.css';

const IconUser = () => <ion-icon name="person-circle" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconLogout = () => <ion-icon name="log-out" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconAccount = () => <ion-icon name="person" style={{ fontSize: 'inherit' }}></ion-icon>;
const IconSettings = () => <ion-icon name="settings" style={{ fontSize: 'inherit' }}></ion-icon>;

const ADMIN_PAGES = [
  { label: 'Tổng quan', path: '/admin', icon: 'dashboard' },
  { label: 'Quản lý Kỳ thi', path: '/admin/exams', icon: 'assignment' },
  { label: 'Quản lý sinh viên', path: '/admin/students', icon: 'group' },
  { label: 'Báo cáo thống kê', path: '/admin/statistics', icon: 'analytics' },
  { label: 'Ngân hàng đề', path: '/admin/question-bank', icon: 'library_books' },
];

const Navbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const avatarUrl = getUserAvatar();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const username = user?.username || 'Admin';
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  const roleName = user?.role === 'admin' ? 'Quản trị viên' : 'Sinh viên';

  const { students } = useStudents();

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return { pages: [], students: [], exams: [] };

    const pages = ADMIN_PAGES.filter((p) => p.label.toLowerCase().includes(q));

    const studentSet = new Map();
    const examSet = new Map();

    students.forEach((s) => {
      const nameMatch = s.fullName.toLowerCase().includes(q);
      const codeMatch = s.studentCode.toLowerCase().includes(q);
      if (nameMatch || codeMatch) {
        studentSet.set(s.id, { id: s.id, studentCode: s.studentCode, name: s.fullName, className: s.className });
      }
      (s.exams || []).forEach((e) => {
        if (e.name.toLowerCase().includes(q)) {
          examSet.set(e.id, { id: e.id, name: e.name, studentName: s.fullName, studentCode: s.studentCode });
        }
      });
    });

    return {
      pages,
      students: [...studentSet.values()].slice(0, 5),
      exams: [...examSet.values()].slice(0, 5),
    };
  }, [searchTerm, students]);

  const hasResults =
    searchResults.pages.length > 0 ||
    searchResults.students.length > 0 ||
    searchResults.exams.length > 0;

  useEffect(() => {
    function handleClick(e) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        searchInputRef.current?.blur();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    setSearchOpen(true);
  };

  const handleSearchFocus = () => {
    if (searchTerm.trim()) setSearchOpen(true);
  };

  const navigateAndClose = (path) => {
    navigate(path);
    setSearchOpen(false);
    setSearchTerm('');
  };

  return (
    <header className="b-dashboard-header">
      <button className="b-mobile-menu" type="button" onClick={onOpenSidebar}>
        <span className="material-symbols-outlined">menu</span>
      </button>

      <div className="b-dashboard-search-wrapper" ref={searchRef}>
        <div className="b-dashboard-search">
          <span className="material-symbols-outlined">search</span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Tìm kiếm kỳ thi, sinh viên, báo cáo..."
            value={searchTerm}
            onChange={handleSearchInput}
            onFocus={handleSearchFocus}
          />
          <span className="b-search-shortcut">Ctrl+K</span>
        </div>

        {searchOpen && searchTerm.trim() && (
          <div className="b-search-dropdown">
            {!hasResults ? (
              <div className="b-search-empty">
                <span className="material-symbols-outlined">search_off</span>
                Không tìm thấy kết quả cho "{searchTerm}"
              </div>
            ) : (
              <>
                {searchResults.pages.length > 0 && (
                  <div className="b-search-group">
                    <div className="b-search-group-title">
                      <span className="material-symbols-outlined">web</span>
                      Trang
                    </div>
                    {searchResults.pages.map((page) => (
                      <button
                        key={page.path}
                        className="b-search-item"
                        type="button"
                        onClick={() => navigateAndClose(page.path)}
                      >
                        <span className="material-symbols-outlined b-search-item-icon">{page.icon}</span>
                        <span className="b-search-item-label">{page.label}</span>
                        <span className="material-symbols-outlined b-search-item-arrow">arrow_forward</span>
                      </button>
                    ))}
                  </div>
                )}

                {searchResults.students.length > 0 && (
                  <div className="b-search-group">
                    <div className="b-search-group-title">
                      <span className="material-symbols-outlined">group</span>
                      Sinh viên
                    </div>
                    {searchResults.students.map((s) => (
                      <button
                        key={s.id}
                        className="b-search-item"
                        type="button"
                        onClick={() => navigateAndClose('/admin/students')}
                      >
                        <span className="material-symbols-outlined b-search-item-icon">person</span>
                        <div className="b-search-item-info">
                          <span className="b-search-item-label">{s.name}</span>
                          <span className="b-search-item-sub">{s.studentCode} · {s.className}</span>
                        </div>
                        <span className="material-symbols-outlined b-search-item-arrow">arrow_forward</span>
                      </button>
                    ))}
                  </div>
                )}

                {searchResults.exams.length > 0 && (
                  <div className="b-search-group">
                    <div className="b-search-group-title">
                      <span className="material-symbols-outlined">assignment</span>
                      Kỳ thi
                    </div>
                    {searchResults.exams.map((e) => (
                      <button
                        key={e.id}
                        className="b-search-item"
                        type="button"
                        onClick={() => navigateAndClose('/admin/students')}
                      >
                        <span className="material-symbols-outlined b-search-item-icon">quiz</span>
                        <div className="b-search-item-info">
                          <span className="b-search-item-label">{e.name}</span>
                          <span className="b-search-item-sub">SV: {e.studentName}</span>
                        </div>
                        <span className="material-symbols-outlined b-search-item-arrow">arrow_forward</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="b-dashboard-header-actions" ref={profileMenuRef}>
        <button className="b-header-notification" type="button" aria-label="Thông báo">
          <span className="material-symbols-outlined">notifications</span>
          <span className="b-header-notification-dot" />
        </button>

        <button
          className="b-header-profile"
          type="button"
          onClick={() => setProfileMenuOpen((v) => !v)}
          aria-expanded={profileMenuOpen}
          aria-label="Tài khoản"
        >
          <div className="b-header-avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="b-header-avatar-img" />
            ) : (
              displayName.charAt(0)
            )}
          </div>
          <div>
            <div className="b-header-name">{displayName}</div>
            <div className="b-header-role">{roleName}</div>
          </div>
        </button>

        {profileMenuOpen && (
          <div className="b-header-dropdown">
            <div className="b-header-dropdown-user">
              <div className="b-header-dropdown-avatar">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="b-header-dropdown-avatar-img" />
                ) : (
                  <IconUser />
                )}
              </div>
              <div>
                <div className="b-header-dropdown-name">{displayName}</div>
                <div className="b-header-dropdown-role">{roleName}</div>
              </div>
            </div>
            <div className="b-header-dropdown-divider" />
            <button
              className="b-header-dropdown-item"
              onClick={() => { setProfileMenuOpen(false); navigate('/profile'); }}
            >
              <IconAccount /> Tài khoản
            </button>
            <button className="b-header-dropdown-item b-header-dropdown-item--disabled" disabled>
              <IconSettings /> Cài đặt
            </button>
            <div className="b-header-dropdown-divider" />
            <button className="b-header-dropdown-logout" onClick={handleLogout}>
              <IconLogout /> Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
