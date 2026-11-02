import ServiceCard from "../../components/ServiceCard";
import WhatsAppIcon from "../../components/WhatsAppIcon";
import { SERVICES, whatsappLink } from "../../lib/site";

export default function ServicesPage() {
  return (
    <>
      <section className="dots -mt-[76px] pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 sm:pt-20 sm:pb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">Pricing</p>
          <h1 className="mt-3 font-display text-[40px] leading-[1.05] sm:text-6xl font-extrabold tracking-tight">
            Pick a package. <br className="sm:hidden" />
            <span className="marker">Ping us.</span> Done.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-soft max-w-xl mx-auto">
            Fixed prices, everything included. Tap a package to message us on WhatsApp — we&apos;ll confirm the
            details and get started.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 sm:pt-12 sm:pb-24" aria-label="Packages">
        <div className="grid gap-6 md:grid-cols-3 items-start">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-3xl border-2 border-dashed border-line bg-paper p-6 sm:p-8 text-center sm:text-left">
          <div>
            <p className="font-display text-xl sm:text-2xl font-bold">Not sure which one fits?</p>
            <p className="mt-1 text-ink-soft">Tell us about your project — we&apos;ll recommend the right package.</p>
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-ink hover:bg-brand text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
          >
            <WhatsAppIcon />
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
