import React, { useState, useEffect, useRef, useCallback } from "react";
import animalseries from "../data/animalseries.json";

const ScrollGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const rafRef = useRef(null);
  const lastScrollTimeRef = useRef(0);

  // 🔥 簡化的滾動計算
  const calculateActiveIndex = useCallback(() => {
    if (!galleryRef.current) return;

    const scrollTop = galleryRef.current.scrollTop;
    const itemHeight = 220;
    const viewportCenter = scrollTop + galleryRef.current.offsetHeight / 2;
    const currentIndex = Math.floor(viewportCenter / itemHeight);

    const clampedIndex = Math.max(
      0,
      Math.min(animalseries.length - 1, currentIndex)
    );

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  }, [activeIndex]);

  // 🔥 修復滾動事件處理
  const handleScroll = useCallback(() => {
    // 如果是程式控制的滾動，跳過處理
    if (isScrollingRef.current) return;

    const now = Date.now();
    // 節流：最少間隔 16ms (約 60fps)
    if (now - lastScrollTimeRef.current < 16) return;
    lastScrollTimeRef.current = now;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(calculateActiveIndex);
  }, [calculateActiveIndex]);

  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => {
        galleryElement.removeEventListener("scroll", handleScroll);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  }, [handleScroll]);

  // 🔥 重新設計滾輪事件處理
  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return;

    let wheelTimeout = null;
    let isWheelActive = false;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // 防止過於頻繁的觸發
      if (isWheelActive) return;

      isWheelActive = true;

      // 清除之前的 timeout
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(
        0,
        Math.min(animalseries.length - 1, activeIndex + direction)
      );

      if (newIndex !== activeIndex) {
        scrollToItem(newIndex);
      }

      // 50ms 後允許下一次滾輪事件
      wheelTimeout = setTimeout(() => {
        isWheelActive = false;
      }, 50);
    };

    galleryElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      galleryElement.removeEventListener("wheel", handleWheel);
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, [activeIndex]);

  // 🔥 簡化鍵盤導航
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();

        // 防止在滾動過程中觸發
        if (isScrollingRef.current) return;

        const newIndex =
          e.key === "ArrowUp"
            ? Math.max(0, activeIndex - 1)
            : Math.min(animalseries.length - 1, activeIndex + 1);

        if (newIndex !== activeIndex) {
          scrollToItem(newIndex);
        }
      }
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.tabIndex = 0;
      galleryElement.addEventListener("keydown", handleKeyDown);
      return () => galleryElement.removeEventListener("keydown", handleKeyDown);
    }
  }, [activeIndex]);

  const currentItem = animalseries[activeIndex] || animalseries[0];

  // 🔥 重新設計滾動函數 - 關鍵修復
  const scrollToItem = useCallback(
    (index) => {
      if (!galleryRef.current || index === activeIndex) return;

      // 清理之前的狀態
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 設定滾動狀態
      isScrollingRef.current = true;

      const itemHeight = 220;
      const targetScrollTop = index * itemHeight;

      // 立即更新狀態
      setActiveIndex(index);

      // 執行滾動
      galleryRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });

      // 🔥 關鍵：更短的重置時間
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 300); // 縮短為 300ms
    },
    [activeIndex]
  );

  // 組件卸載清理
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="scroll-gallery">
      <div className="gallery-container">
        {/* 左側文字區域 */}
        <div className="text-section">
          <div className="text-content">
            <div className="category">{currentItem?.category}</div>
            <h2 className="title">{currentItem?.title}</h2>
            <p className="description">{currentItem?.description}</p>
            <button className="more-btn">前往購買</button>
          </div>
        </div>

        {/* 中間主圖區域 */}
        <div className="main-image-section">
          <div className="main-image-container">
            <img
              src={currentItem?.mainImage}
              alt={currentItem?.title}
              className="main-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Image+Not+Found";
              }}
            />
          </div>
        </div>

        {/* 右側滾動圖片區域 */}
        <div className="scroll-section" ref={galleryRef}>
          {/* 滾動提示 */}
          <div className="scroll-hint">
            <span>滾動或點擊切換</span>
          </div>

          {animalseries.map((item, index) => (
            <div key={item.id} className="scroll-item">
              <div
                className={`scroll-item-content ${
                  index === activeIndex ? "active" : "inactive"
                }`}
                onClick={() => scrollToItem(index)}
              >
                <img
                  src={item.sideImage}
                  alt={item.title}
                  className="side-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200x150?text=Image+Not+Found";
                  }}
                />
                <div className="item-title">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollGallery;
