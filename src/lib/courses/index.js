// Server-side registry of every course. Client components import only their own course file.
import { JAVA_COURSE } from "./java";
import { PYTHON_COURSE } from "./python";
import { C_COURSE } from "./c";
import { SQL_COURSE } from "./sql";
import { WEB_COURSE } from "./web";

export const COURSES = [JAVA_COURSE, PYTHON_COURSE, C_COURSE, SQL_COURSE, WEB_COURSE];

export function getCourse(slug) {
  return COURSES.find((c) => c.slug === slug) ?? null;
}

// Plain, serialisable fields that are safe to pass to client components.
export function certificateInfo(course) {
  return { slug: course.slug, title: course.title, hours: course.hours, topics: course.topics };
}
