import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <h1 className="footer-logo">ISLVA</h1>
            <p className="footer-tagline">
              Silver. Still. Essential.
              <br />
              Crafted in silence. Worn with soul.
            </p>
          </div>
          <div className="footer-links">
            <ul>
              {/* 將 <a> 替換為 <Link> 並使用 to="..." */}
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/collections">Collections</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/glossary">Glossary</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-copyright">
          <p>ISLVA©2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
