import { useState } from 'react';
import CreateExam from '../pages/admin/CreateExam';
import StudentResults from '../pages/admin/StudentResults';
import './App.css';

const ADMIN_TABS = [
  { id: 'create-exam', label: 'Tạo/Chỉnh sửa kỳ thi', component: CreateExam },
  { id: 'student-results', label: 'Xem kết quả từng sinh viên', component: StudentResults },
];

function AppAdmin() {
  const [activeTab, setActiveTab] = useState('create-exam');
  const selectedTab = ADMIN_TABS.find((tab) => tab.id === activeTab);
  const ActiveComponent = selectedTab?.component || CreateExam;

  return (
    <div>
      <nav className="app-tab-nav">
        <button type="button" className="active" onClick={() => setActiveTab(activeTab)}>
          {selectedTab?.label || 'Tạo/Chỉnh sửa kỳ thi'}
        </button>
      </nav>
      <ActiveComponent activeTab={activeTab} onNavigateTab={setActiveTab} />
    </div>
  );
}

export default AppAdmin;
