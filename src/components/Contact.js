import { useEffect, useRef, useState } from "react";
import "./Contact.css";

function Contact() {
  const ref = useRef(null);
  const bgRef = useRef(null);
  const [active, setActive] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.35 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!bgRef.current) return;

    let rafId;
    let targetX = 70;
    let targetY = 30;
    let currentX = 70;
    let currentY = 30;

    const randomizeTarget = () => {
      targetX = 60 + Math.random() * 20;
      targetY = 20 + Math.random() * 20;
    };

    randomizeTarget();
    const interval = setInterval(randomizeTarget, 2000);

    const animate = () => {
      currentX += (targetX - currentX) * 0.01;
      currentY += (targetY - currentY) * 0.01;

      bgRef.current.style.setProperty("--gx", `${currentX}%`);
      bgRef.current.style.setProperty("--gy", `${currentY}%`);

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(interval);
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;

    if (!name || !email || !subject || !message) {
      alert("Please fill all fields");
      return;
    }

    const mailtoLink = `mailto:ankitkumarroy2007@gmail.com
      ?subject=${encodeURIComponent(subject)}
      &body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      )}`;

    window.location.href = mailtoLink;
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`contact ${active ? "reveal" : ""}`}
    >
      <div ref={bgRef} className="contact-bg" />

      <div className="contact-wrapper">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>
            Collaborations, sponsorships, research ideas, or just a hello.
            We’d love to hear from you.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message →</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;