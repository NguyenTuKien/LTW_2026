import React, { useState } from 'react';
import './ExamForm.css';

const ExamForm = () => {
  const [activeTab, setActiveTab] = useState(2);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'Trắc nghiệm',
      content: 'Mô hình OSI có bao nhiêu tầng?',
      options: [
        { id: 'A', text: 'A. 5 tầng', isCorrect: false },
        { id: 'B', text: 'B. 6 tầng', isCorrect: false },
        { id: 'C', text: 'C. 7 tầng', isCorrect: true },
        { id: 'D', text: 'D. 8 tầng', isCorrect: false }
      ],
      isEditMode: false
    },
    {
      id: 2,
      type: 'Trắc nghiệm',
      content: '',
      options: [
        { id: 'A', text: '', isCorrect: false },
        { id: 'B', text: '', isCorrect: false },
        { id: 'C', text: '', isCorrect: false },
        { id: 'D', text: '', isCorrect: false }
      ],
      isEditMode: true
    }
  ]);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: 'Trắc nghiệm',
      content: '',
      options: [
        { id: 'A', text: '', isCorrect: false },
        { id: 'B', text: '', isCorrect: false },
        { id: 'C', text: '', isCorrect: false },
        { id: 'D', text: '', isCorrect: false }
      ],
      isEditMode: true
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const toggleEditMode = (questionId) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, isEditMode: !q.isEditMode } : q
    ));
  };

  return (
    <>
      <div className="exam-form-container">
        <div className="exam-form-wrapper">
          <div className="exam-form-header">
            <h1 className="exam-form-title">Tạo/Chỉnh sửa Kỳ thi</h1>
          </div>

          {/* Tabs */}
          <div className="exam-tabs">
            <div className="exam-tabs-list">
              <button 
                className={`exam-tab ${activeTab === 1 ? 'active' : ''}`}
                onClick={() => handleTabClick(1)}
              >
                <p className="exam-tab-text">
                  <span className="material-symbols-outlined">info</span>
                  1. Thông tin chung
                </p>
              </button>
              <button 
                className={`exam-tab ${activeTab === 2 ? 'active' : ''}`}
                onClick={() => handleTabClick(2)}
              >
                <p className="exam-tab-text">
                  <span className="material-symbols-outlined">format_list_bulleted</span>
                  2. Nội dung câu hỏi
                </p>
              </button>
              <button 
                className={`exam-tab ${activeTab === 3 ? 'active' : ''}`}
                onClick={() => handleTabClick(3)}
              >
                <p className="exam-tab-text">
                  <span className="material-symbols-outlined">settings</span>
                  3. Thiết lập &amp; Xuất bản
                </p>
              </button>
            </div>
          </div>

          {/* Tab 1: Thông tin chung */}
          {activeTab === 1 && (
            <div className="exam-content-card">
              <h2 className="exam-content-title">Thông tin chung</h2>
              <div className="exam-form-fields">
                <div className="exam-form-group">
                  <label className="exam-form-label">Tên kỳ thi</label>
                  <input className="exam-form-input" placeholder="Nhập tên kỳ thi..." type="text" />
                </div>
                <div className="exam-form-group">
                  <label className="exam-form-label">Mô tả</label>
                  <textarea className="exam-form-textarea" placeholder="Nhập mô tả kỳ thi..."></textarea>
                </div>
                <div className="exam-form-grid">
                  <div className="exam-form-group">
                    <label className="exam-form-label">Loại kỳ thi</label>
                    <select className="exam-form-select">
                      <option>Tự do</option>
                      <option>Thời gian cụ thể</option>
                    </select>
                  </div>
                  <div className="exam-form-grid-double">
                    <div className="exam-form-group">
                      <label className="exam-form-label">Thời gian bắt đầu</label>
                      <input className="exam-form-input" type="datetime-local" />
                    </div>
                    <div className="exam-form-group">
                      <label className="exam-form-label">Thời gian kết thúc</label>
                      <input className="exam-form-input" type="datetime-local" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Nội dung câu hỏi */}
          {activeTab === 2 && (
            <>
              <div className="questions-header">
                <h1 className="questions-title">Danh sách câu hỏi</h1>
                <div className="questions-actions">
                  <button className="btn btn-secondary" href>
                    <span className="material-symbols-outlined">download</span>
                    Tải file mẫu
                  </button>
                  <button className="btn btn-primary-light">
                    <span className="material-symbols-outlined">upload_file</span>
                    Nhập từ Excel
                  </button>
                </div>
              </div>

              {/* Questions List */}
              {questions.map((question, index) => (
                <div key={question.id} className="question-card">
                  <div className="question-header">
                    <div className="question-header-left">
                      <h3 className="question-number">Câu hỏi {index + 1}</h3>
                      <span className="question-badge">{question.type}</span>
                    </div>
                    <div className="question-header-actions">
                      <button 
                        onClick={() => toggleEditMode(question.id)}
                        className="icon-btn"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="icon-btn delete"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="question-content">
                    {question.isEditMode ? (
                      <textarea 
                        className="exam-form-textarea" 
                        placeholder="Nhập nội dung câu hỏi..."
                        defaultValue={question.content}
                      ></textarea>
                    ) : (
                      <p className="question-text">{question.content}</p>
                    )}
                  </div>

                  {/* Options */}
                  {question.isEditMode ? (
                    <div className="options-grid">
                      {question.options.map((option) => (
                        <div key={option.id} className="option-edit">
                          <input 
                            name={`q${question.id}_correct`} 
                            type="radio" 
                            defaultChecked={option.isCorrect}
                          />
                          <input 
                            className="exam-form-input" 
                            placeholder={`Đáp án ${option.id}`} 
                            type="text"
                            defaultValue={option.text}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="options-grid">
                      {question.options.map((option) => (
                        <label 
                          key={option.id}
                          className={`option-view ${option.isCorrect ? 'correct' : ''}`}
                        >
                          <input 
                            name={`q${question.id}`} 
                            type="radio"
                            checked={option.isCorrect}
                            readOnly
                          />
                          <span className="option-text">{option.text}</span>
                          {option.isCorrect && (
                            <span className="material-symbols-outlined option-check-icon">check_circle</span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Add Question Button */}
              <div className="add-question-container">
                <button 
                  onClick={handleAddQuestion}
                  className="add-question-btn"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  Thêm câu hỏi mới
                </button>
              </div>
            </>
          )}

          {/* Tab 3: Thiết lập & Xuất bản */}
          {activeTab === 3 && (
            <div className="exam-content-card">
              <h2 className="exam-content-title">Thiết lập &amp; Xuất bản</h2>
              <p>Nội dung thiết lập sẽ được thêm vào đây.</p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="exam-action-bar">
        <button className="btn-back">
          <span className="material-symbols-outlined">arrow_back</span>
          Quay lại
        </button>
        <div className="exam-action-bar-right">
          <button className="btn-draft">
            Lưu bản nháp
          </button>
          <button className="btn-complete">
            Tiếp tục / Hoàn tất
          </button>
        </div>
      </div>
    </>
  );
};

export default ExamForm;
