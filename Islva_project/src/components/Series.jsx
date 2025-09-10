import React from "react";

export default function Series({
  // 文字
  eyebrow,
  title,
  body,
  nextText = "NEXT",
  onNext = () => {},

  // 圖片
  heroLeft = "#",
  product = "#",
  thumb1 = "#",
  thumb2 = "#",
  thumb3 = "#",

  // 可調整尺寸
  productWidth = 360, // 主產品寬度(px)
}) {
  return (
    <section className="animal">
      <div className="animal__grid">
        {/* 左側大圖 */}
        <figure className="animal__left">
          <img src={heroLeft} alt="" loading="lazy" />
        </figure>

        {/* 右側文字 */}
        <div className="animal__text">
          <div className="animal__eyebrow">
            {eyebrow} <span className="sep">/</span> {title}
          </div>
          <p className="animal__body">{body}</p>

          <button className="animal__next" onClick={onNext} aria-label="Next">
            {nextText}
            <span className="arrow" aria-hidden>
              →
            </span>
          </button>
        </div>

        {/* 底部兩張縮圖 */}
        <div className="series_thumbs">
          <figure className="series__thumb">
            <img src={thumb1} alt="" loading="lazy" />
          </figure>
          <figure className="series__thumb">
            <img src={thumb2} alt="" loading="lazy" />
          </figure>
          <figure className="series__thumb">
            <img src={thumb3} alt="" loading="lazy" />
          </figure>
        </div>

        {/* 中央漂浮產品（疊在格線上方） */}
        <img
          className="series__product"
          src={product}
          alt=""
          style={{ width: productWidth }}
          loading="lazy"
        />
      </div>
    </section>
  );
}
