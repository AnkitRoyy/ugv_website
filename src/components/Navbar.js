import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

/* ===============================
   MENU CONFIG
   =============================== */
const MENU_ALL = [
  { label: "Home", path: "/" },
  { label: "ISDC", path: "/isdc" },
  { label: "Blogs", path: "/blogs" },
  { label: "About" },
  { label: "Projects" },
  { label: "Sponsors" },
  { label: "Team" },
  { label: "Visuals" },
  { label: "Join" },
  { label: "Contact" },
];

const MENU_PRIMARY = [
  { label: "Home", path: "/" },
  { label: "ISDC", path: "/isdc" },
  { label: "Blogs", path: "/blogs" },
];

/* ===============================
   SLOW SMOOTH SCROLL (ENGINE)
   =============================== */
const smoothScrollTo = (targetY, duration = 1000) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  const easeInOut = (t) =>
    t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;

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

  const navigate = useNavigate();

  /* ===============================
     SCROLL BLUR
     =============================== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===============================
     BREAKPOINT SYNC
     =============================== */
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

  const currentMenu =
    mode === "desktop" ? MENU_ALL : MENU_PRIMARY;

  /* ===============================
     MENU CLICK HANDLER
     =============================== */
  const handleClick = (item, index) => {
    setActiveIndex(index);
    setMenuOpen(false);

    /* 🔥 HOME → smooth scroll to top */
    if (item.label === "Home") {
      const scrollToTop = () => {
        smoothScrollTo(0, 1000);
      };

      if (window.location.pathname === "/") {
        scrollToTop();
      } else {
        navigate("/");
        setTimeout(scrollToTop, 120);
      }
      return;
    }

    /* 🔥 ABOUT → smooth scroll to section */
    if (item.label === "About") {
      const scrollToAbout = () => {
        const el = document.getElementById("about");
        if (!el) return;

        const navHeight = 64;
        const y =
          el.getBoundingClientRect().top +
          window.scrollY -
          navHeight;

        smoothScrollTo(y, 1000);
      };

      if (window.location.pathname === "/") {
        scrollToAbout();
      } else {
        navigate("/");
        setTimeout(scrollToAbout, 120);
      }
      return;
    }

    /* NORMAL ROUTES */
    if (item.path) {
      navigate(item.path);
    }
  };

  /* ===============================
     RENDER
     =============================== */
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* LOGO */}
      <div
        className="nav-logo"
        onClick={() => handleClick(currentMenu[0], 0)}
      >
        UGV-<span>DTU</span>
      </div>

      {/* DESKTOP + TABLET */}
      {(mode === "desktop" || mode === "tablet") && (
        <ul className="nav-links">
          <span
            className="pill-indicator"
            style={{
              transform: `translateX(${
                activeIndex * (96 + 8)
              }px)`,
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

      {/* MOBILE */}
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