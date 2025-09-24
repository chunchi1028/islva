export default function Lumen({
  titleEn = "Lumen",
  titleZh = "琺瑯系列",
  desc = "光落於色，色映於心。 「Lumen」是色澤的詩篇，也是工藝的舞蹈， 將瞬間的光影凝結，化為恆久的佩飾。",
  ctaText = "Learn more",
  onCtaClick = () => {},
  imgLeft = "./images/series01.jpg",
  imgRight = "./images/series01.jpg",
  reverse = false, // 需要圖文對調時可用
}) {
  return (
    <div>
      <section className={`series-intro ${reverse ? "is-reverse" : ""}`}>
        <div className="form_container">
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
        </div>
      </section>
      <div className="form_txt">
        <p>
          Lumen 系列是光與色的詩篇。 透過琺瑯工藝，層層堆疊、燒製，
          將光影的瞬息留存於色澤之中。 它既明亮也深邃，
          如同心中那抹不被遺忘的光彩。
        </p>
      </div>
    </div>
  );
}
