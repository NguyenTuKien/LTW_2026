import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import QuestionBankPanel from '../../components/admin/QuestionBankPanel';

const QuestionBank = () => {
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
          <QuestionBankPanel />
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
