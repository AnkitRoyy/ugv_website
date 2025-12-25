import { useEffect, useRef, useState } from "react";
import "./Join.css";

function Join() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="join"
      ref={ref}
      className={`join ${active ? "reveal" : ""}`}
    >
      <div className="join-bg" />

      <div className="join-viewport">
        <div className="join-glass">
          <h2 className="join-title">Join UGV Tech Team</h2>

          <p className="join-subtitle">
            Be part of a multidisciplinary robotics team building autonomous
            ground vehicles at Delhi Technological University.
          </p>

          <div className="join-points">
            <div className="join-point">
              <h4>Hands-on Engineering</h4>
              <p>
                Work directly with autonomous systems, sensors, control
                pipelines, and real-world robotics challenges.
              </p>
            </div>

            <div className="join-point">
              <h4>Cross-disciplinary Team</h4>
              <p>
                Software, mechanical, electrical, and corporate teams working
                together as one unit.
              </p>
            </div>

            <div className="join-point">
              <h4>Research & Competitions</h4>
              <p>
                Exposure to research-driven development and national-level
                robotics competitions.
              </p>
            </div>
          </div>

          <div className="join-notice">
            <span className="join-status-dot" />
            Recruitment for 2025 is closed.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Join;