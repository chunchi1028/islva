import { useState, useMemo } from "react";
import GlossaryTab from "../components/GlossaryTab";
import HorizontalAccordion from "../components/HorizontalAccordion";
import disclosures from "../data/disclosures.json";

export default function GlossaryPage() {
  const [active, setActive] = useState("material");

  // 每個 Tab 記憶「視窗起點」與「上次展開的卡（title）」：
  const [starts, setStarts] = useState({}); // { material: 0, finish: 3, ... }
  const [actives, setActives] = useState({}); // { material: "純銀 925", ... }

  const items = useMemo(
    () => disclosures.filter((it) => it.tabKey === active),
    [active]
  );

  return (
    <div className="glossary_container">
      <div className="glossary-banner">
        <div className="glossary-card">
          <div className="ring-section">
            <img
              src="./images/glossary/glossary-1.jpg"
              alt=""
              className="ring-image"
            />
            {/* <div className="glossary-arrows">
              <img src="./images/arrow.svg" alt="" />
            </div> */}
          </div>
          <div className="content-section">
            <div className="text-content">
              <h3 className="title">材料詞典</h3>
              <p className="glossary-description">
                在這裡，你可以了解關於銀的特性、琺瑯的色彩、
                <br />
                寶石的切割與鑲嵌，以及表面處理、工藝技法與
                <br />
                保養方式的完整解說。透過它，你能更清楚地認識每一件飾品的細節，
                <br />
                讓每一次的佩戴，都多一份理解與連結。
              </p>
              <button className="learn-more-btn">Learn more</button>
            </div>

            <div className="glossary-title">
              <h2>Glossary</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="glossary-content">
        {/* 上方四個按鈕 + 內容卡 */}
        <GlossaryTab active={active} setActive={setActive} />
        <HorizontalAccordion
          key={active}
          items={items}
          windowSize={6}
          slideBy={1}
          clampLines={5}
          externalStart={starts[active] ?? 0}
          onStartChange={(s) => setStarts((p) => ({ ...p, [active]: s }))}
          initialByTitle={actives[active] ?? null}
          onActiveChange={(title) =>
            setActives((p) => ({ ...p, [active]: title }))
          }
        />
      </div>
    </div>
  );
}
