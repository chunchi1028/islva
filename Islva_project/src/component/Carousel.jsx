import React, { useState } from "react";
import CarouselCard from "./CarouselCard";

const Carousel = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(2); // 預設顯示第三張卡片 (索引 2)

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        {cards.map((card, index) => (
          <CarouselCard
            key={card.id}
            card={card}
            isActive={index === activeIndex}
          />
        ))}
      </div>
      <button className="arrow-btn prev" onClick={handlePrev}>
        {"<"}
      </button>
      <button className="arrow-btn next" onClick={handleNext}>
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
