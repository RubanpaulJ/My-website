"use client";
import { useState } from "react";
import Markdown, { CodeBlock } from "./Markdown";

function stripComments(code, lang) {
  if (lang === "python") return code.replace(/(^|[^"'])#.*$/gm, "$1");
  if (lang === "sql") return code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/--.*$/gm, "");
  let out = code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'\\])\/\/.*$/gm, "$1");
  if (lang === "html") out = out.replace(/<!--[\s\S]*?-->/g, "");
  return out;
}

export function checkCode(challenge, code, lang = "java") {
  const clean = stripComments(code, lang);
  const results = challenge.rules.map((r) => ({ msg: r.msg, ok: r.re.test(clean) }));
  for (const f of challenge.forbid ?? []) {
    results.push({ msg: f.msg, ok: !f.re.test(clean) });
  }
  return results;
}

export default function Challenge({ challenge, course, state, onChange, onContinue, continueLabel = "Continue" }) {
  const lang = course?.lang ?? "java";
  const code = state?.code ?? challenge.starter;
  const [results, setResults] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const passed = !!state?.passed;

  function update(nextCode) {
    onChange({ ...state, code: nextCode, passed });
  }

  function onKeyDown(e) {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const el = e.target;
      const { selectionStart: s, selectionEnd: end } = el;
      const next = code.slice(0, s) + "    " + code.slice(end);
      update(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 4;
      });
    }
  }

  function check() {
    const r = checkCode(challenge, code, lang);
    setResults(r);
    const ok = r.every((x) => x.ok);
    onChange({ ...state, code, passed: passed || ok, attempts: (state?.attempts ?? 0) + 1 });
  }

  const allOk = results?.every((x) => x.ok);

  return (
    <div>
      <div className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">Your task</p>
        <Markdown source={challenge.prompt} />
      </div>

      <div className="mt-6 rounded-2xl bg-ink overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">{course?.fileName ?? "Main.java"}</span>
          <button
            type="button"
            onClick={() => {
              update(challenge.starter);
              setResults(null);
            }}
            className="text-xs font-semibold text-white/60 hover:text-white"
          >
            Reset code
          </button>
        </div>
        <label htmlFor="code-editor" className="sr-only">Code editor</label>
        <textarea
          id="code-editor"
          value={code}
          onChange={(e) => update(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          rows={Math.max(14, code.split("\n").length + 2)}
          className="block w-full bg-transparent text-[#e9e6f5] font-mono text-[13.5px] leading-relaxed p-4 outline-none resize-y caret-lime"
        />
      </div>
      {course?.preview ? (
        <div className="mt-4 rounded-2xl border border-line overflow-hidden bg-white">
          <div className="px-4 py-2 border-b border-line text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">Live preview</div>
          <iframe
            title="Live preview of your code"
            srcDoc={code}
            sandbox="allow-scripts"
            className="block w-full h-72 bg-white"
          />
        </div>
      ) : null}
      <p className="mt-2 text-xs text-ink-soft">
        {course?.preview
          ? "Your code is saved automatically and the preview updates as you type. Check my code verifies the required structure."
          : "Your code is saved automatically. It is checked for the required structure — run it on your computer to see the output."}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={check} className="bg-ink hover:bg-brand text-white font-bold px-7 py-3.5 rounded-xl transition-colors">
          Check my code
        </button>
        <button
          type="button"
          onClick={() => setShowSolution(!showSolution)}
          className="border-2 border-ink font-bold px-6 py-3 rounded-xl hover:bg-paper transition-colors"
          aria-expanded={showSolution}
        >
          {showSolution ? "Hide solution" : "Show solution"}
        </button>
        {passed && (
          <button type="button" onClick={onContinue} className="bg-lime hover:bg-ink hover:text-white font-bold px-6 py-3 rounded-xl transition-colors">
            {continueLabel} →
          </button>
        )}
      </div>

      <div aria-live="polite">
        {results && (
          <div className={`mt-6 rounded-2xl p-5 sm:p-6 ${allOk ? "bg-lime/40" : "bg-paper border border-line"}`}>
            <p className="font-display text-xl font-extrabold">
              {allOk ? "All checks passed! 🎉" : `${results.filter((r) => r.ok).length} of ${results.length} checks passed`}
            </p>
            <ul className="mt-3 space-y-2">
              {results.map((r, i) => (
                <li key={i} className="flex gap-3 text-[15px]">
                  <span className={`font-bold ${r.ok ? "text-green-700" : "text-red-600"}`} aria-hidden="true">
                    {r.ok ? "✓" : "✗"}
                  </span>
                  <span className={r.ok ? "text-ink" : "text-ink font-semibold"}>
                    <span className="sr-only">{r.ok ? "Passed: " : "Missing: "}</span>
                    {r.msg}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showSolution && (
        <div className="mt-6">
          <p className="font-display text-lg font-bold">Model solution</p>
          <CodeBlock code={challenge.solution} label={lang} />
        </div>
      )}
    </div>
  );
}
