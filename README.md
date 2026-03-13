# Hệ thống Thi trực tuyến PTIT – LTW 2026

> **Môn:** Lập trình Web &nbsp;|&nbsp; **Trường:** Học viện Công nghệ Bưu chính Viễn thông (PTIT)

---

## Mục lục

1. [Kiến trúc hệ thống](#1-kiến-trúc-hệ-thống)
2. [Entities & Database Schema](#2-entities--database-schema)
3. [Bảng API Backend](#3-bảng-api-backend)
4. [Phân quyền](#4-phân-quyền)
5. [Công nghệ sử dụng](#5-công-nghệ-sử-dụng)

---

## 1. Kiến trúc hệ thống

```
┌─────────────────┐      REST API      ┌──────────────────┐     ┌──────────────┐
│   Frontend      │ ◄─────────────────► │   Backend        │ ◄──► │  Database    │
│   React + Vite  │   (JSON / JWT)      │  Spring Boot     │     │  MySQL       │
│   Port: 5173    │                     │  Port: 8080      │     │  Port: 3306  │
└─────────────────┘                     └──────────────────┘     └──────────────┘
```

**Các trang chính:**

| Route Frontend            | Mô tả                         | Vai trò   |
|---------------------------|-------------------------------|-----------|
| `/login`                  | Đăng nhập / Đăng ký           | Guest     |
| `/admin`                  | Dashboard quản trị            | Admin     |
| `/admin/exams`            | Quản lý kỳ thi                | Admin     |
| `/admin/students`         | Quản lý kết quả sinh viên     | Admin     |
| `/admin/statistics`       | Thống kê, báo cáo             | Admin     |
| `/admin/question-bank`    | Ngân hàng câu hỏi             | Admin     |
| `/student`                | Trang chủ sinh viên           | Student   |
| `/student/exam-info/:id`  | Thông tin bài thi             | Student   |
| `/student/exam/:id`       | Làm bài thi                   | Student   |
| `/student/result`         | Kết quả bài thi               | Student   |
| `/student/history`        | Lịch sử thi                   | Student   |
| `/profile`                | Trang cá nhân                 | Student   |

---

## 2. Entities & Database Schema

### 2.1 Sơ đồ quan hệ (ERD tóm tắt)

```
users ──< exam_attempts >── exams ──< exam_questions >── questions ──< question_options
                                            ▲
question_bank_sets ──< bank_questions ─────┘
                                                        attempt_answers >── questions
                                                        attempt_answers >── question_options
exam_attempts ──< attempt_answers
```

---

### 2.2 Bảng `users` – Người dùng

| Cột             | Kiểu dữ liệu          | Ràng buộc                        | Mô tả                                   |
|-----------------|-----------------------|----------------------------------|-----------------------------------------|
| `id`            | BIGINT                | PK, AUTO_INCREMENT               | Khóa chính                              |
| `username`      | VARCHAR(30)           | UNIQUE, NOT NULL                 | Tên đăng nhập (4–30 ký tự, a-z 0-9 _)  |
| `email`         | VARCHAR(100)          | UNIQUE, NOT NULL                 | Địa chỉ email                           |
| `password_hash` | VARCHAR(255)          | NOT NULL                         | Mật khẩu đã mã hóa (BCrypt)            |
| `full_name`     | VARCHAR(100)          | NULL                             | Họ và tên đầy đủ                        |
| `avatar_url`    | TEXT                  | NULL                             | URL ảnh đại diện                        |
| `role`          | ENUM                  | NOT NULL, DEFAULT `'student'`    | Vai trò: `admin` / `student`            |
| `status`        | ENUM                  | NOT NULL, DEFAULT `'active'`     | Trạng thái: `active` / `locked`         |
| `student_code`  | VARCHAR(20)           | UNIQUE, NULL                     | Mã sinh viên (VD: B19DCCN123)           |
| `class_name`    | VARCHAR(50)           | NULL                             | Tên lớp học (VD: D19CQCN01-B)           |
| `created_at`    | DATETIME              | NOT NULL, DEFAULT NOW()          | Thời điểm tạo tài khoản                 |
| `updated_at`    | DATETIME              | NOT NULL, DEFAULT NOW()          | Thời điểm cập nhật gần nhất             |

---

### 2.3 Bảng `exams` – Kỳ thi

| Cột               | Kiểu dữ liệu  | Ràng buộc                     | Mô tả                                               |
|-------------------|---------------|-------------------------------|-----------------------------------------------------|
| `id`              | BIGINT        | PK, AUTO_INCREMENT            | Khóa chính                                          |
| `code`            | VARCHAR(50)   | UNIQUE, NOT NULL              | Mã kỳ thi (VD: OOP_MID_01)                         |
| `title`           | VARCHAR(255)  | NOT NULL                      | Tên kỳ thi                                          |
| `description`     | TEXT          | NULL                          | Mô tả bài thi                                       |
| `subject`         | VARCHAR(100)  | NOT NULL                      | Môn học                                             |
| `type`            | ENUM          | NOT NULL, DEFAULT `'free'`    | Loại: `free` (Tự do) / `scheduled` (Thời gian cụ thể) |
| `status`          | ENUM          | NOT NULL, DEFAULT `'upcoming'`| Trạng thái: `upcoming` / `ongoing` / `completed`   |
| `duration_minutes`| INT           | NOT NULL                      | Thời gian làm bài (phút)                            |
| `pass_score`      | DECIMAL(4,2)  | NOT NULL, DEFAULT 5.0         | Điểm đạt                                            |
| `max_attempts`    | INT           | NOT NULL, DEFAULT 1           | Số lần thi tối đa                                   |
| `start_time`      | DATETIME      | NULL                          | Thời gian bắt đầu (với loại `scheduled`)            |
| `end_time`        | DATETIME      | NULL                          | Thời gian kết thúc (với loại `scheduled`)           |
| `participants`    | INT           | NOT NULL, DEFAULT 0           | Số người tham gia                                   |
| `avg_score`       | DECIMAL(4,2)  | NULL                          | Điểm trung bình (tính tự động)                      |
| `created_by`      | BIGINT        | FK → `users.id`               | Admin tạo kỳ thi                                    |
| `created_at`      | DATETIME      | NOT NULL, DEFAULT NOW()       | Thời điểm tạo                                       |
| `updated_at`      | DATETIME      | NOT NULL, DEFAULT NOW()       | Thời điểm cập nhật                                  |

---

### 2.4 Bảng `questions` – Câu hỏi

| Cột             | Kiểu dữ liệu | Ràng buộc                       | Mô tả                                           |
|-----------------|--------------|---------------------------------|-------------------------------------------------|
| `id`            | BIGINT       | PK, AUTO_INCREMENT              | Khóa chính                                      |
| `exam_id`       | BIGINT       | FK → `exams.id`, NULL           | Thuộc kỳ thi (NULL nếu là câu trong ngân hàng)  |
| `bank_set_id`   | BIGINT       | FK → `question_bank_sets.id`, NULL | Thuộc bộ đề ngân hàng                        |
| `type`          | ENUM         | NOT NULL, DEFAULT `'mcq'`       | Loại câu hỏi: `mcq` (Trắc nghiệm)              |
| `content`       | TEXT         | NOT NULL                        | Nội dung câu hỏi                                |
| `topic`         | VARCHAR(100) | NULL                            | Chủ đề / chương (VD: Tính đóng gói)            |
| `explanation`   | TEXT         | NULL                            | Giải thích đáp án                               |
| `order_index`   | INT          | NOT NULL, DEFAULT 0             | Thứ tự câu hỏi trong bài thi                    |
| `created_at`    | DATETIME     | NOT NULL, DEFAULT NOW()         | Thời điểm tạo                                   |
| `updated_at`    | DATETIME     | NOT NULL, DEFAULT NOW()         | Thời điểm cập nhật                              |

---

### 2.5 Bảng `question_options` – Lựa chọn câu hỏi

| Cột           | Kiểu dữ liệu | Ràng buộc                 | Mô tả                              |
|---------------|--------------|---------------------------|------------------------------------|
| `id`          | BIGINT       | PK, AUTO_INCREMENT        | Khóa chính                         |
| `question_id` | BIGINT       | FK → `questions.id`, NOT NULL | Thuộc câu hỏi nào                |
| `label`       | CHAR(1)      | NOT NULL                  | Nhãn đáp án: `A`, `B`, `C`, `D`   |
| `text`        | TEXT         | NOT NULL                  | Nội dung đáp án                    |
| `is_correct`  | BOOLEAN      | NOT NULL, DEFAULT FALSE   | Có phải đáp án đúng không          |

---

### 2.6 Bảng `question_bank_sets` – Bộ đề ngân hàng

| Cột          | Kiểu dữ liệu | Ràng buộc                 | Mô tả                             |
|--------------|--------------|---------------------------|-----------------------------------|
| `id`         | BIGINT       | PK, AUTO_INCREMENT        | Khóa chính                        |
| `title`      | VARCHAR(255) | NOT NULL                  | Tên bộ đề (VD: DSA Practice 1)   |
| `duration`   | INT          | NOT NULL, DEFAULT 60      | Thời gian gợi ý (phút)            |
| `created_by` | BIGINT       | FK → `users.id`           | Admin tạo bộ đề                   |
| `created_at` | DATETIME     | NOT NULL, DEFAULT NOW()   | Thời điểm tạo                     |
| `updated_at` | DATETIME     | NOT NULL, DEFAULT NOW()   | Thời điểm cập nhật                |

---

### 2.7 Bảng `exam_attempts` – Lượt làm bài

| Cột               | Kiểu dữ liệu  | Ràng buộc                         | Mô tả                                          |
|-------------------|---------------|-----------------------------------|------------------------------------------------|
| `id`              | BIGINT        | PK, AUTO_INCREMENT                | Khóa chính                                     |
| `exam_id`         | BIGINT        | FK → `exams.id`, NOT NULL         | Kỳ thi                                         |
| `student_id`      | BIGINT        | FK → `users.id`, NOT NULL         | Sinh viên tham gia                             |
| `started_at`      | DATETIME      | NOT NULL                          | Thời điểm bắt đầu làm                          |
| `submitted_at`    | DATETIME      | NULL                              | Thời điểm nộp bài                              |
| `duration_minutes`| INT           | NULL                              | Thời gian thực tế đã làm (phút)                |
| `total_questions` | INT           | NOT NULL                          | Tổng số câu hỏi                                |
| `correct_count`   | INT           | NOT NULL, DEFAULT 0               | Số câu đúng                                    |
| `score`           | DECIMAL(4,2)  | NULL                              | Điểm số (thang 10)                             |
| `pass_score`      | DECIMAL(4,2)  | NOT NULL                          | Điểm đạt của bài thi                           |
| `passed`          | BOOLEAN       | NULL                              | Có đạt không                                   |
| `status`          | ENUM          | NOT NULL, DEFAULT `'in_progress'` | Trạng thái: `in_progress` / `completed` / `timeout` |
| `created_at`      | DATETIME      | NOT NULL, DEFAULT NOW()           | Thời điểm tạo bản ghi                          |

---

### 2.8 Bảng `attempt_answers` – Chi tiết câu trả lời

| Cột                | Kiểu dữ liệu | Ràng buộc                          | Mô tả                            |
|--------------------|--------------|------------------------------------|----------------------------------|
| `id`               | BIGINT       | PK, AUTO_INCREMENT                 | Khóa chính                       |
| `attempt_id`       | BIGINT       | FK → `exam_attempts.id`, NOT NULL  | Thuộc lượt làm bài nào           |
| `question_id`      | BIGINT       | FK → `questions.id`, NOT NULL      | Câu hỏi                          |
| `selected_option_id`| BIGINT      | FK → `question_options.id`, NULL   | Đáp án sinh viên đã chọn         |
| `is_correct`       | BOOLEAN      | NOT NULL, DEFAULT FALSE            | Câu này có đúng không            |

---

## 3. Bảng API Backend

> **Base URL:** `http://localhost:8080/api`  
> **Authentication:** Bearer JWT Token (`Authorization: Bearer <token>`)  
> **Content-Type:** `application/json`

---

### 3.1 Auth – Xác thực

| # | Method | Endpoint         | Mô tả                       | Auth | Input                                             | Output                                  |
|---|--------|------------------|-----------------------------|------|---------------------------------------------------|-----------------------------------------|
| 1 | POST   | `/auth/login`    | Đăng nhập                   | ❌   | `{ username, password }`                          | `{ token, user: {id, username, role} }` |
| 2 | POST   | `/auth/register` | Đăng ký tài khoản mới       | ❌   | `{ username, email, password, confirmPassword }`  | `{ message }` |
| 3 | POST   | `/auth/logout`   | Đăng xuất                   | ✅   | —                                                 | `{ message }` |
| 4 | GET    | `/auth/me`       | Lấy thông tin user hiện tại | ✅   | —                                                 | `{ id, username, email, role, fullName, avatar }` |

---

### 3.2 User / Profile – Người dùng

| # | Method | Endpoint             | Mô tả                         | Auth    | Input                                          | Output                   |
|---|--------|----------------------|-------------------------------|---------|------------------------------------------------|--------------------------|
| 5 | GET    | `/users/me`          | Lấy profile cá nhân           | ✅ Any  | —                                              | `User object`            |
| 6 | PUT    | `/users/me`          | Cập nhật profile (tên, email) | ✅ Any  | `{ fullName?, email? }`                        | `User object`            |
| 7 | PUT    | `/users/me/avatar`   | Cập nhật ảnh đại diện         | ✅ Any  | `form-data: avatar (file ≤ 2MB)`               | `{ avatarUrl }`          |
| 8 | PUT    | `/users/me/password` | Đổi mật khẩu                  | ✅ Any  | `{ oldPassword, newPassword }`                 | `{ message }`            |

---

### 3.3 Admin – Quản lý kỳ thi

| #  | Method   | Endpoint                              | Mô tả                         | Auth    | Input                                                                                                              | Output                         |
|----|:--------:|---------------------------------------|-------------------------------|---------|---------------------------------------------------------------------------------------------------------------------|-------------------------------|
| 9  | GET      | `/admin/exams`                        | Danh sách kỳ thi              | ✅ Admin | Query: `keyword, status, page, size`                                                                               | `{ content: ExamSummary[], totalElements, totalPages }` |
| 10 | POST     | `/admin/exams`                        | Tạo kỳ thi mới                | ✅ Admin | `{ code, title, description, subject, type, status, durationMinutes, passScore, maxAttempts, startTime?, endTime? }` | `Exam object`               |
| 11 | GET      | `/admin/exams/{id}`                   | Chi tiết kỳ thi               | ✅ Admin | Path: `id`                                                                                                         | `Exam object + questions[]`   |
| 12 | PUT      | `/admin/exams/{id}`                   | Cập nhật thông tin kỳ thi     | ✅ Admin | `{ code?, title?, description?, subject?, type?, status?, durationMinutes?, startTime?, endTime? }`                | `Exam object`                 |
| 13 | DELETE   | `/admin/exams/{id}`                   | Xóa kỳ thi                    | ✅ Admin | Path: `id`                                                                                                         | `204 No Content`              |
| 14 | GET      | `/admin/exams/{id}/questions`         | Danh sách câu hỏi của kỳ thi  | ✅ Admin | Path: `id`                                                                                                         | `Question[]`                  |
| 15 | POST     | `/admin/exams/{id}/questions`         | Thêm câu hỏi vào kỳ thi       | ✅ Admin | `{ type, content, topic, explanation, options: [{label, text, isCorrect}] }`                                       | `Question object`             |
| 16 | PUT      | `/admin/exams/{id}/questions/{qId}`   | Cập nhật câu hỏi              | ✅ Admin | `{ content?, topic?, explanation?, options? }`                                                                     | `Question object`             |
| 17 | DELETE   | `/admin/exams/{id}/questions/{qId}`   | Xóa câu hỏi                   | ✅ Admin | Path: `id, qId`                                                                                                    | `204 No Content`              |
| 18 | POST     | `/admin/exams/{id}/import-excel`      | Import câu hỏi từ file Excel  | ✅ Admin | `form-data: file (.xlsx)`                                                                                          | `{ imported: N, questions[] }`|
| 19 | POST     | `/admin/exams/{id}/import-bank`       | Import câu hỏi từ ngân hàng   | ✅ Admin | `{ bankSetId, questionIds?: [] }`                                                                                  | `{ imported: N }`             |

---

### 3.4 Admin – Ngân hàng câu hỏi

| #  | Method   | Endpoint                                        | Mô tả                          | Auth    | Input                                                               | Output                  |
|----|:--------:|-------------------------------------------------|-------------------------------|---------|---------------------------------------------------------------------|-------------------------|
| 20 | GET      | `/admin/question-bank`                          | Danh sách bộ đề ngân hàng     | ✅ Admin | Query: `keyword, page, size`                                        | `{ content: BankSetSummary[], totalElements, totalPages }` |
| 21 | POST     | `/admin/question-bank`                          | Tạo bộ đề mới                 | ✅ Admin | `{ title, duration, questions: [{type, content, topic, options}] }` | `BankSet object`        |
| 22 | GET      | `/admin/question-bank/{id}`                     | Chi tiết bộ đề                | ✅ Admin | Path: `id`                                                          | `BankSet + questions[]` |
| 23 | PUT      | `/admin/question-bank/{id}`                     | Cập nhật bộ đề                | ✅ Admin | `{ title?, duration?, questions? }`                                 | `BankSet object`        |
| 24 | DELETE   | `/admin/question-bank/{id}`                     | Xóa bộ đề                     | ✅ Admin | Path: `id`                                                          | `204 No Content`        |
| 25 | POST     | `/admin/question-bank/{id}/questions`           | Thêm câu hỏi vào bộ đề        | ✅ Admin | `{ type, content, topic, explanation, options[] }`                  | `Question object`       |
| 26 | PUT      | `/admin/question-bank/{id}/questions/{qId}`     | Cập nhật câu hỏi trong bộ đề  | ✅ Admin | `{ content?, options? }`                                            | `Question object`       |
| 27 | DELETE   | `/admin/question-bank/{id}/questions/{qId}`     | Xóa câu hỏi khỏi bộ đề        | ✅ Admin | Path: `id, qId`                                                     | `204 No Content`        |

---

### 3.5 Admin – Quản lý sinh viên

| #  | Method   | Endpoint                                        | Mô tả                             | Auth    | Input                                                   | Output                       |
|----|:--------:|-------------------------------------------------|-----------------------------------|---------|---------------------------------------------------------|------------------------------|
| 28 | GET      | `/admin/students`                               | Danh sách sinh viên               | ✅ Admin | Query: `keyword, status, className, page, size`         | `{ content: StudentSummary[], totalElements, totalPages }` |
| 29 | POST     | `/admin/students`                               | Tạo tài khoản sinh viên           | ✅ Admin | `{ studentCode, fullName, email, className, password }` | `User object`                |
| 30 | GET      | `/admin/students/{id}`                          | Chi tiết sinh viên                | ✅ Admin | Path: `id`                                              | `User + exams[]`             |
| 31 | PUT      | `/admin/students/{id}`                          | Cập nhật thông tin sinh viên      | ✅ Admin | `{ fullName?, email?, className?, status? }`            | `User object`                |
| 32 | DELETE   | `/admin/students/{id}`                          | Xóa tài khoản sinh viên           | ✅ Admin | Path: `id`                                              | `204 No Content`             |
| 33 | GET      | `/admin/students/{id}/exam-results`             | Lịch sử kết quả thi của sinh viên | ✅ Admin | Query: `page, size`                                     | `{ content: ExamAttemptSummary[], totalElements }` |
| 34 | GET      | `/admin/students/{id}/exam-results/{attemptId}` | Chi tiết kết quả một lần thi      | ✅ Admin | Path: `id, attemptId`                                   | `ExamAttempt + answers[]`    |

---

### 3.6 Admin – Thống kê

| #  | Method | Endpoint                               | Mô tả                                   | Auth    | Input                                               | Output                                                  |
|----|--------|----------------------------------------|-----------------------------------------|---------|-----------------------------------------------------|---------------------------------------------------------|
| 35 | GET    | `/admin/statistics/summary`            | Tổng quan: tổng sinh viên, kỳ thi, điểm TB | ✅ Admin | —                                               | `{ totalStudents, totalExams, avgScore, activeExams }` |
| 36 | GET    | `/admin/statistics/exams`              | Báo cáo danh sách kỳ thi               | ✅ Admin | Query: `status, dateFrom, dateTo, keyword, page, size` | `{ content: ExamReport[], totalElements }`          |
| 37 | GET    | `/admin/statistics/score-distribution` | Phân bổ điểm số (Giỏi/Khá/TB/Yếu)     | ✅ Admin | Query: `examId?`                                    | `{ labels[], values[], colors[] }`                     |
| 38 | GET    | `/admin/statistics/weekly-trend`       | Xu hướng thi theo tuần                  | ✅ Admin | Query: `examId?`                                    | `{ weeks[], attempts[] }`                              |

---

### 3.7 Student – Kỳ thi

| #  | Method | Endpoint                     | Mô tả                                  | Auth      | Input                                                      | Output                                                       |
|----|--------|------------------------------|----------------------------------------|-----------|------------------------------------------------------------|--------------------------------------------------------------|
| 39 | GET    | `/student/exams`             | Danh sách kỳ thi hiển thị cho SV       | ✅ Student | Query: `keyword, category, status`                         | `ExamCard[]`                                                 |
| 40 | GET    | `/student/exams/{id}/info`   | Thông tin chi tiết trước khi thi        | ✅ Student | Path: `id`                                                 | `{ title, subject, category, duration, totalQuestions, passScore, maxAttempts, attemptsUsed, description }` |
| 41 | POST   | `/student/exams/{id}/start`  | Bắt đầu làm bài thi (tạo attempt)      | ✅ Student | Path: `id`                                                 | `{ attemptId, questions[], durationMinutes }`                |
| 42 | POST   | `/student/exams/{id}/submit` | Nộp bài thi                            | ✅ Student | `{ attemptId, answers: [{questionId, selectedOptionId}] }` | `{ score, correctCount, totalQuestions, passed, details[] }` |

---

### 3.8 Student – Lịch sử & Kết quả

| #  | Method | Endpoint                       | Mô tả                              | Auth      | Input                                          | Output                                                              |
|----|--------|--------------------------------|------------------------------------|-----------|------------------------------------------------|---------------------------------------------------------------------|
| 43 | GET    | `/student/history`             | Lịch sử các lần thi của sinh viên  | ✅ Student | Query: `keyword, filter (all/pass/fail), page, size` | `{ content: ExamHistoryItem[], totalElements }`               |
| 44 | GET    | `/student/history/{attemptId}` | Chi tiết kết quả một lần thi       | ✅ Student | Path: `attemptId`                              | `{ examName, examCode, submittedAt, score, passed, questions[], answers[] }` |

---

### 3.9 Tóm tắt HTTP Status Codes

| Status | Ý nghĩa                    |
|--------|----------------------------|
| 200    | OK – Thành công            |
| 201    | Created – Tạo mới thành công |
| 204    | No Content – Xóa thành công |
| 400    | Bad Request – Dữ liệu không hợp lệ |
| 401    | Unauthorized – Chưa đăng nhập |
| 403    | Forbidden – Không có quyền truy cập |
| 404    | Not Found – Không tìm thấy resource |
| 409    | Conflict – Trùng lặp (username/email) |
| 500    | Internal Server Error – Lỗi server |

---

## 4. Phân quyền

| Nhóm API               | Guest | Student | Admin |
|------------------------|:-----:|:-------:|:-----:|
| `POST /auth/login`     |  ✅   |    ✅   |  ✅   |
| `POST /auth/register`  |  ✅   |    ❌   |  ❌   |
| `GET /auth/me`         |  ❌   |    ✅   |  ✅   |
| `/users/me/**`         |  ❌   |    ✅   |  ✅   |
| `/admin/exams/**`      |  ❌   |    ❌   |  ✅   |
| `/admin/question-bank/**` | ❌ |    ❌   |  ✅   |
| `/admin/students/**`   |  ❌   |    ❌   |  ✅   |
| `/admin/statistics/**` |  ❌   |    ❌   |  ✅   |
| `/student/exams/**`    |  ❌   |    ✅   |  ❌   |
| `/student/history/**`  |  ❌   |    ✅   |  ❌   |

---

## 5. Công nghệ sử dụng

| Layer    | Công nghệ                                       |
|----------|-------------------------------------------------|
| Frontend | React 18, Vite, React Router v6, XLSX.js        |
| Backend  | Spring Boot 3, Spring Security, Spring Data JPA |
| Database | PostgreSQL                                      |
| Auth     | JWT (JSON Web Token) + BCrypt                   |
| Deploy   | Docker + Docker Compose + Nginx                 |

---
