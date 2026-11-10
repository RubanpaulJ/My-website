import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL, SERVICES, FAQS, WHATSAPP_NUMBER, EMAIL, whatsappLink } from "../lib/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

const DESCRIPTION =
  "Final year projects and mini projects for engineering students in Tamil Nadu & India — full implementation, source code and conference or journal paper. Mini project ₹2,499, final year from ₹3,499. Order on WhatsApp.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Buy Final Year Projects & Mini Projects with Source Code | Journify",
    template: "%s | Journify",
  },
  description: DESCRIPTION,
  applicationName: "Journify",
  keywords: [
    "final year project",
    "final year project with source code",
    "final year project with conference paper",
    "final year project with journal paper",
    "mini project with source code",
    "engineering final year project Tamil Nadu",
    "final year project Chennai",
    "IEEE conference paper writing",
    "journal paper writing for students",
    "Journify",
  ],
  authors: [{ name: "Journify Technologies", url: SITE_URL }],
  creator: "Journify Technologies",
  publisher: "Journify Technologies",
  category: "education",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.jpeg",
  },
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Journify",
    title: "Buy Final Year Projects & Mini Projects with Source Code | Journify",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Final Year Projects & Mini Projects with Source Code | Journify",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#f7f3ec",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Journify Technologies",
      alternateName: "Journify",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.jpeg`,
      image: `${SITE_URL}/opengraph-image`,
      description: DESCRIPTION,
      telephone: `+${WHATSAPP_NUMBER}`,
      email: EMAIL,
      priceRange: "₹2,499 – ₹4,499",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "State", name: "Tamil Nadu" },
        { "@type": "Country", name: "India" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${WHATSAPP_NUMBER}`,
        contactType: "customer service",
        url: whatsappLink(),
        availableLanguage: ["English", "Tamil"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Project packages",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          price: String(s.price),
          priceCurrency: "INR",
          url: `${SITE_URL}/services`,
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.features.join(", "),
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Journify",
      url: SITE_URL,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-cream text-ink font-sans min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
