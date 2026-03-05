import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../utils/auth';
import '../../styles/loginRegister.css';

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const IconArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const IconAlert = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onSwitchToRegister }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi của field khi user bắt đầu nhập lại
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập delay nhỏ cho UX
    setTimeout(() => {
      const result = login({ username: form.username, password: form.password });

      if (result.success) {
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/student');
        }
      } else {
        setErrors(result.errors || {});
      }
      setLoading(false);
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="auth-form-header">
        <h2>Chào mừng trở lại!</h2>
        <p>Đăng nhập để tiếp tục vào hệ thống</p>
      </div>

      {errors.general && (
        <div className="auth-general-error" role="alert">
          <IconAlert />
          {errors.general}
        </div>
      )}

      {/* Username */}
      <div className="auth-field">
        <label className="auth-label" htmlFor="login-username">Tên đăng nhập</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon"><IconUser /></span>
          <input
            id="login-username"
            name="username"
            type="text"
            className={`auth-input${errors.username ? ' error' : ''}`}
            placeholder="Nhập tên đăng nhập"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            autoFocus
          />
        </div>
        {errors.username && (
          <span className="auth-error-text"><IconAlert />{errors.username}</span>
        )}
      </div>

      {/* Password */}
      <div className="auth-field">
        <label className="auth-label" htmlFor="login-password">Mật khẩu</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon"><IconLock /></span>
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            className={`auth-input${errors.password ? ' error' : ''}`}
            placeholder="Nhập mật khẩu"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="auth-input-toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? <IconEyeOff /> : <IconEye />}
          </button>
        </div>
        {errors.password && (
          <span className="auth-error-text"><IconAlert />{errors.password}</span>
        )}
      </div>

      {/* Remember me + Forgot */}
      <div className="auth-row">
        <label className="auth-remember">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Ghi nhớ đăng nhập
        </label>
        <button type="button" className="auth-forgot">Quên mật khẩu?</button>
      </div>

      {/* Submit */}
      <button type="submit" className="auth-submit-btn" disabled={loading} id="login-submit-btn">
        {loading ? (
          <span className="auth-spinner" />
        ) : (
          <>Đăng nhập <IconArrow /></>
        )}
      </button>

      <p className="auth-switch">
        Chưa có tài khoản?
        <button type="button" className="auth-switch-link" onClick={onSwitchToRegister}>
          Đăng ký ngay
        </button>
      </p>
    </form>
  );
}

// ─── Register Form ────────────────────────────────────────────────────────────
function RegisterForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      const result = register(form);
      if (result.success) {
        setSuccess(true);
        setForm({ username: '', email: '', password: '', confirmPassword: '' });
        setErrors({});
        // Tự động chuyển sang tab Login sau 2s
        setTimeout(() => {
          onSwitchToLogin();
          setSuccess(false);
        }, 2000);
      } else {
        setErrors(result.errors || {});
      }
      setLoading(false);
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="auth-form-header">
        <h2>Tạo tài khoản mới</h2>
        <p>Điền thông tin để đăng ký tài khoản</p>
      </div>

      {success && (
        <div className="auth-success-msg" role="status">
          <IconCheck />
          Đăng ký thành công! Đang chuyển sang đăng nhập…
        </div>
      )}

      {/* Username */}
      <div className="auth-field">
        <label className="auth-label" htmlFor="reg-username">Tên đăng nhập</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon"><IconUser /></span>
          <input
            id="reg-username"
            name="username"
            type="text"
            className={`auth-input${errors.username ? ' error' : ''}`}
            placeholder="4–30 ký tự, chữ/số/gạch dưới"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            autoFocus
          />
        </div>
        {errors.username && (
          <span className="auth-error-text"><IconAlert />{errors.username}</span>
        )}
      </div>

      {/* Email */}
      <div className="auth-field">
        <label className="auth-label" htmlFor="reg-email">Email</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon"><IconMail /></span>
          <input
            id="reg-email"
            name="email"
            type="email"
            className={`auth-input${errors.email ? ' error' : ''}`}
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        {errors.email && (
          <span className="auth-error-text"><IconAlert />{errors.email}</span>
        )}
      </div>

      {/* Password */}
      <div className="auth-field">
        <label className="auth-label" htmlFor="reg-password">Mật khẩu</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon"><IconLock /></span>
          <input
            id="reg-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            className={`auth-input${errors.password ? ' error' : ''}`}
            placeholder="Ít nhất 6 ký tự, gồm chữ và số"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="auth-input-toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? <IconEyeOff /> : <IconEye />}
          </button>
        </div>
        {errors.password && (
          <span className="auth-error-text"><IconAlert />{errors.password}</span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="auth-field">
        <label className="auth-label" htmlFor="reg-confirm">Xác nhận mật khẩu</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon"><IconLock /></span>
          <input
            id="reg-confirm"
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            className={`auth-input${errors.confirmPassword ? ' error' : ''}`}
            placeholder="Nhập lại mật khẩu"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="auth-input-toggle"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showConfirm ? <IconEyeOff /> : <IconEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="auth-error-text"><IconAlert />{errors.confirmPassword}</span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="auth-submit-btn"
        disabled={loading || success}
        id="register-submit-btn"
        style={{ marginTop: '0.5rem' }}
      >
        {loading ? (
          <span className="auth-spinner" />
        ) : (
          <>Đăng ký <IconArrow /></>
        )}
      </button>

      <p className="auth-switch">
        Đã có tài khoản?
        <button type="button" className="auth-switch-link" onClick={onSwitchToLogin}>
          Đăng nhập
        </button>
      </p>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LoginRegister() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand / Logo Panel */}
        <div className="auth-brand">
          <div className="auth-logo-wrapper">
            <img src="/ptit-logo.png" alt="Logo PTIT" />
          </div>
          <div className="auth-brand-text">
            <h1>Học viện Công nghệ Bưu chính Viễn thông</h1>
            <p>Posts and Telecommunications Institute of Technology</p>
          </div>
          <div className="auth-brand-badge">PTIT Online Exam System</div>
        </div>

        {/* Form Panel */}
        <div className="auth-form-panel">
          {/* Tabs */}
          <div className="auth-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'login'}
              className={`auth-tab${activeTab === 'login' ? ' active' : ''}`}
              onClick={() => setActiveTab('login')}
              id="tab-login"
            >
              Đăng nhập
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'register'}
              className={`auth-tab${activeTab === 'register' ? ' active' : ''}`}
              onClick={() => setActiveTab('register')}
              id="tab-register"
            >
              Đăng ký
            </button>
          </div>

          {/* Tab Panels */}
          {activeTab === 'login' ? (
            <LoginForm onSwitchToRegister={() => setActiveTab('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setActiveTab('login')} />
          )}
        </div>
      </div>
    </div>
  );
}
