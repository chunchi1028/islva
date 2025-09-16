import { useMemo, useState } from "react";
import disclosures from "../data/disclosures.json";

/**
 * 行為：
 * - 左側維持 9:16 直式縮圖。
 * - 點擊左側（含標題）→ 右側「橫向」面板展開/收合（寬度動畫）。
 * - 切換 Tabs 時，收合任何展開中的卡片。
 * - Desktop 展開時，卡片會跨欄變寬（grid-column: span 2）。
 */
export default function AnimatedDisclosures({
  items = disclosures,
  dense = false,
}) {
  const categories = useMemo(
    () => [...new Set(items.map((i) => i.category))],
    [items]
  );

  const [activeCat, setActiveCat] = useState(categories[0]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filtered = items.filter((i) => i.category === activeCat);
  const toggle = (i) => setExpandedIndex((cur) => (cur === i ? null : i));

  return (
    <section className={`disclosures ${dense ? "disclosures--dense" : ""}`}>
      {/* Tabs */}
      {/* <div className="tabs" role="tablist" aria-label="分類切換">
        {categories.map((cat) => {
          const selected = cat === activeCat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={selected}
              className={`tab ${selected ? "is-active" : ""}`}
              onClick={() => {
                setActiveCat(cat);
                setExpandedIndex(null);
              }}
            >
              {cat}
            </button>
          );
        })}
      </div> */}

      {/* Cards */}
      <ul className="disclosures__list" role="list">
        {filtered.map((it, i) => {
          const isExpanded = i === expandedIndex;
          return (
            <li
              key={`${it.title}-${i}`}
              className="disclosures__item"
              data-expanded={isExpanded || undefined}
            >
              <article className="card">
                <div className="card__row">
                  {/* 左側：一般 div（非 <button>），可點擊開合 */}
                  <div
                    className="card__left"
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-controls={`panel-${i}`}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(i);
                      }
                    }}
                  >
                    <div className="card__media">
                      <img
                        className="card__img"
                        src={it.img}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <header className="card__header">
                      <h3 className="card__title">{it.title}</h3>
                    </header>
                  </div>

                  {/* 右側：水平展開面板 */}
                  <div
                    className="card__panel"
                    id={`panel-${i}`}
                    aria-hidden={!isExpanded}
                  >
                    <p className="card__desc">{it.desc}</p>
                    {it.extraText && (
                      <div className="card__extra">{it.extraText}</div>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
