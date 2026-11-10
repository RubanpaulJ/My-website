"use client";
import CoursePlayer from "./CoursePlayer";
import { JAVA_COURSE } from "../../lib/courses/java";

export default function JavaCourse({ children }) {
  return <CoursePlayer course={JAVA_COURSE} overview={children} />;
}
