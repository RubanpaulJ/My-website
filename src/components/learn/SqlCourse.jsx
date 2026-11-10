"use client";
import CoursePlayer from "./CoursePlayer";
import { SQL_COURSE } from "../../lib/courses/sql";

export default function SqlCourse({ children }) {
  return <CoursePlayer course={SQL_COURSE} overview={children} />;
}
