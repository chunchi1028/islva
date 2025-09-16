import { useEffect, useMemo, useRef, useState } from "react";
import disclosures from "../data/disclosures.json";


/**
 * 點擊展開（平滑寬度）＋ 左右箭頭導航
 * - 點卡片：該卡展開，其餘保持窄卡
 * - 左/右箭頭：切換上一張／下一張（循環）
 * - CTA 按鈕：在手風琴下方顯示該卡對應文字
 */
export default function HorizontalAccordion({
  items = disclosures,   // [{title, desc, img, ctaText, icon, ctaBelow?}]
  gap = 14,
  collapsedW = 72,
  height = 450,
  sideTitleW = 56,
  bodyMaxW = 200,        // 右側文字欄最大寬
  initial = 0,
  expandedMaxW = 300,    // ★ 展開卡片「總寬度」上限（可再調小/大）
  clampLines: clampLinesProp = 5,
}) {
  const data = useMemo(() => items ?? [], [items]);
  const n = data.length;
  const descLines = Number.isFinite(clampLinesProp) ? clampLinesProp : 5; // ← 後備值
  const [active, setActive] = useState(
    initial == null ? null : Math.max(0, Math.min(initial, n - 1))

  );

  // 下方顯示的訊息（點 CTA 產生）
  const [belowMsg, setBelowMsg] = useState("");

  // 對應每張卡片的 flex-basis 價值（px）會轉成比例
  const rowRef = useRef(null);
  const [containerW, setContainerW] = useState(0);
  const [weights, setWeights] = useState(() =>
    n ? Array(n).fill(1 / Math.max(n, 1)) : []
  );

  // 監看容器寬度
  useEffect(() => {
    if (!rowRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setContainerW(Math.floor(e.contentRect.width));
    });
    ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, []);

  // 算出「自然展開寬度」後，再套上 expandedMaxW 上限
  const expandedBasisPx = useMemo(() => {
    if (!rowRef.current || n === 0) return 0;
    const totalGaps = (n - 1) * gap;
    const collapsedSum = (n - 1) * collapsedW;
    const natural = containerW - totalGaps - collapsedSum;
    return Math.max(Math.min(natural, expandedMaxW), collapsedW);
  }, [containerW, n, gap, collapsedW, expandedMaxW]);

  // 展開到指定索引（平滑寬度）
  const expandTo = (i) => {
    const widths = Array(n).fill(collapsedW);
    widths[i] = expandedBasisPx;
    const sum = widths.reduce((a, b) => a + b, 0) || 1;
    setWeights(widths.map((w) => w / sum));
    setActive(i);
  };

  // 初始化
  useEffect(() => {
    if (!n) return;
    if (active == null) {
      setWeights(Array(n).fill(1 / n));
    } else {
      expandTo(active);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, containerW]);

  // 左右箭頭
  const goPrev = () => expandTo((active == null ? 0 : (active - 1 + n) % n));
  const goNext = () => expandTo((active == null ? 0 : (active + 1) % n));

  return (
    <section
      className="hacc"
      aria-label="Click-to-expand Horizontal Accordion"
      style={{
        ["--gap"]: `${gap}px`,
        ["--collapsed-w"]: `${collapsedW}px`,
        ["--pane-h"]: `${height}px`,
        ["--side-w"]: `${sideTitleW}px`,
        ["--body-max-w"]: `${bodyMaxW}px`,
        ["--desc-lines"]: descLines, 
      }}
    >
      {/* 左右箭頭 */}
      <button className="hacc__arrow hacc__arrow--left" onClick={goPrev} aria-label="Previous">
        ◀
      </button>
      <button className="hacc__arrow hacc__arrow--right" onClick={goNext} aria-label="Next">
        ▶
      </button>

      <ul className="hacc__row" role="list" ref={rowRef}>
        {data.map((it, i) => {
          const isActive = active === i;
          const basis = (weights[i] * 100).toFixed(4) + "%";
          return (
            <li
              key={i}
              className={`hacc__item ${isActive ? "is-active" : ""}`}
              style={{ flexBasis: basis }}
            >
              <article
                className="hacc__pane"
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={() => expandTo(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    expandTo(i);
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    goPrev();
                  } else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    goNext();
                  }
                }}
              >
                {/* 背景圖 */}
                <div className="hacc__media">
                  <img src={it.img} alt="" loading="lazy" />
                </div>

                {/* 窄卡：直排小標 + 小 icon */}
                <div className="hacc__label" aria-hidden={isActive}>
                  <span className="vtext">{it.title}</span>
                  {/* {it.icon && <span className="hacc__miniIcon">{it.icon}</span>} */}
                </div>

                {/* 展開層：左直排大標 + 右文字＋CTA */}
                <div className="hacc__expanded" aria-hidden={!isActive}>
                  <div className="hacc__side">
                    <div className="vtitle">{it.title}</div>
                  </div>
                  <div className="hacc__body">
                    <p className="hacc__desc">{it.desc}</p>
                    <div className="hacc__footer">
                      {it.ctaText && (
                        <button
                          className="hacc__cta"
                          onClick={(e) => {
                            e.preventDefault();
                            // 顯示在下方的文字：優先用 ctaBelow，否則用「標題 + ctaText」
                            setBelowMsg(it.ctaBelow ?? `${it.title} — ${it.ctaText}`);
                          }}
                        >
                          ◈ {it.ctaText}
                        </button>
                      )}
                      {it.icon && <span className="hacc__miniIcon hacc__miniIcon--body">{it.icon}</span>}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {/* 下方訊息區（點 CTA 後出現） */}
      {belowMsg && (
        <div className="hacc__below">
          {belowMsg}
          <button className="hacc__belowClose" onClick={() => setBelowMsg("")} aria-label="Close message">×</button>
        </div>
      )}
    </section>
  );
}