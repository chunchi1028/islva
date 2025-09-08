import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false); // 手機整體開合
  const [openMenu, setOpenMenu] = useState(null); // "collection" | "glossary" | null
  const navRef = useRef(null);

  const toggleMenu = (name) => {
    setOpenMenu((prev) => (prev === name ? null : name));
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
          ISLVA
        </Link>

        {/* 漢堡鍵（手機） */}
        {/* <button
          className="hamburger"
          aria-label="Toggle navigation"
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button> */}

        {/* 導覽清單 */}
        <nav className={`nav-links ${isNavOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="about" onClick={() => setIsNavOpen(false)}>
                About
              </Link>
            </li>

            {/* Collection */}
            <li
              className={`dropdown ${openMenu === "collection" ? "active" : ""
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
                  <Link to="form" onClick={() => setIsNavOpen(false)}>
                    Form/純銀
                  </Link>
                </li>
                <li>
                  <Link to="lumen" onClick={() => setIsNavOpen(false)}>
                    Lumen/琺瑯
                  </Link>
                </li>
                <li>
                  <Link to="core" onClick={() => setIsNavOpen(false)}>
                    Core/鑲嵌
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                to="shop"
                onClick={() => setIsNavOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop
              </Link>
            </li>


            <li>
              <Link to="glossary" onClick={() => setIsNavOpen(false)}>
                Glossary
              </Link>
            </li>
            {/* Glossary
            <li
              className={`dropdown ${openMenu === "glossary" ? "active" : ""}`}
            >
              <button
                className="menu-btn"
                aria-expanded={openMenu === "glossary"}
                aria-controls="submenu-glossary"
                onClick={() => toggleMenu("glossary")}
              >
                Glossary
                <span className="caret" aria-hidden="true">
                  ▾
                </span>
              </button>
              <ul
                id="submenu-glossary"
                className="submenu"
                hidden={openMenu !== "glossary"}
              >
                <li>
                  <Link to="/material" onClick={() => setIsNavOpen(false)}>
                    Material/材質
                  </Link>
                </li>
                <li>
                  <Link to="/craft" onClick={() => setIsNavOpen(false)}>
                    Craft/工藝
                  </Link>
                </li>
                <li>
                  <Link to="/finish" onClick={() => setIsNavOpen(false)}>
                    Finish/表面效果
                  </Link>
                </li>
                <li>
                  <Link to="/care" onClick={() => setIsNavOpen(false)}>
                    Care/保養方式
                  </Link>
                </li>
              </ul>
            </li> */}

            <li>
              <Link to="member" onClick={() => setIsNavOpen(false)}>
                Member
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
