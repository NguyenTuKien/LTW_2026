// Mock data for exams
export const mockExams = [
  {
    id: 1,
    title: 'Mathematics Final Exam',
    description: 'Comprehensive exam covering algebra, geometry, and calculus',
    subject: 'Mathematics',
    duration: 90,
    totalQuestions: 30,
    totalPoints: 100,
    status: 'active',
  },
  {
    id: 2,
    title: 'Physics Midterm',
    description: 'Midterm exam on mechanics and thermodynamics',
    subject: 'Physics',
    duration: 60,
    totalQuestions: 25,
    totalPoints: 100,
    status: 'active',
  },
  {
    id: 3,
    title: 'Chemistry Quiz',
    description: 'Quick quiz on organic chemistry basics',
    subject: 'Chemistry',
    duration: 30,
    totalQuestions: 15,
    totalPoints: 50,
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'English Literature',
    description: 'Analysis of modern literature and poetry',
    subject: 'English',
    duration: 120,
    totalQuestions: 20,
    totalPoints: 100,
    status: 'active',
  },
];

// Mock data for questions
export const mockQuestions = [
  {
    id: 1,
    text: 'What is the derivative of x²?',
    options: [
      { id: 1, text: '2x', isCorrect: true },
      { id: 2, text: 'x', isCorrect: false },
      { id: 3, text: '2x²', isCorrect: false },
      { id: 4, text: 'x²', isCorrect: false },
    ],
    points: 5,
  },
  {
    id: 2,
    text: 'Solve for x: 2x + 5 = 15',
    options: [
      { id: 1, text: 'x = 5', isCorrect: true },
      { id: 2, text: 'x = 10', isCorrect: false },
      { id: 3, text: 'x = 7', isCorrect: false },
      { id: 4, text: 'x = 3', isCorrect: false },
    ],
    points: 5,
  },
  {
    id: 3,
    text: 'What is the value of π (pi) approximately?',
    options: [
      { id: 1, text: '3.14159', isCorrect: true },
      { id: 2, text: '2.71828', isCorrect: false },
      { id: 3, text: '1.61803', isCorrect: false },
      { id: 4, text: '4.66920', isCorrect: false },
    ],
    points: 5,
  },
];

// Mock statistics for admin dashboard
export const mockStats = {
  totalStudents: 1247,
  totalExams: 45,
  activeExams: 12,
  averageScore: 78.5,
  recentSubmissions: [
    {
      id: 1,
      studentName: 'John Doe',
      examTitle: 'Mathematics Final',
      score: 92,
      time: '2 hours ago',
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      examTitle: 'Physics Midterm',
      score: 88,
      time: '3 hours ago',
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      examTitle: 'Chemistry Quiz',
      score: 95,
      time: '5 hours ago',
    },
  ],
  upcomingExams: [
    {
      id: 1,
      title: 'Biology Final',
      subject: 'Biology',
      date: 'Mar 10, 2026',
      duration: 90,
    },
    {
      id: 2,
      title: 'History Midterm',
      subject: 'History',
      date: 'Mar 12, 2026',
      duration: 60,
    },
  ],
};

// Mock statistics data
export const mockStatistics = {
  totalSubmissions: 3456,
  submissionsGrowth: 15,
  averageScore: 76.8,
  scoreChange: 3.2,
  passRate: 82.5,
  passRateChange: 2.1,
  subjectPerformance: [
    { name: 'Mathematics', average: 78 },
    { name: 'Physics', average: 82 },
    { name: 'Chemistry', average: 75 },
    { name: 'Biology', average: 80 },
    { name: 'English', average: 85 },
  ],
  topStudents: [
    { id: 1, name: 'Alice Johnson', averageScore: 95 },
    { id: 2, name: 'Bob Smith', averageScore: 93 },
    { id: 3, name: 'Carol Williams', averageScore: 91 },
    { id: 4, name: 'David Brown', averageScore: 89 },
    { id: 5, name: 'Emma Davis', averageScore: 87 },
  ],
  examDifficulty: [
    {
      id: 1,
      title: 'Mathematics Final',
      averageScore: 72,
      difficulty: 'hard',
      attempts: 234,
      passRate: 68,
      avgTime: 85,
    },
    {
      id: 2,
      title: 'Physics Midterm',
      averageScore: 78,
      difficulty: 'medium',
      attempts: 189,
      passRate: 75,
      avgTime: 55,
    },
    {
      id: 3,
      title: 'Chemistry Quiz',
      averageScore: 85,
      difficulty: 'easy',
      attempts: 312,
      passRate: 88,
      avgTime: 25,
    },
  ],
};
