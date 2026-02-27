import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './layouts/AdminLayout';
import Overview from './pages/admin/Overview';
import ExamManagement from './pages/admin/ExamManagement';
import UserManagement from './pages/admin/UserManagement';
import Statistics from './pages/admin/Statistics';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="exams" element={<ExamManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
