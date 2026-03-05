import React from 'react';

const TabReview = ({ examInfo, questions }) => (
  <div className="exam-content-card">
    <h2 className="exam-content-title">Thiết lập &amp; Xuất bản</h2>

    <div className="exam-form-fields">
      <h3 className="exam-content-subtitle">Thông tin chung</h3>
      <div className="review-info-grid">
        <div className="review-info-item">
          <span className="review-info-label">Tên kỳ thi:</span>
          <span className="review-info-value">{examInfo.name || <em>Chưa nhập</em>}</span>
        </div>
        <div className="review-info-item">
          <span className="review-info-label">Mô tả:</span>
          <span className="review-info-value">{examInfo.description || <em>Chưa nhập</em>}</span>
        </div>
        <div className="review-info-item">
          <span className="review-info-label">Loại kỳ thi:</span>
          <span className="review-info-value">{examInfo.type}</span>
        </div>
        <div className="review-info-item">
          <span className="review-info-label">Thời gian bắt đầu:</span>
          <span className="review-info-value">
            {examInfo.startTime ? new Date(examInfo.startTime).toLocaleString('vi-VN') : <em>Chưa nhập</em>}
          </span>
        </div>
        <div className="review-info-item">
          <span className="review-info-label">Thời gian kết thúc:</span>
          <span className="review-info-value">
            {examInfo.endTime ? new Date(examInfo.endTime).toLocaleString('vi-VN') : <em>Chưa nhập</em>}
          </span>
        </div>
      </div>
    </div>

    <div className="exam-form-fields" style={{ marginTop: '1.5rem' }}>
      <h3 className="exam-content-subtitle">Danh sách câu hỏi ({questions.length} câu)</h3>
      {questions.length === 0 ? (
        <p><em>Chưa có câu hỏi nào.</em></p>
      ) : (
        questions.map((question, index) => (
          <div key={question.id} className="question-card" style={{ marginBottom: '1rem' }}>
            <div className="question-header">
              <div className="question-header-left">
                <h3 className="question-number">Câu hỏi {index + 1}</h3>
                <span className="question-badge">{question.type}</span>
              </div>
            </div>
            <div className="question-content">
              <p className="question-text">{question.content || <em>Chưa nhập nội dung</em>}</p>
            </div>
            <div className="options-grid">
              {question.options.map(option => (
                <label key={option.id} className={`option-view ${option.isCorrect ? 'correct' : ''}`}>
                  <input name={`review_q${question.id}`} type="radio" checked={option.isCorrect} readOnly />
                  <span className="option-text">{option.text || `Đáp án ${option.id}`}</span>
                  {option.isCorrect && <span className="material-symbols-outlined option-check-icon">check_circle</span>}
                </label>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default TabReview;
