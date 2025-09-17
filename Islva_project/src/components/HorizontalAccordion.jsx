import { useEffect, useMemo, useRef, useState, useCallback } from "react";

export default function HorizontalAccordion({
  items = [],
  gap = 14,
  collapsedW = 120,
  height = 450,
  sideTitleW = 56,
  bodyMaxW = 200,
  expandedMaxW = 300,
  clampLines: clampLinesProp = 5,
  windowSize = 5,
  slideBy = 1,
  controlledStart = false,
  externalStart = 0,
  onStartChange,
  onActiveChange,
  showDots = true,
}) {
  const data = useMemo(() => items ?? [], [items]);
  const n = data.length;
  const descLines = Number.isFinite(clampLinesProp) ? clampLinesProp : 5;

  const [start, setStart] = useState(controlledStart ? externalStart ?? 0 : 0);
  const [belowMsg, setBelowMsg] = useState("");
  const [active, setActive] = useState(null); // ★ 展開中的卡片 index
  const isIdle = active == null; // ★ 判斷是否 idle 狀態

  const rowRef = useRef(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    if (!rowRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setContainerW(Math.floor(e.contentRect.width));
    });
    ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, []);

  const visibleIndices = useMemo(() => {
    if (!n) return [];
    if (n <= windowSize) return Array.from({ length: n }, (_, k) => k);
    return Array.from({ length: windowSize }, (_, k) => (start + k) % n);
  }, [n, start, windowSize]);

  const canSlide = n > windowSize;

  const _setStart = useCallback(
    (next) => {
      setStart(next);
      onStartChange?.(next);
    },
    [onStartChange]
  );

  const centerOn = useCallback(
    (targetAbs) => {
      if (!canSlide || n <= windowSize) return;
      if (visibleIndices.includes(targetAbs)) return;

      const half = Math.floor(windowSize / 2);
      const desiredStart = (targetAbs - half + n) % n;

      const forward = (desiredStart - start + n) % n;
      const backward = (start - desiredStart + n) % n;

      _setStart(
        forward <= backward ? (start + forward) % n : (start - backward + n) % n
      );
    },
    [canSlide, n, windowSize, visibleIndices, start, _setStart]
  );

  const handleToggle = useCallback(
    (absIndex) => {
      setActive((prev) => {
        const next = prev === absIndex ? null : absIndex;
        if (next !== null) centerOn(absIndex);
        return next;
      });
    },
    [centerOn]
  );

  const ghostCount = Math.max(0, windowSize - visibleIndices.length);
  const phantomN = Math.max(windowSize, visibleIndices.length || 0);

  const expandedBasisPx = useMemo(() => {
    if (!rowRef.current || phantomN === 0) return 0;
    const totalGaps = (phantomN - 1) * gap;
    const collapsedSum = (phantomN - 1) * collapsedW;
    const natural = containerW - totalGaps - collapsedSum;
    return Math.max(Math.min(natural, expandedMaxW), collapsedW);
  }, [containerW, phantomN, gap, collapsedW, expandedMaxW]);

  const weights = useMemo(() => {
    if (!visibleIndices.length)
      return Array(windowSize).fill(1 / Math.max(windowSize, 1));

    // ★ 初始沒有任何展開：全部採用 collapsedW（窄窄的）
    const px = Array(windowSize).fill(collapsedW);

    // ★ 有展開時，只有該張用 expandedBasisPx，其餘維持 collapsedW
    if (active != null) {
      const activeLocal = visibleIndices.indexOf(active);
      if (activeLocal >= 0) px[activeLocal] = expandedBasisPx;
    }

    const sum = px.reduce((a, b) => a + b, 0) || 1;
    return px.map((w) => w / sum);
  }, [windowSize, visibleIndices, active, expandedBasisPx, collapsedW]);
  const slidePrev = useCallback(() => {
    if (!canSlide) return;
    _setStart((start - slideBy + n) % n);
  }, [canSlide, _setStart, start, slideBy, n]);

  const slideNext = useCallback(() => {
    if (!canSlide) return;
    _setStart((start + slideBy) % n);
  }, [canSlide, _setStart, start, slideBy, n]);

  const pageCount = n > windowSize ? Math.ceil(n / windowSize) : 1;
  const currPage = n > 0 ? Math.floor((start % n) / windowSize) : 0;

  return (
    <section
      className="hacc"
      style={{
        ["--gap"]: `${gap}px`,
        ["--collapsed-w"]: `${collapsedW}px`,
        ["--pane-h"]: `${height}px`,
        ["--side-w"]: `${sideTitleW}px`,
        ["--body-max-w"]: `${bodyMaxW}px`,
        ["--desc-lines"]: descLines,
      }}
    >
      <button
        className="hacc__arrow hacc__arrow--left"
        onClick={slidePrev}
        disabled={!canSlide}
      >
        ◀
      </button>
      <button
        className="hacc__arrow hacc__arrow--right"
        onClick={slideNext}
        disabled={!canSlide}
      >
        ▶
      </button>

      <ul
        className={`hacc__row ${isIdle ? "is-idle" : ""}`}
        role="list"
        ref={rowRef}
      >
        {visibleIndices.map((absIndex, i) => {
          const it = data[absIndex];
          const isActive = active === absIndex;
          const basis = (weights[i] * 100).toFixed(4) + "%";
          return (
            <li
              key={`real-${absIndex}`}
              className={`hacc__item ${isActive ? "is-active" : ""}`}
              /* ★ idle 時用固定窄寬；非 idle 才用百分比 */
              style={{ flexBasis: isIdle ? "var(--collapsed-w)" : basis }}
            >
              <article
                className="hacc__pane"
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={() => handleToggle(absIndex)}
              >
                {/* 背景圖 */}
                <div className="hacc__media">
                  <img src={it.img} alt="" />
                </div>

                {/* 窄卡標題（初始可見） */}
                <div className="hacc__label" aria-hidden={isActive}>
                  <span className="vtext">{it.title}</span>
                </div>

                {/* 展開層（只有展開時才顯示） */}
                <div className="hacc__expanded" aria-hidden={!isActive}>
                  <div className="hacc__side">
                    <div className="vtitle">{it.title}</div>
                  </div>
                  <div
                    className="hacc__body"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="hacc__desc">{it.desc}</p>
                    {it.ctaText && (
                      <button
                        className="hacc__cta"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setBelowMsg(
                            it.ctaBelow ?? `${it.title} — ${it.ctaText}`
                          );
                        }}
                      >
                        ◈ {it.ctaText}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}

        {/* ★ idle 狀態下不要渲染幽靈卡，避免把寬度又撐開 */}
        {!isIdle &&
          Array.from({
            length: Math.max(0, windowSize - visibleIndices.length),
          }).map((_, i) => {
            const idx = visibleIndices.length + i;
            const basis = (weights[idx] * 100).toFixed(4) + "%";
            return (
              <li
                key={`ghost-${i}`}
                className="hacc__item hacc__item--ghost"
                style={{ flexBasis: basis }}
                aria-hidden="true"
              />
            );
          })}
      </ul>

      {/* 分頁圓點 */}
      {showDots && pageCount > 1 && (
        <div className="hacc__dots">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hacc__dot ${i === currPage ? "is-active" : ""}`}
              onClick={() =>
                _setStart(Math.min(i * windowSize, Math.max(n - 1, 0)))
              }
            />
          ))}
        </div>
      )}

      {belowMsg && (
        <div className="hacc__below">
          {Array.isArray(belowMsg)
            ? belowMsg.map((p, i) => <p key={i}>{p}</p>)
            : belowMsg}
          <button className="hacc__belowClose" onClick={() => setBelowMsg("")}>
            ×
          </button>
        </div>
      )}
    </section>
  );
}
