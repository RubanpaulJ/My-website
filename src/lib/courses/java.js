import { MODULES_1 } from "./java-part1";
import { MODULES_2, FINAL_EXAM } from "./java-part2";

export const JAVA_COURSE = {
  id: "java",
  slug: "java",
  title: "Java Programming",
  topics: "Core Java, Object-Oriented Programming, Exception Handling, Collections, Streams and Multithreading",
  hours: 12,
  passPercent: 70,
  storageKey: "journify.course.java.v1",
  lang: "java",
  fileName: "Main.java",
  icon: "☕",
  tagline: "From your first “Hello, World!” to OOP, collections, streams and threads.",
  modules: [...MODULES_1, ...MODULES_2],
  finalExam: FINAL_EXAM,
};
