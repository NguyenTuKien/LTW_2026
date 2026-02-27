import { useState } from 'react';
import './ExamManagement.css';

function ExamManagement() {
  const [exams, setExams] = useState([
    { id: 1, name: 'Kỳ thi Toán học', date: '2026-03-15', duration: 90, questions: 50, status: 'Hoạt động' },
    { id: 2, name: 'Kỳ thi Tiếng Anh', date: '2026-03-20', duration: 120, questions: 60, status: 'Hoạt động' },
    { id: 3, name: 'Kỳ thi Lập trình Web', date: '2026-04-01', duration: 180, questions: 40, status: 'Sắp diễn ra' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    duration: '',
    questions: '',
    status: 'Hoạt động'
  });

  const handleAdd = () => {
    setEditingExam(null);
    setFormData({ name: '', date: '', duration: '', questions: '', status: 'Hoạt động' });
    setIsModalOpen(true);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setFormData({
      name: exam.name,
      date: exam.date,
      duration: exam.duration,
      questions: exam.questions,
      status: exam.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kỳ thi này?')) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingExam) {
      setExams(exams.map(exam => 
        exam.id === editingExam.id 
          ? { ...exam, ...formData }
          : exam
      ));
    } else {
      const newExam = {
        id: Date.now(),
        ...formData
      };
      setExams([...exams, newExam]);
    }
    
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="exam-management">
      <div className="page-header">
        <h1>Quản lý kỳ thi</h1>
        <button className="btn-add" onClick={handleAdd}>
          + Thêm kỳ thi mới
        </button>
      </div>

      <div className="exam-table-container">
        <table className="exam-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên kỳ thi</th>
              <th>Ngày thi</th>
              <th>Thời gian (phút)</th>
              <th>Số câu hỏi</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={exam.id}>
                <td>{index + 1}</td>
                <td>{exam.name}</td>
                <td>{new Date(exam.date).toLocaleDateString('vi-VN')}</td>
                <td>{exam.duration}</td>
                <td>{exam.questions}</td>
                <td>
                  <span className={`status-badge ${exam.status.toLowerCase().replace(' ', '-')}`}>
                    {exam.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEdit(exam)}>
                      ✏️ Sửa
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(exam.id)}>
                      🗑️ Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingExam ? 'Chỉnh sửa kỳ thi' : 'Thêm kỳ thi mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên kỳ thi:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Ngày thi:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Thời gian (phút):</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>
              
              <div className="form-group">
                <label>Số câu hỏi:</label>
                <input
                  type="number"
                  name="questions"
                  value={formData.questions}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>
              
              <div className="form-group">
                <label>Trạng thái:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Sắp diễn ra">Sắp diễn ra</option>
                  <option value="Đã kết thúc">Đã kết thúc</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button type="submit" className="btn-submit">
                  {editingExam ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamManagement;
