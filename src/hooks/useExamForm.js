import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { INITIAL_EXAM_INFO, INITIAL_QUESTIONS } from '../data/mockExamData';

const useExamForm = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [examInfo, setExamInfo] = useState(INITIAL_EXAM_INFO);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const fileInputRef = useRef(null);

  const handleInputInfoChange = (e) => {
    const { name, value } = e.target;
    setExamInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleAddQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        id: prev.length + 1,
        type: 'Trắc nghiệm',
        content: '',
        options: [
          { id: 'A', text: '', isCorrect: false },
          { id: 'B', text: '', isCorrect: false },
          { id: 'C', text: '', isCorrect: false },
          { id: 'D', text: '', isCorrect: false },
        ],
        isEditMode: true,
      },
    ]);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const toggleEditMode = (questionId) => {
    setQuestions(prev =>
      prev.map(q => q.id === questionId ? { ...q, isEditMode: !q.isEditMode } : q)
    );
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
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
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const imported = [];
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (!row[0]) continue;
          imported.push({
            id: questions.length + imported.length + 1,
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

        if (imported.length === 0) {
          alert('Không tìm thấy câu hỏi nào trong file Excel');
          return;
        }
        setQuestions(prev => [...prev, ...imported]);
        alert(`Đã nhập thành công ${imported.length} câu hỏi từ Excel`);
      } catch (err) {
        console.error(err);
        alert('Có lỗi khi đọc file Excel. Vui lòng kiểm tra định dạng file.');
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  const handleComplete = () => {
    if (activeTab === 3) {
      alert('Kỳ thi đã được hoàn tất và xuất bản!');
    } else {
      setActiveTab(prev => prev + 1);
    }
  };

  const handleReturn = () => {
    setActiveTab(prev => prev - 1);
  };

  return {
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
  };
};

export default useExamForm;
