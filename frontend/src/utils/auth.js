const USERS_KEY = 'ptit_users';
const SESSION_KEY = 'ptit_current_user';

// ── Hardcoded admin account (never stored in localStorage) ─────────────────────
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin@ltw2026',
  role: 'admin',
  id: 'admin-builtin',
  email: 'admin@ptit.edu.vn',
};

// ──────────────────────────────────────────────
// VALIDATION HELPERS
// ──────────────────────────────────────────────

/**
 * Validate username:
 *  - Không rỗng
 *  - 4–30 ký tự
 *  - Chỉ chứa chữ, số, dấu gạch dưới
 */
export function validateUsername(username) {
  if (!username || username.trim() === '') {
    return 'Tên đăng nhập không được để trống.';
  }
  const trimmed = username.trim();
  if (trimmed.length < 4) {
    return 'Tên đăng nhập phải có ít nhất 4 ký tự.';
  }
  if (trimmed.length > 30) {
    return 'Tên đăng nhập không được vượt quá 30 ký tự.';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới (_).';
  }
  return null; // hợp lệ
}

/**
 * Validate email:
 *  - Không rỗng
 *  - Đúng định dạng email
 */
export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return 'Email không được để trống.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Email không hợp lệ.';
  }
  return null;
}

/**
 * Validate password:
 *  - Không rỗng
 *  - Ít nhất 6 ký tự
 *  - Ít nhất 1 chữ cái và 1 chữ số
 */
export function validatePassword(password) {
  if (!password || password === '') {
    return 'Mật khẩu không được để trống.';
  }
  if (password.length < 6) {
    return 'Mật khẩu phải có ít nhất 6 ký tự.';
  }
  if (!/[a-zA-Z]/.test(password)) {
    return 'Mật khẩu phải chứa ít nhất một chữ cái.';
  }
  if (!/[0-9]/.test(password)) {
    return 'Mật khẩu phải chứa ít nhất một chữ số.';
  }
  return null;
}

/**
 * Validate confirm password
 */
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword || confirmPassword === '') {
    return 'Vui lòng xác nhận mật khẩu.';
  }
  if (password !== confirmPassword) {
    return 'Xác nhận mật khẩu không khớp.';
  }
  return null;
}

// ──────────────────────────────────────────────
// STORAGE HELPERS
// ──────────────────────────────────────────────

/** Lấy danh sách users từ localStorage */
export function getUsers() {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/** Lưu danh sách users vào localStorage */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ──────────────────────────────────────────────
// AUTH OPERATIONS
// ──────────────────────────────────────────────

/**
 * Đăng ký user mới.
 * @returns {{ success: boolean, errors: object }}
 */
export function register({ username, email, password, confirmPassword }) {
  const errors = {};

  const usernameErr = validateUsername(username);
  if (usernameErr) errors.username = usernameErr;

  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;

  const passwordErr = validatePassword(password);
  if (passwordErr) errors.password = passwordErr;

  const confirmErr = validateConfirmPassword(password, confirmPassword);
  if (confirmErr) errors.confirmPassword = confirmErr;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const users = getUsers();

  // Kiểm tra username đã tồn tại
  const usernameExists = users.some(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase()
  );
  if (usernameExists) {
    return { success: false, errors: { username: 'Tên đăng nhập đã được sử dụng.' } };
  }

  // Kiểm tra email đã tồn tại
  const emailExists = users.some(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (emailExists) {
    return { success: false, errors: { email: 'Email này đã được đăng ký.' } };
  }

  const newUser = {
    id: Date.now().toString(),
    username: username.trim(),
    email: email.trim().toLowerCase(),
    password, // NOTE: plain text – chỉ dùng cho demo/học tập
    createdAt: new Date().toISOString(),
    role: 'student',
  };

  saveUsers([...users, newUser]);
  return { success: true, errors: {} };
}

/**
 * Đăng nhập.
 * @returns {{ success: boolean, user?: object, errors?: object }}
 */
export function login({ username, password }) {
  const errors = {};

  if (!username || username.trim() === '') {
    errors.username = 'Vui lòng nhập tên đăng nhập.';
  }
  if (!password || password === '') {
    errors.password = 'Vui lòng nhập mật khẩu.';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // ── Kiểm tra admin cứng trước ───────────────────────────────────────────
  if (
    username.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const sessionUser = {
      id: ADMIN_CREDENTIALS.id,
      username: ADMIN_CREDENTIALS.username,
      email: ADMIN_CREDENTIALS.email,
      role: ADMIN_CREDENTIALS.role,
    };
    setCurrentUser(sessionUser);
    return { success: true, user: sessionUser };
  }

  // ── Kiểm tra users trong localStorage ─────────────────────────────────
  const users = getUsers();
  const user = users.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password
  );

  if (!user) {
    return {
      success: false,
      errors: { general: 'Tên đăng nhập hoặc mật khẩu không đúng.' },
    };
  }

  // Lưu session (không lưu password vào session)
  const sessionUser = { id: user.id, username: user.username, email: user.email, role: user.role };
  setCurrentUser(sessionUser);
  return { success: true, user: sessionUser };
}

/** Lưu user hiện tại vào session */
export function setCurrentUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

/** Lấy user hiện tại đang đăng nhập */
export function getCurrentUser() {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/** Đăng xuất */
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

/** Kiểm tra đã đăng nhập chưa */
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

/**
 * Cập nhật thông tin profile của user hiện tại.
 * @param {{ fullName?: string, email?: string, avatar?: string }} updates
 * @returns {{ success: boolean, error?: string }}
 */
export function updateUserProfile(updates) {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, error: 'Chưa đăng nhập.' };

  // Nếu là admin thì chỉ cập nhật session
  if (currentUser.role === 'admin') {
    const updatedSession = { ...currentUser, ...updates };
    setCurrentUser(updatedSession);
    return { success: true };
  }

  // Cập nhật trong danh sách users
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === currentUser.id);
  if (idx === -1) return { success: false, error: 'Không tìm thấy user.' };

  // Validate email nếu thay đổi
  if (updates.email && updates.email !== users[idx].email) {
    const emailErr = validateEmail(updates.email);
    if (emailErr) return { success: false, error: emailErr };

    const emailExists = users.some(
      (u, i) => i !== idx && u.email.toLowerCase() === updates.email.trim().toLowerCase()
    );
    if (emailExists) return { success: false, error: 'Email này đã được sử dụng.' };
  }

  // Cập nhật user
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);

  // Cập nhật session
  const updatedSession = {
    ...currentUser,
    ...updates,
  };
  setCurrentUser(updatedSession);
  return { success: true };
}

/**
 * Lấy avatar URL của user hiện tại.
 * @returns {string|null}
 */
export function getUserAvatar() {
  const user = getCurrentUser();
  return user?.avatar || null;
}
