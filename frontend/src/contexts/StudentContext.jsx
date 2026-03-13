import React, { createContext, useContext, useState, useCallback } from 'react';

const initialStudents = [
  {
    id: 1,
    studentCode: 'B19DCCN123',
    fullName: 'Nguyễn Văn A',
    email: 'b19dccn123@stu.ptit.edu.vn',
    className: 'D19CQCN01-B',
    status: 'Hoạt động',
    exams: [
      {
        id: 'oop-mid',
        examCode: 'OOP_MID_01',
        name: 'Lập trình hướng đối tượng (Giữa kỳ)',
        score: 8.67,
        joinedAt: '2026-03-05T09:46:00',
        durationMinutes: 45,
        totalQuestions: 30,
        correctCount: 26,
        status: 'Hoàn thành',
        details: [
          { question: 'Lập trình hướng đối tượng là gì?', studentAnswer: 'Lập trình dựa trên đối tượng và lớp', correctAnswer: 'Lập trình dựa trên đối tượng và lớp', explanation: 'OOP tổ chức chương trình xoay quanh đối tượng và lớp.' },
          { question: 'Class (lớp) là gì?', studentAnswer: 'Một đối tượng cụ thể', correctAnswer: 'Bản thiết kế để tạo ra đối tượng', explanation: 'Class là khuôn mẫu dùng để tạo ra các object.' },
          { question: 'Object (đối tượng) là gì?', studentAnswer: 'Thể hiện cụ thể của một lớp', correctAnswer: 'Thể hiện cụ thể của một lớp', explanation: 'Object là thực thể được tạo ra từ class.' },
          { question: 'Encapsulation (đóng gói) giúp làm gì?', studentAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu', correctAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu', explanation: 'Đóng gói giúp che giấu chi tiết bên trong và chỉ cho phép truy cập qua phương thức công khai.' },
          { question: 'Inheritance (kế thừa) cho phép điều gì?', studentAnswer: 'Ngăn truy cập dữ liệu', correctAnswer: 'Một lớp sử dụng lại thuộc tính và phương thức của lớp khác', explanation: 'Kế thừa giúp tái sử dụng code từ lớp cha.' },
          { question: 'Polymorphism (đa hình) là gì?', studentAnswer: 'Một phương thức có nhiều cách triển khai', correctAnswer: 'Một phương thức có nhiều cách triển khai', explanation: 'Đa hình cho phép cùng một phương thức hoạt động khác nhau tùy đối tượng.' },
          { question: 'Abstraction (trừu tượng) giúp làm gì?', studentAnswer: 'Ẩn chi tiết và chỉ hiển thị chức năng cần thiết', correctAnswer: 'Ẩn chi tiết và chỉ hiển thị chức năng cần thiết', explanation: 'Trừu tượng giúp tập trung vào chức năng chính thay vì chi tiết triển khai.' },
          { question: 'Constructor dùng để làm gì?', studentAnswer: 'Khởi tạo đối tượng', correctAnswer: 'Khởi tạo đối tượng', explanation: 'Constructor được gọi khi tạo object để khởi tạo giá trị ban đầu.' },
          { question: 'Destructor có nhiệm vụ gì?', studentAnswer: 'Hủy object và giải phóng tài nguyên', correctAnswer: 'Hủy object và giải phóng tài nguyên', explanation: 'Destructor được gọi khi object bị hủy.' },
          { question: 'Từ khóa private có ý nghĩa gì?', studentAnswer: 'Chỉ truy cập trong cùng class', correctAnswer: 'Chỉ truy cập trong cùng class', explanation: 'private giới hạn phạm vi truy cập trong class.' },
        ],
      },
      {
        id: 'db-final',
        examCode: 'DB_FIN_02',
        name: 'Cơ sở Dữ liệu (Cuối kỳ)',
        score: 4.0,
        joinedAt: '2025-12-20T09:45:00',
        durationMinutes: 60,
        totalQuestions: 30,
        correctCount: 12,
        status: 'Không hoàn thành',
        details: [
          { question: 'Khóa chính (Primary Key) có đặc điểm gì?', studentAnswer: 'Cho phép giá trị NULL', correctAnswer: 'Không được NULL và phải duy nhất', explanation: 'Primary Key dùng để định danh duy nhất mỗi bản ghi và không được chứa NULL.' },
          { question: 'Khóa ngoại (Foreign Key) dùng để làm gì?', studentAnswer: 'Liên kết giữa hai bảng', correctAnswer: 'Liên kết giữa hai bảng', explanation: 'Foreign Key tạo mối quan hệ giữa bảng này với Primary Key của bảng khác.' },
          { question: 'Chuẩn hóa dữ liệu nhằm mục đích gì?', studentAnswer: 'Giảm dư thừa dữ liệu', correctAnswer: 'Giảm dư thừa dữ liệu', explanation: 'Chuẩn hóa giúp loại bỏ dư thừa và tránh bất thường khi cập nhật.' },
          { question: 'Dạng chuẩn 1NF yêu cầu điều gì?', studentAnswer: 'Bảng phải có khóa ngoại', correctAnswer: 'Mỗi ô chỉ chứa một giá trị nguyên tử', explanation: '1NF yêu cầu dữ liệu không được lặp nhóm và phải là giá trị nguyên tử.' },
          { question: 'Lệnh SQL dùng để truy vấn dữ liệu là gì?', studentAnswer: 'SELECT', correctAnswer: 'SELECT', explanation: 'SELECT dùng để truy xuất dữ liệu từ bảng.' },
        ],
      },
      {
        id: 'web-mid',
        examCode: 'WEB_MID_01',
        name: 'Lập trình Web (Giữa kỳ)',
        score: 9.0,
        joinedAt: '2026-02-10T14:15:00',
        durationMinutes: 50,
        totalQuestions: 35,
        correctCount: 30,
        status: 'Hoàn thành',
        details: [
          { question: 'HTML viết tắt của cụm từ nào?', studentAnswer: 'HyperText Markup Language', correctAnswer: 'HyperText Markup Language', explanation: 'HTML là ngôn ngữ đánh dấu dùng để cấu trúc nội dung trang web.' },
          { question: 'Thẻ nào dùng để tạo liên kết trong HTML?', studentAnswer: '<a>', correctAnswer: '<a>', explanation: 'Thẻ <a> (anchor) được dùng để tạo hyperlink.' },
          { question: 'CSS dùng để làm gì?', studentAnswer: 'Định dạng và tạo kiểu giao diện', correctAnswer: 'Định dạng và tạo kiểu giao diện', explanation: 'CSS kiểm soát cách hiển thị của các phần tử HTML.' },
          { question: 'JavaScript chạy ở đâu?', studentAnswer: 'Trình duyệt', correctAnswer: 'Trình duyệt', explanation: 'JavaScript chủ yếu chạy phía client trong trình duyệt.' },
          { question: 'DOM là viết tắt của gì?', studentAnswer: 'Document Object Model', correctAnswer: 'Document Object Model', explanation: 'DOM là mô hình đối tượng tài liệu cho phép thao tác HTML bằng JavaScript.' },
        ],
      },
    ],
  },
  {
    id: 2,
    studentCode: 'B20DCCN101',
    fullName: 'Nguyễn Văn Hùng',
    email: 'hungnv101@ptit.edu.vn',
    className: 'D20CQCN01-B',
    status: 'Hoạt động',
    exams: [],
  },
  {
    id: 3,
    studentCode: 'B20DCCN102',
    fullName: 'Trần Thu Trang',
    email: 'trangtt102@ptit.edu.vn',
    className: 'D20CQCN02-B',
    status: 'Hoạt động',
    exams: [],
  },
  {
    id: 4,
    studentCode: 'B20DCCN103',
    fullName: 'Lê Minh Khoa',
    email: 'khoalm103@ptit.edu.vn',
    className: 'D20CQCN03-B',
    status: 'Khóa',
    exams: [],
  },
  {
    id: 5,
    studentCode: 'B20DCCN104',
    fullName: 'Phạm Ngọc Ánh',
    email: 'anhpn104@ptit.edu.vn',
    className: 'D20CQCN04-B',
    status: 'Hoạt động',
    exams: [],
  },
  {
    id: 6,
    studentCode: 'B20DCCN222',
    fullName: 'Trần Thị B',
    email: 'b20dccn222@stu.ptit.edu.vn',
    className: 'D20CQCN04-A',
    status: 'Hoạt động',
    exams: [
      {
        id: 'oop-mid',
        examCode: 'OOP_MID_01',
        name: 'Lập trình hướng đối tượng (Giữa kỳ)',
        score: 8,
        joinedAt: '2026-03-05T09:46:00',
        durationMinutes: 45,
        totalQuestions: 30,
        correctCount: 24,
        status: 'Hoàn thành',
        details: [
          { question: 'Lập trình hướng đối tượng là gì?', studentAnswer: 'Lập trình dựa trên đối tượng và lớp', correctAnswer: 'Lập trình dựa trên đối tượng và lớp', explanation: 'OOP tổ chức chương trình xoay quanh đối tượng và lớp.' },
          { question: 'Class (lớp) là gì?', studentAnswer: 'Một đối tượng cụ thể', correctAnswer: 'Bản thiết kế để tạo ra đối tượng', explanation: 'Class là khuôn mẫu dùng để tạo ra các object.' },
          { question: 'Object (đối tượng) là gì?', studentAnswer: 'Thể hiện cụ thể của một lớp', correctAnswer: 'Thể hiện cụ thể của một lớp', explanation: 'Object là thực thể được tạo ra từ class.' },
          { question: 'Encapsulation (đóng gói) giúp làm gì?', studentAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu', correctAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu', explanation: 'Đóng gói giúp che giấu chi tiết bên trong và chỉ cho phép truy cập qua phương thức công khai.' },
          { question: 'Inheritance (kế thừa) cho phép điều gì?', studentAnswer: 'Ngăn truy cập dữ liệu', correctAnswer: 'Một lớp sử dụng lại thuộc tính và phương thức của lớp khác', explanation: 'Kế thừa giúp tái sử dụng code từ lớp cha.' },
        ],
      },
    ],
  },
];

const StudentContext = createContext(null);

const getNextId = (items) =>
  items.length ? Math.max(...items.map((item) => Number(item.id) || 0)) + 1 : 1;

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(initialStudents);

  const addStudent = useCallback((studentData) => {
    setStudents((prev) => {
      const nextId = getNextId(prev);
      return [{ id: nextId, ...studentData, exams: studentData.exams || [] }, ...prev];
    });
  }, []);

  const updateStudent = useCallback((id, updates) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  }, []);

  const deleteStudent = useCallback((id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <StudentContext.Provider value={{ students, setStudents, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudents must be used within StudentProvider');
  return ctx;
};

export default StudentContext;
