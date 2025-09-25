import React, { useState } from "react";
import { Link } from "react-router-dom";

const LaceSeries = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    {
      id: 1,
      src: "./images/products/form/lace/l01.png",
      alt: "蝴蝶耳環正面",
    },
    {
      id: 2,
      src: "./images/products/form/lace/l02.png",
      alt: "蝴蝶耳環側面",
    },
    {
      id: 3,
      src: "./images/products/form/lace/l01.png",
      alt: "蝴蝶耳環佩戴效果",
    },
  ];

  const mainImage = "./images/products/form/lace/lace-intro.jpg";

  return (
    <div className="butterfly-jewelry1">
      {/* 左側產品詳情區域 */}
      <div className="product-details1">
        <div className="product-header1">
          <h1 className="product-title1">
            幻影之境<span>Lace Series</span>
          </h1>
        </div>

        <div className="product-description1">
          <p>
            在蕾絲系列中，銀絲化為繁複的紋理，卻依然保有呼吸般的透光。
            <br />
            這是一場金屬與柔軟的交會，將優雅與浪漫定格於指尖，仿佛在低聲呢喃一首無聲的情詩。
          </p>
        </div>

        <Link to="/scrollGallery">
          <button className="next-btn1">
            <span className="btn-text1">NEXT</span>
            <span className="btn-arrow1">→</span>
          </button>
        </Link>

        {/* 產品圖片縮圖 */}
        <div className="product-thumbnails1">
          {productImages.map((image, index) => (
            <div
              key={image.id}
              className={`thumbnail ${index === selectedImage ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>

      {/* 右側主圖區域 - 移到這裡，與product-details1並列 */}
      <div className="main-image-section1">
        <div className="main-image-container1">
          <img src={mainImage} alt="蝴蝶與花朵藝術圖" className="main-image" />
        </div>
      </div>
    </div>
  );
};
export default LaceSeries;
