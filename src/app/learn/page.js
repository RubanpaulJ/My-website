import Link from "next/link";
import { COURSES } from "../../lib/courses";

export const metadata = {
  title: "Free Programming Courses with Certificate — Java, Python, C, SQL, Web",
  description:
    "Learn programming for free at Journify: Java, Python, C, SQL and Web Development. 12-hour self-paced courses with lessons, quizzes, coding challenges and a free certificate.",
  alternates: { canonical: "/learn" },
  openGraph: { url: "/learn", images: ["/opengraph-image"] },
};

export default function LearnPage() {
  return (
    <>
      <section className="dots -mt-[76px] pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-10 sm:pt-20 sm:pb-14">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">Journify Learn</p>
          <h1 className="mt-3 font-display text-[40px] leading-[1.05] sm:text-6xl font-extrabold tracking-tight max-w-3xl">
            Learn to code. <span className="marker">Free.</span> With a certificate.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-soft max-w-2xl">
            {COURSES.length} self-paced courses with short lessons, quizzes and coding challenges. No sign-up, no fees — your
            progress saves automatically so you can stop and resume anytime.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24" aria-label="Courses">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => {
            const featured = i === 0;
            return (
              <li key={c.slug}>
                <Link
                  href={`/learn/${c.slug}`}
                  className={`group flex flex-col h-full rounded-3xl p-6 sm:p-7 transition-transform hover:-translate-y-1 ${
                    featured ? "bg-ink text-white" : "bg-paper border border-line"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex items-center justify-center w-14 h-14 rounded-2xl font-display text-lg font-extrabold ${
                        featured ? "bg-lime text-ink" : "bg-ink text-lime"
                      }`}
                      aria-hidden="true"
                    >
                      {c.icon}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${featured ? "bg-white/10" : "bg-lime"}`}>
                      Free · {c.hours} hrs
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight">{c.title}</h2>
                  <p className={`mt-2 text-[15px] flex-1 ${featured ? "text-white/70" : "text-ink-soft"}`}>{c.tagline}</p>
                  <p className={`mt-4 text-xs font-semibold ${featured ? "text-white/50" : "text-ink-soft/80"}`}>
                    {c.modules.length} modules · {c.modules.length} coding challenges · Certificate
                  </p>
                  <span
                    className={`mt-6 inline-flex items-center justify-center font-bold px-5 py-3 rounded-xl transition-colors ${
                      featured ? "bg-lime text-ink group-hover:bg-white" : "bg-ink text-white group-hover:bg-brand"
                    }`}
                  >
                    Start learning →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
