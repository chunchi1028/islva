import React from "react";
import Picture_carousel from "../components/Picture_carousel";

const About = () => {
  return (
    <div className="about_container">
      <div className="about_banner">
        <div className="about_carousel">
          <Picture_carousel />
        </div>
        <div className="about_banner_title">
          <span className="about-banner-en">About</span>
          <span className="about-banner-divider">/</span>
          <span className="about-banner-ch">關於我們</span>
        </div>
      </div>
      <div className="about_intro">
        <p>
          在光影與材質交錯之間，ISLVA誕生了。
          <br />
          對我們而言，飾品並非僅是外在的點綴，而是一種能與心靈共鳴的語言。
          <br />
          每一道紋理、每一次打磨，都是時間留下的低語，將靈感與故事封存其中。
          <br />
          在ISLVA，我們追尋的不只是美學，更是讓美成為日常的可能。
        </p>
        <img src="#" alt="" />
        <img src="#" alt="" />
        <img src="#" alt="" />
      </div>
      <div className="origin">
        <div className="origin_text">
          <h3>初心</h3>
          <img src="./images/line.png" alt="" />
          <p>
            ISLVA
            誕生於對銀飾的純粹熱愛與對美感生活的追尋。我們相信，每一件飾品不只是裝飾，而是一種日常與自我之間的對話。
            <br />
            從最初的靈感發芽，到最後將成品打磨成形，我們希望透過細膩的設計與溫潤的手感，讓佩戴者在日常裡感受到微小卻真切的幸福。
            <br />
            ISLVA的初心，不僅是做出好看的飾品，而是讓每一件作品都能陪伴你，見證生活的光影與情感。
          </p>
        </div>
        <div className="deco_num01">
          <img src="./images/deco/numb01.png" alt="" />
        </div>
        <div className="deco_text">
          <p>Origin</p>
        </div>
      </div>
      <div className="philosophy">
        <div className="philosophy_text">
          <h3>理念</h3>
          <img src="./images/line.png" alt="" />
          <p>
            我們的理念，源於「形式與情感的平衡」。在設計上，我們追求極簡卻不冷漠、優雅卻不遙遠的美感。
            <br />
            純銀、琺瑯、寶石鑲嵌等不同材質在我們手中交織，彼此呼應卻又保有獨立個性。
            <br />
            ISLVA
            相信，飾品不該只是短暫的流行，而應是能跨越時間的陪伴。因此，我們在每一次設計中，
            <br />
            都傾注了「恆久」與「個人化」的思考，讓每件作品都能成為你生命中專屬的印記。
          </p>
        </div>
        <div className="deco_num02">
          <img src="./images/deco/numb02.png" alt="" />
        </div>
        <div className="deco_text02">
          <p>Philosophy</p>
        </div>
      </div>
      <div className="craftmanship">
        <div className="craftmanship_text">
          <h3>工藝</h3>
          <img src="./images/line.png" alt="" />
          <p>
            ISLVA
            的每一件作品，皆由工匠之手反覆淬鍊而成。我們重視手工的痕跡，因為那是溫度的證明。
            <br />
            打磨、敲擊、鑲嵌，每一道工序都承載著耐心與專注。我們相信，工藝不只是技術，更是一種修行。
            <br />
            每個細節、每個紋理，都是我們對品質的堅持。無論是純銀的光澤、琺瑯的色彩層疊，或是寶石的穩固鑲嵌，都在在體現我們對「工藝之美」的執著與尊重。
          </p>
        </div>
        <div className="deco_num03">
          <img src="./images/deco/numb03.png" alt="" />
        </div>
        <div className="deco_text03">
          <p>Craftmanship</p>
        </div>
      </div>
      <div className="spirit">
        <div className="spirit_text">
          <h3>精神</h3>
          <img src="./images/line.png" alt="" />
          <p>
            ISLVA的精神,是讓「靈感持特漬流動」。我們相信，靈感不是突如其來的奇績,而是日常中隨處可見的細節:
            <br />
            陽光灑落的角度、城市建築的幾何線條、自然生物的形態與力量·ISLVA希望飾品能成為一種靈前前的延續,
            <br />
            ISLVA 陪伴每位佩戴者去發現、去感受，並最終轉化為屬於自己的人生故事。
          </p>
        </div>
        <div className="deco_num04">
          <img src="./images/deco/numb04.png" alt="" />
        </div>
        <div className="deco_text04">
          <p>Spirit</p>
        </div>
      </div>
    </div>
  );
};

export default About;
