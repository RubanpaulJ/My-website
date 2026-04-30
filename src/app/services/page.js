"use client";
import { useState } from "react";
import Link from "next/link";

// ============================================================
// SEO METADATA — Add this to a separate layout.js or page.js
// For Next.js App Router, export this from a server component
// ============================================================
// export const metadata = {
//   title: "Buy Final Year Projects, Mini Projects, Conference & Journal Papers | Journify Technologies",
//   description: "Buy final year project implementation, mini project, conference paper writing, journal paper writing, IEEE paper, Scopus paper, plagiarism removal for engineering students in India. Trusted by 500+ students across Tamil Nadu, Chennai, Coimbatore, Madurai, Trichy. WhatsApp: 7904203916",
//   keywords: [
//     // FINAL YEAR PROJECT KEYWORDS
//     "buy final year project", "final year project buying", "final year project implementation",
//     "final year project implementation service", "final year project implementation india",
//     "final year project implementation tamil nadu", "final year project implementation chennai",
//     "final year project implementation coimbatore", "final year project for engineering students",
//     "engineering final year project buying", "engineering final year project implementation",
//     "final year project buying india", "final year project service india",
//     "final year project help india", "final year project assistance india",
//     "final year project developers india", "best final year project service",
//     "final year project with source code", "final year project with documentation",
//     "final year project with report", "final year project with ppt",
//     "buy final year project online", "buy final year project india",
//     "buy final year project chennai", "buy final year project coimbatore",
//     "final year project for btech", "final year project for be",
//     "final year project for mtech", "final year project for mca",
//     "final year project for msc", "final year project for bsc",
//     // MINI PROJECT KEYWORDS
//     "buy mini project", "mini project buying", "mini project implementation",
//     "mini project implementation india", "mini project implementation service",
//     "mini project for engineering students", "mini project buying india",
//     "mini project buying online", "mini project help india",
//     "buy mini project online", "mini project with source code",
//     "mini project developers india", "mini project service india",
//     "mini project implementation chennai", "mini project implementation coimbatore",
//     "mini project for btech", "mini project for be students",
//     "3rd year mini project india", "semester project buying",
//     "semester project implementation india", "buy semester project",
//     // CONFERENCE PAPER KEYWORDS
//     "buy conference paper", "conference paper buying", "conference paper writing service",
//     "conference paper writing india", "conference paper writing for engineering students",
//     "IEEE paper writing service", "IEEE paper writing india",
//     "IEEE conference paper buying", "buy IEEE conference paper",
//     "Springer paper writing service", "conference paper writing service india",
//     "buy conference paper india", "conference paper writing tamil nadu",
//     "conference paper writing chennai", "conference paper writing coimbatore",
//     "conference paper for final year project", "conference paper publication india",
//     "conference paper writing service online", "IEEE format paper writing",
//     // JOURNAL PAPER KEYWORDS
//     "buy journal paper", "journal paper buying", "journal paper writing service",
//     "journal paper writing india", "Scopus paper writing", "SCI paper writing",
//     "Scopus indexed journal paper india", "buy Scopus paper",
//     "journal paper for engineering students", "journal paper for final year",
//     "journal paper buying india", "journal paper writing tamil nadu",
//     "journal paper writing chennai", "journal paper writing coimbatore",
//     "Scopus journal paper service", "SCI journal paper service india",
//     "buy research paper india", "research paper writing service india",
//     "research paper writing for students", "journal publication service india",
//     // IMPLEMENTATION KEYWORDS
//     "project implementation buying", "project implementation service india",
//     "buy project implementation", "implementation buying india",
//     "project implementation for engineering", "buy implementation project",
//     "implementation service india", "project implementation service chennai",
//     "project implementation service coimbatore", "buy project source code",
//     "buy project with source code india", "project source code buying",
//     // DOMAIN KEYWORDS
//     "machine learning project buying", "deep learning project buying",
//     "AI project implementation india", "artificial intelligence project buying",
//     "IoT project implementation", "IoT project buying india",
//     "web development project buying", "android project buying",
//     "blockchain project buying", "cloud computing project buying",
//     "cybersecurity project buying", "data science project buying",
//     "python project buying", "java project buying", "react project buying",
//     "NLP project buying", "computer vision project buying",
//     // PLAGIARISM KEYWORDS
//     "plagiarism removal service india", "plagiarism removal india",
//     "plagiarism removal for students", "turnitin safe content india",
//     "AI content humanizing india", "plagiarism removal chennai",
//     "plagiarism removal coimbatore", "plagiarism check india",
//     "plagiarism free report india", "buy plagiarism removal",
//     // PPT KEYWORDS
//     "ppt presentation buying", "buy ppt presentation india",
//     "presentation making service india", "professional ppt service",
//     "ppt for final year project", "ppt for conference presentation",
//     "ppt design service india", "buy project ppt india",
//     // LOCATION KEYWORDS
//     "academic service india", "academic service tamil nadu",
//     "academic service chennai", "academic service coimbatore",
//     "academic service madurai", "academic service trichy",
//     "academic service vellore", "academic service salem",
//     "student project service india", "student project buying india",
//     "engineering student service india", "engineering student project help",
//     // BRAND + TRUST KEYWORDS
//     "journify technologies", "journify project service",
//     "trusted project service india", "affordable project service india",
//     "cheap project implementation india", "best project service india",
//     "top project service india", "project service with viva support",
//     "project service with documentation", "project service with source code",
//   ],
// };

const miniProjects = [
  {
    icon: "💻",
    title: "Mini Project Implementation",
    subtitle: "Complete project with source code",
    price: 1999,
    original: 4000,
    badge: "Best Value",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
    color: "from-cyan-500 to-blue-500",
    border: "border-cyan-500/30",
    features: [
      "Full mini project implementation",
      "Complete source code",
      "Project documentation",
      "Synopsis included",
      "PPT presentation",
      "WhatsApp support",
    ],
  },
  {
    icon: "📄",
    title: "Conference Paper Writing",
    subtitle: "IEEE / Springer Format",
    price: 1999,
    original: 4000,
    badge: "High Demand",
    badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    color: "from-purple-500 to-violet-500",
    border: "border-purple-500/30",
    features: [
      "IEEE / Springer format",
      "Abstract & introduction",
      "Literature review",
      "Methodology & results",
      "Formatted references",
      "Plagiarism-free content",
    ],
  },
];

const finalYearProjects = [
  {
    icon: "🏆",
    title: "Implementation for Conference",
    subtitle: "Final Year Project — Conference Track",
    price: 3499,
    original: 7000,
    badge: "Most Popular",
    badgeColor: "bg-amber-400/20 text-amber-300 border border-amber-400/30",
    color: "from-amber-500 to-orange-500",
    border: "border-amber-500/30",
    features: [
      "Final year project implementation",
      "Conference paper support",
      "Complete source code",
      "Project documentation",
      "Synopsis & PPT included",
      "Viva preparation support",
    ],
  },
  {
    icon: "📄",
    title: "Conference Paper Writing",
    subtitle: "IEEE / Springer — Final Year",
    price: 3999,
    original: 8000,
    badge: "High Demand",
    badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    color: "from-purple-500 to-violet-500",
    border: "border-purple-500/30",
    features: [
      "IEEE / Springer format",
      "Full conference paper",
      "Abstract & introduction",
      "Literature review",
      "Methodology & results",
      "Plagiarism-free guarantee",
    ],
  },
  {
    icon: "🎯",
    title: "Implementation for Journal",
    subtitle: "Final Year Project — Journal Track",
    price: 4499,
    original: 9000,
    badge: "Scopus Ready",
    badgeColor: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
    color: "from-teal-500 to-cyan-500",
    border: "border-teal-500/30",
    features: [
      "Final year project implementation",
      "Journal paper support",
      "Complete source code",
      "Detailed documentation",
      "Synopsis & PPT included",
      "Viva preparation support",
    ],
  },
  {
    icon: "📝",
    title: "Journal Paper Writing",
    subtitle: "Scopus / SCI Indexed Journals",
    price: 5499,
    original: 10000,
    badge: "Premium",
    badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    color: "from-blue-500 to-indigo-500",
    border: "border-blue-500/30",
    features: [
      "Scopus / SCI indexed journals",
      "Full paper writing",
      "Abstract & keywords",
      "Results & discussion",
      "Proper citations",
      "Plagiarism-free content",
    ],
  },
];

const addons = [
  {
    icon: "🎨",
    title: "PPT Presentation",
    subtitle: "Professional Slide Design",
    price: 299,
    original: 800,
    badge: "Best Value",
    badgeColor: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
    color: "from-orange-500 to-amber-500",
    border: "border-orange-500/30",
    features: [
      "Professional design",
      "Up to 20 slides",
      "Custom color theme",
      "Charts & diagrams",
      "Speaker notes",
      "Editable PPTX file",
    ],
  },
  {
    icon: "🛡️",
    title: "Plagiarism Removal",
    subtitle: "& AI Content Humanizing",
    price: 499,
    original: 1200,
    badge: "Quick Delivery",
    badgeColor: "bg-green-500/20 text-green-300 border border-green-500/30",
    color: "from-green-500 to-emerald-500",
    border: "border-green-500/30",
    features: [
      "Turnitin-safe content",
      "AI content humanizing",
      "Plagiarism report included",
      "Up to 5,000 words",
      "24 hour delivery",
      "100% unique guaranteed",
    ],
  },
];

function ApplyCard({ service }) {
  const handleApply = () => {
    const message = `Hi! I want to apply for *${service.title}* (₹${service.price.toLocaleString()}). Please guide me on next steps.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917904203916?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const discount = Math.round(((service.original - service.price) / service.original) * 100);

  return (
    <div className={`bg-gray-900 border ${service.border} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col`}>
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-5">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl shadow-lg`}>
            {service.icon}
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${service.badgeColor}`}>
            {service.badge}
          </span>
        </div>
        <h3 className="text-lg font-black text-white mb-1">{service.title}</h3>
        <p className="text-gray-500 text-sm mb-5">{service.subtitle}</p>
        <div className="flex items-end gap-2 mb-1">
          <span className="text-3xl font-black text-white">₹{service.price.toLocaleString()}</span>
          <span className="text-gray-600 line-through text-sm mb-1">₹{service.original.toLocaleString()}</span>
        </div>
        <div className="mb-5">
          <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>
        </div>
        <ul className="space-y-2">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="text-cyan-400 font-bold flex-shrink-0 mt-0.5">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 pt-0">
        <button
          onClick={handleApply}
          className={`w-full py-3.5 rounded-xl font-black text-sm transition-all duration-300 bg-gradient-to-r ${service.color} text-white hover:opacity-90 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2`}
        >
          💬 Apply Now →
        </button>
        <p className="text-center text-xs text-gray-600 mt-2">Opens WhatsApp — We reply within 2 hours</p>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">

      {/* =====================================================
          HIDDEN SEO KEYWORDS BLOCK — invisible to users,
          visible to Google crawlers for indexing
      ===================================================== */}
      <div style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
        <h1>Buy Final Year Project Implementation India</h1>
        <p>
          Buy final year project, final year project buying, final year project implementation,
          buy final year project india, final year project buying india, final year project implementation india,
          final year project implementation tamil nadu, final year project implementation chennai,
          final year project implementation coimbatore, final year project for engineering students,
          engineering final year project buying, engineering final year project implementation,
          final year project service india, final year project help india, final year project assistance india,
          final year project developers india, best final year project service india,
          final year project with source code, final year project with documentation,
          final year project with report, final year project with ppt, buy final year project online,
          buy final year project chennai, buy final year project coimbatore,
          final year project for btech, final year project for be, final year project for mtech,
          final year project for mca, final year project for msc, final year project for bsc,
          buy mini project, mini project buying, mini project implementation,
          mini project implementation india, mini project implementation service,
          mini project for engineering students, mini project buying india,
          mini project buying online, mini project help india, buy mini project online,
          mini project with source code, mini project developers india, mini project service india,
          mini project implementation chennai, mini project implementation coimbatore,
          mini project for btech, mini project for be students,
          3rd year mini project india, semester project buying, semester project implementation india,
          buy semester project, buy conference paper, conference paper buying,
          conference paper writing service, conference paper writing india,
          conference paper writing for engineering students, IEEE paper writing service,
          IEEE paper writing india, IEEE conference paper buying, buy IEEE conference paper,
          Springer paper writing service, conference paper writing service india,
          buy conference paper india, conference paper writing tamil nadu,
          conference paper writing chennai, conference paper writing coimbatore,
          conference paper for final year project, conference paper publication india,
          conference paper writing service online, IEEE format paper writing,
          buy journal paper, journal paper buying, journal paper writing service,
          journal paper writing india, Scopus paper writing, SCI paper writing,
          Scopus indexed journal paper india, buy Scopus paper,
          journal paper for engineering students, journal paper for final year,
          journal paper buying india, journal paper writing tamil nadu,
          journal paper writing chennai, journal paper writing coimbatore,
          Scopus journal paper service, SCI journal paper service india,
          buy research paper india, research paper writing service india,
          research paper writing for students, journal publication service india,
          project implementation buying, project implementation service india,
          buy project implementation, implementation buying india,
          project implementation for engineering, buy implementation project,
          implementation service india, project implementation service chennai,
          project implementation service coimbatore, buy project source code,
          buy project with source code india, project source code buying,
          machine learning project buying, deep learning project buying,
          AI project implementation india, artificial intelligence project buying,
          IoT project implementation, IoT project buying india,
          web development project buying, android project buying,
          blockchain project buying, cloud computing project buying,
          cybersecurity project buying, data science project buying,
          python project buying, java project buying, react project buying,
          NLP project buying, computer vision project buying,
          neural network project buying, image processing project buying,
          natural language processing project buying, big data project buying,
          embedded systems project buying, robotics project buying,
          full stack project buying, MERN stack project buying,
          plagiarism removal service india, plagiarism removal india,
          plagiarism removal for students, turnitin safe content india,
          AI content humanizing india, plagiarism removal chennai,
          plagiarism removal coimbatore, plagiarism check india,
          plagiarism free report india, buy plagiarism removal,
          ppt presentation buying, buy ppt presentation india,
          presentation making service india, professional ppt service,
          ppt for final year project, ppt for conference presentation,
          ppt design service india, buy project ppt india,
          academic service india, academic service tamil nadu,
          academic service chennai, academic service coimbatore,
          academic service madurai, academic service trichy,
          academic service vellore, academic service salem, academic service tirunelveli,
          student project service india, student project buying india,
          engineering student service india, engineering student project help,
          journify technologies, journify project service,
          trusted project service india, affordable project service india,
          cheap project implementation india, best project service india,
          top project service india, project service with viva support,
          project service with documentation, project service with source code,
          viva preparation india, project viva support india,
          project report writing india, synopsis writing india,
          buy project report india, buy synopsis india,
          project documentation service india, academic writing service india,
          thesis writing service india, dissertation writing service india,
          phd assistance india, phd guidance india,
          anna university project buying, vit project buying, srm project buying,
          psg tech project buying, amrita project buying, sathyabama project buying,
          saveetha project buying, kct project buying, nit project buying,
          final year project 2024, final year project 2025, final year project 2026,
          mini project 2024, mini project 2025, mini project 2026,
          IEEE paper 2024, IEEE paper 2025, IEEE paper 2026,
          Scopus paper 2024, Scopus paper 2025, Scopus paper 2026,
          affordable final year project india, low cost project implementation,
          best price project implementation india, project implementation starting 999,
          final year project 3499, mini project 1999, conference paper 1999
        </p>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-gray-950"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold px-5 py-2 rounded-full mb-8 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse inline-block"></span>
            Academic & Research Services
          </div>
          {/* SEO H1 — keyword rich, visible to Google */}
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Buy Final Year Projects &amp; Research Papers
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
              Trusted by 500+ Engineering Students
            </span>
          </h1>
          {/* SEO description — keyword rich */}
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-4">
            Buy final year project implementation, mini project, conference paper writing,
            journal paper, IEEE paper and plagiarism removal in India.
            Expert help for engineering students across Tamil Nadu.
          </p>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-10">
            Serving students from Anna University, VIT, SRM, PSG Tech, Amrita, Sathyabama,
            Saveetha, KCT, Coimbatore, Chennai, Madurai, Trichy, Vellore and all over India.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { num: "500+", label: "Projects Delivered" },
              { num: "200+", label: "Papers Published" },
              { num: "98%", label: "Satisfaction Rate" },
              { num: "2hrs", label: "Response Time" },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center">
                <p className="text-2xl font-black text-white">{s.num}</p>
                <p className="text-gray-500 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW APPLY WORKS */}
      <section className="py-10 px-6 bg-green-500/5 border-y border-green-500/20">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💬</span>
            <div>
              <p className="font-black text-white text-sm">How to Apply — It is Simple & Free!</p>
              <p className="text-gray-400 text-xs">Click Apply Now → WhatsApp opens → Chat with our team → Get started!</p>
            </div>
          </div>
          <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 text-gray-900 px-6 py-3 rounded-xl font-black text-sm transition whitespace-nowrap">
            💬 Chat Now on WhatsApp
          </a>
        </div>
      </section>

      {/* SECTION 1 — MINI PROJECTS */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold px-5 py-2 rounded-full mb-3">
                📘 Section 1
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">Buy Mini Projects</h2>
              <p className="text-gray-500 mt-2">Mini project implementation &amp; buying service for engineering students</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {miniProjects.map((svc, i) => (
              <ApplyCard key={i} service={svc} />
            ))}
          </div>

          <div className="mt-8 max-w-3xl mx-auto bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-5 flex items-start gap-3">
            <span className="text-cyan-400 text-xl flex-shrink-0">💡</span>
            <p className="text-gray-400 text-sm">
              Buy mini project implementation for 3rd year and semester projects in India.
              Includes complete source code, documentation and PPT. Affordable mini project
              buying service for BTech, BE, MCA students across Chennai, Coimbatore, Tamil Nadu.
              Click Apply Now to discuss your requirements on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — FINAL YEAR PROJECTS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-5 py-2 rounded-full mb-3">
                🏆 Section 2
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">Buy Final Year Projects</h2>
              <p className="text-gray-500 mt-2">Final year project implementation &amp; buying service with conference and journal paper support</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 text-center">
              <p className="text-orange-400 font-bold text-sm mb-1">📄 Conference Track</p>
              <p className="text-gray-500 text-xs">Buy Final Year Project + Conference Paper (IEEE/Springer)</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-center">
              <p className="text-blue-400 font-bold text-sm mb-1">📝 Journal Track</p>
              <p className="text-gray-500 text-xs">Buy Final Year Project + Journal Paper (Scopus/SCI)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalYearProjects.map((svc, i) => (
              <ApplyCard key={i} service={svc} />
            ))}
          </div>

          <div className="mt-8 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-3">
            <span className="text-amber-400 text-xl flex-shrink-0">⭐</span>
            <p className="text-gray-400 text-sm">
              Buy final year project implementation with viva support, synopsis, PPT and full documentation.
              Conference paper buying service for IEEE and Springer publications.
              Journal paper buying service for Scopus and SCI indexed journals.
              Trusted final year project buying service for engineering students across India —
              Chennai, Coimbatore, Madurai, Trichy, Vellore, Tamil Nadu and all states.
            </p>
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-400 text-xs font-bold px-5 py-2 rounded-full mb-3">
                ➕ Add-ons
              </div>
              <h2 className="text-3xl font-black text-white">Extra Services</h2>
              <p className="text-gray-500 mt-2">PPT presentation buying &amp; plagiarism removal service in India</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {addons.map((svc, i) => (
              <ApplyCard key={i} service={svc} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO FAQ SECTION — Google loves FAQ with keywords */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-black text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything about buying final year projects &amp; research papers in India</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                q: "Where can I buy final year project implementation in India?",
                a: "You can buy final year project implementation at Journify Technologies. We provide complete final year project implementation with source code, documentation, synopsis, PPT and viva support for engineering students across India — Chennai, Coimbatore, Madurai, Trichy, Tamil Nadu and all states."
              },
              {
                q: "How to buy mini project for engineering students in India?",
                a: "Buying a mini project at Journify is simple. Click Apply Now on the mini project card above, WhatsApp opens automatically, our team discusses your requirements and delivers your complete mini project with source code and documentation."
              },
              {
                q: "Where to buy conference paper writing service in India?",
                a: "Journify Technologies provides conference paper writing service in IEEE and Springer format for engineering students. We offer conference paper buying service starting at ₹1999 for mini projects and ₹3999 for final year projects."
              },
              {
                q: "How to buy Scopus journal paper for final year project in India?",
                a: "You can buy Scopus indexed journal paper writing service at Journify Technologies. Our journal paper buying service starts at ₹5499 and includes full paper writing, abstract, results, references and plagiarism-free guarantee."
              },
              {
                q: "Is buying final year project implementation legal and safe?",
                a: "Yes. Journify Technologies provides fully confidential academic assistance service. Your project details, source code and paper content are never shared with anyone. We serve 500+ students with 98% satisfaction rate."
              },
              {
                q: "Which domains are covered for final year project buying?",
                a: "We cover all engineering domains — Machine Learning, Deep Learning, Artificial Intelligence, IoT, Web Development, Android, Blockchain, Cloud Computing, Cybersecurity, Data Science, Computer Vision, NLP, Python, Java, React and more."
              },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-900 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition">
                <h3 className="font-black text-white mb-3 text-sm">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-3">Why Us</p>
            <h2 className="text-4xl font-black text-white mb-3">Why Students Trust Journify.</h2>
            <p className="text-gray-500">Best final year project buying service in Tamil Nadu — 500+ students trust us</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "⚡", title: "On-Time Delivery" },
              { icon: "🎯", title: "100% Original" },
              { icon: "👨‍💻", title: "Expert Team" },
              { icon: "🔒", title: "Confidential" },
              { icon: "🔄", title: "Free Revisions" },
              { icon: "💬", title: "24/7 Support" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 border border-white/5 rounded-2xl p-5 text-center hover:border-cyan-500/30 transition group">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white text-xs group-hover:text-cyan-400 transition">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-4xl font-black text-white mb-3">How to Buy Final Year Project</h2>
            <p className="text-gray-500">4 simple steps to buy your project — no registration required</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "👆", num: "01", title: "Click Apply Now", desc: "Choose any service and click the Apply Now button." },
              { icon: "💬", num: "02", title: "WhatsApp Opens", desc: "A pre-filled WhatsApp message opens automatically." },
              { icon: "🤝", num: "03", title: "Discuss & Confirm", desc: "Our team discusses your requirements and confirms timeline." },
              { icon: "🎉", num: "04", title: "Work Begins", desc: "We start working and deliver on time with full support." },
            ].map((s, i) => (
              <div key={i} className="bg-gray-900 border border-white/5 rounded-2xl p-6 text-center hover:border-cyan-500/20 transition relative group">
                <div className="text-4xl mb-4">{s.icon}</div>
                <p className="text-cyan-400 text-xs font-black tracking-widest mb-2">STEP {s.num}</p>
                <h3 className="font-black text-white mb-2 text-sm group-hover:text-cyan-400 transition">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Buy Your Project?</h2>
          <p className="text-gray-400 text-lg mb-2">
            Best final year project buying service in India. Free consultation, no advance payment!
          </p>
          <p className="text-gray-600 text-sm mb-8">
            Serving engineering students from Chennai, Coimbatore, Madurai, Trichy, Vellore,
            Salem, Tirunelveli and all cities across Tamil Nadu and India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:journifyorg@gmail.com"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-2xl font-black text-lg transition">
              📧 Email Us
            </a>
            <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-gray-900 px-8 py-4 rounded-2xl font-black text-lg transition">
              💬 WhatsApp Now
            </a>
          </div>
          <p className="text-gray-600 text-sm mt-5">
            Free consultation · No advance payment · Response within 
          </p>
        </div>
      </section>

    </div>
  );
}