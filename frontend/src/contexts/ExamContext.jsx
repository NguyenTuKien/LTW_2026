import React, { createContext, useContext, useState, useCallback } from 'react';
import { EXAMS as initialBankExams } from '../data/examQuestionsData';

const initialExams = [
  {
    id: 1,
    code: 'IT201-CPP',
    title: 'Giữa kỳ Lập trình Web',
    subject: 'C++',
    type: 'Thời gian cụ thể',
    status: 'Đang diễn ra',
    participants: 420,
    durationMinutes: 60,
    avgScore: 7.1,
  },
  {
    id: 2,
    code: 'IT205-JAVA',
    title: 'Cuối kỳ Cơ sở dữ liệu',
    subject: 'Java',
    type: 'Thời gian cụ thể',
    status: 'Sắp diễn ra',
    participants: 580,
    durationMinutes: 90,
    avgScore: 0,
  },
  {
    id: 5,
    code: 'IT206-CSDL',
    title: 'Thi nhanh CSDL',
    subject: 'CSDL',
    type: 'Tự do',
    status: 'Đang diễn ra',
    participants: 260,
    durationMinutes: 30,
    avgScore: 6.5,
  },
  {
    id: 3,
    code: 'IT203-CTDL',
    title: 'Luyện tập Cấu trúc dữ liệu',
    subject: 'CTDL',
    type: 'Thời gian cụ thể',
    status: 'Đã hoàn thành',
    participants: 520,
    durationMinutes: 45,
    avgScore: 7.8,
  },
  {
    id: 4,
    code: 'IT202-PY',
    title: 'Quiz Python',
    subject: 'Python',
    type: 'Tự do',
    status: 'Đang diễn ra',
    participants: 610,
    durationMinutes: 30,
    avgScore: 6.9,
  },
];

const ExamContext = createContext(null);

const getNextId = (items) => (items.length ? Math.max(...items.map((item) => Number(item.id) || 0)) + 1 : 1);

export const ExamProvider = ({ children }) => {
  const [exams, setExams] = useState(initialExams);
  const [bankExams, setBankExams] = useState(initialBankExams);

  // --- Exams CRUD ---
  const addExam = useCallback((examData) => {
    setExams((prev) => {
      const nextId = getNextId(prev);
      return [{ id: nextId, ...examData, avgScore: examData.avgScore ?? 0 }, ...prev];
    });
  }, []);

  const updateExam = useCallback((id, updates) => {
    setExams((prev) =>
      prev.map((exam) => (exam.id === id ? { ...exam, ...updates } : exam)),
    );
  }, []);

  const deleteExam = useCallback((id) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  }, []);

  // --- Bank Exams CRUD ---
  const addBankExam = useCallback((bankExamData) => {
    setBankExams((prev) => {
      const nextId = getNextId(prev);
      return [{ id: nextId, ...bankExamData }, ...prev];
    });
  }, []);

  const updateBankExam = useCallback((id, updates) => {
    setBankExams((prev) =>
      prev.map((exam) => (exam.id === id ? { ...exam, ...updates } : exam)),
    );
  }, []);

  const deleteBankExam = useCallback((id) => {
    setBankExams((prev) => prev.filter((exam) => exam.id !== id));
  }, []);

  return (
    <ExamContext.Provider value={{ 
      exams, setExams, addExam, updateExam, deleteExam,
      bankExams, setBankExams, addBankExam, updateBankExam, deleteBankExam
    }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExams = () => {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error('useExams must be used within ExamProvider');
  return ctx;
};

export default ExamContext;
