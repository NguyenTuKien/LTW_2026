import React from 'react';
import StatisticsPanel from '../../components/admin/StatisticsPanel';
import AdminLayoutShell from '../../components/admin/AdminLayoutShell';

const StatisticsAdmin = ({ onNavigate }) => {
  return (
    <AdminLayoutShell activeMenu="statistics" onNavigate={onNavigate}>
      {(searchTerm) => <StatisticsPanel headerSearchTerm={searchTerm} />}
    </AdminLayoutShell>
  );
};

export default StatisticsAdmin;
