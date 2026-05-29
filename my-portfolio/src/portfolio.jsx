import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

// ─── Utility: cn ───────────────────────────────────────────────────────────
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── DATA ───────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Projects", "Research", "Achievements", "Contact"];

const AUTHOR_NAME = "Md Mohaiminul Islam Sajib";

const SKILLS = {
  "Programming Languages": [
    { name: "Python", level: 90 }, { name: "C / C++", level: 95 },
    { name: "JavaScript", level: 80 }, { name: "Java", level: 50 }, { name: "SQL", level: 82 },
  ],
  "AI / ML / NLP": [
    { name: "PyTorch", level: 92 }, { name: "TensorFlow", level: 88 },
    { name: "Scikit-learn", level: 90 }, { name: "Transformers", level: 87 },
    { name: "LangChain / RAG / LLMs", level: 50 },
  ],
  "Web Development": [
    { name: "React.js", level: 91 }, { name: "Vite", level: 86 },
    { name: "Django", level: 84 }, { name: "Firebase", level: 82 },
    { name: "REST API", level: 88 },
  ],
  "Tools & Platforms": [
    { name: "Git / GitHub", level: 92 }, { name: "Linux", level: 84 },
    { name: "Docker", level: 78 }, { name: "Google Colab", level: 88 },
    { name: "Jupyter Notebook / VS Code", level: 90 },
  ],
  "Competitive Programming": [
    { name: "Codeforces", level: 82 }, { name: "LeetCode", level: 85 },
    { name: "Data Structures", level: 90 }, { name: "Algorithms", level: 90 },
    { name: "Dynamic Programming", level: 84 },
  ],
  "Generative AI": [
    { name: "ChatGPT", level: 92 }, { name: "Claude", level: 86 },
    { name: "Gemini / Grok / DeepSeek", level: 84 }, { name: "Stable Diffusion", level: 72 },
    { name: "Prompt Engineering", level: 88 },
  ],
};

const PROJECTS = [
  {
    title: "Cook2Cart: An AI-Driven Secure Recipe-to-Cart Grocery E-Commerce Platform with Smart Recommendation",
    desc: "An AI-driven recipe-to-cart grocery e-commerce platform that extracts ingredients from recipes, maps them to available products, and supports intelligent product recommendations.",
    tags: ["Django", "Python", "PostgreSQL", "MongoDB", "GPT", "LLaMA", "Qwen"],
    color: "#3B82F6",
    featured: true,
    emoji: "🛒",
  },
  {
    title: "Graphical Visualization and Implementation of Line Drawing & 2D Transformations with an Interactive 3D Rubik's Cube using OpenGL",
    desc: "Implemented DDA-based line drawing, 2D transformations, interactive mouse and keyboard controls, zooming, camera rotation, and a fully interactive 3D Rubik's Cube visualization.",
    tags: ["C++", "OpenGL", "GLUT", "DDA"],
    color: "#8B5CF6",
    featured: true,
    emoji: "🧊",
  },
  {
    title: "SmartPark: IoT-Based Smart Parking Management System",
    desc: "Built a real-time smart parking solution using NodeMCU and IR sensors for occupancy monitoring with Firebase-based cloud synchronization and Android app support.",
    tags: ["NodeMCU", "Firebase", "Android Studio", "Embedded C"],
    color: "#22D3EE",
    featured: false,
    emoji: "📱",
  },
];

const RESEARCH = [
  {
    year: "2026",
    title: "Explainable Hybrid Learning for Cardiovascular Risk Prediction with mRMR-PCA Feature Optimization",
    venue: "IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence and Networking (QPAIN 2026)",
    authors: [AUTHOR_NAME, "Protik Chakroborty"],
    abstract: "Explainable cardiovascular risk prediction work using hybrid learning with mRMR-PCA feature optimization.",
    status: "Published",
  },

  {
    year: "2026",
    title: "License Plate Recognition System Using Deep Learning Approach",
    venue: "IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence and Networking (QPAIN 2026)",
    authors: ["Mst. Homai Ara Yesmin", "Md. Nahid Hasan", AUTHOR_NAME, "Md. Yousuf Ali", "Sohanur Rahman", "Protik Chakroborty"],
    abstract: "Deep learning-based license plate recognition system developed for practical computer vision use.",
    status: "Published",
  },
  {
    year: "2026",
    title: "DiffusionDxNet: Improving Monkeypox Classification Using Diffusion-Based Data Augmentation and DenseNet121",
    venue: "IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence and Networking (QPAIN 2026)",
    authors: [AUTHOR_NAME, "Protik Chakroborty", "Md. Adnan Sami", "Md. Abdus Sami Shezan", "Bishal Prosad"],
    abstract: "Monkeypox classification work using diffusion-based augmentation and DenseNet121.",
    status: "Published",
  },
  {
    year: "2025",
    title: "FusionDxNet: A Fusion-Based Approach for Robust Lung & Colon Cancer Classification Using Histopathological Images",
    venue: "3rd International Conference on Big Data, IoT and Machine Learning (BIM 2025)",
    authors: ["Protik Chakroborty", "Pallab Chowdhury", "Pritom Chakroborty", "Arun Kumar Sikder", AUTHOR_NAME],
    abstract: "Fusion-based deep learning framework for robust lung and colon cancer classification from histopathological images.",
    status: "Published",
  },
  {
    year: "2025",
    title: "SmartPark: An IoT-Driven Urban Car Parking Solution Using NodeMCU and Android Integration",
    venue: "Undergraduate Conference on Intelligent Computing & Systems (UCICS 2025)",
    authors: [AUTHOR_NAME, "Rejaul Karim Reja", "Ruhul Amin", "Abdul-Al Nasheed Qatum", "Mahfuz Ahmad", "Farhana Akter Faiza", "Fatlab Chowdhury"],
    abstract: "IoT-based smart parking system using NodeMCU, cloud synchronization, and Android integration for real-time parking monitoring.",
    status: "Published",
  },
];

const renderAcademicAuthors = (authors) =>
  authors.map((author, index) => {
    const isMyName = author === AUTHOR_NAME;
    return (
      <span key={`${author}-${index}`}>
        {index > 0 && ", "}
        <span style={isMyName ? { fontWeight: 700, color: "#3B82F6" } : undefined}>
          {author}
        </span>
      </span>
    );
  });

const ACHIEVEMENTS = [
  { icon: "🎤", title: "Conference Presenter", sub: "IEEE QPAIN 2026, CUET, Chattogram, Bangladesh" },
  { icon: "🎤", title: "Conference Presenter", sub: "BIM 2025, Dhaka International University, Bangladesh" },
  { icon: "📜", title: "Certificate of Appreciation", sub: "UCICS 2025, Varendra University, Bangladesh" },
  { icon: "🖥️", title: "Multimedia & Graphics Design", sub: "NACTAR, Ministry of Education, Bangladesh" },
  { icon: "💻", title: "Microsoft Office Applications", sub: "Word, Excel, and Access Training, NACTAR" },
  { icon: "🌐", title: "Networking & Internet Programming", sub: "National Academy for Computer Training and Research" },
];

const STATS = [
  { label: "Projects", value: 3 },
  { label: "Publications", value: 5 },
  { label: "Awards", value: 6 },
  { label: "Cups of Coffee", value: 9999 },
];

// New sections data (keeps existing design language and card style)
const LEADERSHIP = [
  {
    title: "Research Team Lead",
    desc: "Led the UCICS 2025 publication project and coordinated a multidisciplinary team throughout the research, development, and presentation phases.",
    icon: "🧭",
  },
  {
    title: "Member, Varendra University Programming Club (VUPC)",
    desc: "Participated in programming contests, technical workshops, and collaborative learning activities.",
    icon: "🤝",
  },
  {
    title: "Open-Source Contributor",
    desc: "Maintains Machine Learning, NLP, and IoT projects on GitHub while promoting knowledge sharing and continuous learning.",
    icon: "🌐",
  },
  {
    title: "Competitive Programmer",
    desc: "Active on Codeforces and LeetCode with interests in graph theory, dynamic programming, algorithms, and problem solving.",
    icon: "🏆",
  },
  {
    title: "Master of Ceremonies (Host)",
    desc: "Hosted and coordinated the annual cultural program \"Surer Murchhanay Bashonti Shondha\" at Jahangirabad Cantonment, demonstrating leadership, communication, and event management skills.",
    icon: "🎤",
  },
];

const LANGUAGES = [
  { name: "Bengali", level: "Native" },
  { name: "English", level: "Professional Proficiency" },
];

const INTERESTS = [
  "Hiking",
  "Traveling",
  "Reading Research Papers",
  "Competitive Programming",
  "Open Source Development",
  "Artificial Intelligence",
  "Exploring Different Cultures",
  "Tech Exploration",
  "Mentoring Students",
  "Emerging Technologies",
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
        {/* INITIALIZING */}
        MUHAMMAD MOHAIMINUL ISLAM SAJIB (PIONEER QUESTZEN)
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
  const [activeSkill, setActiveSkill] = useState("Programming Languages");
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
            <a href={"mailto:232311314@vu.edu.bd,misajib0493@gmail.com?subject=" + encodeURIComponent("Research Collaboration") + "&body=" + encodeURIComponent("Hi Md Mohaiminul Islam Sajib,%0A%0AI'd like to discuss a research collaboration.%0A%0ARegards,%0A[Your Name]")}
              style={{
                display: "inline-block", padding: "8px 20px", borderRadius: 99, border: "1px solid #3B82F6",
                background: "rgba(59,130,246,0.1)", color: "#3B82F6",
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                letterSpacing: 1, transition: "all 0.2s", cursor: "none", textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#3B82F6"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; e.currentTarget.style.color = "#3B82F6"; }}>
              Collaborate With Me 🤝
            </a>
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
              Muhammad Mohaiminul Islam<br />
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
              <Typing texts={["AI/ML Researcher", "Computer Vision Enthusiast", "NLP & LLM Explorer", "Undergraduate Researcher", "Competitive Programmer"]} />
            </div>

            <p style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, lineHeight: 1.8, maxWidth: 520, marginBottom: 40 }}>
              Third-year Computer Science and Engineering student at Varendra University focused on artificial intelligence, machine learning, computer vision, natural language processing, and applied research.
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
              <a
                href={`${import.meta.env.BASE_URL}sajib_cv.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "14px 32px",
                  borderRadius: 99,
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  border: "none",
                  color: "#fff",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  transition: "all 0.3s",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "none",
                  textDecoration: "none",
                }}
              >
                View CV 📄
              </a>

              <a
                href={`${import.meta.env.BASE_URL}sajib_cv.pdf`}
                download
                style={{
                  padding: "14px 32px",
                  borderRadius: 99,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#F9FAFB",
                  textDecoration: "none",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  transition: "all 0.3s",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "none",
                }}
                onMouseEnter={e => {
                  e.target.style.borderColor = "rgba(34,211,238,0.55)";
                  e.target.style.background = "rgba(34,211,238,0.08)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = "rgba(255,255,255,0.12)";
                  e.target.style.background = "rgba(255,255,255,0.04)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Download CV ⬇
              </a>
            </div>

            {/* Social */}
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { label: "GH", color: "#F9FAFB", url: "https://github.com/misajib" },
                { label: "LI", color: "#0077B5", url: "https://www.linkedin.com/in/muhammad-mohaiminul-islam-sajib-972a60317/" },
                { label: "KG", color: "#20BEFF", url: "https://www.kaggle.com/misajib" },
                { label: "GM", color: "#EA4335", url: "mailto:232311314@vu.edu.bd,misajib0493@gmail.com" },
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
                    src={`${import.meta.env.BASE_URL}sajib.jpg`}
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
            <SectionTitle tag="01 — About" title="Who Am I?" sub="Third-year CSE student at Varendra University working across AI, research, and applied software projects." />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {[
              { icon: "🎓", title: "Education", content: "B.Sc. in Computer Science and Engineering at Varendra University, Rajshahi, currently in the 3rd year, 6th semester, with CGPA [4.00]/4.00.", href: "/education" },
              { icon: "🔬", title: "Research Focus", content: "Artificial intelligence, machine learning, computer vision, natural language processing, large language models, retrieval-augmented generation, explainable AI, and healthcare AI." },
              { icon: "💡", title: "Technical Focus", content: "Deep learning, computer architecture, IoT-based intelligent systems, and competitive programming with practical work across research and product implementation." },
              { icon: "🌐", title: "Academic Profile", content: "Conference author and presenter with work spanning smart parking, medical imaging, license plate recognition, and cardiovascular risk prediction." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                {c.href ? (
                  <Link to={c.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <Glass style={{ padding: 32, height: "100%" }}>
                      <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
                      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#F9FAFB", marginBottom: 12 }}>{c.title}</h3>
                      <p style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, lineHeight: 1.7 }}>{c.content}</p>
                    </Glass>
                  </Link>
                ) : (
                  <Glass style={{ padding: 32, height: "100%" }}>
                    <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#F9FAFB", marginBottom: 12 }}>{c.title}</h3>
                    <p style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, lineHeight: 1.7 }}>{c.content}</p>
                  </Glass>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "120px 5vw", background: "rgba(17,24,39,0.4)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="02 — Skills" title="Tech Stack" sub="Programming, AI/ML, web development, tools, and competitive programming areas reflected in the CV." />
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
                  {["Python", "C++", "Java", "JavaScript", "SQL", "PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "LangChain", "RAG", "LLMs", "React.js", "Django", "Firebase", "Git"].map(t => (
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
            <SectionTitle tag="03 — Work" title="Projects" sub="Projects, labs, and applied systems built from the CV and academic work." />
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
            <SectionTitle tag="04 — Academia" title="Research & Publications" sub="Conference publications and applied research in AI, computer vision, and intelligent systems." />
          </Reveal>
          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div style={{
              position: "absolute", left: 24, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(#3B82F6,#8B5CF6,transparent)",
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {RESEARCH.map((r, i) => (
                <Reveal key={r.title} delay={i * 120}>
                  <div style={{ display: "flex", gap: 24, paddingLeft: 84, position: "relative", alignItems: "flex-start" }}>
                    <div style={{
                      position: "absolute", left: 28, top: 20, width: 14, height: 14,
                      borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
                      boxShadow: "0 6px 20px rgba(59,130,246,0.25)", border: "2px solid #0B0F19",
                    }} />

                    <div style={{ width: 100, textAlign: "right", paddingRight: 16 }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#F9FAFB", lineHeight: 1 }}>{r.year}</div>
                      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>{r.venue}</div>
                    </div>

                    <Glass style={{ padding: 28, flex: 1, transition: "transform 0.25s, box-shadow 0.25s", cursor: "none" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(59,130,246,0.12)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 8 }}>
                        <div>
                          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "#F9FAFB", marginBottom: 6 }}>{r.title}</h3>
                          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#3B82F6", letterSpacing: 1 }}>{renderAcademicAuthors(r.authors)}</div>
                        </div>
                        <span style={{ padding: "6px 12px", borderRadius: 999, fontSize: 11, background: r.status === "Published" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)", border: `1px solid ${r.status === "Published" ? "rgba(16,185,129,0.28)" : "rgba(245,158,11,0.28)"}`, color: r.status === "Published" ? "#10B981" : "#F59E0B", fontFamily: "'Space Mono',monospace" }}>{r.status}</span>
                      </div>
                      <p style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>{r.abstract}</p>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <a href={r.link || "#"} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", fontSize: 12, borderRadius: 10, background: "rgba(59,130,246,0.12)", color: "#3B82F6", textDecoration: "none", border: "1px solid rgba(59,130,246,0.18)", fontFamily: "'Space Mono',monospace" }}>Read Paper ↗</a>
                        {r.tags && r.tags.map(t => (
                          <span key={t} style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.03)", color: "#9CA3AF", fontFamily: "'Space Mono',monospace", fontSize: 11 }}>{t}</span>
                        ))}
                      </div>
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
            <SectionTitle tag="05 — Honors" title="Certifications & Recognition" sub="Conference presentations, certificates, and professional training from the CV." />
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
      {/* ── LEADERSHIP & ACTIVITIES ── */}
      <section id="leadership" style={{ padding: "120px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="— Leadership" title="Leadership & Activities" sub="Selected leadership roles, community participation, and event experience." />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {LEADERSHIP.map((l, i) => (
              <Reveal key={l.title} delay={i * 80}>
                <div style={{
                  background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 28,
                  transition: "all 0.4s ease", cursor: "none", position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(59,130,246,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{l.icon}</div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#F9FAFB", marginBottom: 10 }}>{l.title}</h3>
                  <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{l.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANGUAGES ── */}
      <section id="languages" style={{ padding: "80px 5vw", background: "rgba(17,24,39,0.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="— Languages" title="Languages" sub="" />
          </Reveal>
          <Reveal delay={100}>
            <Glass style={{ padding: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
              {LANGUAGES.map(l => (
                <div key={l.name} style={{ padding: "8px 14px", borderRadius: 12, background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)", color: "#F9FAFB", fontFamily: "'Space Mono',monospace", fontSize: 13 }}>
                  <div style={{ fontWeight: 700 }}>{l.name}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>{l.level}</div>
                </div>
              ))}
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* ── PERSONAL INTERESTS ── */}
      <section id="interests" style={{ padding: "120px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionTitle tag="— Beyond Technology" title="Beyond Technology" sub="Personal interests that shape my research curiosity and collaboration style." />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 18, marginTop: 20 }}>
            {INTERESTS.map((it, i) => (
              <Reveal key={`${it}-${i}`} delay={i * 50}>
                <Glass style={{ padding: 20, textAlign: "center", transition: "transform 0.25s, box-shadow 0.25s", cursor: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(59,130,246,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#F9FAFB", marginBottom: 8 }}>{it}</div>
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
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{
                display: "inline-block", fontFamily: "'Space Mono', monospace",
                fontSize: 11, letterSpacing: 4, textTransform: "uppercase",
                color: "#3B82F6", marginBottom: 12,
                padding: "6px 16px", border: "1px solid rgba(59,130,246,0.3)",
                borderRadius: 99, background: "rgba(59,130,246,0.07)",
              }}>
                06 — Contact
              </div>
              <h2 style={{
                fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 800, lineHeight: 1.1, marginBottom: 12,
                background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", color: "transparent",
                backgroundSize: "200% 100%", animation: "gradient-shift 3s linear infinite",
              }}>Let's Build Together 🤝</h2>
              <p style={{ color: "#9CA3AF", fontSize: 16, maxWidth: 640, margin: "0 auto" }}>Open to research collaborations, project work, academic opportunities, and professional connections.</p>
              <div style={{ marginTop: 16 }}>
                <a href={"mailto:232311314@vu.edu.bd,misajib0493@gmail.com?subject=" + encodeURIComponent("Research Collaboration") + "&body=" + encodeURIComponent("Hi Md Mohaiminul Islam Sajib,%0A%0AI'd like to discuss a research collaboration.\n\nRegards,%0A[Your Name]")}
                  style={{ display: "inline-block", padding: "10px 22px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.06)",
                    background: "linear-gradient(90deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))", color: "#F9FAFB",
                    fontFamily: "'Space Mono', monospace", fontSize: 13, letterSpacing: 1, transition: "all 0.18s", cursor: "none", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 30px rgba(59,130,246,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  Start a Research Chat ✉️
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Glass id="contactForm" style={{ padding: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                {[
                  { label: "Your Name", key: "name", type: "text", placeholder: "Your name" },
                  { label: "Email Address", key: "email", type: "email", placeholder: "232311314@vu.edu.bd" },
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
                  { label: "232311314@vu.edu.bd", icon: "✉", href: "mailto:232311314@vu.edu.bd" },
                  { label: "misajib0493@gmail.com", icon: "✉", href: "mailto:misajib0493@gmail.com" },
                  { label: "github.com/misajib", icon: "⌥", href: "https://github.com/misajib" },
                  { label: "linkedin.com/in/muhammad-mohaiminul-islam-sajib-972a60317", icon: "in", href: "https://www.linkedin.com/in/muhammad-mohaiminul-islam-sajib-972a60317/" },
                ].map(l => (
                  <a key={l.label} href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"} style={{
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
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#4B5563", display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div>© {new Date().getFullYear()} Muhammad Mohaiminul Islam Sajib · Crafted with precision</div>
          <a href="mailto:232311314@vu.edu.bd,misajib0493@gmail.com" style={{ color: "#9CA3AF", textDecoration: "none", fontFamily: "'Space Mono',monospace", fontSize: 11 }} onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'} onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>232311314@vu.edu.bd</a>
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