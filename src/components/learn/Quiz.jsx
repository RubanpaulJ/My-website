"use client";
import { Inline } from "./Markdown";

// Stable per-question shuffle so the correct answer isn't always in the same slot.
function optionOrder(q) {
  let seed = 0;
  for (let i = 0; i < q.q.length; i++) seed = (Math.imul(seed, 31) + q.q.charCodeAt(i)) >>> 0;
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export default function Quiz({ questions, state, passPercent, onChange, onContinue, continueLabel = "Continue" }) {
  const answers = state?.answers ?? Array(questions.length).fill(null);
  const submitted = !!state?.submitted;
  const allAnswered = answers.every((a) => a !== null && a !== undefined);
  const score = questions.reduce((t, q, i) => t + (answers[i] === q.answer ? 1 : 0), 0);
  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= passPercent;

  function choose(qi, oi) {
    if (submitted) return;
    const next = [...answers];
    next[qi] = oi;
    onChange({ answers: next, submitted: false, passed: !!state?.passed, best: state?.best ?? 0 });
  }

  function submit() {
    onChange({ answers, submitted: true, passed: !!state?.passed || passed, best: Math.max(state?.best ?? 0, percent) });
  }

  function retry() {
    onChange({ answers: Array(questions.length).fill(null), submitted: false, passed: !!state?.passed, best: state?.best ?? 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <ol className="space-y-6">
        {questions.map((q, qi) => (
          <li key={qi}>
            <fieldset className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
              <legend className="sr-only">Question {qi + 1}</legend>
              <p className="flex gap-3 font-semibold text-ink whitespace-pre-line">
                <span className="font-display text-brand">{qi + 1}.</span>
                <span><Inline text={q.q} /></span>
              </p>
              <div className="mt-4 grid gap-2.5">
                {optionOrder(q).map((oi) => {
                  const opt = q.options[oi];
                  const chosen = answers[qi] === oi;
                  const correct = q.answer === oi;
                  let tone = "border-line bg-white hover:border-ink/40";
                  if (!submitted && chosen) tone = "border-brand bg-brand/[0.06] ring-1 ring-brand";
                  if (submitted && correct) tone = "border-green-600 bg-green-50";
                  if (submitted && chosen && !correct) tone = "border-red-500 bg-red-50";
                  return (
                    <label
                      key={oi}
                      className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${tone} ${submitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <input
                        type="radio"
                        name={`q${qi}`}
                        className="mt-1 accent-[#6d28d9] w-4 h-4 shrink-0"
                        checked={chosen}
                        disabled={submitted}
                        onChange={() => choose(qi, oi)}
                      />
                      <span className="text-[15px] text-ink"><Inline text={opt} /></span>
                      {submitted && correct && <span className="ml-auto text-sm font-bold text-green-700">Correct</span>}
                      {submitted && chosen && !correct && <span className="ml-auto text-sm font-bold text-red-600">Your answer</span>}
                    </label>
                  );
                })}
              </div>
              {submitted && (
                <p className="mt-4 text-sm text-ink-soft">
                  <span className="font-bold text-ink">Explanation: </span>
                  <Inline text={q.explain} />
                </p>
              )}
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="mt-8" aria-live="polite">
        {!submitted ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={submit}
              disabled={!allAnswered}
              className="bg-ink hover:bg-brand disabled:bg-ink/30 disabled:cursor-not-allowed text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
            >
              Submit answers
            </button>
            {!allAnswered && (
              <p className="text-sm text-ink-soft">
                Answer all {questions.length} questions to submit. You need {passPercent}% to pass.
              </p>
            )}
          </div>
        ) : (
          <div className={`rounded-2xl p-5 sm:p-6 ${passed ? "bg-lime/40" : "bg-red-50 border border-red-200"}`}>
            <p className="font-display text-2xl font-extrabold">
              {score} / {questions.length} correct · {percent}%
            </p>
            <p className="mt-1 text-ink-soft">
              {passed ? "Great work — you passed!" : `You need ${passPercent}% to pass. Review the explanations and try again.`}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {passed && (
                <button type="button" onClick={onContinue} className="bg-ink hover:bg-brand text-white font-bold px-6 py-3 rounded-xl transition-colors">
                  {continueLabel} →
                </button>
              )}
              <button type="button" onClick={retry} className="border-2 border-ink font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors">
                Retry quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
