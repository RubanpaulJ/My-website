// ============================================================
// FILE LOCATION: src/app/services/layout.js
// This is a SERVER COMPONENT — no "use client" here!
// This makes metadata readable by Google crawlers
// ============================================================

export const metadata = {
  title: "Buy Final Year Projects, Mini Projects, Conference & Journal Papers | Journify Technologies",
  description: "Buy final year project implementation, mini project, conference paper writing, journal paper writing, IEEE paper, Scopus paper, plagiarism removal for engineering students in India. Trusted by 500+ students across Tamil Nadu, Chennai, Coimbatore, Madurai, Trichy. WhatsApp: 7904203916",
  keywords: [
    // FINAL YEAR PROJECT
    "buy final year project", "final year project buying", "final year project implementation",
    "final year project implementation service", "final year project implementation india",
    "final year project implementation tamil nadu", "final year project implementation chennai",
    "final year project implementation coimbatore", "final year project for engineering students",
    "engineering final year project buying", "engineering final year project implementation",
    "final year project buying india", "final year project service india",
    "final year project help india", "final year project assistance india",
    "final year project developers india", "best final year project service india",
    "final year project with source code", "final year project with documentation",
    "final year project with report", "final year project with ppt",
    "buy final year project online", "buy final year project india",
    "buy final year project chennai", "buy final year project coimbatore",
    "final year project for btech", "final year project for be",
    "final year project for mtech", "final year project for mca",
    "final year project for msc", "final year project for bsc",
    // MINI PROJECT
    "buy mini project", "mini project buying", "mini project implementation",
    "mini project implementation india", "mini project implementation service",
    "mini project for engineering students", "mini project buying india",
    "mini project buying online", "buy mini project online",
    "mini project with source code", "mini project developers india",
    "mini project implementation chennai", "mini project implementation coimbatore",
    "mini project for btech", "mini project for be students",
    "3rd year mini project india", "semester project buying",
    "semester project implementation india", "buy semester project",
    // CONFERENCE PAPER
    "buy conference paper", "conference paper buying", "conference paper writing service",
    "conference paper writing india", "conference paper writing for engineering students",
    "IEEE paper writing service", "IEEE paper writing india",
    "IEEE conference paper buying", "buy IEEE conference paper",
    "Springer paper writing service", "conference paper writing service india",
    "buy conference paper india", "conference paper writing tamil nadu",
    "conference paper writing chennai", "conference paper writing coimbatore",
    "conference paper for final year project", "conference paper publication india",
    "conference paper writing service online", "IEEE format paper writing",
    // JOURNAL PAPER
    "buy journal paper", "journal paper buying", "journal paper writing service",
    "journal paper writing india", "Scopus paper writing", "SCI paper writing",
    "Scopus indexed journal paper india", "buy Scopus paper",
    "journal paper for engineering students", "journal paper for final year",
    "journal paper buying india", "journal paper writing tamil nadu",
    "journal paper writing chennai", "journal paper writing coimbatore",
    "Scopus journal paper service", "SCI journal paper service india",
    "buy research paper india", "research paper writing service india",
    "research paper writing for students", "journal publication service india",
    // IMPLEMENTATION
    "project implementation buying", "project implementation service india",
    "buy project implementation", "implementation buying india",
    "project implementation for engineering", "buy implementation project",
    "implementation service india", "project implementation service chennai",
    "project implementation service coimbatore", "buy project source code",
    "buy project with source code india", "project source code buying",
    // DOMAIN
    "machine learning project buying", "deep learning project buying",
    "AI project implementation india", "artificial intelligence project buying",
    "IoT project implementation", "IoT project buying india",
    "web development project buying", "android project buying",
    "blockchain project buying", "cloud computing project buying",
    "cybersecurity project buying", "data science project buying",
    "python project buying", "java project buying", "react project buying",
    "NLP project buying", "computer vision project buying",
    "neural network project buying", "image processing project buying",
    "big data project buying", "embedded systems project buying",
    "full stack project buying", "MERN stack project buying",
    // PLAGIARISM
    "plagiarism removal service india", "plagiarism removal india",
    "plagiarism removal for students", "turnitin safe content india",
    "AI content humanizing india", "plagiarism removal chennai",
    "plagiarism removal coimbatore", "plagiarism check india",
    "plagiarism free report india", "buy plagiarism removal",
    // PPT
    "ppt presentation buying", "buy ppt presentation india",
    "presentation making service india", "professional ppt service",
    "ppt for final year project", "ppt for conference presentation",
    "ppt design service india", "buy project ppt india",
    // LOCATION
    "academic service india", "academic service tamil nadu",
    "academic service chennai", "academic service coimbatore",
    "academic service madurai", "academic service trichy",
    "academic service vellore", "academic service salem",
    "student project service india", "engineering student project help",
    "anna university project buying", "vit project buying", "srm project buying",
    "psg tech project buying", "amrita project buying", "sathyabama project buying",
    // BRAND
    "journify technologies", "journify project service",
    "trusted project service india", "affordable project service india",
    "best project service india", "top project service india",
    "project service with viva support", "project service with source code",
    "final year project 2025", "final year project 2026",
    "mini project 2025", "mini project 2026",
    "IEEE paper 2025", "IEEE paper 2026",
    "Scopus paper 2025", "Scopus paper 2026",
  ],
  alternates: {
    canonical: "https://journify.tech/services",
  },
  openGraph: {
    title: "Buy Final Year Projects & Research Papers | Journify Technologies",
    description: "Trusted academic service for engineering students. Buy final year project, mini project, conference paper, journal paper, IEEE paper in India. 500+ students served.",
    url: "https://journify.tech/services",
    siteName: "Journify Technologies",
    images: [
      {
        url: "https://journify.tech/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Journify Technologies - Buy Final Year Projects India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Final Year Projects & Research Papers | Journify Technologies",
    description: "Buy final year project, mini project, conference paper, journal paper for engineering students in India.",
    images: ["https://journify.tech/og-image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ServicesLayout({ children }) {
  return (
    <>
      {/* JSON-LD Structured Data — Google reads this for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Final Year Project Implementation Service",
            "provider": {
              "@type": "Organization",
              "name": "Journify Technologies",
              "url": "https://journify.tech",
              "telephone": "+91-7904203916",
              "areaServed": "India",
            },
            "description": "Buy final year project implementation, mini project, conference paper writing, journal paper writing for engineering students in India.",
            "serviceType": "Academic Project Implementation",
            "areaServed": {
              "@type": "Country",
              "name": "India",
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Academic Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": "Mini Project Implementation" },
                  "price": "1999",
                  "priceCurrency": "INR",
                },
                {
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": "Final Year Project Implementation for Conference" },
                  "price": "3499",
                  "priceCurrency": "INR",
                },
                {
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": "Conference Paper Writing IEEE Springer" },
                  "price": "3999",
                  "priceCurrency": "INR",
                },
                {
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": "Final Year Project Implementation for Journal" },
                  "price": "4499",
                  "priceCurrency": "INR",
                },
                {
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": "Journal Paper Writing Scopus SCI" },
                  "price": "5499",
                  "priceCurrency": "INR",
                },
                {
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": "PPT Presentation Design" },
                  "price": "299",
                  "priceCurrency": "INR",
                },
                {
                  "@type": "Offer",
                  "itemOffered": { "@type": "Service", "name": "Plagiarism Removal AI Humanizing" },
                  "price": "499",
                  "priceCurrency": "INR",
                },
              ],
            },
            
          }),
        }}
      />
      {/* FAQ Schema — Google shows this directly in search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Where can I buy final year project implementation in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can buy final year project implementation at Journify Technologies. We provide complete final year project with source code, documentation, synopsis, PPT and viva support for engineering students across India.",
                },
              },
              {
                "@type": "Question",
                "name": "How to buy mini project for engineering students in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Buying a mini project at Journify is simple. Click Apply Now, WhatsApp opens automatically, our team discusses your requirements and delivers your complete mini project with source code starting at Rs.1999.",
                },
              },
              {
                "@type": "Question",
                "name": "Where to buy conference paper writing service in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Journify Technologies provides IEEE and Springer format conference paper writing service for engineering students starting at Rs.1999 for mini projects and Rs.3999 for final year projects.",
                },
              },
              {
                "@type": "Question",
                "name": "How to buy Scopus journal paper for final year project in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Buy Scopus indexed journal paper writing service at Journify Technologies starting at Rs.5499. Includes full paper writing, abstract, results, references and plagiarism-free guarantee.",
                },
              },
              {
                "@type": "Question",
                "name": "Which domains are covered for final year project buying?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We cover Machine Learning, Deep Learning, AI, IoT, Web Development, Android, Blockchain, Cloud Computing, Cybersecurity, Data Science, Computer Vision, NLP, Python, Java, React and more.",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}