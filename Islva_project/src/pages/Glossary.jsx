import { useState } from "react";

const Glossary = () => {
  // 使用 useState 來管理當前被選中的 tab
  const [activeTab, setActiveTab] = useState("材質");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    return (
      <div>
        {/* 主視覺 */}
        <div className="content-container">
          <div className="text-card">
            <img src={bookImage} alt="一本打開的書" className="card-image" />
            <div className="card-text">
              <h2>材質詞典</h2>
              <p>
                在這充滿豐富材質的世界，我們精心挑選每一件獨特的材料，
                以其非凡的質感、持久的耐用性，為您呈現獨一無二的體驗。
              </p>
              <p>
                無論是溫潤的木質、堅韌的金屬，或是柔軟的紡織品，
                每一種材質都擁有自己的故事，承載著工匠的匠心與堅持。
              </p>
              <button className="learn-more">Learn more</button>
            </div>
          </div>
          <div className="glossary-title">
            <span className="title-text">Glossary</span>
          </div>
        </div>
        {/* 按鈕區 */}
        <div className="tabs-container">
          <button
            className={`tab-button ${activeTab === "材質" ? "active" : ""}`}
            onClick={() => handleTabClick("材質")}
          >
            材質
          </button>
          <button
            className={`tab-button ${activeTab === "工藝" ? "active" : ""}`}
            onClick={() => handleTabClick("工藝")}
          >
            工藝
          </button>
          <button
            className={`tab-button ${activeTab === "表面效果" ? "active" : ""}`}
            onClick={() => handleTabClick("表面效果")}
          >
            表面效果
          </button>
          <button
            className={`tab-button ${activeTab === "保養方式" ? "active" : ""}`}
            onClick={() => handleTabClick("保養方式")}
          >
            保養方式
          </button>
        </div>
      </div>
    );
  };
};

export default Glossary;
