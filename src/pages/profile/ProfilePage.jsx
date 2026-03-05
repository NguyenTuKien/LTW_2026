import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserAvatar, updateUserProfile } from '../../utils/auth';
import '../../styles/profilePage.css';

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

const IconCamera = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconSave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const IconUser = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

// ─── Profile Page ──────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const fileInputRef = useRef(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarData, setAvatarData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  // Load current data
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      const avatar = getUserAvatar();
      if (avatar) setAvatarPreview(avatar);
    }
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Vui lòng chọn file ảnh (jpg, png, gif...)' });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Kích thước ảnh tối đa là 2MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setAvatarPreview(base64);
      setAvatarData(base64);
      setMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaving(true);
    setMessage(null);

    const updates = {};
    if (email.trim()) updates.email = email.trim();
    if (fullName.trim()) updates.fullName = fullName.trim();
    if (avatarData) updates.avatar = avatarData;

    const result = updateUserProfile(updates);

    setTimeout(() => {
      setSaving(false);
      if (result.success) {
        setMessage({ type: 'success', text: 'Cập nhật thành công!' });
        setAvatarData(null); // Reset pending avatar
      } else {
        setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra.' });
      }
    }, 400);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const username = user.username || 'Student';

  return (
    <div className="pp-root">
      {/* Header */}
      <header className="pp-header">
        <div className="pp-header-inner">
          <div className="pp-header-brand">
            <Logo />
            <span className="pp-brand-name">Hệ thống thi trực tuyến PTIT</span>
          </div>
          <button className="pp-back-btn" onClick={() => navigate('/student')}>
            <IconArrowLeft /> Quay lại
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="pp-main">
        <div className="pp-card animate-in">
          <h1 className="pp-title">Thông tin cá nhân</h1>
          <p className="pp-subtitle">Quản lý thông tin hồ sơ của bạn</p>

          {/* Avatar */}
          <div className="pp-avatar-section">
            <div className="pp-avatar-wrap" onClick={handleAvatarClick} title="Nhấn để thay đổi ảnh đại diện">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="pp-avatar-img" />
              ) : (
                <div className="pp-avatar-placeholder">
                  <IconUser />
                </div>
              )}
              <div className="pp-avatar-overlay">
                <IconCamera />
                <span>Đổi ảnh</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="pp-file-input"
              onChange={handleFileChange}
            />
            <p className="pp-avatar-hint">Nhấn vào ảnh để thay đổi • Tối đa 2MB</p>
          </div>

          {/* Form */}
          <div className="pp-form">
            <div className="pp-field">
              <label className="pp-label">Tên đăng nhập</label>
              <input
                className="pp-input pp-input--readonly"
                type="text"
                value={username}
                readOnly
                tabIndex={-1}
              />
              <span className="pp-field-note">Không thể thay đổi tên đăng nhập</span>
            </div>

            <div className="pp-field">
              <label className="pp-label">Họ và tên</label>
              <input
                className="pp-input"
                type="text"
                placeholder="Nhập họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="pp-field">
              <label className="pp-label">Email</label>
              <input
                className="pp-input"
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`pp-message pp-message--${message.type}`}>
              {message.text}
            </div>
          )}

          {/* Actions */}
          <div className="pp-actions">
            <button className="pp-btn pp-btn--secondary" onClick={() => navigate('/student')}>
              Hủy
            </button>
            <button className="pp-btn pp-btn--primary" onClick={handleSave} disabled={saving}>
              {saving ? (
                <span className="pp-spinner" />
              ) : (
                <IconSave />
              )}
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
