import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Glass({ children, style = {}, hover = true }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered && hover ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20,
        transition: "all 0.3s ease",
        transform: hovered && hover ? "translateY(-4px)" : "none",
        boxShadow: hovered && hover ? "0 20px 60px rgba(59,130,246,0.15)" : "0 4px 24px rgba(0,0,0,0.3)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ tag, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <div style={{
        display: "inline-block", fontFamily: "'Space Mono', monospace",
        fontSize: 11, letterSpacing: 4, textTransform: "uppercase",
        color: "#3B82F6", marginBottom: 12,
        padding: "6px 16px", border: "1px solid rgba(59,130,246,0.3)",
        borderRadius: 99, background: "rgba(59,130,246,0.07)",
      }}>
        {tag}
      </div>
      <h2 style={{
        fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 5vw, 48px)",
        fontWeight: 800, color: "#F9FAFB", lineHeight: 1.1, marginBottom: 16,
      }}>{title}</h2>
      {sub && <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 760, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const root = document.documentElement;
      const value = (root.scrollTop / (root.scrollHeight - root.clientHeight)) * 100;
      setProgress(Number.isFinite(value) ? value : 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 999, background: "rgba(255,255,255,0.04)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #22D3EE)", boxShadow: "0 0 8px #8B5CF6" }} />
    </div>
  );
}

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let rx = 0;
    let ry = 0;

    const move = (event) => {
      const { clientX: x, clientY: y } = event;
      if (dot.current) {
        dot.current.style.left = `${x}px`;
        dot.current.style.top = `${y}px`;
      }
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (ring.current) {
        ring.current.style.left = `${rx}px`;
        ring.current.style.top = `${ry}px`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dot} style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, width: 8, height: 8, borderRadius: "50%", background: "#22D3EE", transform: "translate(-50%,-50%)", boxShadow: "0 0 12px #22D3EE" }} />
      <div ref={ring} style={{ position: "fixed", pointerEvents: "none", zIndex: 9998, width: 32, height: 32, borderRadius: "50%", border: "1.5px solid rgba(59,130,246,0.6)", transform: "translate(-50%,-50%)", transition: "left 0.08s ease, top 0.08s ease" }} />
    </>
  );
}

function MouseGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const move = (event) => {
      if (ref.current) {
        ref.current.style.left = `${event.clientX}px`;
        ref.current.style.top = `${event.clientY}px`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={ref} style={{ position: "fixed", pointerEvents: "none", zIndex: 1, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", transform: "translate(-50%,-50%)", transition: "left 0.12s ease, top 0.12s ease" }} />
  );
}

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const points = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let animationFrame;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(59,130,246,${point.alpha})`;
        context.fill();
      });
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

const EDUCATION_TIMELINE = [
  {
    year: "2021 — Present",
    title: "B.Sc. in Computer Science & Engineering",
    institution: "Varendra University, Rajshahi",
    detail: "Currently in the 3rd year, 6th semester. CGPA: [4.00]/4.00.",
  },
  {
    year: "2020",
    title: "Higher Secondary Certificate (Science)",
    institution: "Rajshahi Govt. City College",
    detail: "GPA: 5.00/5.00",
  },
  {
    year: "2017",
    title: "Secondary School Certificate (Science)",
    institution: "Cantonment Board High School Jahangirabad, Bogra",
    detail: "GPA: 5.00/5.00",
  },
  {
    year: "2014",
    title: "Junior School Certificate (Optional)",
    institution: "Cantonment Board High School Jahangirabad, Bogra",
    detail: "GPA: 5.00/5.00",
  },
];

const COURSEWORK = [
  "Data Structures",
  "Database Management Systems",
  "Computer Networks",
  "Theory of Computation",
  "Compiler Design",
  "Operating Systems & System Programming",
  "Microprocessor & Assembly Language",
  "Digital Signal Processing",
  "E-Commerce & Web Programming",
  "Engineering Economics",
];

const CERTIFICATIONS = [
  "Conference Presenter - IEEE QPAIN 2026",
  "Conference Presenter - BIM 2025",
  "Certificate of Appreciation - UCICS 2025",
  "Multimedia & Graphics Design - NACTAR",
  "Microsoft Office Applications - NACTAR",
  "Networking & Internet Programming - NACTAR",
];

const AWARDS = [
  "Certificate of Appreciation, UCICS 2025",
  "1st Runner-Up, Hardware Project Show, VU Tech Carnival 2024",
  "1st Place, District-Level Recitation Competition, National Education Week 2016",
  "1st Place, Upazila-Level Recitation Competition, National Education Week 2016",
  "2nd Place, Annual Cultural Competition (Recitation)",
  "3rd Place, Annual Cultural Competition (Solo Acting)",
];

const RESEARCH_ACTIVITIES = [
  "Explainable cardiovascular risk prediction using hybrid learning and feature optimization.",
  "Deep learning-based license plate recognition.",
  "Diffusion-based augmentation for monkeypox classification.",
  "Fusion-based lung and colon cancer classification on histopathological images.",
  "IoT-driven smart parking management with NodeMCU and Android integration.",
];

export default function EducationPage() {
  return (
    <div style={{ background: "#0B0F19", minHeight: "100vh", color: "#F9FAFB", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; cursor: none !important; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0B0F19; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#3B82F6,#8B5CF6); border-radius: 99px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
        @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        .blob { animation: blob 8s ease-in-out infinite; }
        .float { animation: float 6s ease-in-out infinite; }
      `}</style>

      <Particles />
      <MouseGlow />
      <Cursor />
      <ScrollProgress />

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(11,15,25,0.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg, #3B82F6, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 1, textDecoration: "none" }}>
            Pioneer QuestZen
          </Link>
          <Link to="/" style={{ padding: "8px 20px", borderRadius: 99, border: "1px solid #3B82F6", background: "rgba(59,130,246,0.1)", color: "#3B82F6", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1, textDecoration: "none" }}>
            Back to Home
          </Link>
        </div>
      </nav>

      <section style={{ minHeight: "100vh", padding: "120px 5vw 80px", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)", zIndex: 0 }} />
        <div className="blob" style={{ position: "absolute", bottom: "10%", left: "0%", width: 400, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", zIndex: 0, animationDelay: "4s" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          <Reveal>
            <SectionTitle tag="Education" title="Academic Journey" sub="Same visual language, dedicated academic page, and a structured view of studies, milestones, and scholarly work." />
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginBottom: 32 }}>
            <Reveal delay={0}><Glass style={{ padding: 28 }}><h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 10, color: "#F9FAFB" }}>Academic Summary</h3><p style={{ color: "#9CA3AF", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Third-year undergraduate student in Computer Science and Engineering at Varendra University with a strong research focus on AI, ML, CV, NLP, and applied intelligent systems.</p></Glass></Reveal>
            <Reveal delay={80}><Glass style={{ padding: 28 }}><h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 10, color: "#F9FAFB" }}>B.Sc. Program</h3><p style={{ color: "#9CA3AF", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>B.Sc. in Computer Science and Engineering, Varendra University, Rajshahi. 2021 — Present.</p></Glass></Reveal>
            <Reveal delay={160}><Glass style={{ padding: 28 }}><h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 10, color: "#F9FAFB" }}>CGPA</h3><p style={{ color: "#9CA3AF", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>CGPA: [4.00]/4.00</p></Glass></Reveal>
            <Reveal delay={240}><Glass style={{ padding: 28 }}><h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 10, color: "#F9FAFB" }}>University Information</h3><p style={{ color: "#9CA3AF", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Department of CSE, Varendra University, Rajshahi, Bangladesh.</p></Glass></Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24, marginBottom: 32 }}>
            <Reveal><Glass style={{ padding: 30 }}><h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 16, color: "#F9FAFB" }}>Relevant Coursework</h3><div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{COURSEWORK.map((item) => <span key={item} style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#9CA3AF", fontFamily: "'Space Mono',monospace", fontSize: 11 }}>{item}</span>)}</div></Glass></Reveal>
            <Reveal delay={80}><Glass style={{ padding: 30 }}><h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 16, color: "#F9FAFB" }}>Certifications</h3><ul style={{ paddingLeft: 18, color: "#9CA3AF", lineHeight: 1.8, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{CERTIFICATIONS.map((item) => <li key={item}>{item}</li>)}</ul></Glass></Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24, marginBottom: 32 }}>
            <Reveal><Glass style={{ padding: 30 }}><h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 16, color: "#F9FAFB" }}>Awards and Achievements</h3><ul style={{ paddingLeft: 18, color: "#9CA3AF", lineHeight: 1.8, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{AWARDS.map((item) => <li key={item}>{item}</li>)}</ul></Glass></Reveal>
            <Reveal delay={80}><Glass style={{ padding: 30 }}><h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, marginBottom: 16, color: "#F9FAFB" }}>Research Activities</h3><ul style={{ paddingLeft: 18, color: "#9CA3AF", lineHeight: 1.8, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{RESEARCH_ACTIVITIES.map((item) => <li key={item}>{item}</li>)}</ul></Glass></Reveal>
          </div>

          <div style={{ position: "relative", marginBottom: 40 }}>
            <Reveal><SectionTitle tag="Timeline" title="Academic Timeline" sub="A concise record of academic progression and milestones." /></Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 24, top: 0, bottom: 0, width: 1, background: "linear-gradient(#3B82F6,#8B5CF6,transparent)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {EDUCATION_TIMELINE.map((entry, index) => (
                  <Reveal key={entry.title} delay={index * 120}>
                    <div style={{ display: "flex", gap: 40, paddingLeft: 64, position: "relative" }}>
                      <div style={{ position: "absolute", left: 16, top: 24, width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", boxShadow: "0 0 16px rgba(59,130,246,0.6)", border: "2px solid #0B0F19" }} />
                      <Glass style={{ padding: 28, flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                          <div>
                            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#3B82F6", letterSpacing: 2, marginBottom: 8 }}>{entry.year}</div>
                            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#F9FAFB" }}>{entry.title}</h3>
                            <p style={{ marginTop: 6, color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14 }}>{entry.institution}</p>
                          </div>
                        </div>
                        <p style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, lineHeight: 1.7 }}>{entry.detail}</p>
                      </Glass>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/" style={{ padding: "14px 32px", borderRadius: 99, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", border: "none", color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 0.5, textDecoration: "none", boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}>
              Back to Home ↗
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}