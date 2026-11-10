// Renders the small markdown dialect used in course content.

export function Inline({ text }) {
  const parts = [];
  const re = /«([^»]+)»|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      parts.push(
        <code key={k++} className="px-1.5 py-0.5 rounded-md bg-ink/[0.06] text-brand-dark font-mono text-[0.9em] break-words">
          {m[1]}
        </code>
      );
    } else {
      parts.push(<strong key={k++} className="font-bold text-ink">{m[2]}</strong>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function CodeBlock({ code, label }) {
  return (
    <div className="my-5 rounded-2xl bg-ink overflow-hidden">
      {label && (
        <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 border-b border-white/10">
          {label}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-[13.5px] leading-relaxed text-[#e9e6f5] font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function Markdown({ source }) {
  const lines = source.split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("~~~")) {
      const lang = line.slice(3).trim();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("~~~")) code.push(lines[i++]);
      i++;
      blocks.push({ type: "code", lang, text: code.join("\n") });
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "h", text: line.slice(4) });
      i++;
    } else if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      blocks.push({ type: "ul", items });
    } else if (line.startsWith("> ")) {
      blocks.push({ type: "tip", text: line.slice(2) });
      i++;
    } else if (line.trim() === "") {
      i++;
    } else {
      const para = [];
      while (i < lines.length && lines[i].trim() !== "" && !/^(~~~|### |- |> )/.test(lines[i])) para.push(lines[i++]);
      blocks.push({ type: "p", text: para.join(" ") });
    }
  }

  return (
    <div className="text-[16px] leading-[1.75] text-ink-soft">
      {blocks.map((b, idx) => {
        switch (b.type) {
          case "code":
            return <CodeBlock key={idx} code={b.text} label={b.lang || null} />;
          case "h":
            return <h3 key={idx} className="mt-8 mb-2 font-display text-xl font-bold text-ink">{b.text}</h3>;
          case "ul":
            return (
              <ul key={idx} className="my-4 space-y-2">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-[11px] w-1.5 h-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    <span><Inline text={it} /></span>
                  </li>
                ))}
              </ul>
            );
          case "tip":
            return (
              <p key={idx} className="my-5 rounded-2xl border-l-4 border-lime bg-lime/25 px-4 py-3 text-ink">
                <span className="font-bold">Tip: </span>
                <Inline text={b.text} />
              </p>
            );
          default:
            return <p key={idx} className="my-4"><Inline text={b.text} /></p>;
        }
      })}
    </div>
  );
}
