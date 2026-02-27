import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Overview from './components/Overview';
import ExamManagement from './components/ExamManagement';
import UserManagement from './components/UserManagement';
import Statistics from './components/Statistics';
import './App.css';

function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #dc143c 0%, #b91028 100%)',
      color: 'white',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        Hệ thống Thi Trực Tuyến
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px', textAlign: 'center' }}>
        Nền tảng thi trực tuyến hiện đại và chuyên nghiệp
      </p>
      <Link 
        to="/admin" 
        style={{
          background: 'white',
          color: '#dc143c',
          padding: '15px 40px',
          borderRadius: '30px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        Vào Admin Dashboard
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />}>
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
