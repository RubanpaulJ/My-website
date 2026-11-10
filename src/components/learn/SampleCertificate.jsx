"use client";
import Certificate from "./Certificate";
import { JAVA_COURSE } from "../../lib/courses/java";

const SAMPLE_LEARNER = { name: "Priya Ramesh", college: "Anna University, Chennai" };

export default function SampleCertificate() {
  return (
    <Certificate
      sample
      learner={SAMPLE_LEARNER}
      course={JAVA_COURSE}
      completedAt="2026-11-10T10:00:00.000Z"
      certId="JT-JAVA-SAMPLE0000"
      score={93}
    />
  );
}
