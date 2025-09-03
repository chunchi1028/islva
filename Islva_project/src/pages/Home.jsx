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
      <div></div>
    </div>
  );
};

export default Home;
