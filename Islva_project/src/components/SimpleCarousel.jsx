import React, { useState, useEffect } from "react";

const SimpleCarousel = () => {
  const images = [
    "./images/glossary/glossary-1.jpg",
    "./images/glossary/glossary-2.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((current) =>
        current === images.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="simple_carousel">
      <img src={images[current]} alt={`slide ${current}`} />
    </div>
  );
};

export default SimpleCarousel;
