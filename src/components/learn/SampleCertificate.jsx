"use client";
import Certificate from "./Certificate";

const SAMPLE_LEARNER = { name: "Priya Ramesh", college: "Anna University, Chennai" };

export default function SampleCertificate({ course }) {
  return (
    <Certificate
      sample
      learner={SAMPLE_LEARNER}
      course={course}
      completedAt="2026-11-10T10:00:00.000Z"
      certId={`JT-${course.slug.toUpperCase()}-SAMPLE0000`}
      score={93}
    />
  );
}
