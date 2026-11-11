import { COURSES } from "../lib/courses";
import { DOMAINS } from "../lib/projectIdeas";
import { DEPARTMENT_PAGES } from "../lib/projectDomains";

export default function sitemap() {
  const baseUrl = "https://journify.tech";
  const currentDate = new Date();
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...[
      "/final-year-projects",
      "/mini-projects",
      "/project-ideas",
      ...Object.keys(DEPARTMENT_PAGES).map((d) => `/final-year-projects/${d}`),
      ...DOMAINS.map((d) => `/projects/${d.id}`),
    ].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    })),
    {
      url: `${baseUrl}/learn`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...COURSES.map((c) => ({
      url: `${baseUrl}/learn/${c.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    })),
  ];
}
