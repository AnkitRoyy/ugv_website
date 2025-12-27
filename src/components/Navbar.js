import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const MENU_ALL = [
  { label: "Home", id: "home", path: "/" },
  { label: "ISDC", path: "/isdc" },
  { label: "Blogs", path: "/blogs" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Sponsors", id: "sponsors" },
  { label: "Team", id: "team" },
  { label: "Visuals", id: "visuals" },
  { label: "Join", id: "join" },
  { label: "Contact", id: "contact" },
];

const MENU_PRIMARY = MENU_ALL.slice(0, 3);

const smoothScrollTo = (targetY, duration = 900) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start = null;

  const ease = (t) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const step = (time) => {
    if (!start) start = time;
    const p = Math.min((time - start) / duration, 1);
    window.scrollTo(0, startY + diff * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState("desktop");

  const isHome = location.pathname === "/";
  const clickLock = useRef(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const t = window.matchMedia("(max-width: 1260px)");
    const u = () =>
      setMode(m.matches ? "mobile" : t.matches ? "tablet" : "desktop");
    u();
    m.addEventListener("change", u);
    t.addEventListener("change", u);
    return () => {
      m.removeEventListener("change", u);
      t.removeEventListener("change", u);
    };
  }, []);

  const currentMenu = mode === "desktop" ? MENU_ALL : MENU_PRIMARY;

  useEffect(() => {
    if (isHome) return;

    const idx = MENU_ALL.findIndex(
      (m) =>
        m.path &&
        (location.pathname === m.path ||
          location.pathname.startsWith(m.path + "/"))
    );

    if (idx !== -1) {
      setActiveIndex(idx);
    }
  }, [location.pathname, isHome]);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return;

        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = MENU_ALL.findIndex(
              (m) => m.id === e.target.id
            );
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    MENU_ALL.forEach((m) => {
      if (!m.id) return;
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleClick = (item, index) => {
    clickLock.current = true;
    setActiveIndex(index);
    setMenuOpen(false);

    if (item.label === "Home") {
      navigate("/");
      setTimeout(() => {
        smoothScrollTo(0);
        setTimeout(() => (clickLock.current = false), 600);
      }, 120);
      return;
    }

    if (item.id) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(item.id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY;
          smoothScrollTo(y);
        }
        setTimeout(() => (clickLock.current = false), 600);
      }, 220);
      return;
    }

    if (item.path) {
      navigate(item.path);
      setTimeout(() => (clickLock.current = false), 500);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div
        className="nav-logo"
        onClick={() => handleClick(MENU_ALL[0], 0)}
      >
        UGV-<span>DTU</span>
      </div>

      {(mode === "desktop" || mode === "tablet") && (
        <ul className="nav-links">
          <span
            className="pill-indicator"
            style={{
              transform: `translateX(${activeIndex * 104}px)`,
              transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
            }}
          />
          {currentMenu.map((item, i) => (
            <li
              key={item.label}
              className="nav-pill"
              onClick={() => handleClick(item, i)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {mode === "mobile" && (
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
        >
          <span />
          <span />
          <span />
        </button>
      )}

      {mode === "mobile" && menuOpen && (
        <div className="mobile-menu">
          {MENU_PRIMARY.map((item, i) => (
            <div
              key={item.label}
              className="mobile-item"
              onClick={() => handleClick(item, i)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
