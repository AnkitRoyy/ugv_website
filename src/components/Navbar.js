import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const MENU_ALL = [
  { label: "Home", path: "/" },
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

const MENU_PRIMARY = [
  { label: "Home", path: "/" },
  { label: "ISDC", path: "/isdc" },
  { label: "Blogs", path: "/blogs" },
];

const smoothScrollTo = (targetY, duration = 1000) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  const easeInOut = (t) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const time = timestamp - startTime;
    const progress = Math.min(time / duration, 1);
    const eased = easeInOut(progress);

    window.scrollTo(0, startY + diff * eased);
    if (time < duration) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState("desktop");
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mobileMQ = window.matchMedia("(max-width: 767px)");
    const tabletMQ = window.matchMedia("(max-width: 1260px)");

    const updateMode = () => {
      if (mobileMQ.matches) setMode("mobile");
      else if (tabletMQ.matches) setMode("tablet");
      else setMode("desktop");
    };

    updateMode();
    mobileMQ.addEventListener("change", updateMode);
    tabletMQ.addEventListener("change", updateMode);

    return () => {
      mobileMQ.removeEventListener("change", updateMode);
      tabletMQ.removeEventListener("change", updateMode);
    };
  }, []);

  const currentMenu = mode === "desktop" ? MENU_ALL : MENU_PRIMARY;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(y, 1000);
  };
  const handleClick = (item, index) => {
    setActiveIndex(index);
    setMenuOpen(false);
    setIsAutoScrolling(true);
    setTimeout(() => setIsAutoScrolling(false), 1100);

    if (item.label === "Home") {
      const go = () => smoothScrollTo(0, 1000);
      if (window.location.pathname === "/") go();
      else {
        navigate("/");
        setTimeout(go, 120);
      }
      return;
    }

    if (item.id) {
      const go = () => scrollToSection(item.id);
      if (window.location.pathname === "/") go();
      else {
        navigate("/");
        setTimeout(go, 120);
      }
      return;
    }

    if (item.path) navigate(item.path);
  };

  useEffect(() => {
    if (mode !== "desktop") return;

    const observers = [];

    MENU_ALL.forEach((item, index) => {
      if (!item.id) return;

      const el = document.getElementById(item.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isAutoScrolling) {
            setActiveIndex(index);
          }
        },
        {
          root: null,
          rootMargin: "-45% 0px -45% 0px", 
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [mode, isAutoScrolling]);

  useEffect(() => {
    if (mode !== "desktop") return;

    const onScroll = () => {
      if (!isAutoScrolling && window.scrollY < 120) {
        setActiveIndex(0);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode, isAutoScrolling]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
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
            style={{
              transform: `translateX(${activeIndex * (96 + 8)}px)`,
            }}
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