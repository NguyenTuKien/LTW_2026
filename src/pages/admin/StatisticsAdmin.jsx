import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import StatisticsPanel from '../../components/admin/StatisticsPanel';

const StatisticsAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-admin">
      <div className="layout-container">
        <Sidebar
          sidebarOpen={sidebarOpen}
          onCloseSidebar={() => setSidebarOpen(false)}
        />
        <div className="main-content">
          <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
          <StatisticsPanel />
        </div>
      </div>
    </div>
  );
};

export default StatisticsAdmin;
