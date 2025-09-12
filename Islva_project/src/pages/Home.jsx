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
            <img
              src="./images/square-bg.png"
              alt=""
              className="hero-image-bg"
            />
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
            <p className="chinese-caption">島嶼森靈的細語</p>
          </div>
        </div>
        <div className="scroll-arrows">
          <img src="./images/arrow.svg" alt="箭頭" />
        </div>
      </div>

      <div className="collections-section">
        <div className="hero-content-grid">
          {/* 標題 */}
          <div className="series_title">
            <p>01</p>
            <p>
              Collections<span>/</span>
            </p>
            <p>系列商品</p>
          </div>
          {/* 左邊文字 */}
          <div className="text-block">
            <p>
              三大系列交織出 ISLVA 的獨特語彙
              <br />
              ——冷冽與溫潤並存，精緻與大膽共鳴，
              <br />
              為配戴者帶來的不僅是飾品，更是
              <br />
              一段關於光、色彩與情感的旅程。
            </p>
            <Link to="/collections" className="cta-btn">
              探索系列
            </Link>
          </div>
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
      <div className="glossary-section">
        <div className="glossary_title">
          <p>02</p>
          <p>
            Glossary<span>/</span>
          </p>
          <p>材質辭典</p>
        </div>
        <div className="glossart_carousel"></div>
        <div className="glossary_description">
          在每一件靜物誕生之前，材質先說了話。
          <br />
          金屬的溫度、石的紋理、琺瑯的流動、銀的光與霧感——
          <br />
          這些，不只是製作材料，更是 ISLVA 詩語中的語言單位。
          <br />
          我們為每一種使用的材質，撰寫了它的名字、質感、來源與氣質。
          <br />
          在這裡，你可以閱讀每一種材質的性格、它在作品中扮演的角色，
          <br />
          理解每一次觸摸、佩戴與創作背後，所包含的記憶與寧靜。
        </div>
      </div>
      <div className="about-section">
        <figure>
          <img src="./images/about/about01.jpg" alt="About Us" />
          <img src="./images/about/about02.jpg" alt="About Us" />
          <img src="./images/about/about03.jpg" alt="About Us" />
          <img src="./images/about/about04.jpg" alt="About Us" />
          <img src="./images/about/about05.jpg" alt="About Us" />
        </figure>
      </div>
    </div>
  );
};

export default Home;
