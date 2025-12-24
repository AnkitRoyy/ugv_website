import { useEffect, useState } from "react";
import "./Home.css";

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
  /* typewriter */
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [c, setC] = useState(0);
  const [del, setDel] = useState(false);

  /* slideshow */
  const [active, setActive] = useState(0);

  useEffect(() => {
    const current = sentences[i];
    let t;

    if (!del && c < current.length) {
      t = setTimeout(() => {
        setText(current.slice(0, c + 1));
        setC(c + 1);
      }, 55);
    } else if (del && c > 0) {
      t = setTimeout(() => {
        setText(current.slice(0, c - 1));
        setC(c - 1);
      }, 35);
    } else if (!del && c === current.length) {
      t = setTimeout(() => setDel(true), 1200);
    } else {
      setDel(false);
      setI((i + 1) % sentences.length);
    }

    return () => clearTimeout(t);
  }, [c, del, i]);

  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % images.length),
      6500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="home-landing">
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
          <button className="landing-btn secondary">See the Team</button>
        </div>
      </div>

      <div className="landing-right">
        <div className="slideshow">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="UGV project"
              className={`slide ${idx === active ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
