import { useState } from "react";
import Carousel from "../component/Carousel";
import cardData from "../data/cardData";

// 定義不同分頁的內容
const tabContent = {
  材質: {
    title: "材質詞典",
    text: (
      <>
        <p>
          從材質開始，感受飾品的靈魂。
          <br />
          每一件 ISLVA 的作品，都始於對材質的精挑細選。
          <br />
          金屬的成色、寶石的切割、琺瑯的光澤——它們不只是外觀，更承載著觸感、重量與故事。
          <br />
          在這裡，我們揭開原料的秘密，讓你了解每種材質的特性與魅力。
        </p>
      </>
    ),
  },
  工藝: {
    title: "工藝技術",
    text: (
      <>
        <p>
          雙手賦予材質靈魂，工藝讓它們永恆。
          <br />
          在島嶼的光影之間，匠人的手不只是創作工具，而是情感與記憶的延伸。
          <br />
          每一道敲擊、每一次焊接，都在金屬與寶石之間留下時間的印記。
          <br />
          這裡記錄了 ISLVA 對工藝的執著與細節。
        </p>
      </>
    ),
  },
  表面效果: {
    title: "表面效果",
    text: (
      <>
        <p>
          質感的最後一筆，決定了飾品的表情。
          <br />
          霧面低語、鏡面閃耀、錘紋律動—不同的表面效果，塑造了同一件飾品截然不同的氛圍。
          <br />
          透過這些細節，材質的個性被放大，也更貼近佩戴者的風格。
        </p>
      </>
    ),
  },
  保養方式: {
    title: "保養方式",
    text: (
      <>
        <p>
          佩戴之外，還有延續與傳承。 <br />
          飾品的價值，不止於當下的光澤，還有它與時間共同留下的痕跡。
          <br />
          在這裡，你會找到日常保養的秘訣、材質隨歲月變化的美，以及那些隱藏在工藝背後的文化與故事。
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
      <div>
        <Carousel cards={cardData} />
      </div>
    </div>
  );
};

export default Glossary;
