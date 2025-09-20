import React, { useState, useEffect, useRef } from "react";
import animalseries from "../data/animalseries.json";

const ScrollGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;

      const scrollTop = galleryRef.current.scrollTop;
      const itemHeight = 220; // 200px 圖片 + 20px margin

      // 計算最接近視窗中心的項目
      const viewportCenter = scrollTop + galleryRef.current.offsetHeight / 2;
      const currentIndex = Math.floor(viewportCenter / itemHeight);

      if (
        currentIndex >= 0 &&
        currentIndex < animalseries.length &&
        currentIndex !== activeIndex
      ) {
        setActiveIndex(currentIndex);
      }
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener("scroll", handleScroll);
      return () => galleryElement.removeEventListener("scroll", handleScroll);
    }
  }, [activeIndex]);

  // 分離滑鼠滾輪事件處理 - 更簡單的方法
  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return;

    const handleWheel = (e) => {
      e.preventDefault(); // 防止預設滾動
      e.stopPropagation(); // 防止事件冒泡

      console.log("滾輪事件觸發", e.deltaY); // 除錯用

      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(
        0,
        Math.min(animalseries.length - 1, activeIndex + direction)
      );

      console.log("當前索引:", activeIndex, "新索引:", newIndex); // 除錯用

      if (newIndex !== activeIndex) {
        scrollToItem(newIndex);
      }
    };

    // 直接在滾動區域上監聽
    galleryElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      galleryElement.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex, animalseries.length]);

  // 添加鍵盤導航
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const newIndex =
          e.key === "ArrowUp"
            ? Math.max(0, activeIndex - 1)
            : Math.min(animalseries.length - 1, activeIndex + 1);
        scrollToItem(newIndex);
      }
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      // 讓滾動區域可以接收鍵盤焦點
      galleryElement.tabIndex = 0;
      galleryElement.addEventListener("keydown", handleKeyDown);

      return () => {
        galleryElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeIndex, animalseries.length]);

  const currentItem = animalseries[activeIndex] || animalseries[0];

  const scrollToItem = (index) => {
    if (galleryRef.current) {
      const itemHeight = 220;
      galleryRef.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
  };

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
        <div
          className="scroll-section"
          ref={galleryRef}
          onMouseEnter={() => console.log("滑鼠進入滾動區域")} // 除錯用
          onMouseLeave={() => console.log("滑鼠離開滾動區域")} // 除錯用
        >
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
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200x150?text=Image+Not+Found";
                  }}
                />
                {/* 可選：添加小標題 */}
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
