import React, { useState, useEffect } from "react";

const images = [
  "./images/about/about01.jpg",
  "./images/about/about02.jpg",
  "./images/about/about03.jpg",
  "./images/about/about04.jpg",
  "./images/about/about05.jpg",
];

const Picture_carousel = () => {
  // 使用 useState 來管理當前顯示的照片索引
  const [currentSlide, setCurrentSlide] = useState(0);

  // 使用 useEffect 來設定和管理自動播放的計時器
  useEffect(() => {
    // 設定一個定時器，每 3 秒切換一次照片
    const timer = setInterval(() => {
      // 更新狀態，並確保索引在圖片陣列的範圍內循環
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    // 清理函數：當元件卸載時，清除計時器以防止記憶體洩漏
    return () => clearInterval(timer);
  }, []); // 空依賴陣列表示這個 Effect 只會在元件第一次渲染時執行

  return (
    <div className="slideshow-container">
      {/* 遍歷圖片陣列，渲染每個 img 標籤 */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`slide ${index === currentSlide ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default Picture_carousel;
