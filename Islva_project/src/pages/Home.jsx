import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import SimpleCarousel from "../components/SimpleCarousel";
import useAnimatedText from "../hook/useAnimatedText";
import useGlossaryAnimation from "../hook/useGlossaryAnimation";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroSectionRef = useRef(null); // 圖片動畫用
  const bgRef = useRef(null);
  const ringRef = useRef(null);

  // 文字動畫 Hook - 使用獨立的 ref
  const { heroRef: textRef } = useAnimatedText({
    autoPlay: true,
    delay: 1000,
    threshold: 0.7, // 調高避免重複觸發
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 769px)",
          mobile: "(max-width: 768px)",
        },
        (context) => {
          const { conditions } = context;
          const isMobile = conditions.mobile;

          // 初始狀態
          gsap.set(bgRef.current, {
            opacity: 0,
            scale: isMobile ? 0.98 : 0.94,

            y: isMobile ? 8 : 24,
            transformOrigin: "50% 50%",
            willChange: "transform, opacity, filter",
          });

          gsap.set(ringRef.current, {
            opacity: 0,
            x: 0,  // 新增
            y: 0,  // 新增
            xPercent: -50,  // 新增，等同於 translate(-50%, -50%)
            yPercent: -50,  // 新增
            y: isMobile ? 14 : 38,
            scale: 1,
            transformOrigin: "50% 50%",
            willChange: "transform, opacity, filter",
          });

          // 進場動畫
          const enterTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: isMobile ? "top 80%" : "top 72%",
              end: "bottom 40%",
              toggleActions: "restart none restart reverse",
            },
            defaults: { ease: "power2.out" },
          });

          enterTl
            .to(
              bgRef.current,
              {
                opacity: 1,
                scale: 1,

                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto",
                immediateRender: false,
              },
              0
            )
            .to(
              ringRef.current,
              {
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                overwrite: "auto",
                immediateRender: false,
              },
              "-=0.2"
            );

          // 視差動畫
          gsap
            .timeline({
              scrollTrigger: {
                trigger: heroSectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              bgRef.current,
              { y: isMobile ? 8 : 26, },
              {
                y: isMobile ? -10 : -18,

                ease: "none",
              },
              0
            )
            .fromTo(
              ringRef.current,
              { y: isMobile ? 4 : 8, scale: 1.0 },
              {
                y: isMobile ? -20 : -60,
                scale: isMobile ? 1.01 : 1.03,
                ease: "none",
              },
              0
            );
        }
      );

      // 圖片載入處理
      const imgs = heroSectionRef.current?.querySelectorAll("img") ?? [];
      imgs.forEach((img) => {
        if (img.complete) return;
        img.addEventListener("load", () => ScrollTrigger.refresh(), {
          once: true,
        });
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // glossary動畫
  const { glossaryRef } = useGlossaryAnimation({
    carouselAnimation: "slide",
    textAnimation: "flyIn",
  });

  return (
    <div className="home_container">
      <div className="main-visual">
        {/* 首頁主視覺 Hero Section */}
        <div className="hero-section" ref={heroSectionRef}>
          {/* 文字容器 - 只包含文字 */}
          <div className="hero-text-container" ref={textRef}>
            <div className="hero-text-left">
              <p
                className="english-caption"
                data-text="Captured in the light of silver"
              ></p>
              <p className="chinese-caption" data-text="光影之間"></p>
            </div>
            <div className="hero-text-right">
              <p
                className="english-caption"
                data-text="Born of|island and forest"
              ></p>
              <p className="chinese-caption" data-text="島嶼森靈的細語"></p>
            </div>
          </div>

          {/* 圖片容器 - 獨立在外面 */}
          <div className="hero-image-container">
            <img
              ref={bgRef}
              src="./images/square-bg.png"
              alt=""
              className="hero-image-bg"
            />
            <img
              ref={ringRef}
              src="./images/butterflyRing.png"
              alt="ISLVA Silver Butterfly Ring"
              className="hero-image"
            />
          </div>
        </div>

        <div className="scroll-arrows">
          <img src="./images/arrow.svg" alt="箭頭" />
        </div>
      </div>

      {/* 其他區塊保持不變 */}
      <div className="collections-section">
        <div className="hero-content-grid">
          <div className="series-title">
            <p className="series-title-num">01</p>
            <div className="series-title-text">
              <span className="series-en">Collections</span>
              <span className="series-divider">/</span>
              <span className="series-ch">系列商品</span>
            </div>
          </div>

          <div className="text-block">
            <p>
              三大系列交織出 ISLVA 的獨特語彙
              <br />
              ——冷冽與溫潤並存，精緻與大膽共鳴，
              <br />
              為配戴者帶來的不僅是飾品，更是
              <br />
              一段關於光、色彩與情感的旅程。
            </p>
            <Link to="/collections" className="cta-btn">
              探索系列
            </Link>
          </div>
          <div className="series-deco-text">
            Each collection is a journey <br />
            through light, color, and emotion.
          </div>
        </div>

        <div className="image-section">
          <div className="image-grid">
            <div className="image-item main-image">
              <Link to="form">
                <img src="./images/series01.jpg" alt="Jewelry" />
              </Link>
            </div>
            <div className="image-item side-image">
              <Link to="lumen">
                <img src="./images/series01.jpg" alt="Jewelry" />
              </Link>
            </div>
            <div className="image-item top-right-image">
              <Link to="core">
                <img src="./images/series01.jpg" alt="Jewelry" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="glossary-section" ref={glossaryRef}>
        <div className="glossary-title">
          <p className="glossary-title-num">02</p>
          <div className="glossary-title-text">
            <span className="glossary-en">Glossary</span>
            <span className="glossary-divider">/</span>
            <span className="glossary-ch">材質辭典</span>
          </div>
        </div>
         <div className="glossary-content">
        <div className="glossary_carousel">
          <SimpleCarousel />
        </div>
        <div className="glossary_description">
          在每一件靜物誕生之前，材質先說了話。
          <br />
          金屬的溫度、石的紋理、琺瑯的流動、銀的光與霧感——
          <br />
          這些，不只是製作材料，更是 ISLVA 詩語中的語言單位。
          <br />
          我們為每一種使用的材質，撰寫了它的名字、質感、來源與氣質。
          <br />
          在這裡，你可以閱讀每一種材質的性格、它在作品中扮演的角色，
          <br />
          理解每一次觸摸、佩戴與創作背後，所包含的記憶與寧靜。
          <Link to="/glossary" className="glossary-btn">
            view more→
          </Link>
        </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-title">
          <p className="about-title-num">03</p>
          <div className="about-title-text">
            <span className="about-en">About</span>
            <span className="about-divider">/</span>
            <span className="about-ch">關於我們</span>
          </div>
        </div>
        <div className="marquee-container">
          <figure className="marquee-content">
            <img src="./images/about/about01.jpg" alt="About Us" />
            <img src="./images/about/about02.jpg" alt="About Us" />
            <img src="./images/about/about03.jpg" alt="About Us" />
            <img src="./images/about/about04.jpg" alt="About Us" />
            <img src="./images/about/about05.jpg" alt="About Us" />
            <img src="./images/about/about01.jpg" alt="About Us" />
            <img src="./images/about/about02.jpg" alt="About Us" />
            <img src="./images/about/about03.jpg" alt="About Us" />
            <img src="./images/about/about04.jpg" alt="About Us" />
            <img src="./images/about/about05.jpg" alt="About Us" />
          </figure>
        </div>
        <div className="about_description">
          在 ISLVA，我們相信飾品不只是裝飾
          <br />
          而是情感與記憶的延伸，一種能隨時間而愈發動人的陪伴。
          <Link to="/about" className="about-btn">
            view more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
