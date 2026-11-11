import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceCard from "../../../components/ServiceCard";
import WhatsAppIcon from "../../../components/WhatsAppIcon";
import { SERVICES, SITE_URL, whatsappLink } from "../../../lib/site";
import { DOMAINS } from "../../../lib/projectIdeas";
import { DOMAIN_PAGES } from "../../../lib/projectDomains";

export const dynamicParams = false;

export function generateStaticParams() {
  return DOMAINS.map((d) => ({ domain: d.id }));
}

function load(id) {
  const domain = DOMAINS.find((d) => d.id === id);
  const page = DOMAIN_PAGES[id];
  return domain && page ? { domain, page } : null;
}

export async function generateMetadata({ params }) {
  const { domain: id } = await params;
  const found = load(id);
  if (!found) return {};
  const { page } = found;
  const title = `${page.short} Final Year Projects with Source Code`;
  const description = `${page.short} final year and mini projects with full source code, documentation, PPT and paper. From ₹2,499 for students across India. ${found.domain.ideas.length} project ideas with details. Order on WhatsApp.`;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${id}` },
    openGraph: { url: `/projects/${id}`, title: `${title} | Journify`, description, images: ["/opengraph-image"] },
  };
}

export default async function DomainPage({ params }) {
  const { domain: id } = await params;
  const found = load(id);
  if (!found) notFound();
  const { domain, page } = found;
  const others = DOMAINS.filter((d) => d.id !== id);
  const message = `Hi Journify, I need a ${page.short} project. My department is ___.`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Final Year Projects", item: `${SITE_URL}/final-year-projects` },
          { "@type": "ListItem", position: 3, name: `${page.short} Projects`, item: `${SITE_URL}/projects/${id}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${page.short} project ideas`,
        itemListElement: domain.ideas.map(([title], i) => ({ "@type": "ListItem", position: i + 1, name: title })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="dots -mt-[76px] pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-20 sm:pb-16">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
            <Link href="/" className="hover:text-ink hover:underline underline-offset-4">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/final-year-projects" className="hover:text-ink hover:underline underline-offset-4">Final Year Projects</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span aria-current="page">{page.short}</span>
          </nav>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-brand">{domain.name}</p>
          <h1 className="mt-3 font-display text-[36px] leading-[1.05] sm:text-6xl font-extrabold tracking-tight max-w-4xl">
            {page.short} final year projects with source code
          </h1>
          <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-3xl">{page.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-brand text-white font-bold px-7 py-4 rounded-xl transition-colors"
            >
              <WhatsAppIcon />
              Get {page.short} project titles
            </a>
            <a href="#pricing" className="inline-flex items-center justify-center bg-paper border-2 border-ink hover:bg-lime font-bold px-7 py-4 rounded-xl transition-colors">
              See pricing
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies we use">
            {page.stack.map((t) => (
              <li key={t} className="px-3.5 py-1.5 rounded-full bg-paper border border-line text-sm font-semibold">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16" aria-labelledby="ideas-heading">
        <h2 id="ideas-heading" className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
          {page.short} project ideas
        </h2>
        <p className="mt-3 text-ink-soft">Pick one, or send us your own title. Every project comes with full source code and documentation.</p>
        <ol className="mt-8 grid gap-3 md:grid-cols-2">
          {domain.ideas.map(([title, scope, level]) => (
            <li key={title} className="flex flex-col rounded-2xl bg-paper border border-line p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-bold leading-snug">{title}</h3>
                <span className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full ${level === "Mini" ? "bg-cream border border-line" : "bg-brand/10 text-brand"}`}>
                  {level}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-soft flex-1">{scope}</p>
              <a
                href={whatsappLink(`Hi Journify, I'm interested in the project "${title}". Can you share details?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 self-start text-sm font-bold text-brand hover:underline underline-offset-4"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Get this project built
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section id="pricing" className="scroll-mt-24 border-y border-line bg-paper" aria-labelledby="pricing-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 id="pricing-heading" className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Pricing for {page.short} projects
          </h2>
          <p className="mt-3 text-ink-soft">The same fixed price for every domain. No hidden charges.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3 items-start">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            {page.short} project FAQs
          </h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {page.faqs.map((f) => (
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

        <nav aria-labelledby="other-heading" className="mt-12">
          <h2 id="other-heading" className="font-display text-2xl font-extrabold tracking-tight">Other project domains</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((d) => (
              <li key={d.id}>
                <Link href={`/projects/${d.id}`} className="inline-block px-4 py-2 rounded-full bg-paper border border-line text-sm font-semibold hover:bg-lime">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
