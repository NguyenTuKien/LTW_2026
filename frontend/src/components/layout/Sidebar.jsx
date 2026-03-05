import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isAdmin = false }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/exams', label: 'Manage Exams', icon: '📝' },
    { path: '/admin/statistics', label: 'Statistics', icon: '📈' },
    { path: '/admin/users', label: 'Manage Users', icon: '👥' },
  ];

  const studentLinks = [
    { path: '/student/home', label: 'Home', icon: '🏠' },
    { path: '/student/exams', label: 'Available Exams', icon: '📝' },
    { path: '/student/results', label: 'My Results', icon: '📊' },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside className="bg-blue-600 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">{isAdmin ? 'Admin Panel' : 'Student Portal'}</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition-colors ${isActive(
                  link.path
                )}`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
