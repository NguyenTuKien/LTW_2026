import React from 'react';
import CreateExam from '../pages/admin/CreateExam';
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import StatisticsAdmin from '../pages/admin/StatisticsAdmin';
import './App.css';

function AppAdmin() {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = React.useCallback((nextPath) => {
    if (nextPath === window.location.pathname) return;
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  }, []);

  if (path === '/admin/dashboard') {
    return <DashboardAdmin onNavigate={navigate} />;
  }

  if (path === '/admin/statistics') {
    return <StatisticsAdmin onNavigate={navigate} />;
  }

  return <CreateExam />;
}

export default AppAdmin;
