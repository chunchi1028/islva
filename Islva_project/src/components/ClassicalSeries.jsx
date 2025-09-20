import React, { useState } from "react";
import { Link } from "react-router-dom";

const ClassicalSeries = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    {
      id: 1,
      src: "./images/series/animals/butterfly01.jpg",
      alt: "蝴蝶耳環正面",
    },
    {
      id: 2,
      src: "./images/series/animals/butterfly02.jpg",
      alt: "蝴蝶耳環側面",
    },
    {
      id: 3,
      src: "./images/series/animals/butterfly01.jpg",
      alt: "蝴蝶耳環佩戴效果",
    },
  ];

  const mainImage = "./images/series/animals/butterfly.jpg";

  return (
    <div className="butterfly-jewelry">
      {/* 左側主圖區域 */}
      <div className="main-image-section">
        <div className="main-image-container">
          <img src={mainImage} alt="蝴蝶與花朵藝術圖" className="main-image" />
        </div>
      </div>

      {/* 右側產品詳情區域 */}
      <div className="product-details">
        <div className="product-header">
          <h1 className="product-title">
            經典之境<span>Classical series</span>
          </h1>
        </div>

        <div className="product-description">
          <p>
            ISLVA
            的動物系列，以純銀雕動物等象徵之形，承載守護與自由的寓意。每一件作品，都是一種「靈獸」的低語
            <br />
            ——既有大自然的野性之美，也蘊含佩戴者內心的柔軟與力量。
          </p>
        </div>
        <Link to="/scrollGallery">
          <button className="next-btn">
            <span className="btn-text">NEXT</span>
            <span className="btn-arrow">→</span>
          </button>
        </Link>
        {/* 產品圖片縮圖 */}
        <div className="product-thumbnails">
          {productImages.map((image, index) => (
            <div
              key={image.id}
              className={`thumbnail ${index === selectedImage ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image.src} alt={image.alt} />
              {/* <div className="thumbnail-overlay"></div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassicalSeries;
