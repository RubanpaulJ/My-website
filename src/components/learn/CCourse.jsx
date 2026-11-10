"use client";
import CoursePlayer from "./CoursePlayer";
import { C_COURSE } from "../../lib/courses/c";

export default function CCourse({ children }) {
  return <CoursePlayer course={C_COURSE} overview={children} />;
}
