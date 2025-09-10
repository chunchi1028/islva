import React, { useState } from "react";
import {
  User,
  Package,
  MapPin,
  Shield,
  Gift,
  Heart,
  Star,
  ChevronRight,
  Settings,
  CreditCard,
  Clock,
  Award,
  Eye,
  ShoppingBag,
} from "lucide-react";

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // 模擬用戶資料
  const userData = {
    name: "張小明",
    email: "zhang@example.com",
    memberLevel: "黃金會員",
    points: 2580,
    avatar: "/api/placeholder/80/80",
  };

  // 側邊欄選單項目
  const menuItems = [
    {
      id: "dashboard",
      title: "會員儀表板",
      icon: <User className="menu-icon" />,
      items: [{ id: "overview", title: "總覽頁面" }],
    },
    {
      id: "profile",
      title: "個人檔案管理",
      icon: <User className="menu-icon" />,
      items: [
        { id: "edit-profile", title: "修改個人檔案" },
        { id: "profile-detail", title: "檔案頁數" },
      ],
    },
    {
      id: "orders",
      title: "訂單管理",
      icon: <Package className="menu-icon" />,
      items: [
        { id: "order-list", title: "訂單清單" },
        { id: "order-detail", title: "訂單詳情" },
      ],
    },
    {
      id: "address",
      title: "地址管理",
      icon: <MapPin className="menu-icon" />,
      items: [
        { id: "address-manage", title: "收件地址管理" },
        { id: "default-address", title: "預設位址設定" },
      ],
    },
    {
      id: "security",
      title: "安全設定",
      icon: <Shield className="menu-icon" />,
      items: [
        { id: "password", title: "密碼管理" },
        { id: "login-history", title: "登入記錄" },
      ],
    },
    {
      id: "benefits",
      title: "優惠福利",
      icon: <Gift className="menu-icon" />,
      featured: true,
      items: [
        { id: "coupons", title: "優惠券中心" },
        { id: "points", title: "積分系統" },
        { id: "member-level", title: "會員等級" },
        { id: "exclusive-events", title: "專屬活動" },
      ],
    },
    {
      id: "favorites",
      title: "收藏與關注",
      icon: <Heart className="menu-icon" />,
      featured: true,
      items: [
        { id: "product-favorites", title: "商品收藏" },
        { id: "store-follow", title: "店鋪關注" },
        { id: "browse-history", title: "瀏覽歷史" },
        { id: "wishlist", title: "願望清單" },
      ],
    },
  ];

  const renderDashboardOverview = () => (
    <div className="overview-content">
      <div className="welcome-section">
        <div className="user-info">
          <div className="avatar">
            <img src={userData.avatar} alt="用戶頭像" />
          </div>
          <div className="user-details">
            <h2>歡迎回來，{userData.name}</h2>
            <p className="member-level">{userData.memberLevel}</p>
            <p className="email">{userData.email}</p>
          </div>
        </div>
        <div className="quick-stats">
          <div className="stat-card">
            <Star className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{userData.points}</span>
              <span className="stat-label">積分餘額</span>
            </div>
          </div>
          <div className="stat-card">
            <Package className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">8</span>
              <span className="stat-label">待處理訂單</span>
            </div>
          </div>
          <div className="stat-card">
            <Gift className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">5</span>
              <span className="stat-label">可用優惠券</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>快速操作</h3>
        <div className="action-grid">
          <div className="action-card" onClick={() => setActiveTab("orders")}>
            <Package className="action-icon" />
            <span>查看訂單</span>
            <ChevronRight className="chevron" />
          </div>
          <div className="action-card" onClick={() => setActiveTab("profile")}>
            <User className="action-icon" />
            <span>編輯資料</span>
            <ChevronRight className="chevron" />
          </div>
          <div className="action-card" onClick={() => setActiveTab("benefits")}>
            <Gift className="action-icon" />
            <span>優惠福利</span>
            <ChevronRight className="chevron" />
          </div>
          <div
            className="action-card"
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="action-icon" />
            <span>我的收藏</span>
            <ChevronRight className="chevron" />
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h3>最近活動</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <Package />
            </div>
            <div className="activity-content">
              <p>訂單 #2024090801 已發貨</p>
              <span className="activity-time">2 小時前</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Star />
            </div>
            <div className="activity-content">
              <p>獲得 50 積分</p>
              <span className="activity-time">1 天前</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Gift />
            </div>
            <div className="activity-content">
              <p>領取了生日優惠券</p>
              <span className="activity-time">3 天前</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGenericContent = (title, description) => (
    <div className="generic-content">
      <div className="content-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="content-placeholder">
        <div className="placeholder-icon">
          <Settings />
        </div>
        <p>此功能正在開發中，敬請期待...</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
      case "overview":
        return renderDashboardOverview();
      case "edit-profile":
        return renderGenericContent(
          "修改個人檔案",
          "編輯您的基本資料和個人資訊"
        );
      case "profile-detail":
        return renderGenericContent("檔案頁數", "查看完整的個人資訊");
      case "order-list":
        return renderGenericContent("訂單清單", "瀏覽您的歷史訂單和狀態");
      case "order-detail":
        return renderGenericContent("訂單詳情", "查看詳細訂單資訊和物流追踪");
      case "address-manage":
        return renderGenericContent(
          "收件地址管理",
          "新增、編輯或刪除您的收件地址"
        );
      case "default-address":
        return renderGenericContent("預設位址設定", "設定常用的預設地址");
      case "password":
        return renderGenericContent("密碼管理", "修改密碼和安全驗證設定");
      case "login-history":
        return renderGenericContent("登入記錄", "查看帳號的登入安全記錄");
      case "coupons":
        return renderGenericContent(
          "優惠券中心",
          "管理您的優惠券：可用/已使用/已過期"
        );
      case "points":
        return renderGenericContent("積分系統", "查看積分累計和兌換記錄");
      case "member-level":
        return renderGenericContent("會員等級", "了解等級權益和升等條件");
      case "exclusive-events":
        return renderGenericContent("專屬活動", "參與會員限定的優惠活動");
      case "product-favorites":
        return renderGenericContent("商品收藏", "管理收藏的商品和分類整理");
      case "store-follow":
        return renderGenericContent("店鋪關注", "查看關注的店鋪和動態通知");
      case "browse-history":
        return renderGenericContent("瀏覽歷史", "查看最近瀏覽的商品記錄");
      case "wishlist":
        return renderGenericContent("願望清單", "管理您的待購商品清單");
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <div className="member-dashboard">
      <div className="dashboard-container">
        {/* 側邊欄 */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1>會員中心</h1>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((section) => (
              <div key={section.id} className="nav-section">
                <div
                  className={`section-header ${
                    activeTab === section.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(section.id)}
                >
                  {section.icon}
                  <span>{section.title}</span>
                  {section.featured && <Star className="featured-icon" />}
                </div>

                <div className="section-items">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className={`nav-item ${
                        activeTab === item.id ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* 主內容區 */}
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
};
export default MemberDashboard;
