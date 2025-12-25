import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "ASHWINI",
    desc: "A fully autonomous unmanned ground vehicle capable of navigation, obstacle avoidance, and real-world terrain traversal using sensor fusion.",
    image: "https://images.unsplash.com/photo-1581091870627-3c7b3c2c6f1f",
  },
  {
    title: "Valkyrie",
    desc: "Valkyrie is UGV-DTU's autonomous drone designed specifically for the International Space Drone Challenge 2026. This section will soon describe its architecture, sensors, autonomy stack and mission capabilities in more detail.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    title: "CENTAUR",
    desc: "CENTAUR, our first autonomous rover, marked UGV-DTU’s beginning — a bold step into the world of self-driving robotics and mechanical innovation.",
    image: "https://images.unsplash.com/photo-1581092334514-1e7e4b62d53a",
  },
  {
    title: "AIRAWAT",
    desc: "AIRAWAT followed, introducing advanced vision and localization, turning stability and reliability into our new engineering standards.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
  },
];

// preload images
PROJECTS.forEach((p) => {
  const img = new Image();
  img.src = p.image;
});

function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 85%",
        },
      });

      gsap.utils.toArray(".project-row").forEach((row, i) => {
        const text = row.querySelector(".project-text");
        const image = row.querySelector(".project-image");
        const underline = row.querySelector(".title-underline");

        const fromX = i % 2 === 0 ? -140 : 140;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(text, {
          opacity: 0,
          x: fromX,
          scale: 0.96,
          duration: 1.1,
          ease: "power4.out",
        })
          .from(
            image,
            {
              opacity: 0,
              x: -fromX,
              scale: 1.08,
              duration: 1.1,
              ease: "power4.out",
            },
            "-=0.8"
          )
          .to(
            underline,
            {
              width: "70%",
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.6"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects-glass-bg" />

      <div className="projects-container">
        <h2 className="projects-heading">Projects</h2>

        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className={`project-row ${i % 2 ? "reverse" : ""}`}
          >
            <div className="project-text">
              <h3>
                <span className="title-text">
                  {p.title}
                  <span className="title-underline" />
                </span>
              </h3>
              <p>{p.desc}</p>
            </div>

            <div className="project-image">
              <img src={p.image} alt={p.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;