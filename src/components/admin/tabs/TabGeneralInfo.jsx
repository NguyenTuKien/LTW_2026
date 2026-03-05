import React from 'react';

const TabGeneralInfo = ({ examInfo, onChange }) => (
  <div className="exam-content-card">
    <h2 className="exam-content-title">Thông tin chung</h2>
    <div className="exam-form-fields">
      <div className="exam-form-group">
        <label className="exam-form-label">Tên kỳ thi</label>
        <input
          className="exam-form-input"
          placeholder="Nhập tên kỳ thi..."
          type="text"
          name="name"
          value={examInfo.name}
          onChange={onChange}
        />
      </div>
      <div className="exam-form-group">
        <label className="exam-form-label">Mô tả</label>
        <textarea
          className="exam-form-textarea"
          placeholder="Nhập mô tả kỳ thi..."
          name="description"
          value={examInfo.description}
          onChange={onChange}
        />
      </div>
      <div className="exam-form-grid">
        <div className="exam-form-group">
          <label className="exam-form-label">Loại kỳ thi</label>
          <select className="exam-form-select" name="type" value={examInfo.type} onChange={onChange}>
            <option>Tự do</option>
            <option>Thời gian cụ thể</option>
          </select>
        </div>
        <div className="exam-form-grid-double">
          <div className="exam-form-group">
            <label className="exam-form-label">Thời gian bắt đầu</label>
            <input className="exam-form-input" type="datetime-local" name="startTime" value={examInfo.startTime} onChange={onChange} />
          </div>
          <div className="exam-form-group">
            <label className="exam-form-label">Thời gian kết thúc</label>
            <input className="exam-form-input" type="datetime-local" name="endTime" value={examInfo.endTime} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TabGeneralInfo;
