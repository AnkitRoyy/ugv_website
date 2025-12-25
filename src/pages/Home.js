import { useEffect, useRef, useState } from "react";
import "./Home.css";
import About from "../components/About.js";

const sentences = [
  "Building autonomous ground vehicles.",
  "Researching perception and navigation.",
  "Engineering real-world robotics systems.",
  "UGV Tech Team of DTU.",
];

const images = [
  "https://media.istockphoto.com/id/1006754478/photo/mars-rover-robotic-space-autonomous-vehicle-on-a-deserted-planet-with-mountains-in-background.jpg?s=612x612&w=0&k=20&c=1rKQ2wCxNqNMND6nDCYRovjAs18yC7a7M-3cXt_BFzU=",
  "https://cdn.mos.cms.futurecdn.net/nfGVDM55qgxoWk6Bn4M4HT-1200-80.jpg",
  "https://c.ndtvimg.com/2023-02/hh8v8sig_drone-generic-getty_625x300_02_February_23.jpg?downsize=545:307",
  "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581091012184-5c7c1e52d3c4?auto=format&fit=crop&w=1200&q=80",
];

function Home() {
  /* typing effect */
  const [text, setText] = useState("");
  const [sIndex, setSIndex] = useState(0);
  const [cIndex, setCIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  /* slideshow */
  const [activeImg, setActiveImg] = useState(0);

  /* visibility state */
  const [visible, setVisible] = useState(false);
  const landingRef = useRef(null);

  /* typing logic */
  useEffect(() => {
    const current = sentences[sIndex];
    let t;

    if (!deleting && cIndex < current.length) {
      t = setTimeout(() => {
        setText(current.slice(0, cIndex + 1));
        setCIndex(cIndex + 1);
      }, 55);
    } else if (deleting && cIndex > 0) {
      t = setTimeout(() => {
        setText(current.slice(0, cIndex - 1));
        setCIndex(cIndex - 1);
      }, 35);
    } else if (!deleting && cIndex === current.length) {
      t = setTimeout(() => setDeleting(true), 1200);
    } else {
      setDeleting(false);
      setSIndex((sIndex + 1) % sentences.length);
    }

    return () => clearTimeout(t);
  }, [cIndex, deleting, sIndex]);

  /* slideshow */
  useEffect(() => {
    const id = setInterval(
      () => setActiveImg((p) => (p + 1) % images.length),
      6500
    );
    return () => clearInterval(id);
  }, []);

  /* intersection observer for landing */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.4, // 40% of landing visible
      }
    );

    if (landingRef.current) observer.observe(landingRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* LANDING SECTION */}
      <section
        ref={landingRef}
        className={`home-landing ${visible ? "show" : "hide"}`}
      >
        <div className="landing-left">
          <h1 className="landing-title">
            UGV Tech Team <span>DTU</span>
          </h1>

          <p className="landing-type">
            {text}
            <span className="cursor">|</span>
          </p>

          <p className="landing-desc">
            We are a multidisciplinary student team focused on designing,
            building, and deploying unmanned ground vehicles for real-world
            applications.
          </p>

          <div className="landing-actions">
            <button className="landing-btn primary">Explore Projects</button>
            <button className="landing-btn secondary">Join the Team</button>
          </div>
        </div>

        <div className="landing-right">
          <div className="slideshow">
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="UGV project"
                className={`slide ${idx === activeImg ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      <About/>
    </>
  );
}

export default Home;