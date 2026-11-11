import Link from "next/link";
import WhatsAppIcon from "../../components/WhatsAppIcon";
import { SITE_URL, whatsappLink } from "../../lib/site";
import { DOMAINS, TOTAL_IDEAS } from "../../lib/projectIdeas";

const total = TOTAL_IDEAS;

const DESCRIPTION =
  `${total} final year and mini project ideas for CSE, IT, ECE and EEE students — Machine Learning, AI, IoT, web, Android, blockchain, cybersecurity and data science. Get any idea implemented with source code and paper.`;

export const metadata = {
  title: `Final Year Project Ideas for CSE, IT & ECE — ${total} Ideas by Domain`,
  description: DESCRIPTION,
  alternates: { canonical: "/project-ideas" },
  openGraph: {
    url: "/project-ideas",
    title: `${total} Final Year Project Ideas for CSE, IT & ECE | Journify`,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};


const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Final year and mini project ideas",
      numberOfItems: total,
      itemListElement: DOMAINS.flatMap((d) => d.ideas).map(([title], i) => ({ "@type": "ListItem", position: i + 1, name: title })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Project Ideas", item: `${SITE_URL}/project-ideas` },
      ],
    },
  ],
};

export default function ProjectIdeasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="dots -mt-[76px] pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-10 sm:pt-20 sm:pb-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
            <Link href="/" className="hover:text-ink hover:underline underline-offset-4">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span aria-current="page">Project Ideas</span>
          </nav>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-brand">Free resource</p>
          <h1 className="mt-3 font-display text-[36px] leading-[1.05] sm:text-6xl font-extrabold tracking-tight max-w-4xl">
            {total} final year &amp; mini project ideas for CSE, IT and ECE
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-soft max-w-2xl">
            Hand-picked project ideas by domain, each with a one-line scope so you can pitch it to your guide. Like an idea?
            We can build it for you with full source code, documentation and a paper.
          </p>
          <nav aria-label="Jump to domain" className="mt-8 flex flex-wrap gap-2">
            {DOMAINS.map((d) => (
              <a key={d.id} href={`#${d.id}`} className="px-3.5 py-2 rounded-full bg-paper border border-line text-sm font-semibold hover:bg-lime">
                {d.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {DOMAINS.map((d) => (
          <section key={d.id} id={d.id} className="scroll-mt-24 pt-10" aria-labelledby={`${d.id}-h`}>
            <h2 id={`${d.id}-h`} className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              {d.name} project ideas
            </h2>
            <Link href={`/projects/${d.id}`} className="mt-2 inline-block text-sm font-bold text-brand hover:underline underline-offset-4">
              See all {d.name} projects, tech stack and pricing →
            </Link>
            <ol className="mt-6 grid gap-3 md:grid-cols-2">
              {d.ideas.map(([title, scope, level]) => (
                <li key={title} className="flex flex-col rounded-2xl bg-paper border border-line p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold leading-snug">{title}</h3>
                    <span
                      className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        level === "Mini" ? "bg-cream border border-line" : "bg-brand/10 text-brand"
                      }`}
                    >
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
        ))}

        <section className="mt-16 grid gap-4 md:grid-cols-2">
          <Link href="/final-year-projects" className="rounded-3xl bg-ink text-white p-6 sm:p-8 hover:bg-brand transition-colors">
            <span className="block text-sm font-bold uppercase tracking-[0.15em] text-lime">From ₹3,499</span>
            <span className="block mt-2 font-display text-2xl font-extrabold">Final year projects with paper →</span>
            <span className="block mt-2 text-white/70">Implementation, source code, report, PPT and a conference or journal paper.</span>
          </Link>
          <Link href="/mini-projects" className="rounded-3xl bg-lime p-6 sm:p-8 hover:bg-ink hover:text-white transition-colors">
            <span className="block text-sm font-bold uppercase tracking-[0.15em]">₹2,499</span>
            <span className="block mt-2 font-display text-2xl font-extrabold">Mini projects with source code →</span>
            <span className="block mt-2 opacity-75">Working project, documentation and help to explain it in your review.</span>
          </Link>
        </section>
      </div>
    </>
  );
}
