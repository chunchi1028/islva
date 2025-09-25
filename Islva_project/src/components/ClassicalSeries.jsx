import React, { useState } from "react";
import { Link } from "react-router-dom";

const ClassicalSeries = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    {
      id: 1,
      src: "./images/products/form/classical/c01.png",
      alt: "",
    },
    {
      id: 2,
      src: "./images/products/form/classical/c02.png",
      alt: "",
    },
    {
      id: 3,
      src: "./images/products/form/classical/c01.png",
      alt: "",
    },
  ];

  const mainImage = "./images/products/form/classical/cl-intro.jpg";

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
            凝聚 ISLVA 工藝的精髓與永不退流行的設計語言。
            每一件作品都是時間淬鍊的象徵，簡約而深刻，適合任何時刻與風格。
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
