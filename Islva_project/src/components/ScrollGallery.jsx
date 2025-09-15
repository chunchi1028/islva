import React, { useState, useEffect, useRef } from 'react';
import animalseries from "../data/animalseries.json"

const ScrollGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);
const [arrAnimalSeries] = useState(animalseries);
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;

      const scrollTop = galleryRef.current.scrollTop;
      const itemHeight = galleryRef.current.offsetHeight;
      const currentIndex = Math.floor((scrollTop + itemHeight / 2) / itemHeight);
      
      if (currentIndex >= 0 && currentIndex < animalseries.length) {
        setActiveIndex(currentIndex);
      }
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener('scroll', handleScroll);
      return () => galleryElement.removeEventListener('scroll', handleScroll);
    }
  }, [animalseries.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;

      const scrollTop = galleryRef.current.scrollTop;
      const itemHeight = galleryRef.current.offsetHeight;
      const currentIndex = Math.floor((scrollTop + itemHeight / 2) / itemHeight);
      
      if (currentIndex >= 0 && currentIndex < animalseries.length) {
        setActiveIndex(currentIndex);
      }
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener('scroll', handleScroll);
      return () => galleryElement.removeEventListener('scroll', handleScroll);
    }
  }, [animalseries.length]);

  const currentItem = animalseries[activeIndex];

  return (
    <div style={styles.scrollGallery}>
      <div style={styles.galleryContainer}>
        {/* 左側滾動區域 */}
        <div 
          style={{
            ...styles.scrollSection,
            '::-webkit-scrollbar': { display: 'none' }
          }} 
          ref={galleryRef}
        >
          {animalseries.map((item, index) => (
            <div 
              key={item.id}
              style={{
                ...styles.scrollItem,
                ...(index === activeIndex ? styles.scrollItemActive : {})
              }}
            >
              <div style={styles.scrollItemContent}>
                <img 
                  src={item.mainImage} 
                  alt={item.title}
                  style={{
                    ...styles.mainImage,
                    ...(index === activeIndex ? styles.mainImageActive : {})
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 右側內容區域 */}
        <div style={styles.contentSection}>
          <div style={styles.contentWrapper}>
            <div style={styles.sideImages}>
              {animalseries.map((item, index) => (
                <div 
                  key={item.id}
                  style={{
                    ...styles.sideImageItem,
                    ...(index === activeIndex 
                      ? styles.sideImageItemActive 
                      : styles.sideImageItemInactive
                    )
                  }}
                >
                  <img 
                    src={item.sideImage} 
                    alt={item.title}
                    style={styles.sideImage}
                  />
                </div>
              ))}
            </div>
            
            <div style={styles.contentInfo}>
              <div style={styles.contentText}>
                <div style={styles.category}>{currentItem.category}</div>
                <h2 style={styles.title}>{currentItem.title}</h2>
                <p style={styles.description}>{currentItem.description}</p>
                <button 
                  style={styles.moreBtn}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
                  }}
                >
                  詳情資訊
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollGallery;