import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, isAdmin = false }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">
              ExamSystem
            </Link>
            {user && (
              <div className="hidden md:flex space-x-4">
                {isAdmin ? (
                  <>
                    <Link to="/admin/dashboard" className="hover:text-blue-200">Dashboard</Link>
                    <Link to="/admin/exams" className="hover:text-blue-200">Manage Exams</Link>
                    <Link to="/admin/statistics" className="hover:text-blue-200">Statistics</Link>
                  </>
                ) : (
                  <>
                    <Link to="/student/home" className="hover:text-blue-200">Home</Link>
                    <Link to="/student/results" className="hover:text-blue-200">Results</Link>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
