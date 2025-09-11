import { useEffect, useMemo, useRef, useState } from "react";
import CarouselCard from "./CarouselCard";

/**
 * props:
 * - items: {title, subtitle?, img, cta?}[]
 * - autoplay?: boolean
 * - interval?: number (ms)
 * - visibleRadius?: number  // 中心卡左右各幾張
 */
export default function Carousel({
  items = [],
  autoplay = true,
  interval = 3500,
  visibleRadius = 2,
}) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const rootRef = useRef(null);

  const order = useMemo(() => {
    // 依照 active 排出顯示順序（中心在 0）
    return Array.from({ length: n }, (_, i) => (i - active + n) % n);
  }, [n, active]);

  const next = () => setActive((v) => (v + 1) % n);
  const prev = () => setActive((v) => (v - 1 + n) % n);

  // 自動播放
  useEffect(() => {
    if (!autoplay || n <= 1) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [autoplay, interval, n]);

  // 滑鼠懸停時暫停
  const pause = () => timerRef.current && clearInterval(timerRef.current);
  const resume = () => {
    if (!autoplay || n <= 1) return;
    pause();
    timerRef.current = setInterval(next, interval);
  };

  return (
    <div
      className="carousel"
      ref={rootRef}
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-roledescription="carousel"
      aria-label="styles"
    >
      <button
        className="carousel__nav left"
        onClick={prev}
        aria-label="Previous"
      >
        ‹
      </button>

      <div className="carousel__stage">
        {items.map((item, i) => {
          // 與 active 的距離（負在左、正在右）
          const pos = (i - active + n) % n;
          const half = pos <= n / 2 ? pos : pos - n; // 取最短方向
          const abs = Math.abs(half);

          if (abs > visibleRadius) return null; // 只畫附近卡片（效能）

          // // 視覺效果：位移、縮放、角度、zIndex
          // const translateX = half * 180; // 水平間距
          // const rotateY = half * -10; // 左右微轉
          // const scale = 1 - abs * 0.08; // 外側縮小
          const zIndex = 100 - abs;
          const opacity = 1 - abs * 0.08;

          const transform = `
  translateX(${half * 100}px)
  scale(${1 - abs * 0.08})
  rotateY(${half * -25}deg) // 調整傾斜角度，讓效果更明顯
  translateZ(${abs * -50}px) // 沿著 Z 軸向後推，創造景深感
`;

          return (
            // <div
            //   key={i}
            //   className={`carousel__item ${i === active ? "is-active" : ""}`}
            //   style={{
            //     transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
            //     zIndex,
            //     opacity,
            //   }}
            // >

            <div
              key={i}
              className={`carousel__item ${i === active ? "is-active" : ""}`}
              style={{
                transform,
                zIndex,
                opacity,
              }}
            >
              <CarouselCard
                title={item.title}
                subtitle={item.subtitle}
                img={item.img}
                cta={item.cta}
                active={i === active}
                onClick={() => setActive(i)}
              />
            </div>
          );
        })}
      </div>

      <button className="carousel__nav right" onClick={next} aria-label="Next">
        ›
      </button>
    </div>
  );
}
