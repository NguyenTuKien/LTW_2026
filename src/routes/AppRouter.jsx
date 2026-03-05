import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from '../pages/auth/LoginRegister';
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import CreateExam from '../pages/admin/CreateExam';
import StudentResults from '../pages/admin/StudentResults';
import StatisticsAdmin from '../pages/admin/StatisticsAdmin';
import QuestionBank from '../pages/admin/QuestionBank';
import StudentDashboard from '../pages/student/StudentDashboard';
import ProfilePage from '../pages/profile/ProfilePage';
import { ExamProvider } from '../contexts/ExamContext';
import { StudentProvider } from '../contexts/StudentContext';
import { getCurrentUser, isAuthenticated } from '../utils/auth';
import './App.css';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getRole() {
  const user = getCurrentUser();
  return user ? user.role : null;
}

// Redirect if already logged in
function GuestRoute({ children }) {
  if (!isAuthenticated()) return children;
  return getRole() === 'admin'
    ? <Navigate to="/admin" replace />
    : <Navigate to="/student" replace />;
}

// Require login + admin role
function AdminRoute({ children }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (getRole() !== 'admin') return <Navigate to="/student" replace />;
  return children;
}

// Require login + student role
function StudentRoute({ children }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (getRole() !== 'student') return <Navigate to="/admin" replace />;
  return children;
}

// ── Admin layout with shared ExamProvider ──────────────────────────────────────

function AdminLayout({ children }) {
  return (
    <ExamProvider>
      <StudentProvider>
        <AdminRoute>{children}</AdminRoute>
      </StudentProvider>
    </ExamProvider>
  );
}

// ── Router ─────────────────────────────────────────────────────────────────────

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root → /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth page – guests only */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginRegister />
            </GuestRoute>
          }
        />

        {/* Admin – Tổng quan (Dashboard) */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <DashboardAdmin />
            </AdminLayout>
          }
        />

        {/* Admin – Quản lý Kỳ thi */}
        <Route
          path="/admin/exams"
          element={
            <AdminLayout>
              <CreateExam />
            </AdminLayout>
          }
        />

        {/* Admin – Quản lý sinh viên */}
        <Route
          path="/admin/students"
          element={
            <AdminLayout>
              <StudentResults />
            </AdminLayout>
          }
        />

        {/* Admin – Báo cáo thống kê */}
        <Route
          path="/admin/statistics"
          element={
            <AdminLayout>
              <StatisticsAdmin />
            </AdminLayout>
          }
        />

        {/* Admin – Ngân hàng đề */}
        <Route
          path="/admin/question-bank"
          element={
            <AdminLayout>
              <QuestionBank />
            </AdminLayout>
          }
        />

        {/* Student dashboard – student only */}
        <Route
          path="/student"
          element={
            <StudentRoute>
              <StudentDashboard />
            </StudentRoute>
          }
        />

        {/* Profile page – student only */}
        <Route
          path="/profile"
          element={
            <StudentRoute>
              <ProfilePage />
            </StudentRoute>
          }
        />

        {/* Catch-all → /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
