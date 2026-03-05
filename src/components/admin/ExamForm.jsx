import React, { useState, useRef, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { useExams } from '../../contexts/ExamContext';
import './ExamForm.css';

/* ════════════════════════════════════════════════════════
   Constants & helpers
   ════════════════════════════════════════════════════════ */
const EXAM_STATUS_OPTIONS = ['Sắp diễn ra', 'Đang diễn ra', 'Đã hoàn thành'];
const EXAM_TYPE_OPTIONS = ['Tự do', 'Thời gian cụ thể'];

const STATUS_CLASS_MAP = {
  'Đang diễn ra': 'success',
  'Sắp diễn ra': 'warning',
  'Đã hoàn thành': 'muted',
};
const getStatusClass = (status) => STATUS_CLASS_MAP[status] || 'muted';

/* ════════════════════════════════════════════════════════
   ExamForm  –  main component
   ════════════════════════════════════════════════════════ */
const ExamForm = () => {
  const { exams, addExam, updateExam, deleteExam, bankExams } = useExams();

  // ── view: 'list' | 'create' | 'edit'
  const [view, setView] = useState('list');
  const [editExamId, setEditExamId] = useState(null);

  // ── exam form state (for create / edit)
  const [activeTab, setActiveTab] = useState(1);
  const [examInfo, setExamInfo] = useState({
    code: '',
    name: '',
    description: '',
    subject: '',
    type: 'Tự do',
    status: 'Sắp diễn ra',
    durationMinutes: '',
    startTime: '',
    endTime: '',
  });
  const fileInputRef = useRef(null);
  const [questions, setQuestions] = useState([]);

  // ── question bank import modal
  const [showBankModal, setShowBankModal] = useState(false);

  // ── edit modal for inline quick edit from list
  const [quickEdit, setQuickEdit] = useState({ open: false, id: null, form: {} });

  // ── search on list view
  const [listSearch, setListSearch] = useState('');

  /* ─── Filtered exams for list view ────────────────── */
  const filteredExams = useMemo(() => {
    const kw = listSearch.trim().toLowerCase();
    if (!kw) return exams;
    return exams.filter(
      (e) =>
        e.code?.toLowerCase().includes(kw) ||
        e.title?.toLowerCase().includes(kw) ||
        e.subject?.toLowerCase().includes(kw) ||
        e.status?.toLowerCase().includes(kw),
    );
  }, [exams, listSearch]);

  /* ─── Helpers ─────────────────────────────────────── */
  const resetForm = () => {
    setExamInfo({
      code: '', name: '', description: '', subject: '',
      type: 'Tự do', status: 'Sắp diễn ra', durationMinutes: '',
      startTime: '', endTime: '',
    });
    setQuestions([]);
    setActiveTab(1);
  };

  const openCreate = () => {
    resetForm();
    setEditExamId(null);
    setView('create');
  };

  const openEditFull = (exam) => {
    setExamInfo({
      code: exam.code || '',
      name: exam.title || '',
      description: exam.description || '',
      subject: exam.subject || '',
      type: exam.type || 'Tự do',
      status: exam.status || 'Sắp diễn ra',
      durationMinutes: String(exam.durationMinutes || ''),
      startTime: exam.startTime || '',
      endTime: exam.endTime || '',
    });
    setQuestions(exam.questions || []);
    setEditExamId(exam.id);
    setActiveTab(1);
    setView('edit');
  };

  const backToList = () => {
    setView('list');
    setEditExamId(null);
    resetForm();
  };

  /* ─── Form handlers ───────────────────────────────── */
  const handleInputInfoChange = (e) => {
    const { name, value } = e.target;
    setExamInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = () => {
    const newQ = {
      id: Date.now(),
      type: 'Trắc nghiệm',
      content: '',
      options: [
        { id: 'A', text: '', isCorrect: false },
        { id: 'B', text: '', isCorrect: false },
        { id: 'C', text: '', isCorrect: false },
        { id: 'D', text: '', isCorrect: false },
      ],
      isEditMode: true,
    };
    setQuestions((prev) => [...prev, newQ]);
  };

  const handleDeleteQuestion = (qId) => setQuestions((prev) => prev.filter((q) => q.id !== qId));

  const toggleEditMode = (qId) =>
    setQuestions((prev) => prev.map((q) => (q.id === qId ? { ...q, isEditMode: !q.isEditMode } : q)));

  /* ─── Excel upload ────────────────────────────────── */
  const parseExcelToQuestions = (data) => {
    const parsed = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0]) continue;
      parsed.push({
        id: Date.now() + i,
        type: 'Trắc nghiệm',
        content: row[0] || '',
        options: [
          { id: 'A', text: row[1] || '', isCorrect: (row[5] || '').toUpperCase() === 'A' },
          { id: 'B', text: row[2] || '', isCorrect: (row[5] || '').toUpperCase() === 'B' },
          { id: 'C', text: row[3] || '', isCorrect: (row[5] || '').toUpperCase() === 'C' },
          { id: 'D', text: row[4] || '', isCorrect: (row[5] || '').toUpperCase() === 'D' },
        ],
        isEditMode: false,
      });
    }
    return parsed;
  };

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];
    if (!validTypes.includes(file.type)) {
      alert('Vui lòng chọn file Excel (.xlsx hoặc .xls)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const newQs = parseExcelToQuestions(json);
        if (newQs.length === 0) { alert('Không tìm thấy câu hỏi nào trong file Excel'); return; }
        setQuestions((prev) => [...prev, ...newQs]);
        alert(`Đã nhập thành công ${newQs.length} câu hỏi từ Excel`);
      } catch (err) {
        console.error('Error parsing Excel:', err);
        alert('Có lỗi khi đọc file Excel. Vui lòng kiểm tra định dạng file.');
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  const handleImportClick = () => fileInputRef.current?.click();

  /* ─── Import from Question Bank ───────────────────── */
  const importFromBank = (bankExam) => {
    const converted = bankExam.questions.map((q, idx) => ({
      id: Date.now() + idx,
      type: 'Trắc nghiệm',
      content: q.text,
      options: q.options.map((o) => ({
        id: o.label,
        text: o.text,
        isCorrect: o.label === q.correctAnswer,
      })),
      isEditMode: false,
    }));
    setQuestions((prev) => [...prev, ...converted]);
    setShowBankModal(false);
    alert(`Đã nhập ${converted.length} câu hỏi từ "${bankExam.title}"`);
  };

  /* ─── Save / Publish ──────────────────────────────── */
  const handleComplete = () => {
    if (activeTab < 3) {
      setActiveTab((prev) => prev + 1);
      return;
    }
    // Save to context
    const payload = {
      code: examInfo.code.trim() || `EXAM-${Date.now()}`,
      title: examInfo.name.trim() || 'Kỳ thi mới',
      subject: examInfo.subject.trim() || 'Chưa phân loại',
      type: examInfo.type,
      status: examInfo.status,
      participants: 0,
      durationMinutes: Number(examInfo.durationMinutes) || 0,
      questions,
    };
    if (view === 'edit' && editExamId != null) {
      updateExam(editExamId, payload);
      alert('Kỳ thi đã được cập nhật!');
    } else {
      addExam(payload);
      alert('Kỳ thi đã được tạo và xuất bản!');
    }
    backToList();
  };

  const handleReturn = () => setActiveTab((prev) => prev - 1);

  /* ─── Quick Edit Modal (from list) ────────────────── */
  const openQuickEdit = (exam) => {
    setQuickEdit({
      open: true,
      id: exam.id,
      form: {
        code: exam.code || '',
        title: exam.title || '',
        subject: exam.subject || '',
        type: exam.type || 'Tự do',
        status: exam.status || 'Sắp diễn ra',
        durationMinutes: String(exam.durationMinutes || ''),
      },
    });
  };

  const closeQuickEdit = () => setQuickEdit({ open: false, id: null, form: {} });

  const handleQuickEditChange = (e) => {
    const { name, value } = e.target;
    setQuickEdit((prev) => ({ ...prev, form: { ...prev.form, [name]: value } }));
  };

  const saveQuickEdit = (e) => {
    e.preventDefault();
    const f = quickEdit.form;
    updateExam(quickEdit.id, {
      code: f.code.trim(),
      title: f.title.trim(),
      subject: f.subject.trim() || 'Chưa phân loại',
      type: f.type,
      status: f.status,
      durationMinutes: Number(f.durationMinutes) || 0,
    });
    closeQuickEdit();
  };

  const confirmDeleteExam = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa kỳ thi này?')) return;
    deleteExam(id);
  };

  /* ════════════════════════════════════════════════════
        RENDER – LIST VIEW
     ════════════════════════════════════════════════════ */
  if (view === 'list') {
    return (
      <>
        <div className="exam-form-container">
          <div className="exam-form-wrapper">
            {/* Header */}
            <div className="exam-list-header">
              <div>
                <h1 className="exam-form-title">Quản lý Kỳ thi</h1>
                <p className="exam-form-subtitle">Quản lý danh sách kỳ thi, chỉnh sửa và tạo mới</p>
              </div>
              <button className="btn btn-primary" onClick={openCreate}>
                <span className="material-symbols-outlined">add</span>
                Tạo kỳ thi mới
              </button>
            </div>

            {/* Search */}
            <div className="exam-list-search">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Tìm kiếm kỳ thi..."
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
              />
            </div>

            {/* Exam table */}
            <div className="exam-list-table-wrap">
              <table className="exam-list-table">
                <thead>
                  <tr>
                    <th>Mã</th>
                    <th>Tên kỳ thi</th>
                    <th>Môn học</th>
                    <th>Trạng thái</th>
                    <th>Tham gia</th>
                    <th>Thời lượng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.map((exam) => (
                    <tr key={exam.id}>
                      <td className="exam-code-cell">{exam.code}</td>
                      <td>{exam.title}</td>
                      <td>{exam.subject}</td>
                      <td>
                        <span className={`exam-badge ${getStatusClass(exam.status)}`}>{exam.status}</span>
                      </td>
                      <td>{exam.participants}</td>
                      <td>{exam.durationMinutes} phút</td>
                      <td>
                        <div className="exam-row-actions">
                          <button className="exam-action-btn edit" title="Sửa nhanh" onClick={() => openQuickEdit(exam)}>
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button className="exam-action-btn full-edit" title="Sửa chi tiết" onClick={() => openEditFull(exam)}>
                            <span className="material-symbols-outlined">settings</span>
                          </button>
                          <button className="exam-action-btn delete" title="Xóa" onClick={() => confirmDeleteExam(exam.id)}>
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredExams.length === 0 && (
                    <tr>
                      <td className="exam-empty-row" colSpan={7}>Không có kỳ thi nào phù hợp.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Edit Modal */}
        {quickEdit.open && (
          <div className="exam-modal-overlay" onClick={closeQuickEdit}>
            <div className="exam-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Chỉnh sửa nhanh kỳ thi</h3>
              <form onSubmit={saveQuickEdit}>
                <div className="exam-modal-grid">
                  <label>
                    Mã kỳ thi
                    <input name="code" value={quickEdit.form.code} onChange={handleQuickEditChange} />
                  </label>
                  <label>
                    Tên kỳ thi
                    <input name="title" value={quickEdit.form.title} onChange={handleQuickEditChange} />
                  </label>
                  <label>
                    Môn học
                    <input name="subject" value={quickEdit.form.subject} onChange={handleQuickEditChange} />
                  </label>
                  <label>
                    Loại
                    <select name="type" value={quickEdit.form.type} onChange={handleQuickEditChange}>
                      {EXAM_TYPE_OPTIONS.map((t) => (<option key={t}>{t}</option>))}
                    </select>
                  </label>
                  <label>
                    Trạng thái
                    <select name="status" value={quickEdit.form.status} onChange={handleQuickEditChange}>
                      {EXAM_STATUS_OPTIONS.map((s) => (<option key={s}>{s}</option>))}
                    </select>
                  </label>
                  <label>
                    Thời lượng (phút)
                    <input name="durationMinutes" type="number" value={quickEdit.form.durationMinutes} onChange={handleQuickEditChange} />
                  </label>
                </div>
                <div className="exam-modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={closeQuickEdit}>Hủy</button>
                  <button type="submit" className="btn btn-primary">Lưu</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  /* ════════════════════════════════════════════════════
        RENDER – CREATE / EDIT VIEW (3-tab form)
     ════════════════════════════════════════════════════ */
  return (
    <>
      {/* Hidden file input for Excel */}
      <input ref={fileInputRef} type="file" accept=".xlsx,.xls" style={{ display: 'none' }} onChange={handleExcelUpload} />

      <div className="exam-form-container">
        <div className="exam-form-wrapper">
          <div className="exam-form-header">
            <button className="btn-back-link" type="button" onClick={backToList}>
              <span className="material-symbols-outlined">arrow_back</span>
              Quay lại danh sách
            </button>
            <h1 className="exam-form-title">{view === 'edit' ? 'Chỉnh sửa Kỳ thi' : 'Tạo Kỳ thi mới'}</h1>
          </div>

          {/* Tabs */}
          <div className="exam-tabs">
            <div className="exam-tabs-list">
              <button className={`exam-tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
                <p className="exam-tab-text">
                  <span className="material-symbols-outlined">info</span>
                  1. Thông tin chung
                </p>
              </button>
              <button className={`exam-tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>
                <p className="exam-tab-text">
                  <span className="material-symbols-outlined">format_list_bulleted</span>
                  2. Nội dung câu hỏi
                </p>
              </button>
              <button className={`exam-tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => setActiveTab(3)}>
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
                  <label className="exam-form-label">Mã kỳ thi</label>
                  <input className="exam-form-input" placeholder="VD: IT201-CPP" type="text" name="code" value={examInfo.code} onChange={handleInputInfoChange} />
                </div>
                <div className="exam-form-group">
                  <label className="exam-form-label">Tên kỳ thi</label>
                  <input className="exam-form-input" placeholder="Nhập tên kỳ thi..." type="text" name="name" value={examInfo.name} onChange={handleInputInfoChange} />
                </div>
                <div className="exam-form-group">
                  <label className="exam-form-label">Mô tả</label>
                  <textarea className="exam-form-textarea" placeholder="Nhập mô tả kỳ thi..." name="description" value={examInfo.description} onChange={handleInputInfoChange}></textarea>
                </div>
                <div className="exam-form-grid">
                  <div className="exam-form-group">
                    <label className="exam-form-label">Môn học</label>
                    <input className="exam-form-input" placeholder="VD: CTDL, Java..." type="text" name="subject" value={examInfo.subject} onChange={handleInputInfoChange} />
                  </div>
                  <div className="exam-form-group">
                    <label className="exam-form-label">Loại kỳ thi</label>
                    <select className="exam-form-select" name="type" value={examInfo.type} onChange={handleInputInfoChange}>
                      {EXAM_TYPE_OPTIONS.map((t) => (<option key={t}>{t}</option>))}
                    </select>
                  </div>
                  <div className="exam-form-group">
                    <label className="exam-form-label">Trạng thái</label>
                    <select className="exam-form-select" name="status" value={examInfo.status} onChange={handleInputInfoChange}>
                      {EXAM_STATUS_OPTIONS.map((s) => (<option key={s}>{s}</option>))}
                    </select>
                  </div>
                  <div className="exam-form-group">
                    <label className="exam-form-label">Thời lượng (phút)</label>
                    <input className="exam-form-input" type="number" name="durationMinutes" value={examInfo.durationMinutes} onChange={handleInputInfoChange} />
                  </div>
                </div>
                <div className="exam-form-grid">
                  <div className="exam-form-grid-double">
                    <div className="exam-form-group">
                      <label className="exam-form-label">Thời gian bắt đầu</label>
                      <input className="exam-form-input" type="datetime-local" name="startTime" value={examInfo.startTime} onChange={handleInputInfoChange} />
                    </div>
                    <div className="exam-form-group">
                      <label className="exam-form-label">Thời gian kết thúc</label>
                      <input className="exam-form-input" type="datetime-local" name="endTime" value={examInfo.endTime} onChange={handleInputInfoChange} />
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
                <h1 className="questions-title">Danh sách câu hỏi ({questions.length} câu)</h1>
                <div className="questions-actions">
                  <button className="btn btn-bank" onClick={() => setShowBankModal(true)}>
                    <span className="material-symbols-outlined">library_books</span>
                    Nhập từ Ngân hàng đề
                  </button>
                  <a className="btn btn-secondary" href="/Form.xlsx" download>
                    <span className="material-symbols-outlined">download</span>
                    Tải file mẫu
                  </a>
                  <button className="btn btn-primary-light" onClick={handleImportClick}>
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
                      <button onClick={() => toggleEditMode(question.id)} className="icon-btn">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button onClick={() => handleDeleteQuestion(question.id)} className="icon-btn delete">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="question-content">
                    {question.isEditMode ? (
                      <textarea
                        className="exam-form-textarea"
                        placeholder="Nhập nội dung câu hỏi..."
                        defaultValue={question.content}
                        onBlur={(e) =>
                          setQuestions((prev) =>
                            prev.map((q) => (q.id === question.id ? { ...q, content: e.target.value } : q)),
                          )
                        }
                      ></textarea>
                    ) : (
                      <p className="question-text">{question.content}</p>
                    )}
                  </div>

                  {question.isEditMode ? (
                    <div className="options-grid">
                      {question.options.map((option) => (
                        <div key={option.id} className="option-edit">
                          <input name={`q${question.id}_correct`} type="radio" defaultChecked={option.isCorrect} />
                          <input className="exam-form-input" placeholder={`Đáp án ${option.id}`} type="text" defaultValue={option.text} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="options-grid">
                      {question.options.map((option) => (
                        <label key={option.id} className={`option-view ${option.isCorrect ? 'correct' : ''}`}>
                          <input name={`q${question.id}`} type="radio" checked={option.isCorrect} readOnly />
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

              {questions.length === 0 && (
                <div className="exam-empty-questions">
                  <span className="material-symbols-outlined">quiz</span>
                  <p>Chưa có câu hỏi nào. Hãy thêm câu hỏi hoặc nhập từ Ngân hàng đề.</p>
                </div>
              )}

              <div className="add-question-container">
                <button onClick={handleAddQuestion} className="add-question-btn">
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
              <div className="exam-form-fields">
                <h3 className="exam-content-subtitle">Thông tin chung</h3>
                <div className="review-info-grid">
                  <div className="review-info-item">
                    <span className="review-info-label">Mã kỳ thi:</span>
                    <span className="review-info-value">{examInfo.code || <em>Chưa nhập</em>}</span>
                  </div>
                  <div className="review-info-item">
                    <span className="review-info-label">Tên kỳ thi:</span>
                    <span className="review-info-value">{examInfo.name || <em>Chưa nhập</em>}</span>
                  </div>
                  <div className="review-info-item">
                    <span className="review-info-label">Mô tả:</span>
                    <span className="review-info-value">{examInfo.description || <em>Chưa nhập</em>}</span>
                  </div>
                  <div className="review-info-item">
                    <span className="review-info-label">Môn học:</span>
                    <span className="review-info-value">{examInfo.subject || <em>Chưa nhập</em>}</span>
                  </div>
                  <div className="review-info-item">
                    <span className="review-info-label">Loại kỳ thi:</span>
                    <span className="review-info-value">{examInfo.type}</span>
                  </div>
                  <div className="review-info-item">
                    <span className="review-info-label">Trạng thái:</span>
                    <span className="review-info-value">{examInfo.status}</span>
                  </div>
                  <div className="review-info-item">
                    <span className="review-info-label">Thời lượng:</span>
                    <span className="review-info-value">{examInfo.durationMinutes ? `${examInfo.durationMinutes} phút` : <em>Chưa nhập</em>}</span>
                  </div>
                  <div className="review-info-item">
                    <span className="review-info-label">Bắt đầu:</span>
                    <span className="review-info-value">{examInfo.startTime ? new Date(examInfo.startTime).toLocaleString('vi-VN') : <em>Chưa nhập</em>}</span>
                  </div>
                  <div className="review-info-item">
                    <span className="review-info-label">Kết thúc:</span>
                    <span className="review-info-value">{examInfo.endTime ? new Date(examInfo.endTime).toLocaleString('vi-VN') : <em>Chưa nhập</em>}</span>
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
                        {question.options.map((option) => (
                          <label key={option.id} className={`option-view ${option.isCorrect ? 'correct' : ''}`}>
                            <input name={`review_q${question.id}`} type="radio" checked={option.isCorrect} readOnly />
                            <span className="option-text">{option.text || `Đáp án ${option.id}`}</span>
                            {option.isCorrect && (
                              <span className="material-symbols-outlined option-check-icon">check_circle</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="exam-action-bar">
        <button className="btn-back" onClick={activeTab === 1 ? backToList : handleReturn}>
          <span className="material-symbols-outlined">arrow_back</span>
          {activeTab === 1 ? 'Quay lại' : 'Quay lại'}
        </button>
        <div className="exam-action-bar-right">
          <button className="btn-draft" onClick={() => alert('Đã lưu bản nháp!')}>
            Lưu bản nháp
          </button>
          <button className="btn-complete" onClick={handleComplete}>
            {activeTab === 3 ? (view === 'edit' ? 'Cập nhật' : 'Xuất bản') : 'Tiếp tục'}
          </button>
        </div>
      </div>

      {/* ── Question Bank Import Modal ─────────────── */}
      {showBankModal && (
        <div className="exam-modal-overlay" onClick={() => setShowBankModal(false)}>
          <div className="exam-modal exam-modal-bank" onClick={(e) => e.stopPropagation()}>
            <div className="exam-modal-bank-header">
              <h3>Nhập câu hỏi từ Ngân hàng đề</h3>
              <button className="exam-modal-close" onClick={() => setShowBankModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="exam-modal-bank-desc">Chọn một bộ đề để nhập tất cả câu hỏi vào kỳ thi hiện tại.</p>
            <div className="exam-bank-list">
              {bankExams.map((bankExam, idx) => (
                <div className="exam-bank-card" key={bankExam.id}>
                  <div className="exam-bank-card-info">
                    <div className={`exam-bank-icon accent-${idx % 3}`}>
                      <span className="material-symbols-outlined">quiz</span>
                    </div>
                    <div>
                      <h4>{bankExam.title}</h4>
                      <span className="exam-bank-meta">
                        {bankExam.questions.length} câu hỏi • {bankExam.duration} phút
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-primary-light" onClick={() => importFromBank(bankExam)}>
                    <span className="material-symbols-outlined">add</span>
                    Nhập
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExamForm;
