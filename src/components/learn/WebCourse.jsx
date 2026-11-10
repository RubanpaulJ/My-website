"use client";
import CoursePlayer from "./CoursePlayer";
import { WEB_COURSE } from "../../lib/courses/web";

export default function WebCourse({ children }) {
  return <CoursePlayer course={WEB_COURSE} overview={children} />;
}
