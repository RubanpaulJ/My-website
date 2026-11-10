"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink } from "../lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Pricing" },
  { href: "/#programs", label: "Internships & Training" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 bg-ink text-white px-3 py-2 rounded-lg">
        Skip to content
      </a>
      <nav
        className="max-w-6xl mx-auto h-16 pl-3 pr-2 sm:pl-5 flex items-center justify-between rounded-2xl bg-paper/90 backdrop-blur border border-line shadow-[0_4px_24px_-12px_rgba(22,19,31,0.25)]"
        aria-label="Main"
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/logo.jpeg" alt="" className="w-9 h-9 rounded-xl object-cover" />
          <span className="font-display text-[22px] font-extrabold tracking-tight">
            Journify<span className="text-brand">.</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-2 rounded-full text-[15px] font-semibold transition-colors ${
                    active ? "bg-ink text-white" : "text-ink-soft hover:text-ink hover:bg-cream"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-wa hover:bg-wa-dark hover:text-white text-ink text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Chat with us
        </a>

        <button
          type="button"
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-ink text-white"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h10" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-paper border border-line p-3 shadow-xl pop-in">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-3.5 rounded-xl font-display text-xl font-bold hover:bg-cream"
                >
                  {l.label}
                  <span aria-hidden="true" className="text-brand">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 bg-wa text-ink font-bold py-3.5 rounded-xl"
          >
            <WhatsAppIcon />
            Chat with us
          </a>
        </div>
      )}
    </header>
  );
}
