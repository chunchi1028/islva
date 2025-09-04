import { Link } from "react-router-dom";

const Home = () => {
  return (
   
    <div className="home_container">
      <div className="main-visual">
        {/* 首頁主視覺 Hero Section */}
        <div className="hero-section">
          {/* 左側文案 */}
          <div className="hero-text-left">
            <p className="english-caption">Captured in the light of silver</p>
            <p className="chinese-caption">光影之間</p>
          </div>

          {/* 中間圖片區 */}
          <div className="hero-image-container">
            <img src="./images/square-bg.png" alt="" className="hero-image-bg" />
            <img
              // src={butterflyRing}
              alt="ISLVA Silver Butterfly Ring"
              className="hero-image"
            />
          </div>

          {/* 右側文案 */}
          <div className="hero-text-right">
            <p className="english-caption">
              Born of
              <br />
              island and forest
            </p>
            <p className="chinese-caption">島嶼森靈的低語</p>
          </div>
        </div>
        <div className="scroll-arrows">
          <img src="./images/arrow" alt="箭頭" />
        </div>
      </div>

    <div className="collections-section">
  <div className="content-grid">
    {/* 左邊文字 */}
    <div className="text-block">
      <p>
        三大系列交織出 ISLVA 的獨特語彙<br />
        ——冷冽與溫潤並存，精緻與大膽共鳴，<br />
        為配戴者帶來的不僅是飾品，更是<br />
        一段關於光、色彩與情感的旅程。
      </p>
      <Link to="/collections" className="cta-btn">探索系列</Link>
    </div>

    {/* 右邊圖片（錯落） */}
    <div className="image-section">
      <div className="image-grid">
        <div className="image-item main-image">
          <Link to="form">
            <img src="./images/series01.jpg" alt="Jewelry" />
          </Link>
        </div>
        <div className="image-item side-image">
          <Link to="lumen">
            <img src="./images/series01.jpg" alt="Jewelry" />
          </Link>
        </div>
        <div className="image-item top-right-image">
          <Link to="core">
            <img src="./images/series01.jpg" alt="Jewelry" />
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
   
  );
};

export default Home;
