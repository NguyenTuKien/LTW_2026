import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="material-symbols-outlined">school</span>
        </div>
        <h2 className="sidebar-title">PTIT Admin</h2>
      </div>
      <nav className="sidebar-nav">
        <a className="sidebar-nav-link" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          Tổng quan
        </a>
        <a className="sidebar-nav-link active" href="#">
          <span className="material-symbols-outlined">assignment</span>
          Quản lý Kỳ thi
        </a>
        <a className="sidebar-nav-link" href="#">
          <span className="material-symbols-outlined">group</span>
          Quản lý Sinh viên
        </a>
        <a className="sidebar-nav-link" href="#">
          <span className="material-symbols-outlined">analytics</span>
          Báo cáo Thống kê
        </a>
        <a className="sidebar-nav-link" href="#">
          <span className="material-symbols-outlined">library_books</span>
          Ngân hàng Đề
        </a>
        <div className="sidebar-section-header">HỆ THỐNG</div>
        <a className="sidebar-nav-link" href="#">
          <span className="material-symbols-outlined">shield_person</span>
          Phân quyền
        </a>
        <a className="sidebar-nav-link" href="#">
          <span className="material-symbols-outlined">settings</span>
          Cài đặt
        </a>
        
        <div className="sidebar-notification">
          <div className="sidebar-notification-icon">
            <span className="material-symbols-outlined">campaign</span>
          </div>
          <div className="sidebar-notification-content">
            <h4 className="sidebar-notification-title">Thông báo Hệ thống</h4>
            <p className="sidebar-notification-text">Bảo trì server tự báo lúc CRON AM ON mới. Vui lòng hoàn tất xoát bài xóa.</p>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
