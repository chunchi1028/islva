const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 處理輸入變更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 清除相關錯誤
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 表單驗證
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "請輸入電子郵件";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "請輸入有效的電子郵件格式";
    }

    if (!formData.password) {
      newErrors.password = "請輸入密碼";
    } else if (formData.password.length < 6) {
      newErrors.password = "密碼長度至少需要6個字元";
    }

    return newErrors;
  };

  // 處理登入提交
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // 模擬 API 請求
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setShowSuccess(true);

      // 模擬跳轉
      setTimeout(() => {
        alert("登入成功！跳轉到首頁...");
        setShowSuccess(false);
        setFormData({ email: "", password: "" });
      }, 1500);
    } catch (error) {
      setErrors({ general: "登入失敗，請檢查您的帳號密碼" });
    } finally {
      setIsLoading(false);
    }
  };

  // 處理社群登入
  const handleSocialLogin = (provider) => {
    alert(`使用 ${provider} 登入功能（示範用）`);
  };

  return (
    <div className={`login-container ${isLoading ? "loading" : ""}`}>
      <div className="logo">
        <h1>歡迎回來</h1>
        <p>請登入您的帳戶</p>
      </div>

      {showSuccess && (
        <div className="success-message">登入成功！正在為您跳轉...</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">電子郵件</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="請輸入您的電子郵件"
            className={errors.email ? "error" : ""}
            disabled={isLoading}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="請輸入您的密碼"
            className={errors.password ? "error" : ""}
            disabled={isLoading}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        {errors.general && (
          <div className="error-message" style={{ marginBottom: "1rem" }}>
            {errors.general}
          </div>
        )}

        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            記住我
          </label>
          <a href="#" className="forgot-password">
            忘記密碼？
          </a>
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "登入中..." : "登入"}
        </button>
      </form>

      <div className="divider">
        <span>或</span>
      </div>

      <div className="social-login">
        <button
          type="button"
          className="google"
          onClick={() => handleSocialLogin("Google")}
          disabled={isLoading}
        >
          Google 登入
        </button>
        <button
          type="button"
          className="facebook"
          onClick={() => handleSocialLogin("Facebook")}
          disabled={isLoading}
        >
          Facebook 登入
        </button>
      </div>

      <div className="register-link">
        還沒有帳戶？ <a href="#">立即註冊</a>
      </div>
    </div>
  );
};
