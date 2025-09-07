import { Link } from "react-router-dom";

const CarouselCard = ({ card, isActive }) => {
  return (
    <div className={`carousel-card ${isActive ? "active" : ""}`}>
      <div className="card-content" style={{ borderColor: card.color }}>
        <div className="card-title-box" style={{ backgroundColor: card.color }}>
          <span>{card.title}</span>
        </div>
        <img src={card.image} alt={card.title} className="card-image" />
      </div>
      {isActive && (
        <Link
          to="#"
          className="learn-more-btn"
          style={{ backgroundColor: card.color }}
        >
          Learn More
        </Link>
      )}
    </div>
  );
};

export default CarouselCard;
