"use client";
import { useState } from "react";
import Link from "next/link";

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
    features: ["Professional design", "Up to 20 slides", "Custom color theme", "Charts & diagrams", "Speaker notes", "Editable PPTX file"],
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
    features: ["Turnitin-safe content", "AI content humanizing", "Plagiarism report included", "Up to 5,000 words", "24 hour delivery", "100% unique guaranteed"],
  },
];

function ServiceCard({ service }) {
  const [applied, setApplied] = useState(false);
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
          <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
            {discount}% OFF
          </span>
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
          onClick={() => { setApplied(true); setTimeout(() => setApplied(false), 3000); }}
          className={`w-full py-3.5 rounded-xl font-black text-sm transition-all duration-300 ${
            applied
              ? "bg-green-500 text-white"
              : `bg-gradient-to-r ${service.color} text-white hover:opacity-90 hover:scale-[1.02] shadow-lg`
          }`}
        >
          {applied ? "✅ We will contact you soon!" : "Apply Now →"}
        </button>
        <p className="text-center text-xs text-gray-600 mt-2">We will contact you on WhatsApp</p>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">

      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-gray-950"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "40px 40px"}}></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold px-5 py-2 rounded-full mb-8 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse inline-block"></span>
            Academic & Research Services
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Professional Academic
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
              Services & Pricing
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            Expert help for your final year projects, mini projects, research papers and more. Quality guaranteed, delivered on time.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { num: "500+", label: "Projects Delivered" },
              { num: "200+", label: "Papers Published" },
              { num: "98%", label: "Satisfaction Rate" },
              { num: "24hr", label: "Quick Support" },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center">
                <p className="text-2xl font-black text-white">{s.num}</p>
                <p className="text-gray-500 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 — MINI PROJECTS */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold px-5 py-2 rounded-full mb-3">
                📘 Section 1
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">Mini Projects</h2>
              <p className="text-gray-500 mt-2">Affordable solutions for mini project needs</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {miniProjects.map((svc, i) => (
              <ServiceCard key={i} service={svc} />
            ))}
          </div>

          {/* Mini project note */}
          <div className="mt-8 max-w-3xl mx-auto bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-5 flex items-start gap-3">
            <span className="text-cyan-400 text-xl flex-shrink-0">💡</span>
            <p className="text-gray-400 text-sm">
              Mini project packages are designed for 3rd year and semester projects.
              Includes complete source code, documentation and basic PPT.
              Contact us on WhatsApp for custom requirements.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — FINAL YEAR PROJECTS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-5 py-2 rounded-full mb-3">
                🏆 Section 2
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">Final Year Projects</h2>
              <p className="text-gray-500 mt-2">Complete solutions for final year project & publication needs</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          </div>

          {/* Comparison hint */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 text-center">
              <p className="text-orange-400 font-bold text-sm mb-1">📄 Conference Track</p>
              <p className="text-gray-500 text-xs">Implementation + Conference Paper</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-center">
              <p className="text-blue-400 font-bold text-sm mb-1">📝 Journal Track</p>
              <p className="text-gray-500 text-xs">Implementation + Journal Paper</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalYearProjects.map((svc, i) => (
              <ServiceCard key={i} service={svc} />
            ))}
          </div>

          {/* Final year note */}
          <div className="mt-8 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-3">
            <span className="text-amber-400 text-xl flex-shrink-0">⭐</span>
            <p className="text-gray-400 text-sm">
              Final year packages include complete project implementation with viva support, synopsis, PPT and full documentation.
              Conference track targets IEEE/Springer publications. Journal track targets Scopus/SCI indexed journals.
              Choose the track that matches your institution's requirement.
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
              <p className="text-gray-500 mt-2">Enhance your project with these add-ons</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {addons.map((svc, i) => (
              <ServiceCard key={i} service={svc} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-3">Why Us</p>
            <h2 className="text-4xl font-black text-white mb-3">Why Students Trust Journify.</h2>
            <p className="text-gray-500">500+ students can't be wrong</p>
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

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Need a Custom Quote?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Have a unique requirement? Contact us and we will give you the best price!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@journify.com"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-2xl font-black text-lg transition">
              📧 Email Us
            </a>
            <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-gray-900 px-8 py-4 rounded-2xl font-black text-lg transition">
              💬 WhatsApp Now
            </a>
          </div>
          <p className="text-gray-600 text-sm mt-5">
            Free consultation · No advance payment · Response within 2 hours
          </p>
        </div>
      </section>

    </div>
  );
}