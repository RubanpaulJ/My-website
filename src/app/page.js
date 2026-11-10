import Link from "next/link";
import ServiceCard from "../components/ServiceCard";
import ProgramCard from "../components/ProgramCard";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { SERVICES, PROGRAMS, FAQS, whatsappLink } from "../lib/site";

const STATS = [
  { value: "500+", label: "Students helped" },
  { value: "12+", label: "Tech domains" },
  { value: "24/7", label: "WhatsApp support" },
];

const STEPS = [
  { title: "Say hi on WhatsApp", text: "Share your topic, domain and deadline. No forms, no sign-up." },
  { title: "Get a clear plan", text: "We confirm the scope, deliverables and timeline before we start." },
  { title: "Receive & present", text: "Get your code, documents and paper — plus help for your viva." },
];

const DOMAINS = [
  "Machine Learning", "Deep Learning", "Artificial Intelligence", "IoT", "Web Development", "Android",
  "Blockchain", "Cloud Computing", "Cybersecurity", "Data Science", "Computer Vision", "NLP",
];

function ChatMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto" aria-hidden="true">
      <div className="absolute -inset-4 bg-brand/20 blur-3xl rounded-full" />
      <div className="relative rounded-[28px] bg-ink p-2.5 shadow-2xl rotate-2">
        <div className="rounded-[20px] overflow-hidden bg-[#efe7dc]">
          <div className="flex items-center gap-3 bg-[#0f5c45] px-4 py-3 text-white">
            <img src="/logo.jpeg" alt="" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <p className="text-sm font-bold leading-none">Journify</p>
              <p className="text-[11px] text-white/70 mt-1">online</p>
            </div>
          </div>
          <div className="px-3 py-4 space-y-2.5 text-[13px] leading-snug">
            <p className="pop-in ml-auto max-w-[80%] bg-[#d9fdd3] text-ink rounded-xl rounded-tr-sm px-3 py-2 shadow-sm">
              Hi! I need a final year ML project with a conference paper 🙏
            </p>
            <p className="pop-in [animation-delay:400ms] max-w-[85%] bg-white text-ink rounded-xl rounded-tl-sm px-3 py-2 shadow-sm">
              Sure! Our conference package is ₹3,499 — implementation, source code, paper & PPT included.
            </p>
            <p className="pop-in [animation-delay:800ms] ml-auto max-w-[80%] bg-[#d9fdd3] text-ink rounded-xl rounded-tr-sm px-3 py-2 shadow-sm">
              Perfect, let&apos;s start 🚀
            </p>
            <p className="pop-in [animation-delay:1200ms] max-w-[85%] bg-white text-ink rounded-xl rounded-tl-sm px-3 py-2 shadow-sm">
              Great choice! Share your topic and we&apos;ll send the plan ✅
            </p>
          </div>
        </div>
      </div>
      <div className="absolute -left-3 sm:-left-8 bottom-8 bg-lime text-ink text-xs font-bold px-3 py-2 rounded-xl shadow-lg -rotate-6">
        Replies in minutes ⚡
      </div>
    </div>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Hero */}
      <section className="relative dots -mt-[76px] pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 sm:pt-20 sm:pb-24 grid gap-14 lg:grid-cols-[1.15fr_1fr] items-center">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 bg-paper border border-line text-sm font-semibold px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-wa animate-pulse" />
              Engineering projects · Trusted by 500+ students in Tamil Nadu
            </p>
            <h1 className="mt-6 font-display text-[40px] leading-[1.02] sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Your project.
              <br />
              Your paper.
              <br />
              <span className="marker">Done right.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-lg mx-auto lg:mx-0">
              Final year & mini projects with full implementation, source code and a conference or journal
              paper — all sorted over a simple WhatsApp chat.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-brand text-white font-bold px-7 py-4 rounded-xl transition-colors"
              >
                <WhatsAppIcon />
                Start on WhatsApp
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-paper border-2 border-ink hover:bg-lime font-bold px-7 py-4 rounded-xl transition-colors"
              >
                See pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <ChatMockup />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-paper" aria-label="Highlights">
        <dl className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-3 divide-x divide-line text-center">
          {STATS.map((s) => (
            <div key={s.label} className="px-2">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl sm:text-5xl font-extrabold text-brand">{s.value}</dd>
              <dd className="mt-1 text-xs sm:text-sm text-ink-soft font-medium">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Free course promo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16" aria-label="Free coding courses">
        <Link
          href="/learn"
          className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-3xl bg-lime p-5 sm:p-7 transition-transform hover:-translate-y-0.5"
        >
          <span className="flex items-center justify-center w-14 h-14 shrink-0 rounded-2xl bg-ink text-2xl" aria-hidden="true">☕</span>
          <span className="flex-1">
            <span className="block text-xs font-bold uppercase tracking-[0.15em]">New · 100% free</span>
            <span className="block mt-1 font-display text-xl sm:text-2xl font-extrabold">
              Free 12-hour courses in Java, Python, C, SQL &amp; Web — with a certificate
            </span>
          </span>
          <span className="inline-flex items-center justify-center bg-ink text-white font-bold px-5 py-3 rounded-xl group-hover:bg-brand transition-colors">
            Start free →
          </span>
        </Link>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24" aria-labelledby="services-heading">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">Pricing</p>
          <h2 id="services-heading" className="mt-3 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            Three packages. <span className="marker">Zero confusion.</span>
          </h2>
          <p className="mt-4 text-ink-soft text-base sm:text-lg">
            One fixed price each, no hidden charges. For BE, BTech, ME, MCA and MSc students in CSE, IT, ECE, EEE and more.
          </p>
        </div>
        <div className="mt-12 sm:mt-16 grid gap-6 md:grid-cols-3 items-start">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* Domains marquee */}
      <section className="bg-brand text-white py-5 overflow-hidden" aria-label="Domains we cover">
        <ul className="sr-only">
          {DOMAINS.map((d) => <li key={d}>{d}</li>)}
        </ul>
        <div className="flex w-max marquee" aria-hidden="true">
          {[...DOMAINS, ...DOMAINS].map((d, i) => (
            <span key={i} className="flex items-center font-display text-xl sm:text-2xl font-bold whitespace-nowrap">
              <span className="px-5">{d}</span>
              <span className="text-lime">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="scroll-mt-24 bg-ink" aria-labelledby="programs-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-lime">Beyond projects</p>
            <h2 id="programs-heading" className="mt-3 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Internships, ERP & CRM, and training.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/65">
              Build real experience with us — from internships and business software to professional training with a
              certificate.
            </p>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-6 md:grid-cols-3">
            {PROGRAMS.map((p, i) => (
              <ProgramCard key={p.id} program={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24" aria-labelledby="how-heading">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">How it works</p>
        <h2 id="how-heading" className="mt-3 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
          Three steps. One chat.
        </h2>
        <ol className="mt-12 grid gap-4 md:gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative overflow-hidden bg-paper border border-line rounded-3xl p-6 sm:p-8">
              <span
                className="absolute -right-2 -top-6 font-display text-[120px] font-extrabold leading-none text-brand/10 select-none"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-lime font-display text-lg font-extrabold">
                {i + 1}
              </span>
              <h3 className="relative mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="relative mt-2 text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-line bg-paper" aria-labelledby="faq-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">FAQ</p>
            <h2 id="faq-heading" className="mt-3 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
              Questions? <br className="hidden lg:block" />Answered.
            </h2>
            <p className="mt-4 text-ink-soft">
              Still unsure?{" "}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-ink underline decoration-lime decoration-4 underline-offset-4">
                Just ask us
              </a>
              .
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex justify-between items-center gap-4 cursor-pointer list-none font-display text-lg sm:text-xl font-bold">
                  {f.q}
                  <span
                    className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full border-2 border-ink text-xl group-open:rotate-45 group-open:bg-lime transition"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-12 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-[32px] bg-lime px-6 py-14 sm:py-20 text-center">
          <div className="absolute inset-0 dots opacity-60" aria-hidden="true" />
          <h2 className="relative font-display text-4xl sm:text-6xl font-extrabold tracking-tight">
            Deadline coming up?
          </h2>
          <p className="relative mt-4 text-base sm:text-lg text-ink/75 max-w-md mx-auto">
            Message us now and get your project plan today.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 inline-flex items-center gap-2 bg-ink hover:bg-brand text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
