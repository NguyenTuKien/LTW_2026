import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExams } from '../../contexts/ExamContext';
import { useStudents } from '../../contexts/StudentContext';
import '../../styles/admin/DashboardPanel.css';





const initialAttempts = [
  { id: 1, examId: 1, userId: 1, score: 8.2, status: 'Đã hoàn thành' },
  { id: 2, examId: 1, userId: 2, score: 4.7, status: 'Đã hoàn thành' },
  { id: 3, examId: 1, userId: 3, score: 6.3, status: 'Đã hoàn thành' },
  { id: 4, examId: 4, userId: 1, score: 0, status: 'Đang làm' },
  { id: 5, examId: 4, userId: 4, score: 0, status: 'Đang làm' },
  { id: 6, examId: 3, userId: 1, score: 9.1, status: 'Đã hoàn thành' },
  { id: 7, examId: 3, userId: 2, score: 7.8, status: 'Đã hoàn thành' },
  { id: 8, examId: 3, userId: 4, score: 5.4, status: 'Đã hoàn thành' },
  { id: 9, examId: 5, userId: 2, score: 4.9, status: 'Đã hoàn thành' },
  { id: 10, examId: 5, userId: 4, score: 7.2, status: 'Đã hoàn thành' },
  { id: 11, examId: 2, userId: 1, score: 0, status: 'Đang làm' },
  { id: 12, examId: 2, userId: 3, score: 0, status: 'Đang làm' },
  { id: 13, examId: 5, userId: 1, score: 0, status: 'Đang làm' },
  { id: 14, examId: 5, userId: 3, score: 0, status: 'Đang làm' },
];

const initialActivities = [
  {
    id: 1,
    title: 'Thi giữa kỳ Lập trình Web',
    detail: '298/310 tham gia',
    status: 'Đang diễn ra',
    meta: 'Còn 18 phút',
  },
  {
    id: 2,
    title: 'Quiz 1 Java',
    detail: '152/195 tham gia',
    status: 'Đang diễn ra',
    meta: 'Còn 07 phút',
  },
  {
    id: 3,
    title: 'Luyện tập Mạng máy tính',
    detail: '268 bài thi đã nộp',
    status: 'Đã hoàn thành',
    meta: 'Kết thúc lúc 10:30 AM',
  },
];

const initialSupports = [
  {
    id: 1,
    name: 'Lê Văn A',
    code: 'B20DCCN123',
    message: 'Không thể kết nối máy chủ khi nộp bài.',
    time: '15 phút trước',
  },
  {
    id: 2,
    name: 'Hoàng Thị T',
    code: 'B20DCCN456',
    message: 'Tài khoản bị khóa sau khi đổi mật khẩu.',
    time: '1 giờ trước',
  },
  {
    id: 3,
    name: 'Phạm Văn M',
    code: 'B20DCCN789',
    message: 'Xin cấp lại quyền truy cập bài thi C++.',
    time: '3 giờ trước',
  },
];

const examFormDefault = {
  code: '',
  title: '',
  subject: '',
  type: 'Tự do',
  status: 'Sắp diễn ra',
  participants: '',
  durationMinutes: '',
};

const userFormDefault = {
  studentCode: '',
  fullName: '',
  email: '',
  className: '',
  status: 'Hoạt động',
};

const EXAM_STATUS_OPTIONS = ['Sắp diễn ra', 'Đang diễn ra', 'Đã hoàn thành'];
const EXAM_TYPE_OPTIONS = ['Tự do', 'Thời gian cụ thể'];
const USER_STATUS_OPTIONS = ['Hoạt động', 'Khóa'];
const STATUS_CLASS_MAP = {
  'Đang diễn ra': 'success',
  'Hoạt động': 'success',
  'Sắp diễn ra': 'warning',
  'Đang làm': 'info',
  Khóa: 'danger',
};

const getNextId = (items) => (items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1);

const matchesKeyword = (fields, keyword) => {
  if (!keyword) return true;
  return fields.join(' ').toLowerCase().includes(keyword);
};

const buildAxisTicks = (chartMax, steps = 5) =>
  Array.from({ length: steps + 1 }, (_, index) => chartMax - index * (chartMax / steps));

const getStatusClass = (status) => STATUS_CLASS_MAP[status] || 'muted';

const toExamPayload = (form) => ({
  code: form.code.trim(),
  title: form.title.trim(),
  subject: form.subject.trim() || 'Chưa phân loại',
  type: form.type,
  status: form.status,
  participants: Number(form.participants) || 0,
  durationMinutes: Number(form.durationMinutes) || 0,
});

const toUserPayload = (form) => ({
  studentCode: form.studentCode.trim(),
  fullName: form.fullName.trim(),
  email: form.email.trim(),
  className: form.className.trim(),
  status: form.status,
});

const getUserInitials = (name) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || '')
    .join('');

const DashboardPanel = ({ searchTerm = '' }) => {
  const navigate = useNavigate();
  const { exams, setExams, addExam: ctxAddExam, updateExam: ctxUpdateExam, deleteExam: ctxDeleteExam } = useExams();
  const { students: users, addStudent, updateStudent, deleteStudent } = useStudents();
  const attempts = initialAttempts;
  const activities = initialActivities;
  const supports = initialSupports;

  const [examModal, setExamModal] = useState({ open: false, mode: 'add', id: null, form: { ...examFormDefault } });
  const [userModal, setUserModal] = useState({ open: false, mode: 'add', id: null, form: { ...userFormDefault } });
  const [examFormError, setExamFormError] = useState('');
  const [userFormError, setUserFormError] = useState('');

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredExams = useMemo(
    () =>
      exams.filter((exam) => matchesKeyword([exam.code, exam.title, exam.subject, exam.status, exam.type], normalizedSearch)),
    [exams, normalizedSearch],
  );

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => matchesKeyword([user.studentCode, user.fullName, user.email, user.className, user.status], normalizedSearch)),
    [users, normalizedSearch],
  );

  const dashboardStats = useMemo(() => {
    const completedAttempts = attempts.filter((item) => item.status === 'Đã hoàn thành');
    const participantTotal = exams.reduce((sum, exam) => sum + exam.participants, 0);
    const passRate = completedAttempts.length
      ? (completedAttempts.filter((item) => item.score >= 5).length / completedAttempts.length) * 100
      : 0;

    return {
      totalExams: exams.length,
      participantTotal,
      liveParticipants: 60,
      passRate,
    };
  }, [attempts, exams]);

  const statCards = useMemo(
    () => [
      {
        id: 'totalExams',
        label: 'Tổng kỳ thi',
        value: dashboardStats.totalExams.toLocaleString('vi-VN'),
        trend: '+12%',
        note: 'so với tháng trước',
        icon: 'content_paste',
        accent: 'blue',
      },
      {
        id: 'participants',
        label: 'Sinh viên tham gia',
        value: dashboardStats.participantTotal.toLocaleString('vi-VN'),
        trend: '+5.2%',
        note: 'so với tháng trước',
        icon: 'groups',
        accent: 'purple',
      },
      {
        id: 'liveExams',
        label: 'Đang thi (Live)',
        value: dashboardStats.liveParticipants.toLocaleString('vi-VN'),
        trend: '#Real-time',
        note: 'cập nhật liên tục',
        icon: 'sensors',
        accent: 'green',
      },
      {
        id: 'passRate',
        label: 'Tỷ lệ đạt (Pass Rate)',
        value: `${dashboardStats.passRate.toFixed(1)}%`,
        trend: '-1.5%',
        note: 'kỳ thi gần nhất',
        icon: 'military_tech',
        accent: 'red',
      },
    ],
    [dashboardStats.liveParticipants, dashboardStats.participantTotal, dashboardStats.passRate, dashboardStats.totalExams],
  );

  const chartData = useMemo(() => {
    const bySubject = {};
    exams.forEach((exam) => {
      bySubject[exam.subject] = (bySubject[exam.subject] || 0) + exam.participants;
    });

    const entries = Object.entries(bySubject).map(([subject, value]) => ({ subject, value })).slice(0, 5);
    const maxValue = Math.max(...entries.map((item) => item.value), 1);
    const chartMax = Math.max(1000, Math.ceil(maxValue / 200) * 200);

    return {
      axisTicks: buildAxisTicks(chartMax),
      bars: entries.map((item) => ({
        ...item,
        percentage: Math.max(2, (item.value / chartMax) * 100),
      })),
    };
  }, [exams]);

  const closeExamModal = () => {
    setExamModal((prev) => ({ ...prev, open: false }));
    setExamFormError('');
  };

  const openAddExamModal = () => {
    setExamModal({ open: true, mode: 'add', id: null, form: { ...examFormDefault } });
    setExamFormError('');
  };

  const closeUserModal = () => {
    setUserModal((prev) => ({ ...prev, open: false }));
    setUserFormError('');
  };

  const openAddUserModal = () => {
    setUserModal({ open: true, mode: 'add', id: null, form: { ...userFormDefault } });
    setUserFormError('');
  };

  const handleExamFormChange = (event) => {
    const { name, value } = event.target;
    setExamModal((prev) => ({ ...prev, form: { ...prev.form, [name]: value } }));
    if (examFormError) setExamFormError('');
  };

  const handleUserFormChange = (event) => {
    const { name, value } = event.target;
    setUserModal((prev) => ({ ...prev, form: { ...prev.form, [name]: value } }));
    if (userFormError) setUserFormError('');
  };

  const openEditExam = (exam) => {
    setExamModal({
      open: true,
      mode: 'edit',
      id: exam.id,
      form: {
        code: exam.code,
        title: exam.title,
        subject: exam.subject,
        type: exam.type,
        status: exam.status,
        participants: String(exam.participants),
        durationMinutes: String(exam.durationMinutes),
      },
    });
    setExamFormError('');
  };

  const openEditUser = (user) => {
    setUserModal({
      open: true,
      mode: 'edit',
      id: user.id,
      form: {
        studentCode: user.studentCode,
        fullName: user.fullName,
        email: user.email,
        className: user.className,
        status: user.status,
      },
    });
    setUserFormError('');
  };

  const saveExam = (event) => {
    event.preventDefault();

    const form = examModal.form;
    if (!form.title.trim() || !form.code.trim()) {
      setExamFormError('Vui lòng nhập mã kỳ thi và tên kỳ thi.');
      return;
    }

    const payload = toExamPayload(form);
    if (examModal.mode === 'add') {
      ctxAddExam(payload);
    } else {
      ctxUpdateExam(examModal.id, payload);
    }

    closeExamModal();
  };

  const saveUser = (event) => {
    event.preventDefault();

    const form = userModal.form;
    if (!form.fullName.trim() || !form.studentCode.trim() || !form.email.trim()) {
      setUserFormError('Vui lòng nhập đầy đủ mã sinh viên, họ tên và email.');
      return;
    }

    const payload = toUserPayload(form);
    if (userModal.mode === 'add') {
      addStudent(payload);
    } else {
      updateStudent(userModal.id, payload);
    }

    closeUserModal();
  };

  const confirmAndRun = (message, callback) => {
    if (!window.confirm(message)) return;
    callback();
  };

  const deleteExam = (id) =>
    confirmAndRun('Bạn có chắc chắn muốn xóa kỳ thi này?', () => {
      ctxDeleteExam(id);
    });

  const deleteUser = (id) =>
    confirmAndRun('Bạn có chắc chắn muốn xóa tài khoản sinh viên này?', () => {
      deleteStudent(id);
    });

  return (
    <div className="dashboard-page">
      <section className="dashboard-heading">
        <div>
          <h1 className="dashboard-title">Dashboard Tổng quan</h1>
          <p className="dashboard-subtitle">Hệ thống thi trắc nghiệm trực tuyến PTIT</p>
        </div>
        <div className="dashboard-top-actions">
          <button
            className="dashboard-btn dashboard-btn-primary"
            onClick={openAddExamModal}
          >
            <span className="material-symbols-outlined">add</span>
            Kỳ thi nhanh
          </button>
        </div>
      </section>

      <section className="dashboard-stats-grid">
        {statCards.map((card) => (
          <article className={`dashboard-stat-card accent-${card.accent}`} key={card.id}>
            <div className="dashboard-stat-top">
              <div className="dashboard-stat-label">{card.label}</div>
              <div className={`dashboard-stat-icon icon-${card.accent}`}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
            </div>
            <div className="dashboard-stat-value">{card.value}</div>
            <div className="dashboard-stat-footer">
              <span className={`dashboard-stat-trend trend-${card.accent}`}>{card.trend}</span>
              <span className="dashboard-stat-note">{card.note}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-chart-card">
        <div className="dashboard-card-header">
          <div>
            <h2>Thống kê kết quả thi theo môn học</h2>
            <p>Kỳ 1 Năm học 2023-2024</p>
          </div>
          <div className="dashboard-legend">
            <span />
            Số sinh viên dự thi
          </div>
        </div>
        <div className="dashboard-chart-scroll">
          <div className="dashboard-chart-body">
            <div
              className="dashboard-y-axis"
              style={{ gridTemplateRows: `repeat(${chartData.axisTicks.length}, 1fr)` }}
            >
              {chartData.axisTicks.map((tick) => (
                <div className="dashboard-y-axis-tick" key={tick}>
                  {Math.round(tick)}
                </div>
              ))}
            </div>
            <div className="dashboard-plot-area">
              <div
                className="dashboard-grid-lines"
                style={{ gridTemplateRows: `repeat(${chartData.axisTicks.length}, 1fr)` }}
              >
                {chartData.axisTicks.map((tick) => (
                  <div className="dashboard-grid-line" key={`line-${tick}`} />
                ))}
              </div>
              <div className="dashboard-bars" style={{ '--bar-count': Math.max(chartData.bars.length, 1) }}>
                {chartData.bars.map((item) => (
                  <div className="dashboard-bar-item" key={item.subject}>
                    <div className="dashboard-bar-value">{item.value}</div>
                    <div className="dashboard-bar-track">
                      <div className="dashboard-bar-fill" style={{ height: `${item.percentage}%` }} />
                    </div>
                    <div className="dashboard-bar-label">{item.subject}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-management-grid">
        <article className="dashboard-card">
          <div id="exam-management" className="dashboard-anchor" />
          <div className="dashboard-card-header">
            <h2>Quản lý kỳ thi</h2>
            <button
              className="dashboard-btn dashboard-btn-primary-light"
              onClick={openAddExamModal}
            >
              <span className="material-symbols-outlined">add</span>
              Thêm kỳ thi
            </button>
          </div>
          <div className="dashboard-table-wrap">
            <table className="dashboard-table dashboard-table-exams">
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Tên kỳ thi</th>
                  <th>Trạng thái</th>
                  <th>Tham gia</th>
                  <th>Điểm TB</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.code}</td>
                    <td>{exam.title}</td>
                    <td>
                      <span className={`dashboard-badge ${getStatusClass(exam.status)}`}>{exam.status}</span>
                    </td>
                    <td>{exam.participants}</td>
                    <td>{exam.avgScore > 0 ? exam.avgScore.toFixed(1) : '-'}</td>
                    <td>
                      <div className="dashboard-row-actions">
                        <button onClick={() => openEditExam(exam)}>Sửa</button>
                        <button className="danger" onClick={() => deleteExam(exam.id)}>
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredExams.length === 0 && (
                  <tr>
                    <td className="dashboard-empty" colSpan={6}>
                      Không có kỳ thi phù hợp bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="dashboard-card">
          <div id="user-management" className="dashboard-anchor" />
          <div className="dashboard-card-header">
            <h2>Tra cứu sinh viên</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="dashboard-btn dashboard-btn-secondary"
                onClick={() => navigate('/admin/students')}
              >
                <span className="material-symbols-outlined">person_search</span>
                Tra cứu
              </button>
              <button
                className="dashboard-btn dashboard-btn-primary-light"
                onClick={openAddUserModal}
              >
                <span className="material-symbols-outlined">person_add</span>
                Thêm sinh viên
              </button>
            </div>
          </div>
          <div className="dashboard-table-wrap">
            <table className="dashboard-table dashboard-table-users">
              <thead>
                <tr>
                  <th>Mã SV</th>
                  <th>Họ tên</th>
                  <th>Lớp</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.studentCode}</td>
                    <td>
                      <div>{user.fullName}</div>
                      <small>{user.email}</small>
                    </td>
                    <td>{user.className || '-'}</td>
                    <td>
                      <span className={`dashboard-badge ${getStatusClass(user.status)}`}>{user.status}</span>
                    </td>
                    <td>
                      <div className="dashboard-row-actions">
                        <button onClick={() => openEditUser(user)}>Sửa</button>
                        <button className="danger" onClick={() => deleteUser(user.id)}>
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td className="dashboard-empty" colSpan={5}>
                      Không có sinh viên phù hợp bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="dashboard-bottom-grid">
        <article className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Hoạt động thi gần đây</h2>
            <button className="dashboard-link-btn" type="button">
              Xem tất cả
            </button>
          </div>
          <div className="dashboard-list">
            {activities.map((item) => (
              <div className="dashboard-list-item" key={item.id}>
                <div className="dashboard-list-left">
                  <div className={`dashboard-dot ${getStatusClass(item.status)}`} />
                  <div className="dashboard-list-title">{item.title}</div>
                  <div className="dashboard-list-meta">
                    {item.detail} • {item.meta}
                  </div>
                </div>
                <span className={`dashboard-badge ${getStatusClass(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="dashboard-support-title-wrap">
              <h2>Yêu cầu Hỗ trợ</h2>
              <span className="dashboard-new-badge">3 mới</span>
            </div>
          </div>
          <div className="dashboard-list">
            {supports.map((item) => (
              <div className="dashboard-list-item" key={item.id}>
                <div className="dashboard-list-left">
                  <div className="dashboard-user-avatar">{getUserInitials(item.name)}</div>
                  <div>
                    <div className="dashboard-list-title">
                      {item.name} <small>{item.code}</small>
                    </div>
                    <div className="dashboard-list-meta">{item.message}</div>
                    <div className="dashboard-list-meta">{item.time}</div>
                  </div>
                </div>
                <button className="dashboard-btn dashboard-btn-secondary">Phản hồi</button>
              </div>
            ))}
          </div>
        </article>
      </section>

      {examModal.open && (
        <div className="dashboard-modal-overlay" onClick={closeExamModal}>
          <div className="dashboard-modal" onClick={(event) => event.stopPropagation()}>
            <h3>{examModal.mode === 'add' ? 'Thêm kỳ thi mới' : 'Chỉnh sửa kỳ thi'}</h3>
            <form onSubmit={saveExam}>
              <div className="dashboard-form-grid">
                <label>
                  Mã kỳ thi
                  <input name="code" value={examModal.form.code} onChange={handleExamFormChange} />
                </label>
                <label>
                  Tên kỳ thi
                  <input name="title" value={examModal.form.title} onChange={handleExamFormChange} />
                </label>
                <label>
                  Môn học
                  <input name="subject" value={examModal.form.subject} onChange={handleExamFormChange} />
                </label>
                <label>
                  Loại
                  <select name="type" value={examModal.form.type} onChange={handleExamFormChange}>
                    {EXAM_TYPE_OPTIONS.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Trạng thái
                  <select name="status" value={examModal.form.status} onChange={handleExamFormChange}>
                    {EXAM_STATUS_OPTIONS.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Số lượt tham gia
                  <input name="participants" type="number" value={examModal.form.participants} onChange={handleExamFormChange} />
                </label>
                <label>
                  Thời lượng (phút)
                  <input
                    name="durationMinutes"
                    type="number"
                    value={examModal.form.durationMinutes}
                    onChange={handleExamFormChange}
                  />
                </label>
              </div>
              {examFormError && <p className="dashboard-form-error">{examFormError}</p>}
              <div className="dashboard-modal-actions">
                <button type="button" className="dashboard-btn dashboard-btn-secondary" onClick={closeExamModal}>
                  Hủy
                </button>
                <button type="submit" className="dashboard-btn dashboard-btn-primary">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {userModal.open && (
        <div className="dashboard-modal-overlay" onClick={closeUserModal}>
          <div className="dashboard-modal" onClick={(event) => event.stopPropagation()}>
            <h3>{userModal.mode === 'add' ? 'Thêm sinh viên mới' : 'Chỉnh sửa sinh viên'}</h3>
            <form onSubmit={saveUser}>
              <div className="dashboard-form-grid">
                <label>
                  Mã sinh viên
                  <input name="studentCode" value={userModal.form.studentCode} onChange={handleUserFormChange} />
                </label>
                <label>
                  Họ tên
                  <input name="fullName" value={userModal.form.fullName} onChange={handleUserFormChange} />
                </label>
                <label>
                  Email
                  <input name="email" type="email" value={userModal.form.email} onChange={handleUserFormChange} />
                </label>
                <label>
                  Lớp
                  <input name="className" value={userModal.form.className} onChange={handleUserFormChange} />
                </label>
                <label>
                  Trạng thái
                  <select name="status" value={userModal.form.status} onChange={handleUserFormChange}>
                    {USER_STATUS_OPTIONS.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>
              {userFormError && <p className="dashboard-form-error">{userFormError}</p>}
              <div className="dashboard-modal-actions">
                <button type="button" className="dashboard-btn dashboard-btn-secondary" onClick={closeUserModal}>
                  Hủy
                </button>
                <button type="submit" className="dashboard-btn dashboard-btn-primary">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPanel;
