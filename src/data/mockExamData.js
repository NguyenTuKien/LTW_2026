export const INITIAL_EXAM_INFO = {
  name: '',
  description: '',
  type: 'Tự do',
  startTime: '',
  endTime: '',
};

export const INITIAL_QUESTIONS = [
  {
    id: 1,
    type: 'Trắc nghiệm',
    content: 'Mô hình OSI có bao nhiêu tầng?',
    options: [
      { id: 'A', text: 'A. 5 tầng', isCorrect: false },
      { id: 'B', text: 'B. 6 tầng', isCorrect: false },
      { id: 'C', text: 'C. 7 tầng', isCorrect: true },
      { id: 'D', text: 'D. 8 tầng', isCorrect: false },
    ],
    isEditMode: false,
  },
  {
    id: 2,
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
];
