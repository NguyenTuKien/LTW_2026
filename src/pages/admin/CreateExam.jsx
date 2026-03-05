import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import ExamForm from '../../components/admin/ExamForm';

const CreateExam = ({ activeTab, onNavigateTab }) => {
  return (
    <div className="app-admin">
      <div className="layout-container">
        <Sidebar activeTab={activeTab} onNavigateTab={onNavigateTab} />
        <div className="main-content">
          <Navbar />
          <ExamForm />
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
