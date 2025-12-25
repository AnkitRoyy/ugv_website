import { useEffect, useRef, useState } from "react";
import "./About.css";

function About() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className={`about ${active ? "reveal" : ""}`}>
      <div className="about-viewport">
        <div className="about-glass">
          <h2 className="about-title">About Us</h2>

          <p className="about-intro">
            UGV Tech Team at Delhi Technological University is a student-driven
            robotics team focused on building autonomous ground vehicles for
            real-world research and competitions.
          </p>

          <div className="about-cards">
            <div className="about-card">
              <h3>Autonomy</h3>
              <p>
                Perception, localization, planning, and control systems enabling
                intelligent navigation.
              </p>
            </div>

            <div className="about-card">
              <h3>Robotics Systems</h3>
              <p>
                Mechanical design, electronics, embedded systems, and integration
                of complex robotics platforms.
              </p>
            </div>

            <div className="about-card">
              <h3>Research</h3>
              <p>
                Focused on SLAM, AI-based perception, and robust autonomy through
                experimentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;