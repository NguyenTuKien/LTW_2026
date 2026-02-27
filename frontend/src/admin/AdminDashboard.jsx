import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin', label: 'Tổng quan', icon: '📊' },
    { path: '/admin/exams', label: 'Quản lý kỳ thi', icon: '📝' },
    { path: '/admin/users', label: 'Quản lý người dùng', icon: '👥' },
    { path: '/admin/statistics', label: 'Thống kê', icon: '📈' }
  ];

  return (
    <div className="admin-dashboard">
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button 
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {isSidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/" className="back-home">
            {isSidebarOpen ? '← Về trang chủ' : '←'}
          </Link>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
