import "./Footer.css";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const NAV_HEIGHT = 64;

const smoothScrollTo = (targetY, duration = 800) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  const ease = (t) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const time = timestamp - startTime;
    const progress = Math.min(time / duration, 1);

    window.scrollTo(0, startY + diff * ease(progress));

    if (time < duration) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

function Footer() {
  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    smoothScrollTo(
      el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
    );
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <h3>
            UGV<span>DTU</span>
          </h3>
          <p>Autonomous Ground Vehicle Research Team</p>
        </div>

        <div className="footer-center">
          <button onClick={() => go("about")}>About</button>
          <button onClick={() => go("projects")}>Projects</button>
          <button onClick={() => go("sponsors")}>Sponsors</button>
          <button onClick={() => go("team")}>Team</button>
          <button onClick={() => go("visuals")}>Visuals</button>
          <button onClick={() => go("contact")}>Contact</button>
        </div>

        <div className="footer-right">
          <div className="footer-contact">
            <span>📞 +91 7307140847</span>
            <span>✉️ ugv@dtu.ac.in</span>
          </div>

          <div className="footer-socials">
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        WT-2, Wind Tunnel · Delhi Technological University · Delhi – 110042
        <br />
        © {new Date().getFullYear()} UGV Tech Team
      </div>

      <div className="footer-credit">UGV dev · ankit kumar roy</div>
    </footer>
  );
}

export default Footer;