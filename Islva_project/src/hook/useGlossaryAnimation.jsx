import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const useGlossaryAnimation = (options = {}) => {
  const {
    autoPlay = true,
    threshold = 0.3,
    carouselAnimation = "slide", // 輪播圖片動畫
    textAnimation = "flyIn", // 文字動畫
  } = options;

  const glossaryRef = useRef(null);
  const observerRef = useRef(null);
  const timelineRef = useRef(null);

  // 分割文字函數（針對段落文字）
  const splitTextToChars = (element) => {
    // 先保存所有的 <br> 標籤位置
    const html = element.innerHTML;
    const parts = html.split("<br>");

    element.innerHTML = "";

    parts.forEach((part, index) => {
      const text = part.trim();
      if (text) {
        // 創建行容器
        const line = document.createElement("span");
        line.className = "text-line";
        line.style.display = "block";

        // 分割每個字符
        for (let i = 0; i < text.length; i++) {
          const char = text[i];

          if (char === " ") {
            const space = document.createElement("span");
            space.className = "space";
            space.innerHTML = "&nbsp;";
            line.appendChild(space);
          } else {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = char;
            line.appendChild(span);
          }
        }

        element.appendChild(line);

        // 如果不是最後一行，添加換行
        if (index < parts.length - 1) {
          element.appendChild(document.createElement("br"));
        }
      }
    });
  };

  // 動畫配置
  const animations = {
    slide: {
      from: { opacity: 0, x: -120, y: 0 },
      to: { opacity: 1, x: 0, y: 0 },
      ease: "power3.out",
    },
    flyIn: {
      from: { opacity: 0, x: 200, y: -50, rotation: 15, scale: 0.9 },
      to: { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 },
      ease: "power2.out",
    },
    fadeUp: {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
      ease: "power2.out",
    },
  };

  // 播放動畫
  const playAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    const container = glossaryRef.current;
    if (!container) return;

    // 獲取動畫配置
    const carouselConfig = animations[carouselAnimation];
    const textConfig = animations[textAnimation];

    // 1. 輪播圖片動畫（從左滑入）
    const carousel = container.querySelector(".glossary_carousel");
    if (carousel) {
      gsap.set(carousel, carouselConfig.from);
      tl.to(
        carousel,
        {
          duration: 1.2,
          ...carouselConfig.to,
          ease: carouselConfig.ease,
        },
        0
      );
    }

    // 2. 文字內容動畫（飛入效果）
    const description = container.querySelector(".glossary_description");
    if (description) {
      // 如果有文字字符，進行字符級動畫
      const chars = description.querySelectorAll(".char");
      if (chars.length > 0) {
        gsap.set(chars, textConfig.from);
        tl.to(
          chars,
          {
            duration: 1.0,
            ...textConfig.to,
            ease: textConfig.ease,
            stagger: 0.02,
          },
          0.4
        );
      } else {
        // 否則進行整體動畫
        gsap.set(description, textConfig.from);
        tl.to(
          description,
          {
            duration: 1.2,
            ...textConfig.to,
            ease: textConfig.ease,
          },
          0.4
        );
      }
    }

    // 3. 按鈕動畫
    const button = container.querySelector(".glossary-btn");
    if (button) {
      gsap.set(button, { opacity: 0, y: 30, scale: 0.9 });
      tl.to(
        button,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "back.out(1.7)",
        },
        1.0
      );
    }

    return tl;
  };

  // 設置滾動觸發器
  const setupScrollTrigger = () => {
    if (!glossaryRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playAnimation();
          }
        });
      },
      { threshold }
    );

    observerRef.current.observe(glossaryRef.current);
  };

  // 手動觸發動畫
  const triggerAnimation = () => playAnimation();

  // 停止動畫
  const stopAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
  };

  useEffect(() => {
    if (!glossaryRef.current) return;

    // 如果需要字符級動畫，分割文字
    const description = glossaryRef.current.querySelector(
      ".glossary_description"
    );
    if (description && textAnimation === "flyIn") {
      // 只對主要段落進行字符分割，保留 Link
      const textNodes = [];
      Array.from(description.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          textNodes.push(node);
        }
      });

      // 這裡可以選擇是否進行字符分割
      // 建議先用整體動畫，效果更穩定
    }

    setupScrollTrigger();

    if (autoPlay) {
      // 稍微延遲，讓元素完全渲染
      setTimeout(playAnimation, 100);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [autoPlay, threshold]);

  return {
    glossaryRef,
    playAnimation: triggerAnimation,
    stopAnimation,
  };
};

export default useGlossaryAnimation;
