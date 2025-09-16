import GlossaryTab from "../components/GlossaryTab";
import AnimatedDisclosures from "../components/AnimatedDisclosures";

export default function GlossaryPage() {
  return (
    <div className="glossary_container">
      <div className="glossary-banner">
        <div className="glossary-card">
          <div className="book-section">
            <img src="#" alt="Open book" className="book-image" />
            <div className="glossary-arrows">
              <img src="./images/arrow.svg" alt="" />
            </div>
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
      <div className="glossasry-content">
        {/* 上方四個按鈕 + 內容卡 */}
        <GlossaryTab />
        <AnimatedDisclosures dense />
      </div>
    </div>
  );
}
