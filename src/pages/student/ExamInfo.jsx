import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import './ExamInfo.css';

// Exam data mapping (matching MOCK_EXAMS in Dashboard)
const EXAM_INFO_DATA = {
  'dsa-practice-1': {
    title: 'Cấu trúc dữ liệu và Giải thuật - Bài luyện tập 1',
    subject: 'Cấu trúc dữ liệu và Giải thuật',
    category: 'Luyện tập',
    duration: 60,
    questions: 30,
    passScore: 5,
    maxAttempts: 3,
    description: 'Bài luyện tập kiến thức cơ bản về cấu trúc dữ liệu (Stack, Queue, Linked List, Tree, Graph) và các giải thuật sắp xếp, tìm kiếm phổ biến.',
  },
  'network-final': {
    title: 'Mạng máy tính - Thi cuối kỳ',
    subject: 'Mạng máy tính',
    category: 'Cuối kỳ',
    duration: 90,
    questions: 30,
    passScore: 5,
    maxAttempts: 1,
    description: 'Bài thi cuối kỳ môn Mạng máy tính, bao gồm kiến thức về mô hình OSI, TCP/IP, các giao thức mạng, thiết bị mạng và bảo mật.',
  },
  'software-engineering-test': {
    title: 'Công nghệ phần mềm - Bài kiểm tra',
    subject: 'Công nghệ phần mềm',
    category: 'Luyện tập',
    duration: 75,
    questions: 30,
    passScore: 5,
    maxAttempts: 2,
    description: 'Bài kiểm tra kiến thức về quy trình phát triển phần mềm, các mô hình SDLC, UML, kiểm thử và quản lý dự án phần mềm.',
  },
};

export default function ExamInfo() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [agreed, setAgreed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const examInfo = EXAM_INFO_DATA[examId];

  if (!examInfo) {
    return (
      <div className="ei-root">
        <div className="ei-not-found">
          <ion-icon name="alert-circle-outline" style={{ fontSize: '64px', color: '#e53e3e' }}></ion-icon>
          <h2>Không tìm thấy bài thi</h2>
          <p>Bài thi bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
          <button className="ei-btn-back" onClick={() => navigate('/student')}>
            <ion-icon name="arrow-back"></ion-icon>
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const handleStartExam = () => {
    if (!agreed) return;
    setShowConfirm(true);
  };

  const confirmStart = () => {
    navigate(`/student/exam/${examId}`);
  };

  const username = user?.username || 'Student';
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return (
    <div className="ei-root">
      {/* Header */}
      <header className="ei-header">
        <div className="ei-header-left">
          <img src="/ptit-logo.png" alt="PTIT Logo" className="ei-logo" />
          <span className="ei-brand">Hệ thống thi trực tuyến PTIT</span>
        </div>
        <div className="ei-header-right">
          <button className="ei-btn-back-header" onClick={() => navigate('/student')}>
            <ion-icon name="arrow-back"></ion-icon>
            Quay lại
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="ei-main">
        {/* Exam Title Section */}
        <section className="ei-hero">
          <div className="ei-hero-badge">{examInfo.category}</div>
          <h1 className="ei-hero-title">{examInfo.title}</h1>
          <p className="ei-hero-desc">{examInfo.description}</p>
        </section>

        <div className="ei-content-grid">
          {/* Left Column */}
          <div className="ei-left-col">
            {/* Basic Info Card */}
            <div className="ei-card ei-info-card">
              <h2 className="ei-card-title">
                <ion-icon name="information-circle"></ion-icon>
                Thông tin bài thi
              </h2>
              <div className="ei-info-grid">
                <div className="ei-info-item">
                  <div className="ei-info-icon">
                    <ion-icon name="book"></ion-icon>
                  </div>
                  <div>
                    <span className="ei-info-label">Môn học</span>
                    <span className="ei-info-value">{examInfo.subject}</span>
                  </div>
                </div>
                <div className="ei-info-item">
                  <div className="ei-info-icon">
                    <ion-icon name="time"></ion-icon>
                  </div>
                  <div>
                    <span className="ei-info-label">Thời gian làm bài</span>
                    <span className="ei-info-value">{examInfo.duration} phút</span>
                  </div>
                </div>
                <div className="ei-info-item">
                  <div className="ei-info-icon">
                    <ion-icon name="help-circle"></ion-icon>
                  </div>
                  <div>
                    <span className="ei-info-label">Số câu hỏi</span>
                    <span className="ei-info-value">{examInfo.questions} câu trắc nghiệm</span>
                  </div>
                </div>
                <div className="ei-info-item">
                  <div className="ei-info-icon">
                    <ion-icon name="trophy"></ion-icon>
                  </div>
                  <div>
                    <span className="ei-info-label">Điểm đạt tối thiểu</span>
                    <span className="ei-info-value">{examInfo.passScore}/10</span>
                  </div>
                </div>
                <div className="ei-info-item">
                  <div className="ei-info-icon">
                    <ion-icon name="repeat"></ion-icon>
                  </div>
                  <div>
                    <span className="ei-info-label">Số lần thi tối đa</span>
                    <span className="ei-info-value">{examInfo.maxAttempts} lần</span>
                  </div>
                </div>
                <div className="ei-info-item">
                  <div className="ei-info-icon">
                    <ion-icon name="person"></ion-icon>
                  </div>
                  <div>
                    <span className="ei-info-label">Thí sinh</span>
                    <span className="ei-info-value">{displayName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules Card */}
            <div className="ei-card ei-rules-card">
              <h2 className="ei-card-title">
                <ion-icon name="shield-checkmark"></ion-icon>
                Nội quy thi
              </h2>
              <ol className="ei-rules-list">
                <li>
                  <strong>Không gian lận:</strong> Nghiêm cấm mọi hình thức gian lận, bao gồm sao chép, trao đổi bài hoặc sử dụng tài liệu không được phép.
                </li>
                <li>
                  <strong>Không rời khỏi trang thi:</strong> Trong suốt quá trình thi, thí sinh không được chuyển sang tab hoặc cửa sổ khác. Hệ thống sẽ ghi nhận vi phạm.
                </li>
                <li>
                  <strong>Thời gian thi:</strong> Bài thi có thời gian giới hạn {examInfo.duration} phút. Khi hết thời gian, hệ thống sẽ tự động nộp bài.
                </li>
                <li>
                  <strong>Nộp bài:</strong> Sau khi nộp bài, thí sinh không thể quay lại chỉnh sửa câu trả lời. Hãy kiểm tra kỹ trước khi nộp.
                </li>
                <li>
                  <strong>Kết nối mạng:</strong> Đảm bảo kết nối internet ổn định trong suốt quá trình thi. Mất kết nối có thể dẫn đến mất dữ liệu bài làm.
                </li>
                <li>
                  <strong>Thiết bị:</strong> Sử dụng máy tính (laptop/PC) với trình duyệt web hiện đại. Không khuyến khích sử dụng điện thoại.
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column */}
          <div className="ei-right-col">
            {/* Instructions Card */}
            <div className="ei-card ei-guide-card">
              <h2 className="ei-card-title">
                <ion-icon name="document-text"></ion-icon>
                Hướng dẫn làm bài
              </h2>
              <div className="ei-guide-list">
                <div className="ei-guide-item">
                  <div className="ei-guide-number">1</div>
                  <div>
                    <strong>Chọn đáp án</strong>
                    <p>Mỗi câu hỏi có 4 đáp án (A, B, C, D). Bấm vào đáp án để chọn. Bạn có thể thay đổi đáp án bất kỳ lúc nào.</p>
                  </div>
                </div>
                <div className="ei-guide-item">
                  <div className="ei-guide-number">2</div>
                  <div>
                    <strong>Đánh dấu câu hỏi</strong>
                    <p>Sử dụng nút "Đánh dấu câu hỏi" để đánh dấu các câu bạn muốn quay lại xem xét. Câu đánh dấu sẽ hiển thị màu vàng.</p>
                  </div>
                </div>
                <div className="ei-guide-item">
                  <div className="ei-guide-number">3</div>
                  <div>
                    <strong>Điều hướng</strong>
                    <p>Sử dụng nút "Quay lại" / "Tiếp theo" hoặc bấm trực tiếp vào số câu hỏi ở bảng bên trái để chuyển câu.</p>
                  </div>
                </div>
                <div className="ei-guide-item">
                  <div className="ei-guide-number">4</div>
                  <div>
                    <strong>Theo dõi tiến độ</strong>
                    <p>Bảng câu hỏi bên trái hiển thị trạng thái từng câu: <span className="ei-legend-dot answered"></span> Đã làm, <span className="ei-legend-dot flagged"></span> Đã đánh dấu, <span className="ei-legend-dot current"></span> Đang chọn, <span className="ei-legend-dot unanswered"></span> Chưa làm.</p>
                  </div>
                </div>
                <div className="ei-guide-item">
                  <div className="ei-guide-number">5</div>
                  <div>
                    <strong>Nộp bài</strong>
                    <p>Bấm nút "Nộp bài" ở góc trên bên phải để hoàn thành bài thi. Hệ thống sẽ hiển thị xác nhận trước khi nộp.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Card */}
            <div className="ei-card ei-start-card">
              <div className="ei-agree-row">
                <label className="ei-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="ei-checkbox"
                  />
                  <span className="ei-checkbox-custom"></span>
                  <span>Tôi đã đọc và đồng ý với nội quy thi</span>
                </label>
              </div>
              <button
                className={`ei-btn-start${agreed ? '' : ' disabled'}`}
                onClick={handleStartExam}
                disabled={!agreed}
              >
                <ion-icon name="play"></ion-icon>
                Bắt đầu làm bài
              </button>
              <p className="ei-start-note">
                <ion-icon name="information-circle-outline"></ion-icon>
                Sau khi bấm bắt đầu, đồng hồ sẽ bắt đầu đếm ngược.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="ei-modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="ei-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ei-modal-icon">
              <ion-icon name="alert-circle"></ion-icon>
            </div>
            <h3>Xác nhận bắt đầu thi</h3>
            <p>Bạn sắp bắt đầu bài thi <strong>{examInfo.title}</strong>.</p>
            <p>Thời gian làm bài: <strong>{examInfo.duration} phút</strong></p>
            <p className="ei-modal-warn">
              <ion-icon name="warning"></ion-icon>
              Sau khi bắt đầu, đồng hồ sẽ đếm ngược và không thể tạm dừng.
            </p>
            <div className="ei-modal-actions">
              <button className="ei-modal-cancel" onClick={() => setShowConfirm(false)}>
                Hủy bỏ
              </button>
              <button className="ei-modal-confirm" onClick={confirmStart}>
                <ion-icon name="play"></ion-icon>
                Bắt đầu ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
