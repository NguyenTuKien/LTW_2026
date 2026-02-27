import { useState } from 'react';
import './Statistics.css';

function Statistics() {
  const [selectedExam, setSelectedExam] = useState('all');

  const overallStats = {
    totalUsers: 245,
    totalExams: 12,
    activeExams: 5,
    completedExams: 7
  };

  const examStats = [
    {
      id: 1,
      name: 'Kỳ thi Toán học',
      participants: 89,
      completed: 76,
      completionRate: 85.4,
      avgScore: 7.8,
      maxScore: 9.5,
      minScore: 4.2
    },
    {
      id: 2,
      name: 'Kỳ thi Tiếng Anh',
      participants: 102,
      completed: 95,
      completionRate: 93.1,
      avgScore: 8.2,
      maxScore: 9.8,
      minScore: 5.5
    },
    {
      id: 3,
      name: 'Kỳ thi Lập trình Web',
      participants: 54,
      completed: 42,
      completionRate: 77.8,
      avgScore: 7.5,
      maxScore: 9.2,
      minScore: 3.8
    }
  ];

  const recentActivity = [
    { time: '10 phút trước', action: 'Nguyễn Văn A hoàn thành kỳ thi Toán học', score: 8.5 },
    { time: '25 phút trước', action: 'Trần Thị B hoàn thành kỳ thi Tiếng Anh', score: 9.0 },
    { time: '1 giờ trước', action: 'Lê Văn C bắt đầu kỳ thi Lập trình Web', score: null },
    { time: '2 giờ trước', action: 'Phạm Thị D hoàn thành kỳ thi Toán học', score: 7.2 },
    { time: '3 giờ trước', action: 'Hoàng Văn E hoàn thành kỳ thi Tiếng Anh', score: 8.8 }
  ];

  return (
    <div className="statistics">
      <h1>Thống kê & Báo cáo</h1>

      {/* Overall Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Tổng người dùng</h3>
            <p className="stat-number">{overallStats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>Tổng số kỳ thi</h3>
            <p className="stat-number">{overallStats.totalExams}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Kỳ thi đang hoạt động</h3>
            <p className="stat-number">{overallStats.activeExams}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>Kỳ thi hoàn thành</h3>
            <p className="stat-number">{overallStats.completedExams}</p>
          </div>
        </div>
      </div>

      {/* Exam Statistics Table */}
      <div className="stats-section">
        <div className="section-header">
          <h2>Chi tiết thống kê theo kỳ thi</h2>
          <select 
            value={selectedExam} 
            onChange={(e) => setSelectedExam(e.target.value)}
            className="exam-filter"
          >
            <option value="all">Tất cả kỳ thi</option>
            {examStats.map(exam => (
              <option key={exam.id} value={exam.id}>{exam.name}</option>
            ))}
          </select>
        </div>

        <div className="exam-stats-table">
          <table>
            <thead>
              <tr>
                <th>Tên kỳ thi</th>
                <th>Số người tham gia</th>
                <th>Đã hoàn thành</th>
                <th>Tỷ lệ hoàn thành</th>
                <th>Điểm TB</th>
                <th>Điểm cao nhất</th>
                <th>Điểm thấp nhất</th>
              </tr>
            </thead>
            <tbody>
              {examStats
                .filter(exam => selectedExam === 'all' || exam.id == selectedExam)
                .map(exam => (
                  <tr key={exam.id}>
                    <td><strong>{exam.name}</strong></td>
                    <td>{exam.participants}</td>
                    <td>{exam.completed}</td>
                    <td>
                      <div className="progress-bar-container">
                        <div 
                          className="progress-bar" 
                          style={{width: `${exam.completionRate}%`}}
                        ></div>
                        <span className="progress-text">{exam.completionRate}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="score-badge">{exam.avgScore}/10</span>
                    </td>
                    <td>
                      <span className="score-badge high">{exam.maxScore}/10</span>
                    </td>
                    <td>
                      <span className="score-badge low">{exam.minScore}/10</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="stats-section">
        <h2>Hoạt động gần đây</h2>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-time">{activity.time}</div>
              <div className="activity-content">
                <p>{activity.action}</p>
                {activity.score && (
                  <span className="activity-score">Điểm: {activity.score}/10</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Distribution Chart (Visual representation) */}
      <div className="stats-section">
        <h2>Phân bố điểm số</h2>
        <div className="chart-container">
          <div className="chart-bar-group">
            <div className="chart-label">0-2</div>
            <div className="chart-bar" style={{height: '15%'}}>
              <span className="chart-value">8</span>
            </div>
          </div>
          <div className="chart-bar-group">
            <div className="chart-label">2-4</div>
            <div className="chart-bar" style={{height: '25%'}}>
              <span className="chart-value">15</span>
            </div>
          </div>
          <div className="chart-bar-group">
            <div className="chart-label">4-6</div>
            <div className="chart-bar" style={{height: '45%'}}>
              <span className="chart-value">32</span>
            </div>
          </div>
          <div className="chart-bar-group">
            <div className="chart-label">6-8</div>
            <div className="chart-bar" style={{height: '75%'}}>
              <span className="chart-value">56</span>
            </div>
          </div>
          <div className="chart-bar-group">
            <div className="chart-label">8-10</div>
            <div className="chart-bar" style={{height: '90%'}}>
              <span className="chart-value">68</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
