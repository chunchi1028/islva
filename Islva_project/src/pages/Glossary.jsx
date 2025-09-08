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
    <main className="container">
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
    </main>
  );
}
