import React from 'react';
import './Navbar.css';

const Navbar = () => {
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
        <div className="navbar-profile">
          <div className="navbar-profile-avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBK3BIxgM3uAo44l0v-kMEiVYQgKYQ6mFAXqYj1wEuyZF_TS63cd7bzZPqf6LBlH3KbsIRgafo1YjHzRDY3CO1s3mapC2Txm_q_7aq-CNSUKUYpwctVm-CPp7nYsYWmtXLSaSCahtPLZc3_OKVPCNGOx646XaNnngLc-13lCVD1flRHaDX_Vuvbe_gUwToYHmF7oHXPtUDQrOE8g29trfhn5GDfz782s7zD18exrpHWWLPpC2DinKzezTR64YJOzIangkcSdjaDudc")' }}></div>
          <div className="navbar-profile-info">
            <p className="navbar-profile-name">Admin_GTV</p>
            <p className="navbar-profile-role">Quản trị viên</p>
          </div>
          <span className="material-symbols-outlined navbar-profile-arrow">expand_more</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
