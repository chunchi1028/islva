import React from "react";

const Form = () => {
  return (
    <div>
      {/* 圖片區 */}
      <div className="form_pic"></div>
      {/* 文字區 */}
      <div className="form_txt">
        <h2>Form</h2>
        <span>/</span>
        <h2>純銀</h2>
      </div>
      <div>
        在簡練的形體之中，蘊藏著銀最純粹的力量。
        <br />
        「Form」是結構與秩序，也是自由與流動， <br />
        以極簡線條勾勒出日常與永恆的輪廓。
      </div>
      <div className="form_intro_txt">
        Form 系列專注於純銀本身的純粹之美。 <br />
        以線條與結構為設計語言，結合細膩的工藝處理， <br />
        從鏡面拋光到紋理刻劃， 每一件作品都以低調的姿態， <br />
        描繪屬於日常的優雅與永恆。
      </div>
    </div>
  );
};

export default Form;
