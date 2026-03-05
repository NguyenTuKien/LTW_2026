import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './StudentResults.css';
import { studentsData } from '../../data/adminStudentResultsData';

const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatFullDateTime = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.toLocaleDateString('vi-VN')} ${date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })} ${date.getHours() < 12 ? 'AM' : 'PM'}`;
};

const getInitials = (name) =>
  name.split(' ').slice(-2).map((w) => w[0]?.toUpperCase() || '').join('');

function StudentResults() {
  const [keyword, setKeyword] = useState('');
  const [searchedId, setSearchedId] = useState(studentsData[0]?.id || '');
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const activeStudent = useMemo(() => {
    if (!searchedId) return studentsData[0] || null;
    return studentsData.find(
      (s) => s.id.toLowerCase() === searchedId.toLowerCase()
    ) || null;
  }, [searchedId]);

  const activeExam = useMemo(() => {
    if (!activeStudent || !selectedExamId) return null;
    return activeStudent.exams.find((e) => e.id === selectedExamId) || null;
  }, [activeStudent, selectedExamId]);

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    // search by ID or name
    const found = studentsData.find(
      (s) =>
        s.id.toLowerCase() === trimmed.toLowerCase() ||
        s.name.toLowerCase().includes(trimmed.toLowerCase())
    );
    if (found) {
      setSearchedId(found.id);
      setSelectedExamId(null);
    } else {
      setSearchedId('__NOT_FOUND__');
      setSelectedExamId(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleViewDetail = (examId) => {
    setSelectedExamId((prev) => (prev === examId ? null : examId));
  };

  const handleCloseDetail = () => {
    setSelectedExamId(null);
  };

  return (
    <div className="app-admin">
      <div className="layout-container">
        <Sidebar
          sidebarOpen={sidebarOpen}
          onCloseSidebar={() => setSidebarOpen(false)}
        />
        <div className="main-content">
          <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
          <div className="sr-page">
            <div className="sr-wrapper">
              {/* ─── Page Header ─── */}
              <div className="sr-page-header">
                <div>
                  <h1>Tra cứu Kết quả Sinh viên chi tiết</h1>
                  <p>Tìm kiếm và xem lịch sử, chi tiết bài thi của từng sinh viên.</p>
                </div>
                <div className="sr-header-actions">
                  <button
                    type="button"
                    className="sr-btn-outline"
                    onClick={() => window.print()}
                  >
                    <span className="material-symbols-outlined">picture_as_pdf</span>
                    Xuất báo cáo (PDF)
                  </button>
                  <button type="button" className="sr-btn-accent">
                    <span className="material-symbols-outlined">add</span>
                    Thêm Ghi chú
                  </button>
                </div>
              </div>

              {/* ─── Search Panel ─── */}
              <div className="sr-search-panel">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập mã sinh viên (VD: B19DCCN123)..."
                />
                <button type="button" className="sr-search-btn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
                <div className="sr-search-tools">
                  <button type="button" className="sr-icon-btn" title="Bộ lọc nâng cao">
                    <span className="material-symbols-outlined">tune</span>
                  </button>
                  <button type="button" className="sr-icon-btn" title="Lịch sử tìm kiếm">
                    <span className="material-symbols-outlined">history</span>
                  </button>
                  <button type="button" className="sr-icon-btn" title="Quét mã">
                    <span className="material-symbols-outlined">qr_code_scanner</span>
                  </button>
                </div>
              </div>

              {/* ─── Content ─── */}
              {!activeStudent ? (
                <div className="sr-empty-state">
                  <span className="material-symbols-outlined">person_search</span>
                  <p>Không tìm thấy sinh viên phù hợp. Vui lòng kiểm tra lại MSSV.</p>
                </div>
              ) : (
                <>
                  {/* ─── Student Profile Card ─── */}
                  <div className="sr-profile-card">
                    <div className="sr-avatar">
                      {getInitials(activeStudent.name)}
                    </div>
                    <div className="sr-profile-info">
                      <div className="sr-profile-name-row">
                        <h2>{activeStudent.name}</h2>
                        <span className="sr-status-badge active">Đang học</span>
                      </div>
                      <div className="sr-profile-details">
                        <div className="sr-profile-detail-item">
                          <span className="material-symbols-outlined">badge</span>
                          <span>{activeStudent.id}</span>
                        </div>
                        <div className="sr-profile-detail-item">
                          <span className="material-symbols-outlined">school</span>
                          <span>{activeStudent.className}</span>
                        </div>
                        <div className="sr-profile-detail-item">
                          <span className="material-symbols-outlined">mail</span>
                          <span>{activeStudent.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ─── Exam History Table ─── */}
                  <div className="sr-exam-history">
                    <div className="sr-exam-history-header">
                      <h3>Lịch sử Bài Thi</h3>
                      <button type="button" className="sr-link-btn">
                        Xem tất cả
                      </button>
                    </div>
                    <table className="sr-exam-table">
                      <thead>
                        <tr>
                          <th>Tên kỳ thi</th>
                          <th>Điểm số</th>
                          <th>Trạng thái</th>
                          <th>Ngày tham gia</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeStudent.exams.map((exam) => (
                          <tr key={exam.id}>
                            <td>
                              <div className="sr-exam-name">{exam.name}</div>
                              <div className="sr-exam-code">
                                Mã thi: {exam.examCode || exam.id}
                              </div>
                            </td>
                            <td>
                              <span className="sr-score">
                                {exam.score}
                                <span className="sr-score-total">/10</span>
                              </span>
                            </td>
                            <td>
                              <span
                                className={`sr-exam-badge ${
                                  exam.status === 'Hoàn thành' ? 'pass' : 'fail'
                                }`}
                              >
                                {exam.status}
                              </span>
                            </td>
                            <td>{formatDateTime(exam.joinedAt)}</td>
                            <td>
                              <button
                                type="button"
                                className="sr-detail-btn"
                                onClick={() => handleViewDetail(exam.id)}
                              >
                                <span className="material-symbols-outlined">
                                  {selectedExamId === exam.id
                                    ? 'visibility_off'
                                    : 'visibility'}
                                </span>
                                {selectedExamId === exam.id ? 'Ẩn' : 'Chi tiết'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* ─── Exam Detail Panel ─── */}
                  {activeExam && (
                    <div className="sr-exam-detail">
                      <div className="sr-detail-header">
                        <div className="sr-detail-header-left">
                          <h3>Chi tiết bài thi: {activeExam.name}</h3>
                          <div className="sr-detail-meta">
                            Tổng điểm: <strong>{activeExam.score}/10</strong> •
                            Hoàn thành lúc: {formatFullDateTime(activeExam.joinedAt)}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="sr-close-detail"
                          onClick={handleCloseDetail}
                        >
                          <span className="material-symbols-outlined">close</span>
                          Đóng chi tiết
                        </button>
                      </div>

                      <div className="sr-questions-list">
                        {activeExam.details.map((item, index) => {
                          const isCorrect = item.studentAnswer === item.correctAnswer;
                          const pointPerQuestion = (10 / activeExam.totalQuestions).toFixed(1);
                          return (
                            <div className="sr-question-item" key={`${activeExam.id}-${index}`}>
                              <div className="sr-question-header">
                                <div className="sr-q-number">{index + 1}</div>
                                <div className="sr-q-text">{item.question}</div>
                                <div className="sr-q-points">{pointPerQuestion} Điểm</div>
                              </div>

                              <div className="sr-answers-row">
                                <div className={`sr-answer-box ${isCorrect ? 'correct' : 'wrong'}`}>
                                  <div className="sr-answer-label">Sinh viên chọn</div>
                                  <div className="sr-answer-text">
                                    {item.studentAnswer || '(Không trả lời)'}
                                  </div>
                                  <span className="material-symbols-outlined sr-answer-icon">
                                    {isCorrect ? 'check_circle' : 'cancel'}
                                  </span>
                                </div>
                                <div className="sr-answer-box correct">
                                  <div className="sr-answer-label">Đáp án đúng</div>
                                  <div className="sr-answer-text">{item.correctAnswer}</div>
                                  <span className="material-symbols-outlined sr-answer-icon">
                                    check_circle
                                  </span>
                                </div>
                              </div>

                              {item.explanation && (
                                <div className="sr-explanation">
                                  <div className="sr-explanation-title">
                                    <span className="material-symbols-outlined">lightbulb</span>
                                    Giải thích / Hướng dẫn
                                  </div>
                                  <p>{item.explanation}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentResults;
