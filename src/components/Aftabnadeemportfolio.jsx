import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0a0a0f;
    --surface:#111118;
    --surface2:#1a1a24;
    --border:#2a2a3a;
    --accent:#6c63ff;
    --accent2:#00d4aa;
    --text:#f0f0f5;
    --muted:#8888aa;
    --card-bg:#13131e;
  }
  html{scroll-behavior:smooth}
  body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden}

  /* ── NAV ── */
  nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;background:rgba(10,10,15,0.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.05)}
  .nav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;letter-spacing:-0.02em;color:var(--text);text-decoration:none}
  .nav-logo span{color:var(--accent)}

  /* desktop links */
  .nav-links{display:flex;gap:2rem;list-style:none}
  .nav-links a{color:var(--muted);text-decoration:none;font-size:0.875rem;font-weight:500;transition:color 0.2s;letter-spacing:0.02em}
  .nav-links a:hover{color:var(--text)}

  /* hamburger button — hidden on desktop */
  .nav-hamburger{display:none;flex-direction:column;justify-content:center;align-items:center;width:40px;height:40px;background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:10px;cursor:pointer;gap:5px;transition:background 0.2s}
  .nav-hamburger:hover{background:rgba(255,255,255,0.08)}
  .ham-line{width:18px;height:1.5px;background:var(--text);border-radius:2px;transition:all 0.3s}
  .nav-hamburger.open .ham-line:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
  .nav-hamburger.open .ham-line:nth-child(2){opacity:0;transform:scaleX(0)}
  .nav-hamburger.open .ham-line:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}

  /* mobile drawer */
  .mobile-menu{display:none;position:fixed;top:65px;left:0;right:0;z-index:99;background:rgba(10,10,15,0.97);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.06);padding:0;max-height:0;overflow:hidden;transition:max-height 0.35s cubic-bezier(0.4,0,0.2,1),padding 0.3s}
  .mobile-menu.open{max-height:400px;padding:1rem 0 1.5rem}
  .mobile-menu ul{list-style:none;display:flex;flex-direction:column}
  .mobile-menu ul li a{display:block;padding:0.9rem 2rem;color:var(--muted);text-decoration:none;font-size:1rem;font-weight:500;letter-spacing:0.02em;transition:color 0.2s,background 0.2s;border-left:2px solid transparent}
  .mobile-menu ul li a:hover{color:var(--text);background:rgba(255,255,255,0.03);border-left-color:var(--accent)}
  .mobile-menu-footer{padding:1rem 2rem 0;border-top:1px solid rgba(255,255,255,0.05);margin-top:0.5rem;display:flex;gap:1rem}
  .mobile-social-link{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--muted);text-decoration:none;transition:all 0.2s}
  .mobile-social-link:hover{border-color:var(--accent);color:var(--accent)}

  @media(max-width:768px){
    .nav-links{display:none}
    .nav-hamburger{display:flex}
    .mobile-menu{display:block}
  }

  /* ── HERO ── */
  .hero{min-height:100vh;display:flex;align-items:center;padding:6rem 2rem 4rem;position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;top:-200px;right:-200px;width:600px;height:600px;background:radial-gradient(circle,rgba(108,99,255,0.12) 0%,transparent 70%);pointer-events:none}
  .hero::after{content:'';position:absolute;bottom:-100px;left:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(0,212,170,0.08) 0%,transparent 70%);pointer-events:none}

  /* two-column on desktop */
  .hero-inner{max-width:1100px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:4rem}
  @media(max-width:900px){.hero-inner{grid-template-columns:1fr;gap:3rem}}

  .hero-left{}
  .hero-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.25);border-radius:999px;padding:4px 14px;font-size:0.8rem;color:var(--accent);letter-spacing:0.05em;text-transform:uppercase;font-weight:500;margin-bottom:1.5rem}
  .hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--accent2);animation:pulse 2s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}
  .hero-name{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(2.75rem,6vw,5rem);line-height:1;letter-spacing:-0.03em;margin-bottom:0.5rem}
  .hero-name .line2{color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.2)}
  .hero-subtitle{font-size:1.05rem;color:var(--muted);max-width:480px;margin:1.25rem 0 2rem;font-weight:300;line-height:1.75}
  .hero-subtitle strong{color:var(--text);font-weight:500}
  .hero-ctas{display:flex;gap:1rem;flex-wrap:wrap}
  .btn-primary{background:var(--accent);color:#fff;padding:0.75rem 1.75rem;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;letter-spacing:0.01em;transition:all 0.2s;border:none;cursor:pointer;display:inline-block}
  .btn-primary:hover{background:#7c74ff;transform:translateY(-1px)}
  .btn-outline{background:transparent;color:var(--text);padding:0.75rem 1.75rem;border-radius:8px;text-decoration:none;font-weight:500;font-size:0.9rem;border:1px solid var(--border);transition:all 0.2s;cursor:pointer;display:inline-block}
  .btn-outline:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px)}
  .hero-stats{display:flex;gap:2.5rem;margin-top:3rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.06)}
  .stat-num{font-family:'Syne',sans-serif;font-size:1.75rem;font-weight:700;color:var(--text)}
  .stat-label{font-size:0.8rem;color:var(--muted);letter-spacing:0.03em}

  /* right visual panel */
  .hero-right{display:flex;justify-content:center;align-items:center}
  @media(max-width:900px){.hero-right{display:none}}
  .hero-visual{width:100%;max-width:400px;aspect-ratio:1;position:relative}
  .hero-avatar-ring{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(108,99,255,0.2);animation:spin 20s linear infinite}
  .hero-avatar-ring2{position:absolute;inset:15px;border-radius:50%;border:1px dashed rgba(0,212,170,0.15);animation:spin 14s linear infinite reverse}
  @keyframes spin{to{transform:rotate(360deg)}}
  .hero-avatar-center{position:absolute;inset:40px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem}
  .hero-initials{font-family:'Syne',sans-serif;font-weight:800;font-size:3rem;color:var(--text);letter-spacing:-0.03em}
  .hero-initials span{color:var(--accent)}
  .hero-badge{font-size:0.7rem;color:var(--muted);letter-spacing:0.08em;text-transform:uppercase}
  /* orbit dots */
  .orbit-dot{position:absolute;width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1rem;border:1px solid var(--border);background:var(--card-bg)}
  .od1{top:8%;left:50%;transform:translateX(-50%)}
  .od2{top:50%;right:4%;transform:translateY(-50%)}
  .od3{bottom:8%;left:50%;transform:translateX(-50%)}
  .od4{top:50%;left:4%;transform:translateY(-50%)}

  /* ── GENERAL SECTION ── */
  section{padding:5rem 2rem}
  .container{max-width:1000px;margin:0 auto}
  .section-label{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--accent);font-weight:600;margin-bottom:0.75rem}
  .section-title{font-family:'Syne',sans-serif;font-weight:700;font-size:clamp(1.75rem,4vw,2.5rem);letter-spacing:-0.02em;line-height:1.15;margin-bottom:2.5rem}

  /* ── SKILLS ── */
  #skills{background:var(--surface)}
  .skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}
  .skill-card{background:var(--card-bg);border:1px solid var(--border);border-radius:12px;padding:1.25rem 1.5rem;transition:border-color 0.2s,transform 0.2s}
  .skill-card:hover{border-color:rgba(108,99,255,0.4);transform:translateY(-2px)}
  .skill-card-title{font-family:'Syne',sans-serif;font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;color:var(--muted);margin-bottom:0.75rem}
  .skill-tags{display:flex;flex-wrap:wrap;gap:6px}
  .tag{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:3px 10px;font-size:0.78rem;color:var(--text);white-space:nowrap}

  /* ── TIMELINE ── */
  .timeline{position:relative;padding-left:1.5rem}
  .timeline::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:1px;background:linear-gradient(to bottom,var(--accent),var(--accent2),transparent)}
  .timeline-item{position:relative;margin-bottom:2.5rem;padding-left:1.5rem}
  .timeline-dot{position:absolute;left:-1.5rem;top:6px;width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px rgba(108,99,255,0.15)}
  .timeline-period{font-size:0.78rem;color:var(--accent2);font-weight:500;letter-spacing:0.04em;margin-bottom:0.25rem}
  .timeline-role{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;margin-bottom:0.15rem}
  .timeline-company{font-size:0.875rem;color:var(--muted);margin-bottom:1rem}
  .timeline-bullets{list-style:none;display:flex;flex-direction:column;gap:0.6rem}
  .timeline-bullets li{font-size:0.9rem;color:rgba(240,240,245,0.8);padding-left:1.25rem;position:relative;line-height:1.6}
  .timeline-bullets li::before{content:'→';position:absolute;left:0;color:var(--accent2);font-size:0.8rem}

  /* ── PROJECTS ── */
  #projects{background:var(--surface)}
  .projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem}
  .project-card{background:var(--card-bg);border:1px solid var(--border);border-radius:14px;padding:1.5rem;transition:all 0.25s;display:flex;flex-direction:column;gap:1rem}
  .project-card:hover{border-color:rgba(108,99,255,0.35);transform:translateY(-3px);box-shadow:0 20px 40px rgba(0,0,0,0.4)}
  .project-header{display:flex;justify-content:space-between;align-items:flex-start}
  .project-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
  .project-links{display:flex;gap:8px}
  .project-link{width:30px;height:30px;border-radius:8px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--muted);text-decoration:none;font-size:0.8rem;transition:all 0.2s}
  .project-link:hover{border-color:var(--accent);color:var(--accent)}
  .project-name{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;letter-spacing:-0.01em}
  .project-year{font-size:0.75rem;color:var(--muted);margin-top:2px}
  .project-desc{font-size:0.875rem;color:rgba(240,240,245,0.7);line-height:1.65;flex:1}
  .project-stack{display:flex;flex-wrap:wrap;gap:5px;margin-top:auto}
  .stack-tag{background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.2);border-radius:5px;padding:2px 8px;font-size:0.72rem;color:#a09aff;font-weight:500}
  .project-live-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(0,212,170,0.1);border:1px solid rgba(0,212,170,0.25);border-radius:999px;padding:2px 8px;font-size:0.7rem;color:var(--accent2);font-weight:600;margin-top:4px}
  .project-live-badge::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--accent2);animation:pulse 2s ease-in-out infinite}

  /* ── CONTACT ── */
  .contact-wrapper{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:2.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem}
  .contact-left h3{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:0.5rem}
  .contact-left p{color:var(--muted);font-size:0.9rem;max-width:360px}
  .contact-links{display:flex;flex-wrap:wrap;gap:0.75rem}
  .contact-link{display:flex;align-items:center;gap:8px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:0.6rem 1rem;text-decoration:none;color:var(--text);font-size:0.875rem;font-weight:500;transition:all 0.2s}
  .contact-link:hover{border-color:var(--accent);color:var(--accent)}
  .contact-link svg{width:16px;height:16px;flex-shrink:0}

  footer{text-align:center;padding:2rem;border-top:1px solid rgba(255,255,255,0.05);color:var(--muted);font-size:0.8rem}

  .fade-up{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease}
  .fade-up.visible{opacity:1;transform:translateY(0)}
`;

const PROJECTS = [
  {
    id: 1,
    icon: "🚀",
    iconBg: "rgba(108,99,255,0.12)",
    name: "PitchOS",
    year: "2025",
    live: true,
    github: "https://github.com/aftabnadeem",
    liveUrl: "#",
    desc: "Production-grade mobile sales CRM for iOS and Android. Integrates Gemini 2.5 Flash to generate personalized cold emails, WhatsApp messages, and call scripts. Features real-time team feeds, Kanban pipeline, and location-aware prospect discovery.",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "Gemini 2.5", "Google Maps"],
  },
  {
    id: 2,
    icon: "🗂️",
    iconBg: "rgba(0,212,170,0.1)",
    name: "IssueHub",
    year: "2024",
    live: false,
    github: "https://github.com/aftabnadeem",
    liveUrl: null,
    desc: "A lightweight Jira alternative with project creation, member invites, file-attached issues, Kanban drag-and-drop board, threaded comments, and role-based access control.",
    stack: ["React", "Spring Boot", "Java", "REST APIs"],
  },
  // Add more projects here:
  // { id: 3, icon: "🌐", iconBg: "rgba(0,212,170,0.1)", name: "...", year: "2025", live: true,
  //   github: "https://...", liveUrl: "https://...", desc: "...", stack: ["React", "Node.js"] },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function FadeUp({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="fade-up">{children}</div>;
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-header">
        <div className="project-icon" style={{ background: project.iconBg }}>{project.icon}</div>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-link" title="GitHub"><GitHubIcon /></a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link" title="Live"><ExternalIcon /></a>
          )}
        </div>
      </div>
      <div>
        <div className="project-name">{project.name}</div>
        <div className="project-year">{project.year}</div>
      </div>
      <p className="project-desc">{project.desc}</p>
      {project.live && <span className="project-live-badge">Live</span>}
      <div className="project-stack">
        {project.stack.map(t => <span key={t} className="stack-tag">{t}</span>)}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => setMenuOpen(false);

  const NAV_LINKS = [
    { href: "#about",      label: "About" },
    { href: "#skills",     label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects",   label: "Projects" },
    { href: "#contact",    label: "Contact" },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* ── NAV ── */}
      <nav>
        <a href="#about" className="nav-logo">AN<span>.</span></a>

        {/* desktop */}
        <ul className="nav-links">
          {NAV_LINKS.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>

        {/* hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </nav>

      {/* mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={handleNavClick}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-footer">
          <a href="https://github.com/aftabnadeem" target="_blank" rel="noreferrer" className="mobile-social-link" title="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/aftab-nadeem-b42772256" target="_blank" rel="noreferrer" className="mobile-social-link" title="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="mailto:aftabnadeemnp@outlook.com" className="mobile-social-link" title="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="about">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-tag">Available for opportunities</div>
            <h1 className="hero-name">
              <span className="line1">Aftab</span><br />
              <span className="line2">Nadeem</span>
            </h1>
            <p className="hero-subtitle">
              <strong>Full Stack Developer</strong> crafting production-grade SaaS, ERP systems,
              and AI-powered tools. Comfortable across the stack — from <strong>React & Next.js</strong>{" "}
              on the frontend to <strong>Django & Spring Boot</strong> on the backend.
            </p>
            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">1+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">10+</div>
                <div className="stat-label">Projects Shipped</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">5+</div>
                <div className="stat-label">Tech Stacks</div>
              </div>
            </div>
          </div>

          {/* right visual */}
          <div className="hero-right">
            <div className="hero-visual">
              <div className="hero-avatar-ring" />
              <div className="hero-avatar-ring2" />
              <div className="hero-avatar-center">
                <div className="hero-initials">A<span>N</span></div>
                <div className="hero-badge">Full Stack Dev</div>
              </div>
              <div className="orbit-dot od1">⚛️</div>
              <div className="orbit-dot od2">🐍</div>
              <div className="orbit-dot od3">🤖</div>
              <div className="orbit-dot od4">☁️</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="container">
          <FadeUp>
            <div className="section-label">Expertise</div>
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
              {[
                { title: "Frontend",     tags: ["React.js","Next.js","React Native","TypeScript","PWA","Expo"] },
                { title: "Backend",      tags: ["Django","DRF","Spring Boot","Node.js","REST APIs"] },
                { title: "AI / Cloud",   tags: ["LLM Fine-Tuning","OCR","Gemini 2.5","Supabase","WebSockets"] },
                { title: "Languages",    tags: ["Python","JavaScript","TypeScript","Java","HTML5","CSS3"] },
                { title: "APIs & Tools", tags: ["Google Maps SDK","Places API","Zustand","Git","CI/CD"] },
                { title: "Architecture", tags: ["SSR / SSG","ERP","SaaS","SEO","Agile"] },
              ].map(({ title, tags }) => (
                <div key={title} className="skill-card">
                  <div className="skill-card-title">{title}</div>
                  <div className="skill-tags">{tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience">
        <div className="container">
          <FadeUp>
            <div className="section-label">Career</div>
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-period">Oct 2024 — Present</div>
                <div className="timeline-role">Software Engineer — Full Stack</div>
                <div className="timeline-company">Pegasus Consulting · Bengaluru, India</div>
                <ul className="timeline-bullets">
                  <li>Built an Educational SaaS platform with OCR-based image reading, automated Q&A generation, and LLM fine-tuning; extended reach with a companion Android APK via React Native.</li>
                  <li>Developed multiple e-commerce applications using React and Django REST — covering product catalogue, cart, orders, and payments.</li>
                  <li>Built a cross-platform PWA task management system with real-time push notifications for Android and iOS.</li>
                  <li>Delivered Next.js apps using SSR and SSG for improved SEO and performance.</li>
                  <li>Architected modular ERP solutions capable of handling complex industry workflows.</li>
                  <li>Worked in Agile sprints, conducted code reviews, and maintained CI/CD pipelines.</li>
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="container">
          <FadeUp>
            <div className="section-label">Work</div>
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
              <div className="project-card" style={{ borderStyle:"dashed", opacity:0.5, justifyContent:"center", alignItems:"center", textAlign:"center", minHeight:"220px" }}>
                <div style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>＋</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.95rem", fontWeight:600, color:"var(--muted)" }}>More coming soon</div>
                <div style={{ fontSize:"0.8rem", color:"var(--muted)", marginTop:"4px" }}>Add your live projects in the PROJECTS array</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="container">
          <FadeUp>
            <div className="section-label">Get in Touch</div>
            <h2 className="section-title">Let's Work Together</h2>
            <div className="contact-wrapper">
              <div className="contact-left">
                <h3>Open to opportunities</h3>
                <p>Whether it's a full-time role, freelance project, or just a conversation — I'm always happy to connect.</p>
              </div>
              <div className="contact-links">
                <a href="mailto:aftabnadeemnp@outlook.com" className="contact-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  aftabnadeemnp@outlook.com
                </a>
                <a href="https://linkedin.com/in/aftab-nadeem-b42772256" target="_blank" rel="noreferrer" className="contact-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
                <a href="https://github.com/aftabnadeem" target="_blank" rel="noreferrer" className="contact-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  GitHub
                </a>
                <a href="tel:+918073803181" className="contact-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.08 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"/></svg>
                  +91 80738 03181
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer>
        <p>Designed & built by Aftab Nadeem · 2025</p>
      </footer>
    </>
  );
}