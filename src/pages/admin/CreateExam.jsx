import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import ExamForm from '../../components/admin/ExamForm';

const CreateExam = () => {
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
          <ExamForm />
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
