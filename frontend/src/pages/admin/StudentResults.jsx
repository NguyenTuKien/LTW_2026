import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import { useStudents } from '../../contexts/StudentContext';
import '../../styles/admin/StudentResults.css';

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

const STATUS_CLASS_MAP = {
  'Hoạt động': 'active',
  'Khóa': 'inactive',
};

function StudentResults() {
  const { students } = useStudents();
  const [keyword, setKeyword] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const filteredStudents = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    if (!kw) return students;
    return students.filter(
      (s) =>
        s.studentCode.toLowerCase().includes(kw) ||
        s.fullName.toLowerCase().includes(kw) ||
        s.email.toLowerCase().includes(kw) ||
        s.className.toLowerCase().includes(kw)
    );
  }, [students, keyword]);

  const activeStudent = useMemo(() => {
    if (selectedStudentId === null) return null;
    return students.find((s) => s.id === selectedStudentId) || null;
  }, [students, selectedStudentId]);

  const activeExam = useMemo(() => {
    if (!activeStudent || !selectedExamId) return null;
    return activeStudent.exams.find((e) => e.id === selectedExamId) || null;
  }, [activeStudent, selectedExamId]);

  const handleSelectStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setSelectedExamId(null);
  };

  const handleBackToList = () => {
    setSelectedStudentId(null);
    setSelectedExamId(null);
  };

  const handleViewDetail = (examId) => {
    setSelectedExamId((prev) => (prev === examId ? null : examId));
  };

  const handleCloseDetail = () => {
    setSelectedExamId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (filteredStudents.length === 1) {
        handleSelectStudent(filteredStudents[0].id);
      }
    }
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
              {!activeStudent ? (
                <>
                  <div className="sr-page-header">
                    <div>
                      <h1>Tra cứu Kết quả Sinh viên</h1>
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
                    </div>
                  </div>

                  <div className="sr-search-panel">
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Tìm theo mã SV, tên, email, lớp..."
                    />
                    {keyword && (
                      <button
                        type="button"
                        className="sr-clear-btn"
                        onClick={() => setKeyword('')}
                        title="Xóa tìm kiếm"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    )}
                    <div className="sr-search-tools">
                      <button type="button" className="sr-icon-btn" title="Bộ lọc nâng cao">
                        <span className="material-symbols-outlined">tune</span>
                      </button>
                      <button type="button" className="sr-icon-btn" title="Lịch sử tìm kiếm">
                        <span className="material-symbols-outlined">history</span>
                      </button>
                    </div>
                  </div>

                  <div className="sr-student-list">
                    <div className="sr-student-list-header">
                      <h3>
                        <span className="material-symbols-outlined">groups</span>
                        Danh sách Sinh viên
                      </h3>
                      <span className="sr-student-count">{filteredStudents.length} sinh viên</span>
                    </div>

                    {filteredStudents.length === 0 ? (
                      <div className="sr-empty-state">
                        <span className="material-symbols-outlined">person_search</span>
                        <p>Không tìm thấy sinh viên phù hợp với từ khóa "{keyword}".</p>
                      </div>
                    ) : (
                      <div className="sr-table-wrap">
                        <table className="sr-student-table">
                          <thead>
                            <tr>
                              <th>Mã SV</th>
                              <th>Họ tên</th>
                              <th>Lớp</th>
                              <th>Email</th>
                              <th>Trạng thái</th>
                              <th>Số bài thi</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredStudents.map((student) => (
                              <tr
                                key={student.id}
                                className="sr-clickable-row"
                                onClick={() => handleSelectStudent(student.id)}
                              >
                                <td>
                                  <span className="sr-student-code">{student.studentCode}</span>
                                </td>
                                <td>
                                  <div className="sr-student-name-cell">
                                    <div className="sr-mini-avatar">{getInitials(student.fullName)}</div>
                                    <span>{student.fullName}</span>
                                  </div>
                                </td>
                                <td>{student.className}</td>
                                <td><span className="sr-email-text">{student.email}</span></td>
                                <td>
                                  <span className={`sr-status-badge ${STATUS_CLASS_MAP[student.status] || 'inactive'}`}>
                                    {student.status}
                                  </span>
                                </td>
                                <td>
                                  <span className="sr-exam-count-badge">
                                    {student.exams.length}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="sr-view-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectStudent(student.id);
                                    }}
                                  >
                                    <span className="material-symbols-outlined">visibility</span>
                                    Xem kết quả
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button type="button" className="sr-back-btn" onClick={handleBackToList}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Quay lại danh sách
                  </button>

                  <div className="sr-page-header">
                    <div>
                      <h1>Chi tiết Kết quả Sinh viên</h1>
                      <p>Lịch sử và chi tiết từng bài thi của sinh viên.</p>
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
                    </div>
                  </div>

                  <div className="sr-profile-card">
                    <div className="sr-avatar">{getInitials(activeStudent.fullName)}</div>
                    <div className="sr-profile-info">
                      <div className="sr-profile-name-row">
                        <h2>{activeStudent.fullName}</h2>
                        <span className={`sr-status-badge ${STATUS_CLASS_MAP[activeStudent.status] || 'inactive'}`}>
                          {activeStudent.status}
                        </span>
                      </div>
                      <div className="sr-profile-details">
                        <div className="sr-profile-detail-item">
                          <span className="material-symbols-outlined">badge</span>
                          <span>{activeStudent.studentCode}</span>
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

                  {activeStudent.exams.length === 0 ? (
                    <div className="sr-empty-state">
                      <span className="material-symbols-outlined">quiz</span>
                      <p>Sinh viên này chưa tham gia bài thi nào.</p>
                    </div>
                  ) : (
                    <div className="sr-exam-history">
                      <div className="sr-exam-history-header">
                        <h3>Lịch sử Bài Thi</h3>
                        <span className="sr-student-count">{activeStudent.exams.length} bài thi</span>
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
                  )}

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
