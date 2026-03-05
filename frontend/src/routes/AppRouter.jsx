import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Student Pages
import StudentHome from '../pages/student/Home';
import Exam from '../pages/student/Exam';
import Result from '../pages/student/Result';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import ManageExams from '../pages/admin/ManageExams';
import Statistics from '../pages/admin/Statistics';

// Protected Route Component
const ProtectedRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // TODO: Add proper role-based authentication
  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route
          path="/student/home"
          element={
            <ProtectedRoute>
              <StudentHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/exam/:examId"
          element={
            <ProtectedRoute>
              <Exam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/result/:examId"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/results"
          element={
            <ProtectedRoute>
              <StudentHome />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exams"
          element={
            <ProtectedRoute isAdmin={true}>
              <ManageExams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/statistics"
          element={
            <ProtectedRoute isAdmin={true}>
              <Statistics />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
