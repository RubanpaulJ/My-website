import { SITE_URL, SERVICES } from "../../lib/site";

const DESCRIPTION =
  "Fixed-price project packages: mini project ₹2,499, final year project with conference paper ₹3,499, final year project with journal paper ₹4,499. Implementation and source code included.";

export const metadata = {
  title: "Pricing — Mini & Final Year Project Packages",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title: "Pricing — Mini & Final Year Project Packages | Journify",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Pricing — Mini & Final Year Project Packages | Journify",
    description: DESCRIPTION,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Journify project packages",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          description: s.features.join(", "),
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: { "@type": "Country", name: "India" },
          offers: {
            "@type": "Offer",
            price: String(s.price),
            priceCurrency: "INR",
            url: `${SITE_URL}/services`,
          },
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/services` },
      ],
    },
  ],
};

export default function ServicesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
