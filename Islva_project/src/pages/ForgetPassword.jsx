import React, { useState } from "react";
import {
  Mail,
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState("email"); // 'email', 'sent', 'reset'
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    verificationCode: "",
  });

  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [countdown, setCountdown] = useState(0);

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

  const validateEmailStep = () => {
    const newErrors = {};
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "請輸入有效的電子郵件地址";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetStep = () => {
    const newErrors = {};

    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      newErrors.verificationCode = "請輸入6位數驗證碼";
    }

    if (!formData.newPassword || formData.newPassword.length < 8) {
      newErrors.newPassword = "密碼長度至少需要8個字元";
    } else if (passwordStrength < 3) {
      newErrors.newPassword = "密碼強度不足，請包含大小寫字母、數字";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "密碼確認不一致";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理輸入變化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 密碼強度檢測
    if (name === "newPassword") {
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

  // 發送重設郵件
  const handleSendEmail = async () => {
    if (!validateEmailStep()) return;

    setIsLoading(true);

    // 模擬 API 請求
    setTimeout(() => {
      console.log("發送重設郵件到:", formData.email);
      setCurrentStep("sent");
      setIsLoading(false);
      startCountdown();
    }, 1500);
  };

  // 重設密碼
  const handleResetPassword = async () => {
    if (!validateResetStep()) return;

    setIsLoading(true);

    // 模擬 API 請求
    setTimeout(() => {
      console.log("重設密碼資料:", {
        email: formData.email,
        code: formData.verificationCode,
        newPassword: formData.newPassword,
      });
      setIsLoading(false);
      alert("密碼重設成功！請使用新密碼登入");
      // 這裡通常會跳轉到登入頁面
    }, 1500);
  };

  // 重新發送郵件倒數計時
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 重新發送郵件
  const handleResendEmail = () => {
    if (countdown > 0) return;
    handleSendEmail();
  };

  // 返回上一步
  const goBack = () => {
    if (currentStep === "sent") {
      setCurrentStep("email");
    } else if (currentStep === "reset") {
      setCurrentStep("sent");
    }
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

  // 渲染郵件發送步驟
  const renderEmailStep = () => (
    <>
      <div className="forgot-header">
        <AlertCircle className="header-icon" size={48} />
        <h1>忘記密碼？</h1>
        <p>輸入您的電子郵件地址，我們將發送重設密碼的連結給您</p>
      </div>

      <div className="forgot-form">
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
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <button
          type="button"
          className={`action-btn ${isLoading ? "action-btn--loading" : ""}`}
          disabled={isLoading}
          onClick={handleSendEmail}
        >
          <Send size={20} />
          {isLoading ? "發送中..." : "發送重設郵件"}
        </button>
      </div>
    </>
  );

  // 渲染郵件已發送步驟
  const renderSentStep = () => (
    <>
      <div className="forgot-header">
        <CheckCircle className="header-icon success" size={48} />
        <h1>郵件已發送！</h1>
        <p>
          我們已發送重設密碼的連結到 <strong>{formData.email}</strong>
        </p>
        <p className="sub-text">請檢查您的收件匣和垃圾郵件資料夾</p>
      </div>

      <div className="forgot-form">
        <div className="info-box">
          <div className="info-content">
            <h3>收不到郵件？</h3>
            <ul>
              <li>檢查垃圾郵件資料夾</li>
              <li>確認電子郵件地址正確</li>
              <li>等待幾分鐘後再試</li>
            </ul>
          </div>
        </div>

        <button
          type="button"
          className={`action-btn secondary ${
            countdown > 0 ? "action-btn--disabled" : ""
          }`}
          disabled={countdown > 0}
          onClick={handleResendEmail}
        >
          {countdown > 0 ? `重新發送 (${countdown}s)` : "重新發送郵件"}
        </button>

        <button
          type="button"
          className="action-btn"
          onClick={() => setCurrentStep("reset")}
        >
          我已收到驗證碼
        </button>
      </div>
    </>
  );

  // 渲染重設密碼步驟
  const renderResetStep = () => (
    <>
      <div className="forgot-header">
        <Lock className="header-icon" size={48} />
        <h1>重設密碼</h1>
        <p>輸入驗證碼和您的新密碼</p>
      </div>

      <div className="forgot-form">
        <div className="form-group">
          <label htmlFor="verificationCode">驗證碼</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleInputChange}
              className={`form-input code-input ${
                errors.verificationCode ? "form-input--error" : ""
              }`}
              placeholder="請輸入6位數驗證碼"
              maxLength="6"
            />
          </div>
          {errors.verificationCode && (
            <div className="error-message">{errors.verificationCode}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">新密碼</label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`form-input ${
                errors.newPassword ? "form-input--error" : ""
              }`}
              placeholder="請輸入新密碼"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formData.newPassword && (
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
          {errors.newPassword && (
            <div className="error-message">{errors.newPassword}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">確認新密碼</label>
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
              placeholder="請再次輸入新密碼"
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

        <button
          type="button"
          className={`action-btn ${isLoading ? "action-btn--loading" : ""}`}
          disabled={isLoading}
          onClick={handleResetPassword}
        >
          {isLoading ? "重設中..." : "重設密碼"}
        </button>
      </div>
    </>
  );

  return (
    <div className="forgot-password-page">
      <div className="forgot-container">
        {currentStep !== "email" && (
          <button className="back-btn" onClick={goBack}>
            <ArrowLeft size={20} />
            返回
          </button>
        )}

        {currentStep === "email" && renderEmailStep()}
        {currentStep === "sent" && renderSentStep()}
        {currentStep === "reset" && renderResetStep()}

        <div className="login-section">
          記起密碼了？{" "}
          <a href="#" className="login-link">
            立即登入
          </a>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
