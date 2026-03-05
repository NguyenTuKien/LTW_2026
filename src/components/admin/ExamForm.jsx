import React from 'react';
import './ExamForm.css';
import useExamForm from '../../hooks/useExamForm';
import TabGeneralInfo from './tabs/TabGeneralInfo';
import TabQuestions from './tabs/TabQuestions';
import TabReview from './tabs/TabReview';
import ExamActionBar from './ExamActionBar';

const ExamForm = () => {
  const {
    activeTab,
    examInfo,
    questions,
    fileInputRef,
    handleInputInfoChange,
    handleTabClick,
    handleAddQuestion,
    handleDeleteQuestion,
    toggleEditMode,
    handleImportClick,
    handleExcelUpload,
    handleComplete,
    handleReturn,
  } = useExamForm();


  return (
    <>
      <div className="exam-form-container">
        <div className="exam-form-wrapper">
          <div className="exam-form-header">
            <h1 className="exam-form-title">Tạo/Chỉnh sửa Kỳ thi</h1>
          </div>

          <div className="exam-tabs">
            <div className="exam-tabs-list">
              {[
                { num: 1, icon: 'info', label: '1. Thông tin chung' },
                { num: 2, icon: 'format_list_bulleted', label: '2. Nội dung câu hỏi' },
                { num: 3, icon: 'settings', label: '3. Thiết lập & Xuất bản' },
              ].map(({ num, icon, label }) => (
                <button
                  key={num}
                  className={`exam-tab ${activeTab === num ? 'active' : ''}`}
                  onClick={() => handleTabClick(num)}
                >
                  <p className="exam-tab-text">
                    <span className="material-symbols-outlined">{icon}</span>
                    {label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 1 && (
            <TabGeneralInfo examInfo={examInfo} onChange={handleInputInfoChange} />
          )}
          {activeTab === 2 && (
            <TabQuestions
              questions={questions}
              fileInputRef={fileInputRef}
              onAddQuestion={handleAddQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onToggleEditMode={toggleEditMode}
              onImportClick={handleImportClick}
              onExcelUpload={handleExcelUpload}
            />
          )}
          {activeTab === 3 && (
            <TabReview examInfo={examInfo} questions={questions} />
          )}
        </div>
      </div>

      <ExamActionBar
        activeTab={activeTab}
        onReturn={handleReturn}
        onComplete={handleComplete}
      />
    </>
  );
};

export default ExamForm;
