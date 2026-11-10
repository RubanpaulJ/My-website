import { MODULES_1 } from "./java-part1";
import { MODULES_2 } from "./java-part2";
import { FINAL_EXAM } from "./java-part2";

export const QUIZ_MINUTES = 5;
export const CHALLENGE_MINUTES = 10;
export const FINAL_MINUTES = 15;

export const JAVA_COURSE = {
  id: "java",
  slug: "java",
  title: "Java Programming",
  shortTitle: "Java Programming",
  topics: "Core Java, Object-Oriented Programming, Exception Handling, Collections, Streams and Multithreading",
  hours: 12,
  passPercent: 70,
  storageKey: "journify.course.java.v1",
  modules: [...MODULES_1, ...MODULES_2],
  finalExam: FINAL_EXAM,
};

export function moduleMinutes(mod) {
  return mod.lessons.reduce((t, l) => t + l.minutes, 0) + QUIZ_MINUTES + CHALLENGE_MINUTES;
}
