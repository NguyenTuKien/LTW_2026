import React from 'react';
import '../../routes/App.css';
import '../layout/Sidebar.css';
import '../layout/Navbar.css';

const AdminLayoutShell = ({ activeMenu = 'overview', children, onNavigate }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const navigateTo = (path) => (onNavigate ? onNavigate(path) : (window.location.href = path));

  const goToDashboard = () => navigateTo('/admin/dashboard');

  const goToStatistics = () => navigateTo('/admin/statistics');

  return (
    <div className="app-admin">
      {sidebarOpen && <button className="b-sidebar-overlay" type="button" onClick={() => setSidebarOpen(false)} aria-label="Đóng sidebar" />}
      <div className="layout-container">
        <aside className={`b-dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="b-sidebar-header">
            <div className="b-sidebar-logo">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h2 className="b-sidebar-title">PTIT Admin</h2>
          </div>

          <nav className="b-sidebar-nav">
            <button
              className={`b-sidebar-link ${activeMenu === 'overview' ? 'active' : ''}`}
              type="button"
              onClick={activeMenu === 'overview' ? () => window.scrollTo({ top: 0, behavior: 'smooth' }) : goToDashboard}
            >
              <span className="material-symbols-outlined">dashboard</span>
              Tổng quan
            </button>
            <button className="b-sidebar-link" type="button">
              <span className="material-symbols-outlined">assignment</span>
              Quản lý Kỳ thi
            </button>
            <button className="b-sidebar-link" type="button">
              <span className="material-symbols-outlined">group</span>
              Quản lý sinh viên
            </button>
            <button
              className={`b-sidebar-link ${activeMenu === 'statistics' ? 'active' : ''}`}
              type="button"
              onClick={activeMenu === 'statistics' ? undefined : goToStatistics}
            >
              <span className="material-symbols-outlined">analytics</span>
              Báo cáo thống kê
            </button>
            <button className="b-sidebar-link" type="button">
              <span className="material-symbols-outlined">library_books</span>
              Ngân hàng đề
            </button>

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

        <div className="main-content">
          <header className="b-dashboard-header">
            <button className="b-mobile-menu" type="button" onClick={() => setSidebarOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="b-dashboard-search">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Tìm kiếm kỳ thi, sinh viên, báo cáo..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <span className="b-search-shortcut">⌘K</span>
            </div>

            <div className="b-dashboard-header-actions">
              <button className="b-header-notification" type="button" aria-label="Thông báo">
                <span className="material-symbols-outlined">notifications</span>
                <span className="b-header-notification-dot" />
              </button>

              <div className="b-header-profile">
                <div className="b-header-avatar">A</div>
                <div>
                  <div className="b-header-name">Admin_QTV</div>
                  <div className="b-header-role">Quản trị viên</div>
                </div>
              </div>
            </div>
          </header>

          {children(searchTerm)}
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutShell;
