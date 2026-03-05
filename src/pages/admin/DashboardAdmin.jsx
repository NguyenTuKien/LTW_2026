import React from 'react';
import DashboardPanel from '../../components/admin/DashboardPanel';
import AdminLayoutShell from '../../components/admin/AdminLayoutShell';

const DashboardAdmin = ({ onNavigate }) => {
  return (
    <AdminLayoutShell activeMenu="overview" onNavigate={onNavigate}>
      {(searchTerm) => <DashboardPanel searchTerm={searchTerm} />}
    </AdminLayoutShell>
  );
};

export default DashboardAdmin;
