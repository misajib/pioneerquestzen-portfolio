import { useState, useEffect, useRef, useCallback } from "react";

// ─── Utility: cn ───────────────────────────────────────────────────────────
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── DATA ───────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Projects", "Research", "Achievements", "Contact"];

const SKILLS = {
  Programming: [
    { name: "Python", level: 95 }, { name: "JavaScript / TypeScript", level: 88 },
    { name: "C / C++", level: 80 }, { name: "Java", level: 75 }, { name: "Rust", level: 60 },
  ],
  "AI / ML": [
    { name: "PyTorch / TensorFlow", level: 92 }, { name: "Transformers & LLMs", level: 90 },
    { name: "Computer Vision", level: 85 }, { name: "Reinforcement Learning", level: 78 },
    { name: "MLOps & Deployment", level: 72 },
  ],
  "Web Development": [
    { name: "React / Next.js", level: 91 }, { name: "Node.js / Express", level: 84 },
    { name: "PostgreSQL / MongoDB", level: 80 }, { name: "Docker / Kubernetes", level: 74 },
    { name: "GraphQL / REST APIs", level: 88 },
  ],
  Research: [
    { name: "Research Methodology", level: 88 }, { name: "Academic Writing", level: 85 },
    { name: "Data Analysis", level: 90 }, { name: "Experiment Design", level: 82 },
    { name: "Literature Review", level: 87 },
  ],
  Networking: [
    { name: "TCP/IP & Protocols", level: 80 }, { name: "Network Security", level: 75 },
    { name: "Cloud (AWS/GCP)", level: 78 }, { name: "Linux Systems", level: 85 },
    { name: "DevSecOps", level: 70 },
  ],
};

const PROJECTS = [
  {
    title: "NeuralVision OS",
    desc: "A real-time object detection and scene understanding system powered by a custom transformer architecture achieving 94.2 mAP on COCO.",
    tags: ["PyTorch", "CUDA", "React", "WebRTC"],
    color: "#3B82F6",
    featured: true,
    emoji: "🧠",
  },
  {
    title: "QuantumChat LLM",
    desc: "Fine-tuned language model for domain-specific dialogue with RLHF pipeline, serving 10K+ users via REST API.",
    tags: ["Transformers", "FastAPI", "Docker", "Redis"],
    color: "#8B5CF6",
    featured: true,
    emoji: "⚛️",
  },
  {
    title: "SynthFlow Platform",
    desc: "Full-stack MLOps platform for experiment tracking, model versioning, and automated deployment pipelines.",
    tags: ["Next.js", "Kubernetes", "MLflow", "PostgreSQL"],
    color: "#22D3EE",
    featured: false,
    emoji: "🚀",
  },
  {
    title: "CipherNet Security",
    desc: "AI-powered intrusion detection system using anomaly detection and graph neural networks for network traffic analysis.",
    tags: ["GNN", "Scapy", "Go", "InfluxDB"],
    color: "#10B981",
    featured: false,
    emoji: "🛡️",
  },
  {
    title: "BioScan Diagnostics",
    desc: "Medical image analysis tool for early disease detection using self-supervised learning on limited labeled data.",
    tags: ["SSL", "DICOM", "Flask", "React"],
    color: "#F59E0B",
    featured: false,
    emoji: "🔬",
  },
  {
    title: "EduAgent AI",
    desc: "Autonomous tutoring agent that generates personalized learning paths using multi-agent reasoning systems.",
    tags: ["LangChain", "OpenAI", "Vue.js", "MongoDB"],
    color: "#EC4899",
    featured: false,
    emoji: "📚",
  },
];

const RESEARCH = [

  {
    year: "2025",
    title: "SmartPark: An IoT-Driven Urban Car Parking Solution Using NodeMCU and Android Integration",
    venue: "UCICS 2025, Varendra University",
    abstract: "An IoT-based smart parking system using NodeMCU, RFID, cloud computing, and Android integration for real-time parking monitoring, automated access control, and efficient urban parking management.",
    status: "Published",
  },


  {
    year: "2025",
    title: "Attention-Efficient Transformers for Edge Deployment",
    venue: "IEEE CVPR 2025",
    abstract: "Proposed a novel sparse attention mechanism reducing compute by 68% while maintaining 99.1% baseline accuracy on vision benchmarks.",
    status: "Published",
  },
  {
    year: "2024",
    title: "Federated Learning with Differential Privacy in Healthcare",
    venue: "NeurIPS 2024 Workshop",
    abstract: "Framework for privacy-preserving collaborative model training across hospital networks without sharing raw patient data.",
    status: "Published",
  },
  {
    year: "2024",
    title: "Graph Neural Networks for Anomaly Detection in IoT Networks",
    venue: "IEEE TNSM",
    abstract: "GNN-based approach for detecting zero-day attacks in heterogeneous IoT environments with 97.8% detection rate.",
    status: "Under Review",
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "1st Place — National AI Hackathon", sub: "Ministry of Science & Technology, 2024" },
  { icon: "🥇", title: "Google Developer Expert Finalist", sub: "Machine Learning Track, 2024" },
  { icon: "📜", title: "IEEE Senior Student Member", sub: "Institute of Electrical and Electronics Engineers" },
  { icon: "🎓", title: "Full Merit Scholarship", sub: "CGPA 4.00 / 4.00 — BSc CSE" },
  { icon: "🌍", title: "Top 1% — LeetCode Global", sub: "2000+ Problems Solved" },
  { icon: "🤝", title: "Open Source Contributor", sub: "PyTorch, Hugging Face — 1.2K GitHub Stars" },
];

const STATS = [
  { label: "Projects Built", value: 40 },
  { label: "Research Papers", value: 8 },
  { label: "GitHub Stars", value: 1200 },
  { label: "Cups of Coffee", value: 9999 },
];

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          setCount(Math.floor(current));
          if (current >= target) clearInterval(timer);
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count >= 1000 ? (count >= 9999 ? "∞" : `${(count / 1000).toFixed(1)}K`) : count}{suffix}
    </span>
  );
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ name, level, color = "#3B82F6" }) {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span style={{ color: "#F9FAFB", fontSize: 13, fontFamily: "'Space Mono', monospace" }}>{name}</span>
        <span style={{ color: "#9CA3AF", fontSize: 12, fontFamily: "'Space Mono', monospace" }}>{level}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          borderRadius: 99,
          background: `linear-gradient(90deg, ${color}, #22D3EE)`,
          width: animated ? `${level}%` : "0%",
          transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 12px ${color}88`,
        }} />
      </div>
    </div>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.alpha})`;
        ctx.fill();
      });
      // lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── Mouse Glow ───────────────────────────────────────────────────────────────
function MouseGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={ref} style={{
      position: "fixed", pointerEvents: "none", zIndex: 1,
      width: 500, height: 500, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
      transform: "translate(-50%,-50%)",
      transition: "left 0.12s ease, top 0.12s ease",
    }} />
  );
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    let rx = 0, ry = 0;
    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      if (dot.current) { dot.current.style.left = `${x}px`; dot.current.style.top = `${y}px`; }
      rx += (x - rx) * 0.12; ry += (y - ry) * 0.12;
      if (ring.current) { ring.current.style.left = `${rx}px`; ring.current.style.top = `${ry}px`; }
    };
    const lag = () => {
      if (ring.current) {
        // handled inline via requestAnimationFrame trick — simplified here
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot} style={{
        position: "fixed", pointerEvents: "none", zIndex: 9999,
        width: 8, height: 8, borderRadius: "50%",
        background: "#22D3EE", transform: "translate(-50%,-50%)",
        boxShadow: "0 0 12px #22D3EE",
      }} />
      <div ref={ring} style={{
        position: "fixed", pointerEvents: "none", zIndex: 9998,
        width: 32, height: 32, borderRadius: "50%",
        border: "1.5px solid rgba(59,130,246,0.6)",
        transform: "translate(-50%,-50%)",
        transition: "left 0.08s ease, top 0.08s ease",
      }} />
    </>
  );
}

// ─── Loading Screen ────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setTimeout(onDone, 400); return 100; }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#0B0F19", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 32,
    }}>
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#3B82F6", borderRightColor: "#8B5CF6",
          animation: "spin 1s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: 12, borderRadius: "50%",
          border: "1.5px solid transparent",
          borderBottomColor: "#22D3EE",
          animation: "spin 0.7s linear infinite reverse",
        }} />
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontFamily: "'Space Mono', monospace", color: "#22D3EE", fontSize: 11,
        }}>
          {progress}%
        </div>
      </div>
      <div style={{
        fontFamily: "'Syne', sans-serif", fontSize: 22,
        background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #22D3EE)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        letterSpacing: 8, textTransform: "uppercase",
      }}>
        INITIALIZING
      </div>
      <div style={{
        width: 240, height: 2, background: "rgba(255,255,255,0.08)",
        borderRadius: 99, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: "linear-gradient(90deg, #3B82F6, #22D3EE)",
          width: `${progress}%`, transition: "width 0.1s linear",
          boxShadow: "0 0 12px #3B82F6",
        }} />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Scroll Progress ─────────────────────────────────────────────────────────
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setP((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 999,
      background: "rgba(255,255,255,0.04)",
    }}>
      <div style={{
        height: "100%", width: `${p}%`,
        background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #22D3EE)",
        transition: "width 0.1s linear",
        boxShadow: "0 0 8px #8B5CF6",
      }} />
    </div>
  );
}

// ─── Typing Effect ────────────────────────────────────────────────────────────
function Typing({ texts }) {
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [disp, setDisp] = useState("");
  useEffect(() => {
    const t = texts[ti];
    if (!del && ci <= t.length) {
      const timer = setTimeout(() => { setDisp(t.slice(0, ci)); setCi(c => c + 1); }, 70);
      return () => clearTimeout(timer);
    } else if (!del && ci > t.length) {
      const timer = setTimeout(() => setDel(true), 1800);
      return () => clearTimeout(timer);
    } else if (del && ci >= 0) {
      const timer = setTimeout(() => { setDisp(t.slice(0, ci)); setCi(c => c - 1); }, 40);
      return () => clearTimeout(timer);
    } else {
      setDel(false); setTi(i => (i + 1) % texts.length);
    }
  }, [ci, del, ti, texts]);
  return (
    <span style={{
      background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    }}>
      {disp}
      <span style={{ WebkitTextFillColor: "#22D3EE", animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
}

// ─── Glass Card ───────────────────────────────────────────────────────────────
function Glass({ children, style = {}, className = "", hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
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

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionTitle({ tag, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 64 }}>
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
      {sub && <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>{sub}</p>}
    </div>
  );
}

// ─── MAIN PORTFOLIO ──────────────────────────────────────────────────────────
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [activeSkill, setActiveSkill] = useState("Programming");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [formState, setFormState] = useState({ name: "", email: "", msg: "" });
  const [formSent, setFormSent] = useState(false);

  const scrollTo = (id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handler = () => {
      const sections = ["hero", "about", "skills", "projects", "research", "achievements", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
    setFormState({ name: "", email: "", msg: "" });
  };

  if (!loaded) return <LoadingScreen onDone={() => setLoaded(true)} />;

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
        .nav-link { position:relative; }
        .nav-link::after { content:''; position:absolute; bottom:-4px; left:0; right:0; height:1px; background:linear-gradient(90deg,#3B82F6,#22D3EE); transform:scaleX(0); transition:transform 0.3s ease; }
        .nav-link:hover::after, .nav-link.active::after { transform:scaleX(1); }
        section { position: relative; z-index: 2; }
      `}</style>

      <Particles />
      <MouseGlow />
      <Cursor />
      <ScrollProgress />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(11,15,25,0.85)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "0 5vw",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => scrollTo("hero")} style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20,
            background: "linear-gradient(135deg, #3B82F6, #22D3EE)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: 1, cursor: "none",
          }}>
            Pioneer QuestZen
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                className={`nav-link${activeSection === l.toLowerCase() ? " active" : ""}`}
                style={{
                  background: "none", border: "none", color: activeSection === l.toLowerCase() ? "#3B82F6" : "#9CA3AF",
                  fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 1,
                  textTransform: "uppercase", transition: "color 0.2s", cursor: "none",
                }}>
                {l}
              </button>
            ))}
            <button style={{
              padding: "8px 20px", borderRadius: 99, border: "1px solid #3B82F6",
              background: "rgba(59,130,246,0.1)", color: "#3B82F6",
              fontFamily: "'Space Mono', monospace", fontSize: 11,
              letterSpacing: 1, transition: "all 0.2s", cursor: "none",
            }}
              onMouseEnter={e => { e.target.style.background = "#3B82F6"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(59,130,246,0.1)"; e.target.style.color = "#3B82F6"; }}>
              HIRE ME
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 5vw 80px", position: "relative", overflow: "hidden" }}>
        {/* bg blobs */}
        <div className="blob" style={{
          position: "absolute", top: "10%", right: "5%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          zIndex: 0,
        }} />
        <div className="blob" style={{
          position: "absolute", bottom: "10%", left: "0%", width: 400, height: 400,
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          zIndex: 0, animationDelay: "4s",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: 80, flexWrap: "wrap", position: "relative", zIndex: 2 }}>
          {/* Left */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 99,
              background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.25)",
              marginBottom: 28,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22D3EE", boxShadow: "0 0 8px #22D3EE", animation: "blink 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#22D3EE", letterSpacing: 2 }}>AVAILABLE FOR WORK</span>
            </div>

            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(42px, 7vw, 80px)", lineHeight: 1.0,
              color: "#F9FAFB", marginBottom: 16,
            }}>
              Md Mohaiminul Islam<br />
              <span style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #22D3EE 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "gradient-shift 4s linear infinite",
              }}>
                Sajib
              </span>
            </h1>

            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(18px, 2.5vw, 26px)", marginBottom: 24, minHeight: 36 }}>
              <Typing texts={["AI Researcher", "Problem Solver", "CS Student", "Open Source Contributor", "ML Engineer"]} />
            </div>

            <p style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, lineHeight: 1.8, maxWidth: 520, marginBottom: 40 }}>
              Building intelligent systems at the intersection of deep learning, systems design, and human-computer interaction. Turning research into real-world impact.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
              <button onClick={() => scrollTo("projects")} style={{
                padding: "14px 32px", borderRadius: 99,
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                border: "none", color: "#fff",
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                letterSpacing: 0.5, boxShadow: "0 0 30px rgba(59,130,246,0.4)",
                transition: "all 0.3s", cursor: "none",
              }}
                onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 0 50px rgba(59,130,246,0.6)"; }}
                onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 0 30px rgba(59,130,246,0.4)"; }}>
                View Projects ↗
              </button>
              <button style={{
                padding: "14px 32px", borderRadius: 99,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)", color: "#F9FAFB",
                fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14,
                transition: "all 0.3s", cursor: "none",
              }}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(59,130,246,0.6)"; e.target.style.background = "rgba(59,130,246,0.08)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.background = "transparent"; }}>
                Download CV ↓
              </button>
            </div>

            {/* Social */}
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { label: "GH", color: "#F9FAFB", url: "#" },
                { label: "LI", color: "#0077B5", url: "#" },
                { label: "TW", color: "#1DA1F2", url: "#" },
                { label: "GM", color: "#EA4335", url: "#" },
              ].map(s => (
                <a key={s.label} href={s.url} style={{
                  width: 44, height: 44, borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#9CA3AF", fontSize: 11, fontFamily: "'Space Mono',monospace",
                  textDecoration: "none", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.transform = "none"; }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — avatar */}
          <div className="float" style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
            <div style={{ position: "relative", width: 280, height: 280 }}>
              {/* Pulse rings */}
              {[1, 2].map(i => (
                <div key={i} style={{
                  position: "absolute", inset: -i * 20,
                  borderRadius: "50%", border: "1px solid rgba(59,130,246,0.2)",
                  animation: `pulse-ring ${1.5 + i * 0.5}s ease-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }} />
              ))}
              {/* Rotating border */}
              <div style={{
                position: "absolute", inset: -4,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, #3B82F6, #8B5CF6, #22D3EE, #3B82F6)",
                animation: "spin 4s linear infinite",
              }} />
              <div style={{
                position: "absolute", inset: 2,
                borderRadius: "50%", background: "#0B0F19",
              }} />
              <div style={{
                position: "absolute", inset: 6, borderRadius: "50%",
                background: "linear-gradient(135deg, #111827 0%, #1e2435 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                {/* <div style={{
                  fontSize: 100, lineHeight: 1,
                  filter: "drop-shadow(0 0 20px rgba(59,130,246,0.5))",
                }}>👨‍💻</div> */
                  <img
                    src="/sajib.jpg"
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />

                }
              </div>
              {/* Badge */}
              <div style={{
                position: "absolute", bottom: 10, right: -10,
                background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
                borderRadius: 12, padding: "8px 14px",
                boxShadow: "0 8px 24px rgba(59,130,246,0.4)",
              }}>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>GPA</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>4.00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(11,15,25,0.6)", backdropFilter: "blur(10px)",
          padding: "20px 5vw", zIndex: 2,
        }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16,
          }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28,
                  background: "linear-gradient(135deg,#3B82F6,#22D3EE)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  <Counter target={s.value} />+
                </div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#9CA3AF", letterSpacing: 2, textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "120px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="01 — About" title="Who Am I?" sub="A curious builder driven by the quest to make machines think." />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {[
              { icon: "🎓", title: "Education", content: "BSc in Computer Science at MIT, specializing in AI & Machine Learning. Expected 2026. Thesis on efficient transformer architectures." },
              { icon: "🔬", title: "Research Focus", content: "Deep learning optimization, federated learning, privacy-preserving AI, and autonomous systems. Published in IEEE CVPR and NeurIPS." },
              { icon: "💡", title: "Interests", content: "Building at the frontier of AI safety, interpretability, and efficient inference. Also passionate about open-source tooling and developer experience." },
              { icon: "🌐", title: "Philosophy", content: "Technology should empower people, not replace them. I build systems that augment human capability while remaining transparent and interpretable." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <Glass style={{ padding: 32, height: "100%" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#F9FAFB", marginBottom: 12 }}>{c.title}</h3>
                  <p style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, lineHeight: 1.7 }}>{c.content}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "120px 5vw", background: "rgba(17,24,39,0.4)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="02 — Skills" title="Tech Stack" sub="Proficiency across the full AI/ML and software engineering spectrum." />
          </Reveal>
          {/* Category tabs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
            {Object.keys(SKILLS).map(cat => (
              <button key={cat} onClick={() => setActiveSkill(cat)} style={{
                padding: "10px 22px", borderRadius: 99,
                background: activeSkill === cat ? "linear-gradient(135deg,#3B82F6,#8B5CF6)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeSkill === cat ? "transparent" : "rgba(255,255,255,0.08)"}`,
                color: activeSkill === cat ? "#fff" : "#9CA3AF",
                fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 1,
                transition: "all 0.3s", cursor: "none",
                boxShadow: activeSkill === cat ? "0 0 20px rgba(59,130,246,0.35)" : "none",
              }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: 32 }}>
            <Reveal>
              <Glass style={{ padding: 32 }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 28, color: "#F9FAFB", fontSize: 18, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 3, height: 20, background: "linear-gradient(#3B82F6,#8B5CF6)", borderRadius: 99, display: "inline-block" }} />
                  {activeSkill}
                </h3>
                {SKILLS[activeSkill].map((s, i) => (
                  <SkillBar key={`${activeSkill}-${s.name}`} name={s.name} level={s.level}
                    color={["#3B82F6", "#8B5CF6", "#22D3EE", "#10B981", "#F59E0B"][i % 5]} />
                ))}
              </Glass>
            </Reveal>
            <Reveal delay={150}>
              <Glass style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 12, color: "#F9FAFB", fontSize: 18 }}>Core Technologies</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {["Python", "PyTorch", "React", "TypeScript", "Docker", "Kubernetes", "PostgreSQL", "AWS", "Redis", "GraphQL", "FastAPI", "Git", "Linux", "CUDA", "Rust", "Go"].map(t => (
                    <span key={t} style={{
                      padding: "6px 14px", borderRadius: 8,
                      background: "rgba(59,130,246,0.08)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      color: "#9CA3AF", fontFamily: "'Space Mono',monospace", fontSize: 11,
                      transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.target.style.background = "rgba(59,130,246,0.2)"; e.target.style.color = "#3B82F6"; e.target.style.transform = "scale(1.05)"; }}
                      onMouseLeave={e => { e.target.style.background = "rgba(59,130,246,0.08)"; e.target.style.color = "#9CA3AF"; e.target.style.transform = "none"; }}>
                      {t}
                    </span>
                  ))}
                </div>
              </Glass>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "120px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="03 — Work" title="Projects" sub="Real systems built with obsessive attention to craft and performance." />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 28 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div style={{
                  background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20, padding: 28, height: "100%",
                  transition: "all 0.4s ease", cursor: "none", position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${p.color}55`;
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = `0 24px 60px ${p.color}20`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  {p.featured && (
                    <div style={{
                      position: "absolute", top: 16, right: 16,
                      padding: "3px 10px", borderRadius: 99,
                      background: `${p.color}22`, border: `1px solid ${p.color}44`,
                      color: p.color, fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 2,
                    }}>FEATURED</div>
                  )}
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{p.emoji}</div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: "#F9FAFB", marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.7, marginBottom: 20, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        padding: "4px 10px", borderRadius: 6, fontSize: 11,
                        background: `${p.color}12`, border: `1px solid ${p.color}30`,
                        color: p.color, fontFamily: "'Space Mono',monospace",
                      }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    {["Live Demo", "GitHub"].map(btn => (
                      <button key={btn} style={{
                        flex: 1, padding: "9px 0", borderRadius: 10,
                        background: btn === "Live Demo" ? `${p.color}18` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${btn === "Live Demo" ? `${p.color}40` : "rgba(255,255,255,0.08)"}`,
                        color: btn === "Live Demo" ? p.color : "#9CA3AF",
                        fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: 1,
                        transition: "all 0.2s", cursor: "none",
                      }}
                        onMouseEnter={e => { e.target.style.opacity = "0.75"; }}
                        onMouseLeave={e => { e.target.style.opacity = "1"; }}>
                        {btn} {btn === "Live Demo" ? "↗" : "→"}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section id="research" style={{ padding: "120px 5vw", background: "rgba(17,24,39,0.4)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="04 — Academia" title="Research & Publications" sub="Peer-reviewed contributions advancing the state of the art." />
          </Reveal>
          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div style={{
              position: "absolute", left: 24, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(#3B82F6,#8B5CF6,transparent)",
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {RESEARCH.map((r, i) => (
                <Reveal key={r.title} delay={i * 120}>
                  <div style={{ display: "flex", gap: 40, paddingLeft: 64, position: "relative" }}>
                    <div style={{
                      position: "absolute", left: 16, top: 24, width: 18, height: 18,
                      borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
                      boxShadow: "0 0 16px rgba(59,130,246,0.6)", border: "2px solid #0B0F19",
                    }} />
                    <Glass style={{ padding: 28, flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                        <div>
                          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#3B82F6", letterSpacing: 2, marginBottom: 8 }}>{r.year} · {r.venue}</div>
                          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#F9FAFB" }}>{r.title}</h3>
                        </div>
                        <span style={{
                          padding: "5px 14px", borderRadius: 99, fontSize: 11,
                          background: r.status === "Published" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                          border: `1px solid ${r.status === "Published" ? "rgba(16,185,129,0.4)" : "rgba(245,158,11,0.4)"}`,
                          color: r.status === "Published" ? "#10B981" : "#F59E0B",
                          fontFamily: "'Space Mono',monospace", whiteSpace: "nowrap",
                        }}>{r.status}</span>
                      </div>
                      <p style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, lineHeight: 1.7 }}>{r.abstract}</p>
                      <a
                        href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ynJRhxEAAAAJ&citation_for_view=ynJRhxEAAAAJ:u-x6o8ySG0sC"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#3B82F6",
                          textDecoration: "none",
                          fontSize: "12px",
                          fontFamily: "'Space Mono', monospace",
                          display: "inline-block",
                          marginTop: "14px",
                        }}
                      >
                        View Publication ↗
                      </a>
                    </Glass>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" style={{ padding: "120px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="05 — Honors" title="Achievements" sub="Recognition across research, competition, and open-source contribution." />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <Glass style={{ padding: 24, display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{
                    fontSize: 30, width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
                  }}>{a.icon}</div>
                  <div>
                    <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: "#F9FAFB", marginBottom: 6 }}>{a.title}</h4>
                    <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: "#9CA3AF" }}>{a.sub}</p>
                  </div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "120px 5vw", background: "rgba(17,24,39,0.4)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="06 — Contact" title="Let's Build Together" sub="Open to research collaborations, full-time roles, and interesting problems." />
          </Reveal>
          <Reveal delay={100}>
            <Glass style={{ padding: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                {[
                  { label: "Your Name", key: "name", type: "text", placeholder: "John Doe" },
                  { label: "Email Address", key: "email", type: "email", placeholder: "john@example.com" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#9CA3AF", letterSpacing: 2, display: "block", marginBottom: 8 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={formState[f.key]}
                      onChange={e => setFormState(s => ({ ...s, [f.key]: e.target.value }))}
                      style={{
                        width: "100%", padding: "14px 18px", borderRadius: 12,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#F9FAFB", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14,
                        outline: "none", transition: "border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.6)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#9CA3AF", letterSpacing: 2, display: "block", marginBottom: 8 }}>Message</label>
                <textarea placeholder="Tell me about your project or opportunity..." rows={5} value={formState.msg}
                  onChange={e => setFormState(s => ({ ...s, msg: e.target.value }))}
                  style={{
                    width: "100%", padding: "14px 18px", borderRadius: 12, resize: "vertical",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F9FAFB", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14,
                    outline: "none", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.6)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
              <button onClick={handleSend} style={{
                width: "100%", padding: "16px", borderRadius: 12,
                background: formSent ? "linear-gradient(135deg,#10B981,#059669)" : "linear-gradient(135deg,#3B82F6,#8B5CF6)",
                border: "none", color: "#fff",
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15,
                boxShadow: formSent ? "0 0 30px rgba(16,185,129,0.4)" : "0 0 30px rgba(59,130,246,0.35)",
                transition: "all 0.4s", cursor: "none",
              }}>
                {formSent ? "✓ Message Sent!" : "Send Message →"}
              </button>

              <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 36, flexWrap: "wrap" }}>
                {[
                  { label: "alex@mit.edu", icon: "✉" },
                  { label: "github.com/alexchen", icon: "⌥" },
                  { label: "linkedin.com/in/alexchen", icon: "in" },
                ].map(l => (
                  <a key={l.label} href="#" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    color: "#9CA3AF", textDecoration: "none",
                    fontFamily: "'Space Mono',monospace", fontSize: 11,
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#3B82F6"}
                    onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
                    <span style={{ color: "#3B82F6" }}>{l.icon}</span> {l.label}
                  </a>
                ))}
              </div>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "32px 5vw",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16, position: "relative", zIndex: 2,
      }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, background: "linear-gradient(135deg,#3B82F6,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pioneer QuestZen</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#4B5563" }}>
          © {new Date().getFullYear()} Md Mohaiminul Islam Sajib · Crafted with precision
        </div>
        <button onClick={() => scrollTo("hero")} style={{
          padding: "8px 20px", borderRadius: 99, background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.3)", color: "#3B82F6",
          fontFamily: "'Space Mono',monospace", fontSize: 11, cursor: "none",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = "rgba(59,130,246,0.2)"}
          onMouseLeave={e => e.target.style.background = "rgba(59,130,246,0.1)"}>
          ↑ TOP
        </button>
      </footer>
    </div>
  );
}