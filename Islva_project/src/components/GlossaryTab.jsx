import { useState } from "react";

const TABS = [
  {
    key: "material",
    label: "材質",
    title: "材質 Material",
    desc: "從材質開始，感受飾品的靈魂。每一件 ISLVA 的作品，都始於對材質的精挑細選。金屬的成色、寶石的切割、琺瑯的光澤——它們不只是外觀，更承載著觸感、重量與故事。在這裡，我們揭開原料的秘密，讓你了解每種材質的特性與魅力。",
    img: "/images/glossary/material.jpg",
  },
  {
    key: "finish",
    label: "表面效果",
    title: "表面效果 Finish",
    desc: "質感的最後一筆，決定了飾品的表情。霧面低語、鏡面閃耀、錘紋律動—不同的表面效果，塑造了同一件飾品截然不同的氛圍。透過這些細節，材質的個性被放大，也更貼近佩戴者的風格。",
    img: "/images/glossary/finish.jpg",
  },
  {
    key: "craft",
    label: "工藝",
    title: "工藝 Craft",
    desc: "雙手賦予材質靈魂，工藝讓它們永恆。在島嶼的光影之間，匠人的手不只是創作工具，而是情感與記憶的延伸。每一道敲擊、每一次焊接，都在金屬與寶石之間留下時間的印記。這裡記錄了 ISLVA 對工藝的執著與細節。",
    img: "/images/glossary/craft.jpg",
  },
  {
    key: "care",
    label: "保養方式",
    title: "保養 Care",
    desc: "佩戴之外，還有延續與傳承。 飾品的價值，不止於當下的光澤，還有它與時間共同留下的痕跡。在這裡，你會找到日常保養的秘訣、材質隨歲月變化的美，以及那些隱藏在工藝背後的文化與故事。",
    img: "/images/glossary/care.jpg",
  },
];

export default function GlossaryTabs() {
  const [active, setActive] = useState(TABS[0].key);
  const current = TABS.find((t) => t.key === active);

  return (
    <section className="glossary">
      {/* 四個按鈕 */}
      <div className="glossary__tabs" role="tablist" aria-label="Glossary tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`glossary__tab ${active === t.key ? "is-active" : ""}`}
            role="tab"
            aria-selected={active === t.key}
            aria-controls={`panel-${t.key}`}
            id={`tab-${t.key}`}
            onClick={() => setActive(t.key)}
          >
            <span className="glossary__tabIcon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* 圖片 + 文字 */}
      <div
        className="glossary__panel fade-in"
        role="tabpanel"
        id={`panel-${current.key}`}
        aria-labelledby={`tab-${current.key}`}
      >
        <div className="glossary__panelMedia">
          {/* <img src={current.img} alt={current.title} loading="lazy" /> */}
        </div>
        <div className="glossary__panelText">
          <h3>
            <span className="glossary__titleIcon">{current.icon}</span>
            {current.title}
          </h3>
          <p>{current.desc}</p>
        </div>
      </div>
    </section>
  );
}
