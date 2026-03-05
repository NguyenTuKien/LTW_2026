import { useMemo, useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import './StudentResults.css';
import { studentsData } from '../../data/adminStudentResultsData';

const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.toLocaleDateString('vi-VN')} ${date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

function StudentResults() {
  const [keyword, setKeyword] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(studentsData[0].id);
  const [selectedExamId, setSelectedExamId] = useState(studentsData[0].exams[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredStudents = useMemo(() => {
    const trimmedKeyword = keyword.trim().toLowerCase();
    if (!trimmedKeyword) {
      return studentsData;
    }
    return studentsData.filter(
      (student) =>
        student.name.toLowerCase().includes(trimmedKeyword) ||
        student.id.toLowerCase().includes(trimmedKeyword)
    );
  }, [keyword]);

  const activeStudent =
    filteredStudents.find((student) => student.id === selectedStudentId) || filteredStudents[0];

  const activeExam =
    activeStudent?.exams.find((exam) => exam.id === selectedExamId) || activeStudent?.exams[0];

  const studentSummary = useMemo(() => {
    if (!activeStudent) {
      return null;
    }

    const totalExams = activeStudent.exams.length;
    const completeCount = activeStudent.exams.filter(
      (exam) => exam.status === 'Hoàn thành'
    ).length;
    const avgScore =
      activeStudent.exams.reduce((sum, exam) => sum + exam.score, 0) / Math.max(totalExams, 1);

    return {
      totalExams,
      completeCount,
      completeRate: Number(((completeCount / Math.max(totalExams, 1)) * 100).toFixed(1)),
      avgScore: Number(avgScore.toFixed(2)),
    };
  }, [activeStudent]);

  const handleSearch = () => {
    if (!filteredStudents.length) {
      return;
    }
    setSelectedStudentId(filteredStudents[0].id);
    setSelectedExamId(filteredStudents[0].exams[0].id);
  };

  const handleSelectStudent = (studentId) => {
    const student = studentsData.find((item) => item.id === studentId);
    setSelectedStudentId(studentId);
    if (student?.exams?.length) {
      setSelectedExamId(student.exams[0].id);
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
          <div className="student-results-page">
            <div className="student-results-wrapper">
              <header className="student-results-header">
                <div>
                  <h1>Tra cứu kết quả từng sinh viên</h1>
                  <p>Tìm theo tên hoặc MSSV, xem lịch sử thi và chi tiết câu trả lời.</p>
                </div>
                <button type="button" onClick={() => window.print()}>
                  Xuất báo cáo / In
                </button>
              </header>

              <section className="search-panel">
                <input
                  type="text"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Nhập tên sinh viên hoặc MSSV..."
                />
                <button type="button" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </section>

              {!filteredStudents.length ? (
                <div className="empty-state">Không tìm thấy sinh viên phù hợp.</div>
              ) : (
                <>
                  <section className="students-list">
                    {filteredStudents.map((student) => (
                      <button
                        key={student.id}
                        type="button"
                        className={student.id === activeStudent.id ? 'active' : ''}
                        onClick={() => handleSelectStudent(student.id)}
                      >
                        <strong>{student.name}</strong>
                        <span>{student.id}</span>
                        <span>{student.className}</span>
                      </button>
                    ))}
                  </section>

                  <section className="student-profile">
                    <h2>
                      {activeStudent.name} - {activeStudent.id}
                    </h2>
                    <p>Lớp: {activeStudent.className}</p>
                    <p>Email: {activeStudent.email}</p>
                  </section>

                  {studentSummary && (
                    <section className="summary-grid">
                      <article>
                        <span>Tổng kỳ thi</span>
                        <strong>{studentSummary.totalExams}</strong>
                      </article>
                      <article>
                        <span>Đã hoàn thành</span>
                        <strong>{studentSummary.completeCount}</strong>
                      </article>
                      <article>
                        <span>Tỷ lệ hoàn thành</span>
                        <strong>{studentSummary.completeRate}%</strong>
                      </article>
                      <article>
                        <span>Điểm trung bình</span>
                        <strong>{studentSummary.avgScore}/10</strong>
                      </article>
                    </section>
                  )}

                  <section className="exam-history">
                    <h3>Lịch sử kỳ thi</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Tên kỳ thi</th>
                          <th>Điểm</th>
                          <th>Trạng thái</th>
                          <th>Thời gian tham gia</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeStudent.exams.map((exam) => (
                          <tr key={exam.id}>
                            <td>{exam.name}</td>
                            <td>{exam.score}/10</td>
                            <td>
                              <span className={exam.status === 'Hoàn thành' ? 'status pass' : 'status fail'}>
                                {exam.status}
                              </span>
                            </td>
                            <td>{formatDateTime(exam.joinedAt)}</td>
                            <td>
                              <button type="button" onClick={() => setSelectedExamId(exam.id)}>
                                Xem chi tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>

                  {activeExam && (
                    <section className="exam-detail">
                      <h3>{activeExam.name}</h3>
                      <p>
                        Điểm: <strong>{activeExam.score}/10</strong> - Đúng {activeExam.correctCount}/
                        {activeExam.totalQuestions} câu - Thời gian làm: {activeExam.durationMinutes} phút
                      </p>
                      <div className="detail-list">
                        {activeExam.details.map((item, index) => {
                          const isCorrect = item.studentAnswer === item.correctAnswer;
                          return (
                            <article key={`${activeExam.id}-${index}`} className={isCorrect ? 'correct' : 'wrong'}>
                              <h4>
                                Câu {index + 1}: {item.question}
                              </h4>
                              <p>
                                <span>Sinh viên chọn:</span> {item.studentAnswer}
                              </p>
                              <p>
                                <span>Đáp án đúng:</span> {item.correctAnswer}
                              </p>
                              {item.explanation && (
                                <p>
                                  <span>Giải thích:</span> {item.explanation}
                                </p>
                              )}
                            </article>
                          );
                        })}
                      </div>
                    </section>
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

