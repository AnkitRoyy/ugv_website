import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const MENU_ALL = [
  { label: "Home", path: "/" },
  { label: "ISDC", path: "/isdc" },
  { label: "Blogs", path: "/blogs" },
  { label: "About" },
  { label: "Projects" },
  { label: "Team" },
  { label: "Join" },
  { label: "Contact" },
];

const MENU_PRIMARY = [
  { label: "Home", path: "/" },
  { label: "ISDC", path: "/isdc" },
  { label: "Blogs", path: "/blogs" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState("desktop"); // desktop | tablet | mobile

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateMode = () => {
      const w = window.innerWidth;
      if (w < 768) setMode("mobile");
      else if (w <= 1023) setMode("tablet");
      else setMode("desktop");
    };

    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  const currentMenu =
    mode === "desktop" ? MENU_ALL : MENU_PRIMARY;

  const handleClick = (item, index) => {
    setActiveIndex(index);
    setMenuOpen(false);
    navigate(item.path);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* LOGO */}
      <div
        className="nav-logo"
        onClick={() => handleClick(currentMenu[0], 0)}
      >
        UGV-<span>DTU</span>
      </div>

      {(mode === "desktop" || mode === "tablet") && (
        <ul className="nav-links">
          <span
            className="pill-indicator"
            style={{ transform: `translateX(${activeIndex * 104}px)` }}
          />
          {currentMenu.map((item, index) => (
            <li
              key={item.label}
              className="nav-pill"
              onClick={() => handleClick(item, index)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {mode === "mobile" && (
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      )}

      {mode === "mobile" && menuOpen && (
        <div className="mobile-menu">
          {MENU_PRIMARY.map((item, index) => (
            <div
              key={item.label}
              className="mobile-item"
              onClick={() => handleClick(item, index)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
