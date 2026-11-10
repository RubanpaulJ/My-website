import JavaCourse from "../../../components/learn/JavaCourse";
import { JAVA_COURSE, moduleMinutes } from "../../../lib/courses/java";
import { SITE_URL } from "../../../lib/site";

const DESCRIPTION =
  "Free 12-hour Java course from beginner to advanced: 12 modules, 60+ quiz questions, 12 coding challenges and a final exam. Resume anytime and earn a free certificate from Journify Technologies.";

export const metadata = {
  title: "Free Java Course with Certificate — Beginner to Advanced (12 Hours)",
  description: DESCRIPTION,
  alternates: { canonical: "/learn/java" },
  openGraph: {
    url: "/learn/java",
    title: "Free Java Course with Certificate — Beginner to Advanced | Journify",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Free Java Course with Certificate | Journify",
    description: DESCRIPTION,
  },
};

const course = JAVA_COURSE;
const quizCount = course.modules.reduce((t, m) => t + m.quiz.length, 0) + course.finalExam.length;

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.title,
  description: DESCRIPTION,
  url: `${SITE_URL}/learn/java`,
  inLanguage: "en",
  isAccessibleForFree: true,
  educationalLevel: "Beginner to Advanced",
  provider: { "@type": "Organization", name: "Journify Technologies", sameAs: SITE_URL },
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR", category: "Free" },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: `PT${course.hours}H`,
  },
  syllabusSections: course.modules.map((m) => ({ "@type": "Syllabus", name: m.title, description: m.summary })),
};

const HIGHLIGHTS = [
  { value: `${course.hours} hrs`, label: "of guided learning" },
  { value: course.modules.length, label: "modules" },
  { value: `${quizCount}`, label: "quiz questions" },
  { value: course.modules.length, label: "coding challenges" },
];

export default function JavaCoursePage() {
  return (
    <JavaCourse>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      <section className="dots -mt-[76px] pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-20 sm:pb-16">
          <p className="inline-flex items-center gap-2 bg-paper border border-line text-sm font-semibold px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-wa" />
            100% free · Certificate included
          </p>
          <h1 className="mt-6 font-display text-[40px] leading-[1.02] sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl">
            Learn Java. <span className="marker">Beginner to pro</span> in 12 hours.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-2xl">
            Short lessons, quizzes after every module and real coding challenges — from your first “Hello, World!” to OOP,
            collections, streams and threads. Stop anytime; your progress is saved and resumes exactly where you left off.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#register" className="inline-flex items-center justify-center bg-ink hover:bg-brand text-white font-bold px-7 py-4 rounded-xl transition-colors">
              Start the free course →
            </a>
            <a href="#syllabus" className="inline-flex items-center justify-center bg-paper border-2 border-ink hover:bg-lime font-bold px-7 py-4 rounded-xl transition-colors">
              View syllabus
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="rounded-2xl bg-paper border border-line p-4 sm:p-5">
                <dt className="sr-only">{h.label}</dt>
                <dd className="font-display text-3xl sm:text-4xl font-extrabold text-brand">{h.value}</dd>
                <dd className="text-sm text-ink-soft font-medium">{h.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="syllabus" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16" aria-labelledby="syllabus-heading">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">Syllabus</p>
        <h2 id="syllabus-heading" className="mt-3 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
          What you&apos;ll learn
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {course.modules.map((m, i) => (
            <li key={m.id} className="rounded-3xl bg-paper border border-line p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-lime font-display font-extrabold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg sm:text-xl font-bold leading-snug">{m.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{m.summary}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {m.lessons.map((l) => (
                      <li key={l.title} className="text-xs font-medium px-2.5 py-1 rounded-full bg-cream border border-line">
                        {l.title}
                      </li>
                    ))}
                    <li className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand/10 text-brand">Quiz + challenge</li>
                  </ul>
                  <p className="mt-3 text-xs font-semibold text-ink-soft/80">≈ {moduleMinutes(m)} min</p>
                </div>
              </div>
            </li>
          ))}
          <li className="md:col-span-2 rounded-3xl bg-ink text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <div>
              <h3 className="font-display text-xl font-bold">Final exam &amp; certificate</h3>
              <p className="mt-1 text-sm text-white/70">
                {course.finalExam.length} questions across the whole course. Score {course.passPercent}% or more to download your
                certificate of completion from Journify Technologies — and add it to LinkedIn.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </JavaCourse>
  );
}
