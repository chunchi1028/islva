import { useEffect, useRef, useState } from "react";
/**
 * Collapse - 平滑高度動畫（auto 高度友善）
 * props:
 *  - isOpen: boolean
 *  - duration?: number(ms) 預設 300
 *  - id?: string (aria 控制用)
 */
export default function Collapse({ isOpen, children, duration = 300, id }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const [renderChildren, setRenderChildren] = useState(isOpen);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isOpen) {
      setRenderChildren(true);
      requestAnimationFrame(() => {
        setHeight(el.scrollHeight);
        const t = setTimeout(() => setHeight("auto"), duration);
        return () => clearTimeout(t);
      });
    } else {
      if (height === "auto") {
        setHeight(el.scrollHeight);
        requestAnimationFrame(() => setHeight(0));
      } else {
        setHeight(0);
      }
      const t = setTimeout(() => setRenderChildren(false), duration);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // 動畫期間內容高度變化（例如圖片載入）即時跟隨
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const ro = new ResizeObserver(() => {
      if (height !== "auto") setHeight(ref.current.scrollHeight);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [isOpen, height]);

  return (
    <div
      className="collapse"
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        transitionDuration: `${duration}ms`,
      }}
      aria-hidden={!isOpen}
      id={id}
    >
      <div ref={ref} className="collapse__inner">
        {renderChildren ? children : null}
      </div>
    </div>
  );
}
