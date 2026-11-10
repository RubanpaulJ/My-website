import Link from "next/link";
import { whatsappLink, PHONE_DISPLAY, EMAIL } from "../lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8 grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-extrabold text-white">
            Journify<span className="text-lime">.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            Final year projects, mini projects and research papers for engineering students across India.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-bold text-white uppercase tracking-[0.15em]">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-lime">Home</Link></li>
            <li><Link href="/services" className="hover:text-lime">Pricing</Link></li>
            <li><Link href="/#programs" className="hover:text-lime">Internships & Training</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-lime">How it works</Link></li>
            <li><Link href="/#faq" className="hover:text-lime">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold text-white uppercase tracking-[0.15em]">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-lime">
                WhatsApp · {PHONE_DISPLAY}
              </a>
            </li>
            <li><a href={`mailto:${EMAIL}`} className="hover:text-lime break-all">{EMAIL}</a></li>
            <li>Chennai, Tamil Nadu</li>
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="font-display font-extrabold text-white/[0.06] text-[22vw] leading-[0.8] text-center select-none -mb-[3vw]"
      >
        journify
      </p>

      <div className="border-t border-white/10 py-5 pb-24 md:pb-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Journify Technologies. All rights reserved.
      </div>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="md:hidden fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-2xl bg-wa text-ink shadow-[0_8px_24px_-6px_rgba(18,140,75,0.6)] active:scale-95 transition-transform"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </footer>
  );
}
