import GlossaryTab from "../components/GlossaryTab";
import Carousel from "../components/Carousel";

const carouselItems = [
  { title: "Avatar", img: "/images/vyond/avatar.jpg", cta: "Learn More" },
  { title: "Webcam", img: "/images/vyond/webcam.jpg", cta: "Learn More" },
  { title: "Animated", img: "/images/vyond/animated.jpg", cta: "Learn More" },
  { title: "Mixed Media", img: "/images/vyond/mixed.jpg", cta: "Learn More" },
  {
    title: "Photorealistic",
    img: "/images/vyond/photo.jpg",
    cta: "Learn More",
  },
];

export default function GlossaryPage() {
  return (
    <div className="glossary_container">
      <div className="glossary_intro">
        <div className="glossary_intro_desc">
          <h3>材質辭典</h3>
          <p>在這裡，你可以了解關於銀的特性、琺瑯的色彩、<br/>
            寶石的切割與鑲嵌，以及表面處理、工藝技法與保養方式的完整解說。<br/>
            透過它，你能更清楚地認識每一件飾品的細節，讓每一次的佩戴，都多一份理解與連結。</p>
        </div>
      </div>
      <div className="container">
        {/* 上方四個按鈕 + 內容卡 */}
        <GlossaryTab />

        {/* 下方輪播，沿用相同 Card 風格 */}
        <section style={{ marginTop: 24 }}>
          <Carousel
            items={carouselItems}
            autoplay
            interval={3800}
            visibleRadius={2}
          />
        </section>
      </div>
    </div>
  );
}
