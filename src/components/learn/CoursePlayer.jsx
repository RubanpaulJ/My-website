"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Markdown from "./Markdown";
import Quiz from "./Quiz";
import Challenge from "./Challenge";
import Certificate from "./Certificate";
import RegisterForm from "./RegisterForm";
import { QUIZ_MINUTES, CHALLENGE_MINUTES, FINAL_MINUTES } from "../../lib/courses/shared";
import {
  loadProgress,
  saveProgress,
  clearProgress,
  encodeProgress,
  decodeProgress,
  makeCertId,
  formatDuration,
  emptyProgress,
} from "../../lib/courses/progress";

// ---------- progress helpers ----------
const lessonKey = (m, l) => `${m}-${l}`;

function moduleStatus(course, p, mi) {
  const mod = course.modules[mi];
  const lessons = mod.lessons.filter((_, li) => p.lessonsDone[lessonKey(mi, li)]).length;
  const quiz = !!p.quiz[mi]?.passed;
  const challenge = !!p.challenge[mi]?.passed;
  return { lessons, quiz, challenge, done: lessons === mod.lessons.length && quiz && challenge };
}

function isUnlocked(course, p, mi) {
  if (mi === 0) return true;
  return moduleStatus(course, p, mi - 1).done;
}

function finalUnlocked(course, p) {
  return course.modules.every((_, mi) => moduleStatus(course, p, mi).done);
}

function overallPercent(course, p) {
  let total = 0;
  let done = 0;
  course.modules.forEach((mod, mi) => {
    const s = moduleStatus(course, p, mi);
    total += mod.lessons.length + 2;
    done += s.lessons + (s.quiz ? 1 : 0) + (s.challenge ? 1 : 0);
  });
  total += 1;
  done += p.final?.passed ? 1 : 0;
  return Math.round((done / total) * 100);
}

function describePos(course, pos) {
  if (pos.m >= course.modules.length) return pos.m === course.modules.length ? "Final exam" : "Certificate";
  const mod = course.modules[pos.m];
  const L = mod.lessons.length;
  const what = pos.s < L ? `Lesson ${pos.s + 1}: ${mod.lessons[pos.s].title}` : pos.s === L ? "Module quiz" : "Coding challenge";
  return `Module ${pos.m + 1} · ${what}`;
}

// ---------- small UI pieces ----------
function Check({ on, locked }) {
  if (locked) {
    return (
      <svg className="w-4 h-4 text-ink-soft/50 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 8V7a3 3 0 016 0v3H9z" />
      </svg>
    );
  }
  return on ? (
    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand text-white shrink-0" aria-hidden="true">
      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" /></svg>
    </span>
  ) : (
    <span className="w-5 h-5 rounded-full border-2 border-line shrink-0" aria-hidden="true" />
  );
}

function Outline({ course, p, pos, go, onNavigate }) {
  const [openModule, setOpenModule] = useState(pos.m);
  useEffect(() => setOpenModule(pos.m), [pos.m]);

  return (
    <nav aria-label="Course outline" className="space-y-2">
      {course.modules.map((mod, mi) => {
        const unlocked = isUnlocked(course, p, mi);
        const st = moduleStatus(course, p, mi);
        const open = openModule === mi;
        const L = mod.lessons.length;
        const steps = [
          ...mod.lessons.map((l, li) => ({ s: li, label: l.title, done: !!p.lessonsDone[lessonKey(mi, li)], meta: `${l.minutes} min` })),
          { s: L, label: "Module quiz", done: st.quiz, meta: `${QUIZ_MINUTES} min` },
          { s: L + 1, label: "Coding challenge", done: st.challenge, meta: `${CHALLENGE_MINUTES} min` },
        ];
        return (
          <div key={mod.id} className={`rounded-2xl border ${pos.m === mi ? "border-ink/30 bg-paper" : "border-line bg-paper/60"}`}>
            <button
              type="button"
              onClick={() => setOpenModule(open ? -1 : mi)}
              aria-expanded={open}
              className="w-full flex items-center gap-3 px-4 py-3 text-left"
            >
              <span className={`font-display text-sm font-extrabold w-7 ${st.done ? "text-brand" : "text-ink-soft/60"}`}>
                {String(mi + 1).padStart(2, "0")}
              </span>
              <span className={`flex-1 text-sm font-bold leading-snug ${unlocked ? "text-ink" : "text-ink-soft/60"}`}>{mod.title}</span>
              <Check on={st.done} locked={!unlocked} />
            </button>
            {open && (
              <ul className="pb-2 px-2">
                {steps.map((step) => {
                  const current = pos.m === mi && pos.s === step.s;
                  return (
                    <li key={step.s}>
                      <button
                        type="button"
                        disabled={!unlocked}
                        onClick={() => {
                          go({ m: mi, s: step.s });
                          onNavigate?.();
                        }}
                        aria-current={current ? "step" : undefined}
                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left text-[13.5px] transition-colors disabled:cursor-not-allowed ${
                          current ? "bg-ink text-white" : unlocked ? "hover:bg-cream text-ink" : "text-ink-soft/50"
                        }`}
                      >
                        {current ? <span className="w-5 h-5 rounded-full bg-lime shrink-0" aria-hidden="true" /> : <Check on={step.done} locked={!unlocked} />}
                        <span className="flex-1 leading-snug">{step.label}</span>
                        <span className={`text-[11px] ${current ? "text-white/60" : "text-ink-soft/70"}`}>{step.meta}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      {[
        { m: course.modules.length, label: "Final exam", done: !!p.final?.passed, unlocked: finalUnlocked(course, p) },
        { m: course.modules.length + 1, label: "Your certificate", done: !!p.completedAt, unlocked: !!p.final?.passed },
      ].map((item) => (
        <button
          key={item.m}
          type="button"
          disabled={!item.unlocked}
          onClick={() => {
            go({ m: item.m, s: 0 });
            onNavigate?.();
          }}
          className={`w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold disabled:cursor-not-allowed ${
            pos.m === item.m ? "bg-ink text-white border-ink" : item.unlocked ? "bg-paper border-line text-ink hover:border-ink/40" : "bg-paper/60 border-line text-ink-soft/60"
          }`}
        >
          <span className="flex-1">{item.label}</span>
          <Check on={item.done} locked={!item.unlocked} />
        </button>
      ))}
    </nav>
  );
}

function ProgressCodeDialog({ progress, onImport, onClose }) {
  const [tab, setTab] = useState("copy");
  const [pasted, setPasted] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => encodeProgress(progress), [progress]);
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function doImport() {
    try {
      const data = decodeProgress(pasted);
      onImport(data);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-ink/60 p-0 sm:p-4" onClick={onClose}>
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pc-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-cream p-6 sm:p-8 outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="pc-title" className="font-display text-2xl font-extrabold">Continue on another device</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full hover:bg-paper text-xl">×</button>
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          Your progress is saved automatically in this browser. To move it to another phone or laptop, copy your progress code
          and paste it there.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-paper border border-line p-1" role="tablist">
          {[["copy", "Copy my code"], ["paste", "Paste a code"]].map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`rounded-lg py-2 text-sm font-bold ${tab === id ? "bg-ink text-white" : "text-ink-soft"}`}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === "copy" ? (
          <div className="mt-4">
            <label htmlFor="pc-code" className="sr-only">Your progress code</label>
            <textarea id="pc-code" readOnly value={code} rows={5} className="w-full rounded-xl border border-line bg-white p-3 font-mono text-xs break-all" onFocus={(e) => e.target.select()} />
            <button type="button" onClick={copy} className="mt-3 w-full bg-ink hover:bg-brand text-white font-bold py-3.5 rounded-xl">
              {copied ? "Copied ✓" : "Copy progress code"}
            </button>
            <p className="mt-3 text-xs text-ink-soft">Tip: send it to yourself on WhatsApp or email so it's ready on your other device.</p>
          </div>
        ) : (
          <div className="mt-4">
            <label htmlFor="pc-paste" className="block text-sm font-semibold">Paste your progress code</label>
            <textarea
              id="pc-paste"
              value={pasted}
              onChange={(e) => {
                setPasted(e.target.value);
                setError("");
              }}
              rows={5}
              placeholder="JFY1.…"
              className="mt-1.5 w-full rounded-xl border border-line bg-white p-3 font-mono text-xs"
            />
            {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
            <button type="button" onClick={doImport} disabled={!pasted.trim()} className="mt-3 w-full bg-ink hover:bg-brand disabled:bg-ink/30 text-white font-bold py-3.5 rounded-xl">
              Restore my progress
            </button>
            <p className="mt-3 text-xs text-ink-soft">This replaces the progress currently saved in this browser.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- main player ----------
export default function CoursePlayer({ course, overview }) {
  const [p, setP] = useState(null); // null until loaded from storage
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [welcome, setWelcome] = useState(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    const loaded = loadProgress(course.storageKey);
    setP(loaded);
    if (loaded.learner && loaded.startedAt) {
      setWelcome(`Welcome back, ${loaded.learner.name.split(" ")[0]}! Resumed at ${describePos(course, loaded.pos)}.`);
    }
  }, [course]);

  const update = useCallback(
    (fn) => {
      setP((prev) => {
        const next = typeof fn === "function" ? fn(prev) : fn;
        setSaveFailed(!saveProgress(course.storageKey, next));
        return next;
      });
    },
    [course.storageKey]
  );

  // Count active learning time while the tab is visible.
  useEffect(() => {
    if (!p?.learner) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") update((prev) => ({ ...prev, secondsSpent: (prev.secondsSpent || 0) + 15 }));
    }, 15000);
    return () => clearInterval(id);
  }, [p?.learner, update]);

  useEffect(() => {
    if (!welcome) return;
    const t = setTimeout(() => setWelcome(null), 7000);
    return () => clearTimeout(t);
  }, [welcome]);

  const go = useCallback(
    (pos) => {
      update((prev) => ({ ...prev, pos }));
      requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    },
    [update]
  );

  // Before storage loads, or before registering: show the course overview + registration.
  if (!p || !p.learner) {
    return (
      <>
        {overview}
        <section id="register" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-start rounded-[32px] bg-paper border border-line p-6 sm:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">Enroll for free</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Start the course in 30 seconds</h2>
              <p className="mt-4 text-ink-soft">
                Enter your details once. They&apos;re printed on your certificate, and your progress is saved automatically —
                close the tab anytime and continue exactly where you left off.
              </p>
              <ul className="mt-6 space-y-3 text-[15px]">
                {["No sign-up or password", "Auto-saves after every lesson", "Free certificate from Journify Technologies"].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check on />
                    {t}
                  </li>
                ))}
              </ul>
              {p && (
                <button type="button" onClick={() => setCodeOpen(true)} className="mt-6 text-sm font-bold text-brand underline underline-offset-4">
                  Already started on another device? Restore with a progress code
                </button>
              )}
            </div>
            {p ? (
              <RegisterForm
                onSubmit={(learner) => {
                  update({ ...emptyProgress(), learner, startedAt: new Date().toISOString() });
                  requestAnimationFrame(() => window.scrollTo({ top: 0 }));
                }}
              />
            ) : (
              <div className="h-80 rounded-2xl bg-cream animate-pulse" aria-hidden="true" />
            )}
          </div>
        </section>
        {codeOpen && p && (
          <ProgressCodeDialog
            progress={p}
            onClose={() => setCodeOpen(false)}
            onImport={(data) => {
              update(data);
              setCodeOpen(false);
              setWelcome(`Progress restored. Resumed at ${describePos(course, data.pos)}.`);
              window.scrollTo({ top: 0 });
            }}
          />
        )}
      </>
    );
  }

  const percent = overallPercent(course, p);
  const { m, s } = p.pos;
  const nModules = course.modules.length;

  // ----- content for the current position -----
  let header;
  let body;

  if (m < nModules) {
    const mod = course.modules[m];
    const L = mod.lessons.length;
    if (!isUnlocked(course, p, m)) {
      header = { eyebrow: `Module ${m + 1}`, title: mod.title };
      body = <p className="text-ink-soft">Finish the previous module to unlock this one.</p>;
    } else if (s < L) {
      const lesson = mod.lessons[s];
      const done = !!p.lessonsDone[lessonKey(m, s)];
      header = { eyebrow: `Module ${m + 1} · Lesson ${s + 1} of ${L} · ${lesson.minutes} min`, title: lesson.title };
      body = (
        <>
          <Markdown source={lesson.body} />
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            {s > 0 || m > 0 ? (
              <button
                type="button"
                onClick={() => go(s > 0 ? { m, s: s - 1 } : { m: m - 1, s: course.modules[m - 1].lessons.length + 1 })}
                className="border-2 border-ink font-bold px-5 py-3 rounded-xl hover:bg-paper"
              >
                ← Back
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                update((prev) => ({ ...prev, lessonsDone: { ...prev.lessonsDone, [lessonKey(m, s)]: true } }));
                go({ m, s: s + 1 });
              }}
              className="bg-ink hover:bg-brand text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
            >
              {done ? "Next →" : "Mark complete & continue →"}
            </button>
          </div>
        </>
      );
    } else if (s === L) {
      header = { eyebrow: `Module ${m + 1} · Quiz · ${mod.quiz.length} questions`, title: `${mod.title}: Quiz` };
      body = (
        <Quiz
          key={`quiz-${m}`}
          questions={mod.quiz}
          state={p.quiz[m]}
          passPercent={course.passPercent}
          onChange={(q) => update((prev) => ({ ...prev, quiz: { ...prev.quiz, [m]: q } }))}
          onContinue={() => go({ m, s: L + 1 })}
          continueLabel="Go to coding challenge"
        />
      );
    } else {
      const st = moduleStatus(course, p, m);
      const last = m === nModules - 1;
      header = { eyebrow: `Module ${m + 1} · Coding challenge`, title: mod.challenge.title };
      body = (
        <>
          <Challenge
            key={`ch-${m}`}
            challenge={mod.challenge}
            course={course}
            state={p.challenge[m]}
            onChange={(c) => update((prev) => ({ ...prev, challenge: { ...prev.challenge, [m]: c } }))}
            onContinue={() => go(last ? { m: nModules, s: 0 } : { m: m + 1, s: 0 })}
            continueLabel={last ? "Go to final exam" : "Next module"}
          />
          {p.challenge[m]?.passed && !st.done && (
            <p className="mt-6 rounded-2xl bg-paper border border-line p-4 text-sm text-ink-soft">
              To unlock the next module, also complete every lesson and pass the quiz in this module (see the outline).
            </p>
          )}
        </>
      );
    }
  } else if (m === nModules) {
    header = { eyebrow: `Final exam · ${course.finalExam.length} questions · ${FINAL_MINUTES} min`, title: "Final assessment" };
    body = !finalUnlocked(course, p) ? (
      <p className="text-ink-soft">Complete all {nModules} modules to unlock the final exam.</p>
    ) : (
      <>
        <p className="mb-6 text-ink-soft">
          Score at least {course.passPercent}% to earn your certificate. You can retry as many times as you need.
        </p>
        <Quiz
          key="final"
          questions={course.finalExam}
          state={p.final}
          passPercent={course.passPercent}
          onChange={(f) =>
            update((prev) => {
              const next = { ...prev, final: f };
              if (f.passed && !prev.completedAt) {
                next.completedAt = new Date().toISOString();
                next.certId = makeCertId(course.id, prev.learner, next.completedAt);
              }
              return next;
            })
          }
          onContinue={() => go({ m: nModules + 1, s: 0 })}
          continueLabel="Get my certificate"
        />
      </>
    );
  } else {
    header = { eyebrow: "Congratulations 🎉", title: "Your certificate" };
    body = !p.completedAt ? (
      <p className="text-ink-soft">Pass the final exam to unlock your certificate.</p>
    ) : editing ? (
      <div className="max-w-lg">
        <p className="mb-4 text-ink-soft">Fix any spelling mistakes in your details before downloading.</p>
        <RegisterForm
          initial={p.learner}
          submitLabel="Save details"
          onSubmit={(learner) => {
            update((prev) => ({ ...prev, learner }));
            setEditing(false);
          }}
        />
      </div>
    ) : (
      <>
        <p className="mb-6 text-ink-soft">
          You completed <strong className="text-ink">{course.title}</strong> in {formatDuration(p.secondsSpent || 0)} of
          active learning. Download your certificate below.
        </p>
        <Certificate learner={p.learner} course={course} completedAt={p.completedAt} certId={p.certId} score={p.final?.best ?? 0} />
        <button type="button" onClick={() => setEditing(true)} className="mt-6 text-sm font-bold text-brand underline underline-offset-4">
          Name or college spelled wrong? Edit details
        </button>
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-6 pb-16">
      {/* Course header */}
      <div className="rounded-3xl bg-ink text-white p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-lime">Free course · {course.hours} hours</p>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight">{course.title}</h1>
            <p className="mt-1 text-sm text-white/60 truncate">
              Learner: {p.learner.name} · {p.learner.college}
            </p>
          </div>
          <div className="lg:w-80">
            <div className="flex justify-between text-sm font-semibold">
              <span>{percent}% complete</span>
              <span className="text-white/60">{formatDuration(p.secondsSpent || 0)} spent</span>
            </div>
            <div className="mt-2 h-2.5 rounded-full bg-white/15 overflow-hidden" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress">
              <div className="h-full rounded-full bg-lime transition-all duration-500" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => setOutlineOpen(true)} className="lg:hidden bg-white/10 hover:bg-white/20 text-sm font-bold px-4 py-2 rounded-lg">
            ☰ Course outline
          </button>
          <button type="button" onClick={() => setCodeOpen(true)} className="bg-white/10 hover:bg-white/20 text-sm font-bold px-4 py-2 rounded-lg">
            ⇄ Continue on another device
          </button>
          <span className="inline-flex items-center gap-2 text-xs text-white/60 px-2">
            <span className={`w-2 h-2 rounded-full ${saveFailed ? "bg-red-400" : "bg-wa"}`} aria-hidden="true" />
            {saveFailed ? "Progress can't be saved in this browser (private mode?)" : "Progress saved automatically"}
          </span>
        </div>
      </div>

      {welcome && (
        <div role="status" className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-lime px-5 py-3 font-semibold pop-in">
          <span>{welcome}</span>
          <button type="button" onClick={() => setWelcome(null)} aria-label="Dismiss" className="text-xl leading-none">×</button>
        </div>
      )}

      <div className="mt-6 grid lg:grid-cols-[320px_1fr] gap-6 items-start">
        <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
          <Outline course={course} p={p} pos={p.pos} go={go} />
        </aside>

        <article ref={topRef} className="scroll-mt-24 min-w-0 rounded-3xl bg-paper border border-line p-5 sm:p-10">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-brand">{header.eyebrow}</p>
          <h2 className="mt-2 mb-6 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">{header.title}</h2>
          {body}
        </article>
      </div>

      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Reset the course? All your progress and details in this browser will be deleted.")) {
              clearProgress(course.storageKey);
              setP(emptyProgress());
              window.scrollTo({ top: 0 });
            }
          }}
          className="text-xs text-ink-soft hover:text-red-600 underline underline-offset-4"
        >
          Reset course progress
        </button>
      </div>

      {/* Mobile outline drawer */}
      {outlineOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-ink/60" onClick={() => setOutlineOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Course outline"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto bg-cream p-4 pop-in"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-display text-xl font-extrabold">Course outline</p>
              <button type="button" onClick={() => setOutlineOpen(false)} aria-label="Close outline" className="w-10 h-10 rounded-full hover:bg-paper text-2xl">×</button>
            </div>
            <Outline course={course} p={p} pos={p.pos} go={go} onNavigate={() => setOutlineOpen(false)} />
          </div>
        </div>
      )}

      {codeOpen && (
        <ProgressCodeDialog
          progress={p}
          onClose={() => setCodeOpen(false)}
          onImport={(data) => {
            update(data);
            setCodeOpen(false);
            setWelcome(`Progress restored. Resumed at ${describePos(course, data.pos)}.`);
          }}
        />
      )}
    </div>
  );
}

