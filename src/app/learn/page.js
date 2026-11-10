import Link from "next/link";
import { JAVA_COURSE } from "../../lib/courses/java";

export const metadata = {
  title: "Free Programming Courses with Certificate",
  description:
    "Learn programming for free at Journify. Self-paced courses with lessons, quizzes, coding challenges and a free certificate. Start with our 12-hour Java course.",
  alternates: { canonical: "/learn" },
  openGraph: { url: "/learn", images: ["/opengraph-image"] },
};

const COMING_SOON = ["Python", "C Programming", "SQL & Databases", "Web Development"];

export default function LearnPage() {
  const c = JAVA_COURSE;
  return (
    <>
      <section className="dots -mt-[76px] pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-10 sm:pt-20 sm:pb-14">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">Journify Learn</p>
          <h1 className="mt-3 font-display text-[40px] leading-[1.05] sm:text-6xl font-extrabold tracking-tight max-w-3xl">
            Learn to code. <span className="marker">Free.</span> With a certificate.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-soft max-w-2xl">
            Self-paced courses with short lessons, quizzes and coding challenges. No sign-up, no fees — your progress saves
            automatically so you can stop and resume anytime.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24" aria-label="Courses">
        <article className="grid md:grid-cols-[1.3fr_1fr] rounded-[32px] overflow-hidden bg-ink text-white">
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap gap-2">
              <span className="bg-lime text-ink text-xs font-bold px-3 py-1 rounded-full">Free</span>
              <span className="bg-white/10 text-xs font-bold px-3 py-1 rounded-full">{c.hours} hours</span>
              <span className="bg-white/10 text-xs font-bold px-3 py-1 rounded-full">Certificate</span>
            </div>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">{c.title}</h2>
            <p className="mt-3 text-white/70">
              {c.modules.length} modules covering basics, OOP, exceptions, collections, streams and threads — with a quiz and
              coding challenge in every module and a final exam.
            </p>
            <Link
              href="/learn/java"
              className="mt-8 inline-flex items-center gap-2 bg-lime text-ink hover:bg-white font-bold px-7 py-4 rounded-xl transition-colors"
            >
              Start learning Java →
            </Link>
          </div>
          <div className="relative bg-brand p-6 sm:p-10 flex items-center" aria-hidden="true">
            <pre className="w-full rounded-2xl bg-ink/80 p-5 text-[13px] leading-relaxed text-[#e9e6f5] font-mono overflow-hidden">
{`public class Main {
  public static void main(String[] a) {
    System.out.println(
      "Hello, Journify!");
  }
}`}
            </pre>
            <span className="absolute top-5 right-5 font-display text-7xl font-extrabold text-white/15">☕</span>
          </div>
        </article>

        <h2 className="mt-14 font-display text-2xl font-bold">Coming soon</h2>
        <ul className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {COMING_SOON.map((name) => (
            <li key={name} className="rounded-2xl border-2 border-dashed border-line bg-paper p-5">
              <p className="font-display text-lg font-bold">{name}</p>
              <p className="mt-1 text-xs font-semibold text-ink-soft">Coming soon</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
