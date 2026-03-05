# PTIT Exam - Frontend

Ứng dụng quản lý kỳ thi trực tuyến cho PTIT sử dụng React + Vite với CSS thuần (không sử dụng Tailwind CSS).

## 🚀 Công nghệ sử dụng

- **React 19.2.0** - Library UI
- **Vite 7.3.1** - Build tool & dev server
- **CSS Variables** - Styling system
- **Google Fonts** - Lexend font family
- **Material Symbols** - Icon library

## 📁 Cấu trúc thư mục

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Media files (images, icons, etc.)
│   ├── components/           # React components
│   │   ├── admin/           # Admin-specific components
│   │   │   ├── ExamForm.jsx     # Form tạo/chỉnh sửa kỳ thi
│   │   │   └── ExamForm.css
│   │   ├── common/          # Shared components (buttons, modals, etc.)
│   │   ├── layout/          # Layout components
│   │   │   ├── Sidebar.jsx      # Sidebar navigation
│   │   │   ├── Sidebar.css
│   │   │   ├── Navbar.jsx       # Top navigation bar
│   │   │   └── Navbar.css
│   │   └── student/         # Student-specific components
│   ├── pages/               # Page components
│   │   ├── admin/          # Admin pages
│   │   │   └── CreateExam.jsx  # Trang tạo/chỉnh sửa kỳ thi
│   │   ├── auth/           # Authentication pages (login, register)
│   │   └── student/        # Student pages
│   ├── routes/             # Route configuration
│   │   ├── App.jsx            # Default app
│   │   ├── App.css
│   │   ├── AppAdmin.jsx       # Admin app wrapper
│   │   └── AppAdmin.css
│   ├── styles/             # Global styles
│   │   └── variables.css      # CSS variables (colors, spacing, etc.)
│   ├── utils/              # Utility functions, helpers, constants
│   ├── index.css           # Global CSS reset & base styles
│   └── main.jsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
├── vite.config.js         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## 📂 Mô tả chi tiết

### `/src/components`
Chứa tất cả các React components, được tổ chức theo module:
- **admin/**: Components dành riêng cho admin (ExamForm, question management, etc.)
- **common/**: Components dùng chung (buttons, inputs, modals, cards, etc.)
- **layout/**: Layout components (Sidebar, Navbar, Footer, Container, etc.)
- **student/**: Components dành riêng cho sinh viên

### `/src/pages`
Chứa các page components, mỗi page là một màn hình hoàn chỉnh:
- **admin/**: Trang quản trị (CreateExam, ManageExams, ManageStudents, etc.)
- **auth/**: Trang xác thực (Login, Register, ForgotPassword, etc.)
- **student/**: Trang sinh viên (TakeExam, ExamResults, ExamHistory, etc.)

### `/src/routes`
Chứa các route wrapper và configuration:
- **AppAdmin.jsx**: Wrapper cho admin routes
- **App.jsx**: Wrapper cho public/student routes

### `/src/styles`
Chứa global styles và CSS variables:
- **variables.css**: Định nghĩa colors, spacing, fonts, border-radius, etc.

### `/src/utils`
Chứa utility functions, helpers, và constants:
- API helpers
- Date formatters
- Validation functions
- Constants & enums

## 🎨 Styling System

Dự án sử dụng **CSS thuần** với **CSS Variables** để quản lý theme:

### CSS Variables
```css
:root {
  --primary: #f20d0d;
  --background-light: #f8f5f5;
  --surface-light: #ffffff;
  --text-main-light: #181111;
  --border-light: #e6dbdb;
  /* ... */
}
```

### Component Styling
Mỗi component có file CSS riêng:
- `ComponentName.jsx` → `ComponentName.css`
- Sử dụng BEM naming hoặc semantic class names
- Responsive với media queries

## 🚦 Scripts

```bash
# Development
npm run dev          # Chạy dev server (http://localhost:5173)

# Build
npm run build        # Build production

# Preview
npm run preview      # Preview production build

# Lint
npm run lint         # Chạy ESLint
```

## 🎯 Features hiện tại

### Admin
- ✅ Sidebar navigation cố định
- ✅ Navbar với search & profile
- ✅ Form tạo/chỉnh sửa kỳ thi
- ✅ Tab management (Thông tin chung, Nội dung câu hỏi, Thiết lập)
- ✅ Dynamic question list với add/edit/delete
- ✅ System notification trong sidebar

## 🔧 Cấu hình

### Vite Config
- Plugin: `@vitejs/plugin-react`
- Dev server port: 5173

### ESLint
- React Hooks rules
- React Refresh

## 📝 Convention

### Component naming
- PascalCase: `ExamForm.jsx`, `Sidebar.jsx`
- Matching CSS file: `ExamForm.css`, `Sidebar.css`

### File organization
- One component per file
- Co-locate component and its CSS file
- Group related components in folders

### CSS naming
- Semantic class names: `.navbar`, `.sidebar`, `.exam-form`
- BEM for complex components: `.navbar-profile-avatar`
- Prefix với component name để tránh conflict

## 🌐 Browser support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features
- CSS Custom Properties

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

## 👨‍💻 Development

1. Clone repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open browser: http://localhost:5173

---

**Note**: Dự án không sử dụng Tailwind CSS, tất cả styling đều sử dụng CSS thuần với CSS Variables.
