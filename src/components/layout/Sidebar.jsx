import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, onNavigateTab }) => {
  const handleClick = (event, tabId) => {
    event.preventDefault();
    if (onNavigateTab && tabId) {
      onNavigateTab(tabId);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="material-symbols-outlined">school</span>
        </div>
        <h2 className="sidebar-title">PTIT Admin</h2>
      </div>
      <nav className="sidebar-nav">
        <a className="sidebar-nav-link" href="#" onClick={(event) => handleClick(event)}>
          <span className="material-symbols-outlined">dashboard</span>
          Tổng quan
        </a>
        <a
          className={`sidebar-nav-link ${activeTab === 'create-exam' ? 'active' : ''}`}
          href="#"
          onClick={(event) => handleClick(event, 'create-exam')}
        >
          <span className="material-symbols-outlined">assignment</span>
          Quản lý Kỳ thi
        </a>
        <a
          className={`sidebar-nav-link ${activeTab === 'student-results' ? 'active' : ''}`}
          href="#"
          onClick={(event) => handleClick(event, 'student-results')}
        >
          <span className="material-symbols-outlined">group</span>
          Xem kết quả từng sinh viên
        </a>
        <a className="sidebar-nav-link" href="#" onClick={(event) => handleClick(event)}>
          <span className="material-symbols-outlined">analytics</span>
          Báo cáo Thống kê
        </a>
        <a className="sidebar-nav-link" href="#" onClick={(event) => handleClick(event)}>
          <span className="material-symbols-outlined">library_books</span>
          Ngân hàng Đề
        </a>
        <div className="sidebar-section-header">HỆ THỐNG</div>
        <a className="sidebar-nav-link" href="#" onClick={(event) => handleClick(event)}>
          <span className="material-symbols-outlined">shield_person</span>
          Phân quyền
        </a>
        <a className="sidebar-nav-link" href="#" onClick={(event) => handleClick(event)}>
          <span className="material-symbols-outlined">settings</span>
          Cài đặt
        </a>

        <div className="sidebar-notification">
          <div className="sidebar-notification-icon">
            <span className="material-symbols-outlined">campaign</span>
          </div>
          <div className="sidebar-notification-content">
            <h4 className="sidebar-notification-title">Thông báo Hệ thống</h4>
            <p className="sidebar-notification-text">
              Bảo trì server tự động lúc 23:00. Vui lòng hoàn tất thao tác trước thời điểm này.
            </p>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
