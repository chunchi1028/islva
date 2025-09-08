import { useState } from "react";

const TABS = [
  {
    key: "material",
    label: "材質",
    icon: "🪙",
    title: "材質 Material",
    desc: "介紹常見飾品材質：純銀、黃金、不鏽鋼等，包含硬度、氧化特性與保養重點。",
    img: "/images/glossary/material.jpg",
  },
  {
    key: "craft",
    label: "工藝",
    icon: "🛠️",
    title: "工藝 Craft",
    desc: "鑄造、鍛敲、蠟雕、焊接與拋光，展示可視差異與做工細節。",
    img: "/images/glossary/craft.jpg",
  },
  {
    key: "finish",
    label: "表面效果",
    icon: "✨",
    title: "表面效果 Finish",
    desc: "霧面、亮面、髮絲紋、做舊、電鍍等處理方式。",
    img: "/images/glossary/finish.jpg",
  },
  {
    key: "care",
    label: "保養方式",
    icon: "🧴",
    title: "保養 Care",
    desc: "如何清潔、收納與配戴注意，避免化學藥劑與碰撞。",
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
          <img src={current.img} alt={current.title} loading="lazy" />
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
