export default function Core({
  titleEn = "Core",
  titleZh = "鑲嵌系列",
  desc = "每一顆寶石，皆是一段核心的記憶。 「Core」承載著本質與深意， 在細緻的鑲嵌中，留存珍貴的時光與信念。",
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
          Core 系列聚焦於珍貴的內核。 每一顆寶石，都是被時間與記憶雕琢的光點。
          透過精緻的鑲嵌工藝， 將銀與石緊密交融， 讓飾品成為承載心意的容器，
          也成為永恆的陪伴。
        </p>
      </div>
    </div>
  );
}
