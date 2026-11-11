import { notFound } from "next/navigation";
import ProjectLanding from "../../../components/ProjectLanding";
import { DOMAINS } from "../../../lib/projectIdeas";
import { DEPARTMENT_PAGES, DOMAIN_PAGES } from "../../../lib/projectDomains";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(DEPARTMENT_PAGES).map((dept) => ({ dept }));
}

export async function generateMetadata({ params }) {
  const { dept } = await params;
  const page = DEPARTMENT_PAGES[dept];
  if (!page) return {};
  const description = `${page.name} final year projects with full source code, documentation, PPT and conference or journal paper, from ₹3,499. For ${page.full} students across India. Order on WhatsApp.`;
  return {
    title: page.title,
    description,
    alternates: { canonical: `/final-year-projects/${dept}` },
    openGraph: { url: `/final-year-projects/${dept}`, title: `${page.title} | Journify`, description, images: ["/opengraph-image"] },
  };
}

export default async function DepartmentPage({ params }) {
  const { dept } = await params;
  const page = DEPARTMENT_PAGES[dept];
  if (!page) notFound();

  const domains = page.domains.map((id) => DOMAINS.find((d) => d.id === id));
  const sampleTitles = domains.flatMap((d) => d.ideas.filter((i) => i[2] === "Final year").slice(0, 2).map((i) => i[0]));

  return (
    <ProjectLanding
      path={`/final-year-projects/${dept}`}
      crumb={`${page.name} Final Year Projects`}
      eyebrow={`${page.full} · Delivered across India`}
      title={page.title}
      intro={page.intro}
      packageIds={["final-year-conference", "final-year-journal"]}
      whatsappText={`Hi Journify, I'm a ${page.name} student and I need a final year project. My preferred domain is ___.`}
      faqs={page.faqs}
      sections={[
        {
          h2: `Popular ${page.name} final year project titles`,
          paragraphs: [`A few titles ${page.name} students often choose. We can build any of these, or work from the title your guide has approved.`],
          list: sampleTitles,
        },
        {
          h2: "What's included",
          list: [
            "Complete working implementation",
            "Full source code you can run and modify",
            "Project report / documentation",
            "Presentation (PPT) for reviews",
            "Conference or journal paper",
            "Setup on your laptop and viva guidance",
          ],
        },
      ]}
      related={[
        ...domains.map((d) => ({
          href: `/projects/${d.id}`,
          label: `${DOMAIN_PAGES[d.id].short} projects`,
          text: `${d.ideas.length} ideas, tech stack and pricing.`,
        })),
        { href: "/project-ideas", label: "All project ideas", text: "Browse every idea by domain." },
      ]}
    />
  );
}
