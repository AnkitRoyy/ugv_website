import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Sponsors.css";

gsap.registerPlugin(ScrollTrigger);

const SPONSORS = [
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Google",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMECZCru4FlHhthGA1m0grcqnB_aJhoMyPbA&s",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
];

// preload logos
SPONSORS.forEach((s) => {
  const img = new Image();
  img.src = s.logo;
});

function Sponsors() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".sponsors-heading", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          ".sponsors-underline",
          {
            width: "72px",
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .from(
          ".sponsors-sub",
          {
            opacity: 0,
            y: 14,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.15"
        );

      gsap.fromTo(
        ".sponsor-logo",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sponsors-logos",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.to(".sponsors-logos", {
  y: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".sponsors",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

gsap.fromTo(
  ".sponsors-cta",
  {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".sponsors-cta",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  }
);
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="sponsors" className="sponsors" ref={sectionRef}>
      <div className="sponsors-glass-bg" />

      <div className="sponsors-container">
        <div className="sponsors-header">
          <h2 className="sponsors-heading">
            Sponsors
            <span className="sponsors-underline" />
          </h2>

          <p className="sponsors-sub">
            Organizations supporting innovation and research
          </p>
        </div>

        <div className="sponsors-logos">
          {SPONSORS.map((s) => (
            <div key={s.name} className="sponsor-logo">
              <img src={s.logo} alt={s.name} />
            </div>
          ))}
        </div>
      </div>
      <div className="sponsors-cta">
  <p>Interested in supporting innovation and research?</p>
  <button>Become a Sponsor</button>
</div>
    </section>
  );
}

export default Sponsors;