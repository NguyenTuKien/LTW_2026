import React from 'react';

const TabQuestions = ({ questions, fileInputRef, onAddQuestion, onDeleteQuestion, onToggleEditMode, onImportClick, onExcelUpload }) => (
  <>
    <input ref={fileInputRef} type="file" accept=".xlsx,.xls" style={{ display: 'none' }} onChange={onExcelUpload} />

    <div className="questions-header">
      <h1 className="questions-title">Danh sách câu hỏi</h1>
      <div className="questions-actions">
        <a className="btn btn-secondary" href="/Form.xlsx" download>
          <span className="material-symbols-outlined">download</span>
          Tải file mẫu
        </a>
        <button className="btn btn-primary-light" onClick={onImportClick}>
          <span className="material-symbols-outlined">upload_file</span>
          Nhập từ Excel
        </button>
      </div>
    </div>

    {questions.map((question, index) => (
      <div key={question.id} className="question-card">
        <div className="question-header">
          <div className="question-header-left">
            <h3 className="question-number">Câu hỏi {index + 1}</h3>
            <span className="question-badge">{question.type}</span>
          </div>
          <div className="question-header-actions">
            <button onClick={() => onToggleEditMode(question.id)} className="icon-btn">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button onClick={() => onDeleteQuestion(question.id)} className="icon-btn delete">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>

        <div className="question-content">
          {question.isEditMode ? (
            <textarea className="exam-form-textarea" placeholder="Nhập nội dung câu hỏi..." defaultValue={question.content} />
          ) : (
            <p className="question-text">{question.content}</p>
          )}
        </div>

        {question.isEditMode ? (
          <div className="options-grid">
            {question.options.map(option => (
              <div key={option.id} className="option-edit">
                <input name={`q${question.id}_correct`} type="radio" defaultChecked={option.isCorrect} />
                <input className="exam-form-input" placeholder={`Đáp án ${option.id}`} type="text" defaultValue={option.text} />
              </div>
            ))}
          </div>
        ) : (
          <div className="options-grid">
            {question.options.map(option => (
              <label key={option.id} className={`option-view ${option.isCorrect ? 'correct' : ''}`}>
                <input name={`q${question.id}`} type="radio" checked={option.isCorrect} readOnly />
                <span className="option-text">{option.text}</span>
                {option.isCorrect && <span className="material-symbols-outlined option-check-icon">check_circle</span>}
              </label>
            ))}
          </div>
        )}
      </div>
    ))}

    <div className="add-question-container">
      <button onClick={onAddQuestion} className="add-question-btn">
        <span className="material-symbols-outlined">add_circle</span>
        Thêm câu hỏi mới
      </button>
    </div>
  </>
);

export default TabQuestions;
