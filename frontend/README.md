# PTIT Exam Frontend - API Contract (đề xuất backend)

Tài liệu này được suy ra từ luồng thực tế trong `frontend/src` (admin + student + auth).
Hiện tại frontend dùng mock data/localStorage, vì vậy đây là danh sách API backend **cần có** để thay thế toàn bộ dữ liệu mock.

## 1) Chuẩn chung

- Base URL: `/api/v1`
- Auth: `Authorization: Bearer <access_token>`
- JSON response chuẩn:

```json
{
  "success": true,
  "data": {},
  "message": "optional"
}
```

- JSON lỗi chuẩn:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Nội dung lỗi",
    "fields": {
      "email": "Email không hợp lệ"
    }
  }
}
```

---

## 2) Danh sách API (dạng bảng)

| API | Chức năng | Input | Output | Note |
|---|---|---|---|---|
| `POST /auth/register` | Đăng ký tài khoản sinh viên | Body: `username, email, password, confirmPassword` | `success`, user cơ bản | Validate trùng `username/email` |
| `POST /auth/login` | Đăng nhập admin/sinh viên | Body: `username, password` | `accessToken, refreshToken, user{id,username,email,role,fullName,avatar}` | Dùng để điều hướng theo role |
| `POST /auth/logout` | Đăng xuất/thu hồi phiên | Header Bearer token | `success` | Có thể blacklist refresh token |
| `GET /auth/me` | Lấy thông tin user hiện tại | Header Bearer token | `user{id,username,email,role,fullName,avatar}` | Dùng khởi tạo navbar/profile |
| `PATCH /users/me` | Cập nhật profile cá nhân | Body: `fullName?, email?, avatar?` | `user` đã cập nhật | `avatar` có thể base64/url |
| `GET /student/dashboard/exams` | Danh sách bài thi ở dashboard sinh viên | Query: `search?, category?, status?` | `items[{id,title,category,status,duration,questions,openDate,examDataId}]` | Hỗ trợ filter realtime |
| `GET /student/exams/:examId/info` | Thông tin bài thi trước khi vào làm | Path: `examId` | `title,subject,category,duration,questions,passScore,maxAttempts,description` | Dùng cho màn `ExamInfo` |
| `POST /student/exams/:examId/start` | Bắt đầu một lần thi | Path: `examId` | `attemptId, startedAt, expiresAt` | Tạo phiên làm bài |
| `GET /student/exams/:examId/questions` | Lấy bộ câu hỏi khi làm bài | Path: `examId` | `questions[{id,text,options[{label,text}]}]` | Không trả đáp án đúng |
| `PATCH /student/attempts/:attemptId/answers` | Lưu tạm đáp án/đánh dấu câu | Path: `attemptId`, Body: `answers{}, flagged[]` | `savedAt` hoặc `success` | Gọi định kỳ/autosave |
| `POST /student/attempts/:attemptId/submit` | Nộp bài và chấm điểm | Path: `attemptId` | `examName, examCode, studentName, studentCode, submittedAt, durationMinutes, passScore, questions[]` | `questions[]`: `id,topic,text,options[],selectedAnswer,correctAnswer,explanation` |
| `GET /student/exam-history` | Danh sách lịch sử thi của sinh viên | Query: `search?, result=all|pass|fail, page?, pageSize?` | `items[{id,examName,examCode,category,submittedAt,durationMinutes,totalQuestions,correctCount,score,passScore,passed}]` | Dùng cho `ExamHistory` |
| `GET /student/exam-history/:historyId/result` | Chi tiết kết quả một bài đã thi | Path: `historyId` | Cùng schema output của submit | Dùng khi bấm “Xem kết quả” |
| `GET /admin/exams` | Danh sách kỳ thi cho admin | Query: `search?, status?, page?, pageSize?` | `items[{id,code,title,subject,type,status,participants,durationMinutes,avgScore}]` | Dùng ở list + search |
| `POST /admin/exams` | Tạo kỳ thi mới | Body: `code,title,subject,type,status,participants,durationMinutes,questions?` | Exam vừa tạo | Hỗ trợ tạo nháp/xuất bản |
| `GET /admin/exams/:id` | Lấy chi tiết kỳ thi để sửa | Path: `id` | Exam detail + `questions[]` | Dùng cho full edit |
| `PATCH /admin/exams/:id` | Cập nhật kỳ thi | Path: `id`, Body fields cần sửa | Exam đã cập nhật | Dùng cho quick + full edit |
| `DELETE /admin/exams/:id` | Xóa kỳ thi | Path: `id` | `success` | Soft delete nếu cần audit |
| `POST /admin/exams/import-questions` | Import câu hỏi từ Excel | `multipart/form-data` với `file` | `questions[{id,type,content,options[{id,text,isCorrect}]}]` | Dùng cho upload `.xlsx/.xls` |
| `GET /admin/question-banks` | Danh sách bộ đề ngân hàng | Query: `search?, page?, pageSize?` | `items[{id,title,duration,questions[]}]` | `questions[]`: `id,text,options[{label,text}],correctAnswer` |
| `POST /admin/question-banks` | Tạo bộ đề | Body: `title,duration,questions[]` | Bộ đề vừa tạo | Dùng trong `QuestionBank` |
| `GET /admin/question-banks/:id` | Chi tiết bộ đề | Path: `id` | Bộ đề + câu hỏi | Dùng khi mở sửa |
| `PATCH /admin/question-banks/:id` | Cập nhật bộ đề | Path: `id`, Body: fields cập nhật | Bộ đề đã cập nhật | |
| `DELETE /admin/question-banks/:id` | Xóa bộ đề | Path: `id` | `success` | |
| `GET /admin/students` | Danh sách sinh viên | Query: `search?, status?, page?, pageSize?` | `items[{id,studentCode,fullName,email,className,status,examsCount}]` | Dùng cho `StudentResults` + dashboard |
| `POST /admin/students` | Tạo sinh viên | Body: `studentCode,fullName,email,className,status` | Student vừa tạo | |
| `PATCH /admin/students/:id` | Sửa thông tin/trạng thái sinh viên | Path: `id`, Body: fields cập nhật | Student đã cập nhật | |
| `DELETE /admin/students/:id` | Xóa sinh viên | Path: `id` | `success` | |
| `GET /admin/students/:id/results` | Lịch sử kết quả của một sinh viên | Path: `id`, Query: `page?,pageSize?` | `items[{id,examCode,name,score,status,joinedAt,durationMinutes,totalQuestions,correctCount}]` | Dùng bảng kết quả chi tiết |
| `GET /admin/students/:id/results/:resultId` | Chi tiết bài làm của 1 kết quả | Path: `id,resultId` | `details[{question,studentAnswer,correctAnswer,explanation}]` + meta | Dùng panel “Chi tiết đáp án” |
| `GET /admin/reports/student-results` | Dữ liệu/report cho xuất PDF kết quả SV | Query: filter theo lớp/kỳ thi/thời gian | file/pdf hoặc data report | Nên hỗ trợ cả JSON và file |
| `GET /admin/statistics/overview` | Tổng quan thống kê | Query: `fromDate?,toDate?,examCode?` | `totalExams,totalParticipants,liveParticipants,passRate,averageScore` | Card KPI đầu trang |
| `GET /admin/statistics/reports` | Bảng báo cáo có phân trang + filter | Query: `examCode?,status?,fromDate?,toDate?,search?,page?,pageSize?` | `items[{id,code,title,type,participants,completionRate,avgScore,status,date}]` | Data table thống kê |
| `GET /admin/statistics/trends` | Dữ liệu line chart theo tuần | Query: `examCode?,fromDate?,toDate?` | `labels[], values[]` | “Số lượt tham gia theo thời gian” |
| `GET /admin/statistics/score-distribution` | Dữ liệu donut chart phân bố điểm | Query: `examCode?,fromDate?,toDate?` | `labels[], values[], colors?` | |
| `GET /admin/statistics/export.csv` | Xuất báo cáo CSV | Query: cùng filter của reports | File CSV | Tương ứng nút export Excel/CSV |
| `GET /admin/statistics/export.pdf` | Xuất báo cáo PDF | Query: cùng filter của reports | File PDF | |
| `GET /notifications` | Lấy thông báo và số chưa đọc | Query: `page?,pageSize?` | `unreadCount, items[]` | Badge chuông navbar |
| `GET /admin/search` | Global search cho navbar admin | Query: `q` | `pages[], students[], exams[]` | Có thể gom từ nhiều nguồn |

---

## 9) Mapping nhanh: màn hình -> API

- `LoginRegister`: `/auth/register`, `/auth/login`
- `ProfilePage`: `/auth/me`, `/users/me`
- `StudentDashboard`: `/student/dashboard/exams`
- `ExamInfo`: `/student/exams/:examId/info`, `/student/exams/:examId/start`
- `Exam`: `/student/exams/:examId/questions`, `/student/attempts/:attemptId/answers`, `/student/attempts/:attemptId/submit`
- `Result`: dùng dữ liệu trả về từ submit hoặc `/student/exam-history/:historyId/result`
- `ExamHistory`: `/student/exam-history`, `/student/exam-history/:historyId/result`
- `CreateExam`: `/admin/exams*`, `/admin/exams/import-questions`
- `QuestionBank`: `/admin/question-banks*`
- `StudentResults`: `/admin/students*`, `/admin/students/:id/results*`, `/admin/reports/student-results`
- `StatisticsAdmin`: `/admin/statistics/*`

---

## 10) Ghi chú triển khai

- Frontend hiện chưa có lớp API client; đang dùng context + data mock + localStorage/sessionStorage.
- Khi tích hợp backend, nên thêm `src/services/*.js` (hoặc `src/api/*.js`) và chuyển dần các context/page sang gọi API thật.
- Ưu tiên hoàn thành theo thứ tự: `auth` -> `student exam flow` -> `admin exams/question bank` -> `reports/statistics`.
