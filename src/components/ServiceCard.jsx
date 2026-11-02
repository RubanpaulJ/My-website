import { whatsappLink, serviceMessage } from "../lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ServiceCard({ service, index }) {
  const featured = service.popular;

  return (
    <article
      className={`relative flex flex-col rounded-3xl p-6 sm:p-8 transition-transform duration-300 md:hover:-translate-y-1 ${
        featured
          ? "bg-ink text-white shadow-[0_24px_60px_-20px_rgba(76,29,149,0.55)] md:-translate-y-3 md:hover:-translate-y-4"
          : "bg-paper border border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`font-display text-sm font-bold ${featured ? "text-white/50" : "text-ink-soft/60"}`}>
          0{index + 1}
        </span>
        {featured && (
          <span className="bg-lime text-ink text-xs font-bold px-3 py-1 rounded-full -rotate-2">
            ★ Most popular
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl font-bold leading-tight">{service.name}</h3>
      <p className={`mt-1.5 text-sm ${featured ? "text-white/60" : "text-ink-soft"}`}>{service.tagline}</p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className={`font-display text-lg font-bold ${featured ? "text-lime" : "text-brand"}`}>₹</span>
        <span className="font-display text-5xl font-extrabold tracking-tight">
          {service.price.toLocaleString("en-IN")}
        </span>
      </p>

      <div className={`my-6 border-t border-dashed ${featured ? "border-white/20" : "border-line"}`} />

      <ul className="space-y-3 flex-1">
        {service.features.map((f) => (
          <li key={f} className={`flex gap-3 text-[15px] ${featured ? "text-white/85" : "text-ink"}`}>
            <span
              className={`mt-0.5 flex items-center justify-center w-5 h-5 shrink-0 rounded-full ${
                featured ? "bg-lime text-ink" : "bg-brand/10 text-brand"
              }`}
              aria-hidden="true"
            >
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
            </span>
            {f}
          </li>
        ))}
        <li className={`pl-8 text-sm italic ${featured ? "text-white/50" : "text-ink-soft"}`}>…and more</li>
      </ul>

      <a
        href={whatsappLink(serviceMessage(service))}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-8 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-colors ${
          featured ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-brand"
        }`}
      >
        <WhatsAppIcon className="w-5 h-5" />
        Enquire on WhatsApp
      </a>
    </article>
  );
}
