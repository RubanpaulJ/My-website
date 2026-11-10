import { COURSES } from "../lib/courses";

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
    ...["/final-year-projects", "/mini-projects", "/project-ideas"].map((path) => ({
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
