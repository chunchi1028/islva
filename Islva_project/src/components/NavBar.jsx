import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false); // 手機整體開合
  const [openMenu, setOpenMenu] = useState(null); // "collection" | "glossary" | null
  const navRef = useRef(null);

  const toggleMenu = (name) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
    setOpenMenu(null); // 關閉所有下拉選單
  };

  // 點外面關閉
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setIsNavOpen(false);
      }
    };
    document.addEventListener("pointerdown", onClickOutside);
    return () => document.removeEventListener("pointerdown", onClickOutside);
  }, []);

  // Esc 關閉
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setIsNavOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header" ref={navRef}>
      <div className="nav-bar">
        <Link to="/" className="logo" aria-label="Home">
          <img src="./images/logo.svg" alt="" />
        </Link>

        {/* 漢堡按鈕 - 只在平板以下顯示 */}
        <button
          className={`hamburger ${isNavOpen ? "active" : ""}`}
          onClick={toggleNavbar}
          aria-label="Toggle navigation menu"
          aria-expanded={isNavOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* 導覽清單 */}
        <nav className={`nav-links ${isNavOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/about" onClick={() => setIsNavOpen(false)}>
                About
              </Link>
            </li>

            {/* Collection */}
            <li
              className={`dropdown ${
                openMenu === "collection" ? "active" : ""
              }`}
            >
              <button
                className="menu-btn"
                aria-expanded={openMenu === "collection"}
                aria-controls="submenu-collection"
                onClick={() => toggleMenu("collection")}
              >
                Collections
                <span className="caret" aria-hidden="true">
                  ▾
                </span>
              </button>
              <ul
                id="submenu-collection"
                className="submenu"
                hidden={openMenu !== "collection"}
              >
                <li>
                  <Link to="/form" onClick={() => setIsNavOpen(false)}>
                    Form/純銀
                  </Link>
                </li>
                <li>
                  <Link to="/lumen" onClick={() => setIsNavOpen(false)}>
                    Lumen/琺瑯
                  </Link>
                </li>
                <li>
                  <Link to="/core" onClick={() => setIsNavOpen(false)}>
                    Core/鑲嵌
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                to="/shop"
                onClick={() => setIsNavOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop
              </Link>
            </li>

            <li>
              <Link to="/glossary" onClick={() => setIsNavOpen(false)}>
                Glossary
              </Link>
            </li>

            <li>
              <Link to="/login" onClick={() => setIsNavOpen(false)}>
                Member
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
