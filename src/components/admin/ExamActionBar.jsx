import React from 'react';

const ExamActionBar = ({ activeTab, onReturn, onComplete }) => (
  <div className="exam-action-bar">
    <button className="btn-back" onClick={onReturn} disabled={activeTab === 1}>
      <span className="material-symbols-outlined">arrow_back</span>
      Quay lại
    </button>
    <div className="exam-action-bar-right">
      <button className="btn-draft" onClick={() => alert('Đã lưu bản nháp!')}>
        Lưu bản nháp
      </button>
      <button className="btn-complete" onClick={onComplete}>
        Tiếp tục / Hoàn tất
      </button>
    </div>
  </div>
);

export default ExamActionBar;
