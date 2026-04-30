import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://journify.tech"),
  title: {
    default: "Journify. — Final Year Projects, Research Papers & Academic Services India",
    template: "%s | Journify Technologies",
  },
  description: "Journify Technologies provides expert academic services — final year project implementation, mini project, conference paper writing, journal paper writing, IEEE paper, Scopus paper, PPT presentation and plagiarism removal. Trusted by 500+ students across Tamil Nadu, Chennai, Coimbatore, Madurai, Trichy.",
  keywords: [
    // Brand keywords
    "Journify",
    "journify.tech",
    "Journify Technologies",
    "journify academic services",
    "journify project implementation",
    "journify research papers",
    "journify Tamil Nadu",
    "journify Chennai",

    // Final year project keywords
    "final year project implementation",
    "final year project help",
    "final year project ideas",
    "final year project Tamil Nadu",
    "final year project Chennai",
    "final year project Coimbatore",
    "final year project India",
    "final year BE project",
    "final year BTech project",
    "final year MCA project",
    "final year MSc project",
    "final year ME project",
    "final year CSE project",
    "final year IT project",
    "final year ECE project",
    "final year EEE project",
    "final year project with source code",
    "final year project with documentation",
    "buy final year project",
    "final year project provider",
    "IEEE final year project",
    "final year project 2024",
    "final year project 2025",

    // Mini project keywords
    "mini project implementation",
    "mini project help",
    "mini project ideas",
    "mini project with source code",
    "mini project Tamil Nadu",
    "mini project Chennai",
    "BE mini project",
    "BTech mini project",
    "CSE mini project",

    // Conference paper keywords
    "conference paper writing service",
    "conference paper writing India",
    "IEEE conference paper writing",
    "Springer conference paper",
    "conference paper help",
    "conference paper Tamil Nadu",
    "conference paper Chennai",
    "academic conference paper writing",
    "research conference paper writing service",
    "publish conference paper India",
    "conference paper publication help",
    "IEEE paper writing service India",
    "IEEE paper writing Tamil Nadu",

    // Journal paper keywords
    "journal paper writing service",
    "Scopus journal paper writing",
    "SCI journal paper writing",
    "journal paper writing India",
    "journal paper writing Tamil Nadu",
    "Scopus indexed paper writing",
    "SCI indexed paper writing",
    "research journal paper help",
    "publish journal paper India",
    "journal paper publication service",
    "UGC journal paper writing",
    "Scopus paper writing Chennai",
    "journal paper writing service online",

    // Plagiarism keywords
    "plagiarism removal service",
    "plagiarism removal India",
    "plagiarism removal Tamil Nadu",
    "remove plagiarism from thesis",
    "turnitin plagiarism removal",
    "plagiarism checker and remover",
    "AI content humanizing service",
    "AI detection removal service",
    "plagiarism free content writing",
    "thesis plagiarism removal",
    "dissertation plagiarism removal",
    "plagiarism removal Chennai",
    "reduce plagiarism percentage",

    // PPT keywords
    "PPT presentation design service",
    "PowerPoint presentation India",
    "project PPT design",
    "academic PPT design",
    "professional PPT service",
    "PPT presentation Tamil Nadu",
    "PPT design Chennai",
    "project presentation slides",
    "research presentation design",

    // Domain/technology keywords
    "machine learning project implementation",
    "deep learning project help",
    "IoT project implementation",
    "web development project",
    "Android app project",
    "blockchain project implementation",
    "cloud computing project",
    "cybersecurity project help",
    "data science project implementation",
    "NLP project implementation",
    "computer vision project",
    "Python project implementation",
    "Java project implementation",
    "React project help",
    "VLSI project implementation",
    "embedded systems project",

    // Location keywords
    "academic services Chennai",
    "academic services Tamil Nadu",
    "academic services Coimbatore",
    "academic services Madurai",
    "academic services Trichy",
    "academic services Salem",
    "academic services Tirunelveli",
    "project help Anna University",
    "project help VIT",
    "project help SRM",
    "project help PSG Tech",
    "project help Karunya",
    "project help Amrita",
    "student project help India",

    // General academic keywords
    "academic writing service India",
    "research paper writing service",
    "thesis writing service India",
    "dissertation writing service",
    "academic project help",
    "student project service",
    "affordable project implementation",
    "cheap project implementation India",
    "online project help India",
    "viva preparation help",
    "project documentation writing",
    "synopsis writing service",
  ],
  authors: [{ name: "Journify Technologies", url: "https://journify.tech" }],
  creator: "Journify Technologies",
  publisher: "Journify Technologies",
  category: "Academic Services",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://journify.tech",
    siteName: "Journify Technologies",
    title: "Journify. — Final Year Projects, Research Papers & Academic Services",
    description: "Expert academic services for students. Final year projects, conference papers, journal papers, PPT and plagiarism removal. Trusted by 500+ students across Tamil Nadu.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Journify Technologies - Academic Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journify. — Final Year Projects & Research Papers",
    description: "Expert academic services for students across India. Final year projects, conference papers, journal papers and more.",
    images: ["/og-image.png"],
    creator: "@journifytech",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://journify.tech",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://journify.tech" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai, Tamil Nadu, India" />
        <meta name="geo.position" content="13.0827;80.2707" />
        <meta name="ICBM" content="13.0827, 80.2707" />
        <meta name="theme-color" content="#050508" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Journify." />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Journify Technologies",
              "alternateName": ["Journify", "journify.tech", "Journify Tech"],
              "url": "https://journify.tech",
              "logo": "https://journify.tech/logo.png",
              "image": "https://journify.tech/og-image.png",
              "description": "Journify Technologies provides expert academic services including final year project implementation, conference paper writing, journal paper writing, PPT presentation and plagiarism removal for students across India.",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chennai",
                "addressRegion": "Tamil Nadu",
                "postalCode": "600001",
                "addressCountry": "IN"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-7904203916",
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Tamil"]
                }
              ],
              "sameAs": [
                "https://wa.me/917904203916"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Academic Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mini Project Implementation",
                      "description": "Complete mini project implementation with source code and documentation"
                    },
                    "price": "1999",
                    "priceCurrency": "INR"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Final Year Project Implementation for Conference",
                      "description": "Complete final year project implementation with conference paper support"
                    },
                    "price": "3499",
                    "priceCurrency": "INR"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Conference Paper Writing",
                      "description": "IEEE and Springer formatted conference paper writing"
                    },
                    "price": "1999",
                    "priceCurrency": "INR"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Journal Paper Writing",
                      "description": "Scopus and SCI indexed journal paper writing"
                    },
                    "price": "3999",
                    "priceCurrency": "INR"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "PPT Presentation Design",
                      "description": "Professional PowerPoint presentation design"
                    },
                    "price": "299",
                    "priceCurrency": "INR"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Plagiarism Removal and AI Humanizing",
                      "description": "Turnitin-safe plagiarism removal and AI content humanizing"
                    },
                    "price": "499",
                    "priceCurrency": "INR"
                  }
                ]
              }
            })
          }}
        />

        {/* WebSite Schema for Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Journify Technologies",
              "alternateName": "Journify",
              "url": "https://journify.tech",
              "description": "Academic services for students — final year projects, research papers, plagiarism removal",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://journify.tech/services?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Journify Technologies",
              "image": "https://journify.tech/og-image.png",
              "url": "https://journify.tech",
              "telephone": "+91-7904203916",
              "priceRange": "₹299 - ₹5499",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chennai",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 13.0827,
                "longitude": 80.2707
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday","Tuesday","Wednesday",
                  "Thursday","Friday","Saturday","Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "sameAs": ["https://wa.me/917904203916"],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500"
              }
            })
          }}
        />
      </head>
      <body className="bg-gray-950 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}