import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Chrome,
  Facebook,
  Check,
} from "lucide-react";

const MemberRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    subscribeNewsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // 密碼強度檢測
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  // 表單驗證
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    // 用戶名驗證
    if (!formData.username || formData.username.length < 2) {
      newErrors.username = "用戶名至少需要2個字元";
    }

    // 電子郵件驗證
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "請輸入有效的電子郵件地址";
    }

    // 手機號碼驗證
    if (!formData.phone || !validatePhone(formData.phone)) {
      newErrors.phone = "請輸入有效的手機號碼 (09xxxxxxxx)";
    }

    // 密碼驗證
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "密碼長度至少需要8個字元";
    } else if (passwordStrength < 3) {
      newErrors.password = "密碼強度不足，請包含大小寫字母、數字";
    }

    // 確認密碼驗證
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "密碼確認不一致";
    }

    // 同意條款驗證
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "請閱讀並同意使用條款";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理輸入變化
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // 密碼強度檢測
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // 清除錯誤訊息
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 處理表單提交
  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // 模擬 API 請求
    setTimeout(() => {
      console.log("註冊資料:", formData);
      setShowSuccess(true);

      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(false);
        alert("註冊成功！請檢查您的電子郵件完成驗證");
      }, 2000);
    }, 1500);
  };

  // 社群註冊
  const handleSocialRegister = (provider) => {
    alert(`準備使用 ${provider} 註冊（此為示範功能）`);
  };

  // 密碼強度顯示
  const getPasswordStrengthText = () => {
    const strengthTexts = ["很弱", "弱", "普通", "強", "很強"];
    return strengthTexts[passwordStrength] || "很弱";
  };

  const getPasswordStrengthColor = () => {
    const colors = ["#e74c3c", "#e67e22", "#f1c40f", "#27ae60", "#2ecc71"];
    return colors[passwordStrength] || "#e74c3c";
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <header className="register-header">
          <h1>會員註冊</h1>
          <p>加入我們，開始您的精彩旅程！</p>
        </header>

        <div className="register-form">
          <div className="form-group">
            <label htmlFor="username">用戶名</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`form-input ${
                  errors.username ? "form-input--error" : ""
                }`}
                placeholder="請輸入用戶名"
              />
            </div>
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">電子郵件</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${
                  errors.email ? "form-input--error" : ""
                }`}
                placeholder="請輸入您的電子郵件"
              />
            </div>
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">手機號碼</label>
            <div className="input-wrapper">
              <Phone className="input-icon" size={20} />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-input ${
                  errors.phone ? "form-input--error" : ""
                }`}
                placeholder="0912345678"
              />
            </div>
            {errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${
                  errors.password ? "form-input--error" : ""
                }`}
                placeholder="請輸入密碼"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(passwordStrength / 5) * 100}%`,
                      backgroundColor: getPasswordStrengthColor(),
                    }}
                  ></div>
                </div>
                <span
                  className="strength-text"
                  style={{ color: getPasswordStrengthColor() }}
                >
                  密碼強度：{getPasswordStrengthText()}
                </span>
              </div>
            )}
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">確認密碼</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`form-input ${
                  errors.confirmPassword ? "form-input--error" : ""
                }`}
                placeholder="請再次輸入密碼"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="form-options">
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <label htmlFor="agreeTerms" className="checkbox-label">
                  我已閱讀並同意{" "}
                  <a href="#" className="terms-link">
                    使用條款
                  </a>{" "}
                  和{" "}
                  <a href="#" className="terms-link">
                    隱私政策
                  </a>
                </label>
              </div>
              {errors.agreeTerms && (
                <div className="error-message">{errors.agreeTerms}</div>
              )}

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <label htmlFor="subscribeNewsletter" className="checkbox-label">
                  訂閱電子報以獲取最新資訊（可選）
                </label>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`register-btn ${
              isLoading ? "register-btn--loading" : ""
            }`}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "註冊中..." : "註冊"}
          </button>

          {showSuccess && (
            <div className="success-message">
              <Check size={20} />
              註冊成功！請檢查您的電子郵件完成驗證
            </div>
          )}
        </div>

        <div className="divider">
          <span>或使用以下方式註冊</span>
        </div>

        <div className="social-register">
          <button
            className="social-btn social-btn--google"
            onClick={() => handleSocialRegister("Google")}
          >
            <Chrome size={20} />
            <span>Google</span>
          </button>
          <button
            className="social-btn social-btn--facebook"
            onClick={() => handleSocialRegister("Facebook")}
          >
            <Facebook size={20} />
            <span>Facebook</span>
          </button>
        </div>

        <div className="login-section">
          已經有帳戶了？{" "}
          <a href="#" className="login-link">
            立即登入
          </a>
        </div>
      </div>
    </div>
  );
};
export default MemberRegister;
