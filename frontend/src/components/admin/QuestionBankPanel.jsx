import React, { useState, useMemo } from 'react';
import { useExams } from '../../contexts/ExamContext';
import '../../styles/admin/QuestionBankPanel.css';

const QuestionBankPanel = () => {
  const { bankExams, addBankExam, updateBankExam, deleteBankExam } = useExams();
  
  const [view, setView] = useState('list');
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // form state
  const [editId, setEditId] = useState(null);
  const [formParams, setFormParams] = useState({ title: '', duration: 60 });
  const [formQuestions, setFormQuestions] = useState([]);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const totalQuestions = useMemo(
    () => bankExams.reduce((sum, exam) => sum + exam.questions.length, 0),
    [bankExams],
  );

  const filteredExams = useMemo(() => {
    if (!normalizedSearch) return bankExams;
    return bankExams.map((exam) => {
      const titleMatch = exam.title.toLowerCase().includes(normalizedSearch);
      const matchedQuestions = exam.questions.filter(
        (q) =>
          q.text.toLowerCase().includes(normalizedSearch) ||
          q.options.some((o) => o.text.toLowerCase().includes(normalizedSearch)),
      );
      if (titleMatch) return exam;
      if (matchedQuestions.length > 0) return { ...exam, questions: matchedQuestions };
      return null;
    }).filter(Boolean);
  }, [bankExams, normalizedSearch]);

  const accentClass = (index) => `accent-${index % 3}`;

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const confirmDeleteBankExam = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa bộ đề này không?')) {
      deleteBankExam(id);
    }
  };

  const openCreate = () => {
    setEditId(null);
    setFormParams({ title: '', duration: 60 });
    setFormQuestions([]);
    setView('edit');
  };

  const openEdit = (e, exam) => {
    e.stopPropagation();
    setEditId(exam.id);
    setFormParams({ title: exam.title, duration: exam.duration });
    // deep copy questions for editing
    setFormQuestions(JSON.parse(JSON.stringify(exam.questions)));
    setView('edit');
  };

  const handleReturn = () => {
    setView('list');
    setEditId(null);
  };

  const addNewQuestion = () => {
    const newQ = {
      id: `q_${Date.now()}`,
      text: '',
      options: [
        { label: 'A', text: '' },
        { label: 'B', text: '' },
        { label: 'C', text: '' },
        { label: 'D', text: '' }
      ],
      correctAnswer: 'A'
    };
    setFormQuestions([...formQuestions, newQ]);
  };

  const deleteQuestion = (qId) => {
    setFormQuestions(formQuestions.filter(q => q.id !== qId));
  };

  const updateQuestionText = (qId, text) => {
    setFormQuestions(formQuestions.map(q => q.id === qId ? { ...q, text } : q));
  };

  const updateOptionText = (qId, label, text) => {
    setFormQuestions(formQuestions.map(q => {
      if (q.id !== qId) return q;
      return {
        ...q,
        options: q.options.map(opt => opt.label === label ? { ...opt, text } : opt)
      };
    }));
  };

  const updateCorrectAnswer = (qId, label) => {
    setFormQuestions(formQuestions.map(q => q.id === qId ? { ...q, correctAnswer: label } : q));
  };

  const handleSave = () => {
    if (!formParams.title.trim()) {
      alert('Vui lòng nhập tên bộ đề');
      return;
    }
    const payload = {
      title: formParams.title.trim(),
      duration: Number(formParams.duration) || 60,
      questions: formQuestions
    };

    if (editId) {
      updateBankExam(editId, payload);
    } else {
      addBankExam(payload);
    }
    setView('list');
  };

  if (view === 'edit') {
    return (
      <div className="qbank-page">
        <div className="exam-form-header">
          <button className="btn-back-link" type="button" onClick={handleReturn}>
            <span className="material-symbols-outlined">arrow_back</span>
            Quay lại danh sách
          </button>
          <h1 className="exam-form-title">{editId ? 'Chỉnh sửa bộ đề' : 'Tạo bộ đề mới'}</h1>
        </div>

        <div className="exam-content-card">
          <div className="qbank-edit-grid">
            <div className="exam-form-group">
              <label className="exam-form-label">Tên bộ đề</label>
              <input 
                className="exam-form-input" 
                value={formParams.title} 
                onChange={e => setFormParams({...formParams, title: e.target.value})} 
                placeholder="VD: Toán rời rạc - Giữa kỳ" 
              />
            </div>
            <div className="exam-form-group">
              <label className="exam-form-label">Thời lượng (phút)</label>
              <input 
                type="number" 
                className="exam-form-input" 
                value={formParams.duration} 
                onChange={e => setFormParams({...formParams, duration: e.target.value})} 
              />
            </div>
          </div>
        </div>

        <div className="questions-header">
          <h1 className="questions-title">Danh sách câu hỏi ({formQuestions.length} câu)</h1>
          <button className="btn btn-primary" onClick={addNewQuestion}>
            <span className="material-symbols-outlined">add</span> Thêm câu hỏi
          </button>
        </div>

        <div className="qbank-edit-questions">
          {formQuestions.length === 0 ? (
            <div className="exam-empty-questions">
              <span className="material-symbols-outlined">quiz</span>
              <p>Chưa có câu hỏi nào. Nhấn Thêm câu hỏi để bắt đầu.</p>
            </div>
          ) : (
            formQuestions.map((q, idx) => (
              <div className="question-card" key={q.id}>
                <div className="question-header">
                  <div className="question-header-left">
                    <h3 className="question-number">Câu hỏi {idx + 1}</h3>
                  </div>
                  <div className="question-header-actions">
                    <button onClick={() => deleteQuestion(q.id)} className="icon-btn delete" title="Xóa câu hỏi">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                
                <div className="question-content">
                  <textarea 
                    className="exam-form-textarea" 
                    value={q.text} 
                    onChange={e => updateQuestionText(q.id, e.target.value)}
                    placeholder="Nhập nội dung câu hỏi..."
                  />
                </div>

                <div className="options-grid">
                  {q.options.map(opt => (
                    <div className={`option-edit-wrap ${q.correctAnswer === opt.label ? 'is-correct' : ''}`} key={opt.label}>
                      <label className="correct-radio" title="Click để chọn làm đáp án đúng">
                        <input 
                          type="radio" 
                          name={`q_${q.id}_correct`} 
                          checked={q.correctAnswer === opt.label}
                          onChange={() => updateCorrectAnswer(q.id, opt.label)}
                        />
                        <span className="radio-custom"></span>
                      </label>
                      <span className="opt-label-text">{opt.label}.</span>
                      <input 
                        type="text" 
                        className="exam-form-input opt-input" 
                        value={opt.text} 
                        onChange={e => updateOptionText(q.id, opt.label, e.target.value)}
                        placeholder={`Nhập đáp án ${opt.label}...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="exam-action-bar">
          <button className="btn-back" onClick={handleReturn}>
            Hủy bỏ
          </button>
          <div className="exam-action-bar-right">
            <button className="btn-complete" onClick={handleSave}>
              {editId ? 'Cập nhật bộ đề' : 'Lưu bộ đề'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qbank-page">
      {/* Heading */}
      <div className="qbank-heading">
        <div className="qbank-heading-left">
          <h1>Ngân hàng đề thi</h1>
          <p>Quản lý và sử dụng bộ câu hỏi mẫu cho các kỳ thi</p>
        </div>
        <div className="qbank-heading-actions">
          <button className="qbank-btn-create" onClick={openCreate}>
            <span className="material-symbols-outlined">add</span>
            Tạo bộ đề mới
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="qbank-stats-row">
        <div className="qbank-stat-card">
          <div className="qbank-stat-label">Tổng bộ đề</div>
          <div className="qbank-stat-value accent-blue">{bankExams.length}</div>
        </div>
        <div className="qbank-stat-card">
          <div className="qbank-stat-label">Tổng câu hỏi</div>
          <div className="qbank-stat-value accent-purple">{totalQuestions}</div>
        </div>
        <div className="qbank-stat-card">
          <div className="qbank-stat-label">Trung bình / bộ</div>
          <div className="qbank-stat-value accent-green">
            {bankExams.length > 0 ? Math.round(totalQuestions / bankExams.length) : 0}
          </div>
        </div>
      </div>

      <div className="qbank-search-bar">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Tìm kiếm bộ đề, câu hỏi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="qbank-set-list">
        {filteredExams.length === 0 && (
          <div className="qbank-empty-state">
            <span className="material-symbols-outlined">library_books</span>
            <h3>Chưa có bộ đề nào</h3>
            <p>Bắt đầu bằng cách tạo bộ đề mới để quản lý câu hỏi thi.</p>
            <button className="qbank-btn-create" onClick={openCreate}>
              <span className="material-symbols-outlined">add</span>
              Tạo bộ đề mới
            </button>
          </div>
        )}
        {filteredExams.map((exam, idx) => {
          const isExpanded = expandedId === exam.id;
          return (
            <div className="qbank-set-card" key={exam.id}>
              <div className="qbank-set-header" onClick={() => toggleExpand(exam.id)}>
                <div className="qbank-set-info">
                  <div className={`qbank-set-icon ${accentClass(idx)}`}>
                    <span className="material-symbols-outlined">quiz</span>
                  </div>
                  <div className="qbank-set-text">
                    <h3>{exam.title}</h3>
                    <div className="qbank-set-meta">
                      <span>
                        <span className="material-symbols-outlined">format_list_numbered</span>
                        {exam.questions.length} câu
                      </span>
                      <span>
                        <span className="material-symbols-outlined">timer</span>
                        {exam.duration} phút
                      </span>
                    </div>
                  </div>
                </div>
                <div className="qbank-set-actions">
                  <button className="icon-btn edit qbank-action" title="Sửa bộ đề" onClick={(e) => openEdit(e, exam)}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="icon-btn delete qbank-action" title="Xóa bộ đề" onClick={(e) => confirmDeleteBankExam(e, exam.id)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                  <button
                    className={`qbank-expand-btn ${isExpanded ? 'expanded' : ''}`}
                    type="button"
                    title="Mở rộng / Thu gọn"
                  >
                    <span className="material-symbols-outlined">expand_more</span>
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="qbank-questions">
                  <div className="qbank-questions-head">
                    <h4>Danh sách câu hỏi</h4>
                    <span className="qbank-q-count">{exam.questions.length} câu hỏi</span>
                  </div>
                  {exam.questions.map((q, qIdx) => (
                    <div className="qbank-question-item" key={q.id}>
                      <div className="qbank-q-row">
                        <span className="qbank-q-number">{qIdx + 1}</span>
                        <span className="qbank-q-text">{q.text}</span>
                      </div>
                      <div className="qbank-q-options">
                        {q.options.map((opt) => (
                          <div
                            key={opt.label}
                            className={`qbank-q-opt ${opt.label === q.correctAnswer ? 'correct' : ''}`}
                          >
                            {opt.label === q.correctAnswer && (
                              <span className="material-symbols-outlined">check_circle</span>
                            )}
                            {opt.label}. {opt.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionBankPanel;
