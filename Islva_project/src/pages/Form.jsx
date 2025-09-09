export default function SeriesIntro({
  titleEn = "Form",
  titleZh = "純銀系列",
  desc = "在簡練的形體之中，蘊藏著銀最純粹的力量。 「Form」是結構與秩序，也是自由與流動， 以極簡線條勾勒出日常與永恆的輪廓。",
  ctaText = "Learn more",
  onCtaClick = () => {},
  imgLeft = "./images/series01.jpg",
  imgRight = "./images/series01.jpg",
  reverse = false, // 需要圖文對調時可用
}) {
  return (
    <section className={`series-intro ${reverse ? "is-reverse" : ""}`}>
      <div className="form_continer">
        {/* 媒體區：兩張錯落圖片 */}
        <div className="series-intro__media">
          <figure className="series-intro__img series-intro__img--a">
            <img src={imgLeft} alt="" loading="lazy" />
          </figure>
          <figure className="series-intro__img series-intro__img--b">
            <img src={imgRight} alt="" loading="lazy" />
          </figure>
        </div>

        {/* 文字區 */}
        <div className="series-intro__text">
          <h3 className="series-intro__eyebrow">
            {titleEn} <span className="slash">/</span> <span>{titleZh}</span>
          </h3>
          <p className="series-intro__desc">{desc}</p>
          <button className="series-intro__btn" onClick={onCtaClick}>
            {ctaText}
          </button>
        </div>
        <div className="form_txt">
          <p>
            Form
            系列專注於純銀本身的純粹之美。以線條與結構為設計語言，結合細膩的工藝處理，從鏡面拋光到紋理刻劃，每一件作品都以低調的姿態，描繪屬於日常的優雅與永恆。
          </p>
        </div>
      </div>
    </section>
  );
}
