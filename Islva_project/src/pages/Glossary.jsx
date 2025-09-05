import { useState } from "react";



// 定義不同分頁的內容
const tabContent = {
  "材質": {
    title: "材質詞典",
    text: (
      <>
        <p>
          在這充滿豐富材質的世界，我們精心挑選每一件獨特的材料，
          以其非凡的質感、持久的耐用性，為您呈現獨一無二的體驗。
        </p>
        <p>
          無論是溫潤的木質、堅韌的金屬，或是柔軟的紡織品，
          每一種材質都擁有自己的故事，承載著工匠的匠心與堅持。
        </p>
      </>
    ),
  },
  "工藝": {
    title: "工藝技術",
    text: (
      <>
        <p>
          工藝不僅是技術的展現，更是藝術與靈魂的結合。
          從傳統的手工雕刻到現代的雷射切割，我們精通多種工藝。
        </p>
        <p>
          每道工序都經過嚴格把關，確保每一件作品都達到最高的品質標準。
        </p>
      </>
    ),
  },
  "表面效果": {
    title: "表面效果",
    text: (
      <>
        <p>
          表面效果賦予產品獨特的風格與個性。無論是光滑的拋光、
          低調的霧面，或是復古的仿舊處理，都能讓您的作品與眾不同。
        </p>
        <p>
          我們提供多樣化的表面處理選項，滿足您對美學的無限想像。
        </p>
      </>
    ),
  },
  "保養方式": {
    title: "保養方式",
    text: (
      <>
        <p>
          正確的保養能讓您的產品歷久彌新。我們提供詳細的保養指南，
          幫助您了解如何清潔、存放與維護您的珍貴物品。
        </p>
        <p>
          從此，您不僅是產品的擁有者，更是其美麗的守護者。
        </p>
      </>
    ),
  },
};

const Glossary = () => {
  // 使用 useState 來管理當前被選中的 tab
  const [activeTab, setActiveTab] = useState("材質");

  // 這是一個單純的事件處理函式，只負責更新狀態
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  // 根據 activeTab 選擇要顯示的內容
  const currentContent = tabContent[activeTab];

  // 元件函式必須回傳 JSX
  return (
    <div className="glossary-container">
      {/* 主要內容區塊 */}
      <div className="content-container">
        <div className="text-card">
          <img src="#" alt="一本打開的書" className="card-image" />
          <div className="card-text">
            <h2>{currentContent.title}</h2>
            {currentContent.text}
            <button className="learn-more">Learn more</button>
          </div>
        </div>
        <div className="glossary-title">
          <span className="title-text">Glossary</span>
        </div>
      </div>
      
      {/* 按鈕區 */}
      <div className="tabs-container">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab} // 每個列表項目都應該有一個獨特的 key
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Glossary;
