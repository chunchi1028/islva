import GlossaryTab from "../components/GlossaryTab";

export default function GlossaryPage() {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 載入輪播資料
  useEffect(() => {
    const loadCarouselData = async () => {
      try {
        //  從 JSON 檔案載入
        const response = await fetch("/data/glossary-carousel.json");
        const data = await response.json();
        setCarouselData(data);

        // 模擬 API 載入延遲
        setTimeout(() => {
          setCarouselData(mockData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("載入輪播資料失败:", error);
        setLoading(false);
      }
    };

    loadCarouselData();
  }, []);

  return (
    <div className="glossary_container">
      <div className="glossary_intro">
        <div className="glossary_intro_desc">
          <h3>材質辭典</h3>
          <p>
            在這裡，你可以了解關於銀的特性、琺瑯的色彩、
            <br />
            寶石的切割與鑲嵌，以及表面處理、工藝技法與保養方式的完整解說。
            <br />
            透過它，你能更清楚地認識每一件飾品的細節，讓每一次的佩戴，都多一份理解與連結。
          </p>
        </div>
      </div>

      <div className="container">
        {/* 上方四個按鈕 + 內容卡 */}
        <GlossaryTab />
      </div>
    </div>
  );
}
