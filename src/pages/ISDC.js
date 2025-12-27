import { useEffect, useRef, useState } from "react";
import "./ISDC.css";

function ISDC() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="isdc"
      className={`isdc ${active ? "reveal" : ""}`}
    >
      <div className="isdc-hero">
        <div className="isdc-hero-bg" />
        <div className="isdc-hero-content">
          <span className="isdc-tag">ISDC 2026</span>
          <h1 className="isdc-title">
            International Space Drone Challenge
          </h1>
          <p className="isdc-subtitle">
            A global robotics competition pushing the limits of fully autonomous
            aerial systems in space-inspired environments.
          </p>
        </div>
      </div>

      <div className="isdc-info">
        <span className="info-tag">ABOUT ISDC</span>
        <p>
          The International Space Drone Challenge (ISDC) is an international
          competition focused on autonomous aerial vehicles capable of operating
          in GPS-denied, space-like environments. Teams are evaluated on
          perception, navigation, autonomy, and mission intelligence without
          human intervention.
        </p>
      </div>

      <div className="isdc-main">
        <div className="valkyrie-grid">
          <div className="valkyrie-text">
            <span className="valkyrie-label">Introducing</span>
            <h2 className="valkyrie-heading">Valkyrie</h2>
            <div className="valkyrie-underline" />

            <p>
              <strong>Valkyrie</strong> is UGV-DTU’s autonomous drone engineered
              specifically for the <strong>International Space Drone Challenge
              2026</strong>.
            </p>

            <p className="muted">
              Designed to operate under extreme constraints, Valkyrie integrates
              advanced onboard perception, autonomy, and mission-level decision
              making.
            </p>

            <p className="classified">
              Architecture, sensors, autonomy stack, and mission capabilities
              will be revealed soon.
            </p>
          </div>

          <div className="valkyrie-visual">
            <img
              src="https://cdn.mos.cms.futurecdn.net/kXUY9hyetVzhZ2scwJP7p3.jpg"
              alt="Valkyrie Drone"
            />
            <div className="valkyrie-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ISDC;