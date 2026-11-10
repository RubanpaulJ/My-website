"use client";
import CoursePlayer from "./CoursePlayer";
import { PYTHON_COURSE } from "../../lib/courses/python";

export default function PythonCourse({ children }) {
  return <CoursePlayer course={PYTHON_COURSE} overview={children} />;
}
