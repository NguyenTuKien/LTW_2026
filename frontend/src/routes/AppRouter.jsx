import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from '../pages/auth/LoginRegister';
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import CreateExam from '../pages/admin/CreateExam';
import StudentResults from '../pages/admin/StudentResults';
import StatisticsAdmin from '../pages/admin/StatisticsAdmin';
import QuestionBank from '../pages/admin/QuestionBank';
import StudentDashboard from '../pages/student/StudentDashboard';
import ExamInfo from '../pages/student/ExamInfo';
import Exam from '../pages/student/Exam';
import Result from '../pages/student/Result';
import ExamHistory from '../pages/student/ExamHistory';
import ProfilePage from '../pages/profile/ProfilePage';
import { ExamProvider } from '../contexts/ExamContext';
import { StudentProvider } from '../contexts/StudentContext';
import { getCurrentUser, isAuthenticated } from '../utils/auth';
import '../styles/admin/AdminLayout.css';


function getRole() {
  const user = getCurrentUser();
  return user ? user.role : null;
}

function GuestRoute({ children }) {
  if (!isAuthenticated()) return children;
  return getRole() === 'admin'
    ? <Navigate to="/admin" replace />
    : <Navigate to="/student" replace />;
}

function AdminRoute({ children }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (getRole() !== 'admin') return <Navigate to="/student" replace />;
  return children;
}

function StudentRoute({ children }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (getRole() !== 'student') return <Navigate to="/admin" replace />;
  return children;
}

function AdminLayout({ children }) {
  return (
    <ExamProvider>
      <StudentProvider>
        <AdminRoute>{children}</AdminRoute>
      </StudentProvider>
    </ExamProvider>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginRegister />
            </GuestRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <DashboardAdmin />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/exams"
          element={
            <AdminLayout>
              <CreateExam />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/students"
          element={
            <AdminLayout>
              <StudentResults />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/statistics"
          element={
            <AdminLayout>
              <StatisticsAdmin />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/question-bank"
          element={
            <AdminLayout>
              <QuestionBank />
            </AdminLayout>
          }
        />

        <Route
          path="/student"
          element={
            <StudentRoute>
              <StudentDashboard />
            </StudentRoute>
          }
        />

        <Route
          path="/student/exam-info/:examId"
          element={
            <StudentRoute>
              <ExamInfo />
            </StudentRoute>
          }
        />

        <Route
          path="/student/exam/:examId"
          element={
            <StudentRoute>
              <Exam />
            </StudentRoute>
          }
        />

        <Route
          path="/student/history"
          element={
            <StudentRoute>
              <ExamHistory />
            </StudentRoute>
          }
        />

        <Route
          path="/student/result"
          element={
            <StudentRoute>
              <Result />
            </StudentRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <StudentRoute>
              <ProfilePage />
            </StudentRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
