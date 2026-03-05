import { Routes, Route } from 'react-router-dom'
import AppAdmin from './AppAdmin'
import AppStudent from './AppStudent'
import CreateExam from '../pages/admin/CreateExam'
import Exam from '../pages/student/Exam'

function App() {
  return (
    <Routes>
      {/* Cụm dành cho Sinh viên */}
      <Route path="/" element={<AppStudent />}>
        <Route index element={<Exam />} />
      </Route>

      {/* Cụm dành cho Admin */}
      <Route path="/admin" element={<AppAdmin />}>
        <Route index element={<CreateExam />} />
        <Route path="create-exam" element={<CreateExam />} />
        {/* Thêm trang mới: <Route path="dashboard" element={<Dashboard />} /> */}
      </Route>
    </Routes>
  )
}

export default App