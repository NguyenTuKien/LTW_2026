import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/admin', icon: 'dashboard', label: 'Tổng quan' },
  { path: '/admin/exams', icon: 'assignment', label: 'Quản lý Kỳ thi' },
  { path: '/admin/students', icon: 'group', label: 'Quản lý sinh viên' },
  { path: '/admin/statistics', icon: 'analytics', label: 'Báo cáo thống kê' },
  { path: '/admin/question-bank', icon: 'library_books', label: 'Ngân hàng đề' },
];

const Sidebar = ({ sidebarOpen, onCloseSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleClick = (path) => {
    if (!isActive(path)) {
      navigate(path);
    }
    if (onCloseSidebar) onCloseSidebar();
  };

  return (
    <>
      {sidebarOpen && (
        <button
          className="b-sidebar-overlay"
          type="button"
          onClick={onCloseSidebar}
          aria-label="Đóng sidebar"
        />
      )}
      <aside className={`b-dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="b-sidebar-header">
          <div className="b-sidebar-logo">
            <span className="material-symbols-outlined">school</span>
          </div>
          <h2 className="b-sidebar-title">PTIT Admin</h2>
        </div>

        <nav className="b-sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              className={`b-sidebar-link ${isActive(item.path) ? 'active' : ''}`}
              type="button"
              onClick={() => handleClick(item.path)}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div className="b-sidebar-section-title">Hệ thống</div>
          <button className="b-sidebar-link" type="button">
            <span className="material-symbols-outlined">shield_person</span>
            Phân quyền
          </button>
          <button className="b-sidebar-link" type="button">
            <span className="material-symbols-outlined">settings</span>
            Cài đặt
          </button>
        </nav>

        <div className="b-sidebar-notice">
          <h4>Thông báo hệ thống</h4>
          <p>Bảo trì server dự kiến 02:00 AM Chủ nhật. Vui lòng hoàn tất báo cáo trước thời gian này.</p>
          <button type="button">Xem chi tiết</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
