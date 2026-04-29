"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const slides = [
  {
    video: "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
    fallback: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=90",
    tag: "Final Year Projects",
    headline: "Your Project.",
    sub: "Our Expertise.",
    desc: "Complete implementation with source code, documentation and viva support.",
  },
  {
    video: "https://videos.pexels.com/video-files/7722740/7722740-uhd_2560_1440_24fps.mp4",
    fallback: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=90",
    tag: "Research Papers",
    headline: "IEEE. Scopus.",
    sub: "Published.",
    desc: "Conference & journal papers written by PhD scholars with plagiarism-free guarantee.",
  },
  {
    video: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    fallback: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=90",
    tag: "Academic Excellence",
    headline: "Trusted by",
    sub: "500+ Students.",
    desc: "From PPT presentations to plagiarism removal — we handle every academic need.",
  },
];

const services = [
  { icon: "💻", title: "Project Implementation", desc: "Final year & mini projects with complete source code, documentation and viva support.", price: "from ₹1,999", color: "#06b6d4" },
  { icon: "📄", title: "Conference Papers", desc: "IEEE & Springer formatted papers written by PhD scholars. Plagiarism-free guaranteed.", price: "from ₹1,999", color: "#a855f7" },
  { icon: "📝", title: "Journal Papers", desc: "Scopus & SCI indexed journal papers with strong methodology and results.", price: "from ₹3,999", color: "#14b8a6" },
  { icon: "🎨", title: "PPT Presentation", desc: "Professional slides with charts, diagrams, speaker notes and editable PPTX.", price: "₹299", color: "#f97316" },
  { icon: "🛡️", title: "Plagiarism Removal", desc: "Turnitin-safe content with AI humanizing and plagiarism report included.", price: "₹499", color: "#22c55e" },
];

const stats = [
  { num: "500+", label: "Projects Done" },
  { num: "200+", label: "Papers Published" },
  { num: "98%", label: "Satisfaction" },
  { num: "24hr", label: "Support" },
];

const testimonials = [
  { name: "Karthik R.", college: "Anna University", text: "Got my final year project done perfectly. Team helped me through viva too!", service: "Final Year Project", initials: "KR", color: "#06b6d4" },
  { name: "Priya M.", college: "VIT Vellore", text: "Paper accepted in IEEE conference. Excellent writing quality!", service: "Conference Paper", initials: "PM", color: "#a855f7" },
  { name: "Arjun S.", college: "PSG Tech", text: "Plagiarism went from 35% to 4%. Very professional and fast!", service: "Plagiarism Removal", initials: "AS", color: "#22c55e" },
  { name: "Sneha T.", college: "SRM University", text: "Scopus journal paper published! Amazing quality at affordable price.", service: "Journal Paper", initials: "ST", color: "#14b8a6" },
];

const domains = [
  "Machine Learning", "Deep Learning", "IoT", "Web Development",
  "Android App", "Blockchain", "Cloud Computing", "Cybersecurity",
  "Data Science", "NLP", "Computer Vision", "AR / VR",
  "Python", "Java", "React", "Node.js", "VLSI", "Embedded Systems",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeService, setActiveService] = useState(0);
  const [counts, setCounts] = useState({ p: 0, pa: 0, s: 0 });
  const [counted, setCounted] = useState(false);
  const statsRef = useRef(null);
  const videoRefs = useRef([]);

  // Auto slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Counter animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted) {
        setCounted(true);
        let start = 0;
        const end = 60;
        const timer = setInterval(() => {
          start++;
          const p = Math.round((start / end) * 500);
          const pa = Math.round((start / end) * 200);
          const s = Math.round((start / end) * 98);
          setCounts({ p, pa, s });
          if (start >= end) clearInterval(timer);
        }, 30);
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  const faqs = [
    { q: "What is included in project implementation?", a: "Complete source code, project report, synopsis, PPT and viva preparation support." },
    { q: "How do I get started?", a: "Click Apply Now or WhatsApp us. We contact you within 2 hours to discuss requirements." },
    { q: "Is my project confidential?", a: "Absolutely. We never share your details with anyone. Your work is completely yours." },
    { q: "What domains do you cover?", a: "ML, IoT, Web Dev, Android, Blockchain, Cloud, Cybersecurity, Data Science and more." },
    { q: "Do you offer revisions?", a: "Yes! Free revisions until you are fully satisfied with the delivered work." },
  ];

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: "#050508", color: "#fff", overflow: "hidden" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Mono:wght@400;700&display=swap');

        .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .slide { position: absolute; inset: 0; transition: opacity 1.2s ease; }
        .slide.active { opacity: 1; z-index: 1; }
        .slide.inactive { opacity: 0; z-index: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.3); }
          50% { box-shadow: 0 0 40px rgba(6,182,212,0.7); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes number-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up { animation: fadeUp 0.8s ease forwards; }
        .animate-fade-up-1 { animation: fadeUp 0.8s 0.1s ease forwards; opacity: 0; }
        .animate-fade-up-2 { animation: fadeUp 0.8s 0.2s ease forwards; opacity: 0; }
        .animate-fade-up-3 { animation: fadeUp 0.8s 0.4s ease forwards; opacity: 0; }
        .animate-fade-up-4 { animation: fadeUp 0.8s 0.6s ease forwards; opacity: 0; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-slide-in { animation: slideIn 0.5s ease forwards; }
        .animate-number-up { animation: number-up 0.6s ease forwards; }

        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
        .glass-strong { background: rgba(255,255,255,0.08); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.15); }

        .text-gradient-cyan { background: linear-gradient(135deg, #06b6d4, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .text-gradient-gold { background: linear-gradient(135deg, #f59e0b, #ef4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .service-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .service-card:hover { transform: translateY(-8px) scale(1.02); }

        .slide-progress { height: 2px; background: rgba(255,255,255,0.2); position: relative; overflow: hidden; }
        .slide-progress-fill { height: 100%; background: #06b6d4; transition: width 5s linear; }

        .domain-tag { transition: all 0.3s ease; cursor: default; }
        .domain-tag:hover { background: rgba(6,182,212,0.15); border-color: rgba(6,182,212,0.5); color: #06b6d4; transform: translateY(-2px); }

        .testimonial-card { transition: all 0.4s ease; }
        .testimonial-card:hover { transform: translateY(-6px); background: rgba(255,255,255,0.07); }

        .whatsapp-float { position: fixed; bottom: 24px; right: 24px; z-index: 999; animation: float 3s ease-in-out infinite; }
        .whatsapp-float::before { content: ''; position: absolute; inset: -4px; border-radius: 50%; background: #22c55e; animation: pulse-ring 2s ease-out infinite; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050508; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }

        .section-line { width: 60px; height: 3px; background: linear-gradient(90deg, #06b6d4, transparent); margin-bottom: 16px; }
        
        .playfair { font-family: 'Playfair Display', serif; }
        .mono { font-family: 'Space Mono', monospace; }
        .syne { font-family: 'Syne', sans-serif; }
      `}</style>

      {/* ── HERO SLIDESHOW ── */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>

        {/* Video/Image Slides */}
        {slides.map((slide, i) => (
          <div key={i} className={`slide ${i === currentSlide ? "active" : "inactive"}`}>
            <video
              autoPlay muted loop playsInline
              className="hero-video"
              poster={slide.fallback}
              onError={(e) => e.target.style.display = "none"}
            >
              <source src={slide.video} type="video/mp4" />
            </video>
            <img src={slide.fallback} alt="" className="hero-video" style={{ zIndex: -1 }} />
          </div>
        ))}

        {/* Dark overlay with gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.5) 50%, rgba(5,5,8,0.7) 100%)", zIndex: 2 }}></div>

        {/* Noise texture */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", zIndex: 2 }}></div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", alignItems: "center", padding: "0 5%" }}>
          <div style={{ maxWidth: 800 }}>
            <div key={currentSlide} className="animate-fade-up-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, background: "#06b6d4", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }}></span>
              <span className="mono" style={{ fontSize: 11, color: "#06b6d4", letterSpacing: 2, textTransform: "uppercase" }}>{slides[currentSlide].tag}</span>
            </div>

            <h1 key={`h-${currentSlide}`} className="playfair animate-fade-up-2" style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 8 }}>
              {slides[currentSlide].headline}
            </h1>
            <h1 key={`s-${currentSlide}`} className="playfair animate-fade-up-3 text-gradient-cyan" style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24 }}>
              {slides[currentSlide].sub}
            </h1>

            <p key={`d-${currentSlide}`} className="animate-fade-up-4" style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
              {slides[currentSlide].desc}
            </p>

            <div className="animate-fade-up-4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/services" style={{ background: "#06b6d4", color: "#050508", padding: "14px 32px", borderRadius: 12, fontWeight: 800, fontSize: 15, textDecoration: "none", display: "inline-block", transition: "all 0.3s", letterSpacing: 0.5 }}
                onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
                onMouseOut={e => e.target.style.transform = "translateY(0)"}>
                Explore Services →
              </Link>
              <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer"
                style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)", color: "#22c55e", padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-block", transition: "all 0.3s" }}
                onMouseOver={e => { e.target.style.background = "rgba(34,197,94,0.25)" }}
                onMouseOut={e => { e.target.style.background = "rgba(34,197,94,0.15)" }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* Stats floating card */}
          <div className="glass-strong animate-float" style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", borderRadius: 24, padding: 32, display: "none", minWidth: 220 }}>
          </div>
        </div>

        {/* Slide Controls */}
        <div style={{ position: "absolute", bottom: 40, left: "5%", zIndex: 10, display: "flex", gap: 12, alignItems: "center" }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)}
              style={{ width: i === currentSlide ? 32 : 8, height: 8, borderRadius: 4, background: i === currentSlide ? "#06b6d4" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.4s ease" }}>
            </button>
          ))}
        </div>

        {/* Slide number */}
        <div className="mono" style={{ position: "absolute", bottom: 40, right: "5%", zIndex: 10, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          0{currentSlide + 1} / 0{slides.length}
        </div>

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: "linear-gradient(to top, #050508, transparent)", zIndex: 5 }}></div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div style={{ background: "#06b6d4", padding: "12px 0", overflow: "hidden", position: "relative", zIndex: 10 }}>
        <div className="animate-marquee" style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ display: "flex", gap: 48 }}>
              {["Final Year Projects", "Conference Papers", "Journal Papers", "PPT Design", "Plagiarism Removal", "Viva Support", "500+ Students"].map((t, j) => (
                <span key={j} className="mono" style={{ color: "#050508", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
                  ◆ {t.toUpperCase()}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ padding: "80px 5%", background: "#050508" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {[
            { num: `${counts.p}+`, label: "Projects Delivered", icon: "💻" },
            { num: `${counts.pa}+`, label: "Papers Published", icon: "📄" },
            { num: `${counts.s}%`, label: "Satisfaction Rate", icon: "⭐" },
            { num: "24hr", label: "WhatsApp Support", icon: "💬" },
          ].map((s, i) => (
            <div key={i} className="glass" style={{ borderRadius: 20, padding: "32px 24px", textAlign: "center", transition: "all 0.3s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
              <div className="playfair" style={{ fontSize: 48, fontWeight: 900, color: "#06b6d4", lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 8, letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE DO — HORIZONTAL SCROLL CARDS ── */}
      <section style={{ padding: "80px 0 80px 5%", background: "linear-gradient(180deg, #050508, #0a0a14)" }}>
        <div style={{ maxWidth: 1100, marginBottom: 48 }}>
          <div className="section-line"></div>
          <p className="mono" style={{ color: "#06b6d4", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>What We Do</p>
          <h2 className="playfair" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1 }}>
            Everything You Need for<br />
            <span className="text-gradient-cyan">Academic Success</span>
          </h2>
        </div>

        {/* Horizontal scroll */}
        <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingRight: "5%", paddingBottom: 24, scrollbarWidth: "none" }}>
          {services.map((svc, i) => (
            <div key={i} className="service-card glass" style={{ minWidth: 300, borderRadius: 24, padding: "32px 28px", cursor: "pointer", flexShrink: 0, borderLeft: `3px solid ${svc.color}33` }}
              onMouseOver={e => { e.currentTarget.style.borderColor = `${svc.color}60`; e.currentTarget.style.borderLeftColor = svc.color; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderLeftColor = `${svc.color}33`; }}>
              <div style={{ fontSize: 40, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>{svc.icon}</span>
                <span className="mono" style={{ fontSize: 12, color: svc.color, background: `${svc.color}15`, padding: "4px 12px", borderRadius: 100, border: `1px solid ${svc.color}30` }}>{svc.price}</span>
              </div>
              <h3 className="syne" style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>{svc.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{svc.desc}</p>
              <Link href="/services" style={{ color: svc.color, fontSize: 13, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, letterSpacing: 0.5 }}>
                View Pricing <span style={{ fontSize: 16 }}>→</span>
              </Link>
            </div>
          ))}
        </div>

        <div style={{ paddingRight: "5%", marginTop: 32 }}>
          <Link href="/services" style={{ display: "inline-block", background: "white", color: "#050508", padding: "14px 36px", borderRadius: 12, fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
            See All Services & Pricing →
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 5%", background: "#050508" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="mono" style={{ color: "#06b6d4", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Simple Process</p>
            <h2 className="playfair" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900 }}>How It Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { num: "01", title: "Choose Service", desc: "Browse our packages and pick the one that fits your need.", icon: "📋" },
              { num: "02", title: "Discuss on WhatsApp", desc: "We contact you within 2 hours to understand your exact requirements.", icon: "💬" },
              { num: "03", title: "We Deliver", desc: "Our experts deliver everything — code, paper, PPT — on time.", icon: "⚡" },
              { num: "04", title: "Full Support", desc: "We stay through viva, revisions and resubmissions.", icon: "🎯" },
            ].map((s, i) => (
              <div key={i} className="glass" style={{ borderRadius: 20, padding: 28, textAlign: "center", transition: "all 0.3s", position: "relative" }}>
                <div className="mono" style={{ position: "absolute", top: 16, right: 20, color: "rgba(6,182,212,0.15)", fontSize: 40, fontWeight: 700 }}>{s.num}</div>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <div className="mono" style={{ color: "#06b6d4", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Step {s.num}</div>
                <h3 className="syne" style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 5%", background: "linear-gradient(180deg, #050508, #070710)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start" }}>
            <div>
              <div className="section-line"></div>
              <p className="mono" style={{ color: "#06b6d4", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Student Reviews</p>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 20 }}>
                What students say<br />after delivery.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
                Real feedback from real students across final year projects, papers and plagiarism support.
              </p>
              <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22c55e", color: "#050508", padding: "12px 24px", borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: "none" }}>
                💬 Join 500+ Students
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card glass" style={{ borderRadius: 20, padding: 24, position: "relative" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>)}
                  </div>
                  <span style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30`, borderRadius: 100, padding: "3px 10px", fontSize: 11, fontWeight: 600, display: "inline-block", marginBottom: 12 }}>
                    {t.service}
                  </span>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="syne" style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{t.college}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOMAINS — ANIMATED GRID ── */}
      <section style={{ padding: "80px 5%", background: "#050508" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <p className="mono" style={{ color: "#06b6d4", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Domains We Cover</p>
          <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 40 }}>Project Domains</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {domains.map((d, i) => (
              <span key={i} className="domain-tag" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 500 }}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ + CTA ── */}
      <section style={{ padding: "80px 5%", background: "linear-gradient(180deg, #050508, #070710)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 60 }}>
          <div>
            <p className="mono" style={{ color: "#06b6d4", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Questions?</p>
            <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 36 }}>FAQ</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {faqs.map((faq, i) => (
                <div key={i} className="glass" style={{ borderRadius: 16, overflow: "hidden", transition: "all 0.3s" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span className="syne" style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 600, paddingRight: 16 }}>{faq.q}</span>
                    <span style={{ color: "#06b6d4", fontSize: 22, fontWeight: 300, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="animate-slide-in" style={{ padding: "0 22px 18px", color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #1d4ed8, #4f46e5)", borderRadius: 28, padding: 36, position: "sticky", top: 100, alignSelf: "start" }}>
            <p className="mono" style={{ color: "rgba(147,197,253,0.7)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Need Help?</p>
            <h3 className="playfair" style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.2, marginBottom: 16 }}>Need Help With Your Project?</h3>
            <p style={{ color: "rgba(219,234,254,0.7)", fontSize: 13, lineHeight: 1.7, marginBottom: 28 }}>
              Contact us on WhatsApp for a free consultation. Response within 2 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer"
                style={{ background: "#22c55e", color: "#050508", padding: "13px 20px", borderRadius: 12, fontWeight: 800, fontSize: 14, textDecoration: "none", textAlign: "center" }}>
                💬 WhatsApp Now
              </a>
              <Link href="/services" style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "13px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
                View Services →
              </Link>
            </div>
            <p style={{ color: "rgba(147,197,253,0.4)", fontSize: 11, textAlign: "center", marginTop: 16 }}>
              Free consultation · No advance payment
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "100px 5%", background: "#050508", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <h2 className="playfair" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24 }}>
            Ready to Get Your<br />
            <span className="text-gradient-cyan">Project Done Right?</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 18, lineHeight: 1.7, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
            Join 500+ students who trusted Journify for their final year projects, research papers and academic success.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer"
              style={{ background: "#22c55e", color: "#050508", padding: "16px 40px", borderRadius: 14, fontWeight: 800, fontSize: 17, textDecoration: "none" }}>
              💬 Chat on WhatsApp
            </a>
            <Link href="/services" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "white", padding: "16px 40px", borderRadius: 14, fontWeight: 700, fontSize: 17, textDecoration: "none" }}>
              View Services →
            </Link>
          </div>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, marginTop: 24 }}>
            Free consultation · No advance payment · Response within 2 hours
          </p>
        </div>
      </section>

      {/* ── WHATSAPP FLOAT BUTTON ── */}
      <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer" className="whatsapp-float"
        style={{ width: 56, height: 56, background: "#22c55e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, textDecoration: "none", boxShadow: "0 8px 32px rgba(34,197,94,0.4)" }}>
        💬
      </a>

    </div>
  );
}