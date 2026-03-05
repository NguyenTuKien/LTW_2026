import { useState } from 'react';
import Exam from '../pages/student/Exam';
import Result from '../pages/student/Result';
import './App.css';

const STUDENT_TABS = [
  { id: 'exam', label: 'Trang bài thi', component: Exam },
  { id: 'result', label: 'Trang kết quả', component: Result },
];

function AppStudent() {
  const [activeTab, setActiveTab] = useState('exam');
  const ActiveComponent =
    STUDENT_TABS.find((tab) => tab.id === activeTab)?.component || Exam;
  
  return (
    <div>
      <nav className="app-tab-nav">
        {STUDENT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === activeTab ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <ActiveComponent />
    </div>
  );
}

export default AppStudent;
