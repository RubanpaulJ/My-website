import Link from "next/link";
import ServiceCard from "./ServiceCard";
import WhatsAppIcon from "./WhatsAppIcon";
import { SERVICES, SITE_URL, whatsappLink } from "../lib/site";

const DEPARTMENTS = ["CSE", "IT", "AI & DS", "ECE", "EEE", "MCA", "MSc CS / IT", "BCA / BSc"];

const STEPS = [
  { title: "Share your requirement", text: "Message us on WhatsApp with your department, domain, preferred title (or ask us to suggest one) and deadline." },
  { title: "Get your title & plan", text: "We confirm the title, abstract, tech stack and delivery date before we start." },
  { title: "Receive & review", text: "Get the working project, source code and documents, and we help you run it on your laptop." },
  { title: "Present with confidence", text: "We explain the project end to end so you're ready for your reviews and viva." },
];

export default function ProjectLanding({ path, crumb, eyebrow, title, intro, packageIds, whatsappText, sections, faqs, related }) {
  const packages = SERVICES.filter((s) => packageIds.includes(s.id));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: crumb, item: `${SITE_URL}${path}` },
        ],
      },
      ...packages.map((s) => ({
        "@type": "Service",
        name: s.name,
        description: s.features.join(", "),
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: { "@type": "Country", name: "India" },
        offers: { "@type": "Offer", price: String(s.price), priceCurrency: "INR", url: `${SITE_URL}${path}` },
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="dots -mt-[76px] pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-20 sm:pb-16">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
            <Link href="/" className="hover:text-ink underline-offset-4 hover:underline">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span aria-current="page">{crumb}</span>
          </nav>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-brand">{eyebrow}</p>
          <h1 className="mt-3 font-display text-[36px] leading-[1.05] sm:text-6xl font-extrabold tracking-tight max-w-4xl">{title}</h1>
          <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-2xl">{intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink(whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-brand text-white font-bold px-7 py-4 rounded-xl transition-colors"
            >
              <WhatsAppIcon />
              Get a free quote on WhatsApp
            </a>
            <a href="#pricing" className="inline-flex items-center justify-center bg-paper border-2 border-ink hover:bg-lime font-bold px-7 py-4 rounded-xl transition-colors">
              See pricing
            </a>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16" aria-labelledby="pricing-heading">
        <h2 id="pricing-heading" className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Packages &amp; pricing</h2>
        <p className="mt-3 text-ink-soft">Fixed prices. No hidden charges. Pay only after we confirm your title and plan.</p>
        <div className={`mt-10 grid gap-6 items-start ${packages.length > 1 ? "md:grid-cols-2 max-w-4xl" : "max-w-md"}`}>
          {packages.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper" aria-labelledby="steps-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 id="steps-heading" className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">How it works</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-line bg-cream p-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-lime font-display font-extrabold">{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {sections.map((sec) => (
          <section key={sec.h2} className="mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">{sec.h2}</h2>
            {sec.paragraphs?.map((p) => (
              <p key={p} className="mt-4 text-[16px] leading-[1.75] text-ink-soft">{p}</p>
            ))}
            {sec.list && (
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {sec.list.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px]">
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Departments we support</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {DEPARTMENTS.map((d) => (
              <li key={d} className="px-3.5 py-1.5 rounded-full border border-line bg-paper text-sm font-semibold">{d}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex justify-between items-center gap-4 cursor-pointer list-none font-display text-lg font-bold">
                  {f.q}
                  <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full border-2 border-ink group-open:rotate-45 group-open:bg-lime transition" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 pr-10 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {related && (
          <nav aria-label="Related pages" className="mt-12 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.href} href={r.href} className="rounded-2xl border border-line bg-paper p-5 hover:border-ink/40 transition-colors">
                <span className="block font-display text-lg font-bold">{r.label} →</span>
                <span className="block mt-1 text-sm text-ink-soft">{r.text}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="rounded-[32px] bg-lime px-6 py-12 sm:py-16 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">Deadline coming up?</h2>
          <p className="mt-3 text-ink/75">Tell us your department and domain — we&apos;ll suggest titles today.</p>
          <a
            href={whatsappLink(whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 bg-ink hover:bg-brand text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
