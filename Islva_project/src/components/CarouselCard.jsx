export default function Card({
  title,
  subtitle,
  img,
  cta,
  onClick,
  active = false,
  children, // 也能放自訂內容
}) {
  return (
    <article className={`card ${active ? "is-active" : ""}`} onClick={onClick}>
      {img && (
        <div className="card__media">
          <img src={img} alt={title || ""} loading="lazy" />
        </div>
      )}
      <div className="card__body">
        {title && <h4 className="card__title">{title}</h4>}
        {subtitle && <p className="card__sub">{subtitle}</p>}
        {children}
        {cta && (
          <button className="card__cta" type="button">
            {cta}
          </button>
        )}
      </div>
    </article>
  );
}
