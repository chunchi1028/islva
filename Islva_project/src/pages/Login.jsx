import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Chrome, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const MemberLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 表單驗證
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "請輸入有效的電子郵件地址";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "密碼長度至少需要6個字元";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理輸入變化
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

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
      console.log("登入資料:", formData);
      setShowSuccess(true);

      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(false);
        alert("登入成功！（這裡應該跳轉到會員頁面）");
      }, 1500);
    }, 1000);
  };

  // 社群登入
  const handleSocialLogin = (provider) => {
    alert(`準備使用 ${provider} 登入（此為示範功能）`);
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <header className="login-header">
          <h1>會員登入</h1>
          <p>歡迎回來！請登入您的帳戶</p>
        </header>

        <div className="login-form">
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
                placeholder="請輸入您的密碼"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
                className="checkbox-input"
              />
              <label htmlFor="remember" className="checkbox-label">
                記住我
              </label>
            </div>
            <Link to="/forgetPassord" className="forgot-link">
              忘記密碼？
            </Link>
          </div>
          <Link to="/member">
            <button
              type="button"
              className={`login-btn ${isLoading ? "login-btn--loading" : ""}`}
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "登入中..." : "登入"}
            </button>
          </Link>

          {showSuccess && (
            <div className="success-message">登入成功！正在跳轉...</div>
          )}
        </div>

        <div className="divider">
          <span>或使用以下方式登入</span>
        </div>

        <div className="social-login">
          <button
            className="social-btn social-btn--google"
            onClick={() => handleSocialLogin("Google")}
          >
            <Chrome size={20} />
            <span>Google</span>
          </button>
          <button
            className="social-btn social-btn--facebook"
            onClick={() => handleSocialLogin("Facebook")}
          >
            <Facebook size={20} />
            <span>Facebook</span>
          </button>
        </div>

        <div className="register-section">
          還沒有帳戶？{" "}
          <Link to="/register" className="register-link">
            立即註冊
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MemberLogin;
