import { whatsappLink } from "../lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

const ICONS = {
  internship: (
    <path d="M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM10 5h4v2h-4V5zm10 14H4v-5h6v1h4v-1h6v5zm0-7H4V9h16v3z" />
  ),
  "erp-crm": (
    <path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z" />
  ),
  training: (
    <path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3zm0 9.7L5.2 9 12 5.3 18.8 9 12 12.7zM5 13.2v4L12 21l7-3.8v-4l-7 3.8-7-3.8z" />
  ),
};

export default function ProgramCard({ program, index }) {
  return (
    <article className="flex flex-col rounded-3xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 transition-colors hover:border-lime/40">
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-lime text-ink" aria-hidden="true">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">{ICONS[program.id]}</svg>
        </span>
        <span className="font-display text-sm font-bold text-white/40">Part 0{index + 1}</span>
      </div>

      <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-white">{program.name}</h3>
      <p className="mt-3 text-white/65 leading-relaxed">{program.description}</p>

      <ul className="mt-6 space-y-3 flex-1">
        {program.points.map((p) => (
          <li key={p} className="flex gap-3 text-[15px] text-white/85">
            <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>

      <a
        href={whatsappLink(program.message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl border-2 border-white/20 text-white hover:bg-lime hover:text-ink hover:border-lime transition-colors"
      >
        <WhatsAppIcon />
        Enquire on WhatsApp
      </a>
    </article>
  );
}
