import { Link } from 'react-router-dom';
import './Overview.css';

function Overview() {
  const quickStats = {
    totalUsers: 245,
    activeExams: 5,
    todayParticipants: 42,
    avgCompletionRate: 87.4
  };

  const recentExams = [
    { id: 1, name: 'Kỳ thi Toán học', participants: 89, status: 'Hoạt động' },
    { id: 2, name: 'Kỳ thi Tiếng Anh', participants: 102, status: 'Hoạt động' },
    { id: 3, name: 'Kỳ thi Lập trình Web', participants: 54, status: 'Sắp diễn ra' }
  ];

  const recentUsers = [
    { id: 1, name: 'Nguyễn Văn A', studentId: 'SV001', joinDate: '2026-02-25' },
    { id: 2, name: 'Trần Thị B', studentId: 'SV002', joinDate: '2026-02-26' },
    { id: 3, name: 'Lê Văn C', studentId: 'SV003', joinDate: '2026-02-27' }
  ];

  return (
    <div className="overview">
      <div className="welcome-header">
        <h1>Chào mừng đến Admin Dashboard</h1>
        <p>Quản lý hệ thống thi trực tuyến của bạn</p>
      </div>

      <div className="overview-stats">
        <div className="overview-card">
          <div className="card-icon" style={{background: 'linear-gradient(135deg, #dc143c 0%, #b91028 100%)'}}>
            👥
          </div>
          <div className="card-content">
            <h3>Tổng người dùng</h3>
            <p className="card-number">{quickStats.totalUsers}</p>
            <Link to="/admin/users" className="card-link">Xem chi tiết →</Link>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon" style={{background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)'}}>
            📝
          </div>
          <div className="card-content">
            <h3>Kỳ thi hoạt động</h3>
            <p className="card-number">{quickStats.activeExams}</p>
            <Link to="/admin/exams" className="card-link">Quản lý kỳ thi →</Link>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon" style={{background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'}}>
            ✅
          </div>
          <div className="card-content">
            <h3>Tham gia hôm nay</h3>
            <p className="card-number">{quickStats.todayParticipants}</p>
            <Link to="/admin/statistics" className="card-link">Xem thống kê →</Link>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon" style={{background: 'linear-gradient(135deg, #c44569 0%, #a73757 100%)'}}>
            📈
          </div>
          <div className="card-content">
            <h3>Tỷ lệ hoàn thành</h3>
            <p className="card-number">{quickStats.avgCompletionRate}%</p>
            <Link to="/admin/statistics" className="card-link">Chi tiết →</Link>
          </div>
        </div>
      </div>

      <div className="overview-sections">
        <div className="overview-section">
          <div className="section-header">
            <h2>Kỳ thi gần đây</h2>
            <Link to="/admin/exams" className="see-all">Xem tất cả →</Link>
          </div>
          <div className="section-content">
            {recentExams.map(exam => (
              <div key={exam.id} className="list-item">
                <div className="item-info">
                  <h4>{exam.name}</h4>
                  <p>{exam.participants} người tham gia</p>
                </div>
                <span className={`status-badge ${exam.status.toLowerCase().replace(' ', '-')}`}>
                  {exam.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="overview-section">
          <div className="section-header">
            <h2>Người dùng mới</h2>
            <Link to="/admin/users" className="see-all">Xem tất cả →</Link>
          </div>
          <div className="section-content">
            {recentUsers.map(user => (
              <div key={user.id} className="list-item">
                <div className="item-info">
                  <h4>{user.name}</h4>
                  <p>Mã SV: {user.studentId}</p>
                </div>
                <span className="join-date">
                  {new Date(user.joinDate).toLocaleDateString('vi-VN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Thao tác nhanh</h2>
        <div className="action-buttons">
          <Link to="/admin/exams" className="action-btn">
            <span className="action-icon">➕</span>
            <span>Thêm kỳ thi mới</span>
          </Link>
          <Link to="/admin/users" className="action-btn">
            <span className="action-icon">👤</span>
            <span>Thêm người dùng</span>
          </Link>
          <Link to="/admin/statistics" className="action-btn">
            <span className="action-icon">📊</span>
            <span>Xem báo cáo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Overview;
