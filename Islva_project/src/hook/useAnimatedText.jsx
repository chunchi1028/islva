import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const useAnimatedText = (options = {}) => {
  const {
    autoPlay = true,
    delay = 500,
    threshold = 0.5,
    preventInitialRepeat = true, // 新增：防止初始重複播放
    leftEnglishDuration = 1.2,
    leftChineseDuration = 1,
    rightEnglishDuration = 1.2,
    rightChineseDuration = 1,
    leftEnglishStagger = 0.08,
    leftChineseStagger = 0.06,
    rightEnglishStagger = { amount: 0.8, from: "end" },
    rightChineseStagger = 0.06,
  } = options;

  const heroRef = useRef(null);
  const observerRef = useRef(null);
  const timelineRef = useRef(null);
  const autoPlayTriggeredRef = useRef(false); // 記錄 autoPlay 是否已觸發
  const scrollPlayEnabledRef = useRef(false); // 記錄是否啟用滾動播放

  // 分割文字函數
  const splitTextToChars = (element) => {
    const text = element.dataset.text;
    if (!text) return;

    element.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char === " ") {
        const space = document.createElement("span");
        space.className = "space";
        space.innerHTML = "&nbsp;";
        element.appendChild(space);
      } else if (char === "|") {
        const breakEl = document.createElement("br");
        breakEl.className = "break";
        element.appendChild(breakEl);
      } else {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = char;
        element.appendChild(span);
      }
    }
  };

  // 播放動畫
  const playAnimation = (isAutoPlay = false) => {
    // 如果是 autoPlay 觸發，且已經自動播放過，則不播放
    if (isAutoPlay && preventInitialRepeat && autoPlayTriggeredRef.current) {
      return;
    }

    // 如果有正在執行的動畫，先停止它
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (isAutoPlay) {
          autoPlayTriggeredRef.current = true; // 標記 autoPlay 已觸發
          // autoPlay 完成後，啟用滾動播放
          setTimeout(() => {
            scrollPlayEnabledRef.current = true;
          }, 1000); // 給一點延遲，避免立即滾動觸發
        }
      }
    });
    timelineRef.current = tl;

    // 限制選擇器範圍到當前組件
    const container = heroRef.current;
    if (!container) return;

    // 重置所有字元
    gsap.set(container.querySelectorAll(".char"), {
      opacity: 0,
      scale: 0.3,
      y: 60,
      rotationX: 90,
      transformOrigin: "50% 50%",
    });

    // 左側英文
    const leftEnglishChars = container.querySelectorAll(
      ".hero-text-left .english-caption .char"
    );
    tl.to(leftEnglishChars, {
      duration: leftEnglishDuration,
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
      ease: "back.out(1.7)",
      stagger: leftEnglishStagger,
    });

    // 左側中文
    const leftChineseChars = container.querySelectorAll(
      ".hero-text-left .chinese-caption .char"
    );
    tl.to(
      leftChineseChars,
      {
        duration: leftChineseDuration,
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        ease: "power2.out",
        stagger: leftChineseStagger,
      },
      "-=0.6"
    );

    // 右側英文
    const rightEnglishChars = container.querySelectorAll(
      ".hero-text-right .english-caption .char"
    );
    tl.to(
      rightEnglishChars,
      {
        duration: rightEnglishDuration,
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        ease: "back.out(1.7)",
        stagger: rightEnglishStagger,
      },
      "-=0.4"
    );

    // 右側中文
    const rightChineseChars = container.querySelectorAll(
      ".hero-text-right .chinese-caption .char"
    );
    tl.to(
      rightChineseChars,
      {
        duration: rightChineseDuration,
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        ease: "power2.out",
        stagger: rightChineseStagger,
      },
      "-=0.6"
    );

    return tl;
  };

  // 設置滾動觸發器
  const setupScrollTrigger = () => {
    if (!heroRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 只有在滾動播放啟用後才播放
            if (scrollPlayEnabledRef.current) {
              playAnimation(false); // 不是 autoPlay
            }
          }
        });
      },
      {
        threshold,
      }
    );

    observerRef.current.observe(heroRef.current);
  };

  // 手動觸發動畫
  const triggerAnimation = () => {
    return playAnimation(false);
  };

  // 停止動畫
  const stopAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
  };

  // 重置動畫狀態
  const resetAnimation = () => {
    autoPlayTriggeredRef.current = false;
    scrollPlayEnabledRef.current = false;
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
  };

  useEffect(() => {
    if (!heroRef.current) return;

    // 分割所有文字
    const textElements = heroRef.current.querySelectorAll("[data-text]");
    textElements.forEach(splitTextToChars);

    // 總是設置滾動觸發器
    setupScrollTrigger();

    // 如果啟用自動播放，延遲後播放
    let timer;
    if (autoPlay) {
      timer = setTimeout(() => {
        playAnimation(true); // 標記為 autoPlay
      }, delay);
    } else {
      // 如果不自動播放，立即啟用滾動播放
      scrollPlayEnabledRef.current = true;
    }

    // 清理函數
    return () => {
      if (timer) clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [autoPlay, delay, threshold, preventInitialRepeat]);

  return {
    heroRef,
    playAnimation: triggerAnimation,
    stopAnimation,
    resetAnimation,
    autoPlayTriggered: autoPlayTriggeredRef.current, // 返回 autoPlay 狀態
  };
};
export default useAnimatedText;