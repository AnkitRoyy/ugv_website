import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Team.css";

gsap.registerPlugin(ScrollTrigger);

const COUNCIL = [
  {
    name: "Vedant Singh",
    role: "Captian",
    image: "https://i.pravatar.cc/300?img=14",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Yuvraj Gupta",
    role: "Vice-Captain",
    image: "https://i.pravatar.cc/300?img=12",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Akshat Rajwansh",
    role: "Team Manager",
    image: "https://i.pravatar.cc/300?img=12",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Gatik Gupta",
    role: "Electrical Head",
    image: "https://i.pravatar.cc/300?img=12",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Hriday Goel",
    role: "Mechanical Head",
    image: "https://i.pravatar.cc/300?img=12",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Daksh Panchal",
    role: "Software Head",
    image: "https://i.pravatar.cc/300?img=3",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Narayan Mishra",
    role: "Corporate Head",
    image: "https://i.pravatar.cc/300?img=12",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Archit Shukla",
    role: "Electrical Co-Head",
    image: "https://i.pravatar.cc/300?img=12",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Aryan Sharma",
    role: "Electrical Co-Head",
    image: "https://i.pravatar.cc/300?img=12",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
];

const DEPARTMENTS = {
  Software: [
    {
      name: "Ankit Kumar Roy",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Darshan M",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Dhruv Bansal",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Kartikay Tayal",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },{
      name: "Kanishka",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=32",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Lakshya Jindal",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Navya Medak",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=32",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Param Sharma",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Shreyansh Agarwal",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Vinayaka Chauhan",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
  ],
  Mechanical: [
    {
      name: "Anusri Yadav",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=32",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Arnab Nayak",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Eklavya Singh",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Harshit R Kumar",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Harshit Tokas",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Kartikey",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Prakhar Mishra",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Sameer Tandon",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Saurabh",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Shivam",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Sourabh Jha",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Utkarsh Chandra Bacchal",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
  ],
  Electrical: [
   
    {
      name: "Anubhav",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Ayush Kumar",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Harshit Tyagi",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Jagdish",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Manaan Tyagi",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Sanchit",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Sarthak Singh",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Siddhesh",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Vishwesh Soni",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=68",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
  ],
  Corporate: [
    {
      name: "Ananya Tripathi",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=32",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Apeksha Singh",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=32",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Bhuvi Malhotra",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=32",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Shivangi K Jha",
      role: "Member",
      image: "https://i.pravatar.cc/300?img=32",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
  ],
};

function Team() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".team-card").forEach((card) => {
        const img = card.querySelector(".team-img");
        const text = card.querySelector(".team-info");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "transform",
        })
          .from(
            img,
            {
              opacity: 0,
              y: 20,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .from(
            text.children,
            {
              opacity: 0,
              y: 20,
              stagger: 0.08,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.25"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderCards = (list) =>
    list.map((m) => (
      <div className="team-card" key={m.name}>
        <div className="team-img">
          <img src={m.image} alt={m.name} />
        </div>

        <div className="team-info">
          <h3>{m.name}</h3>
          <p>{m.role}</p>

          <div className="team-socials">
            <a href={m.instagram} target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href={m.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    ));

  return (
    <section id="team" className="team" ref={sectionRef}>
      <div className="team-glass-bg" />

      <div className="team-container">
        <div className="team-council-block">
            <h2 className="team-section-title ">Team Council</h2>
            <div className="team-grid">{renderCards(COUNCIL)}</div>
        </div>

        {Object.entries(DEPARTMENTS).map(([dept, members]) => (
          <div key={dept} className="team-department">
            <h3 className="team-section-title">{dept} Team</h3>
            <div className="team-grid">{renderCards(members)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;