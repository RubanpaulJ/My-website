export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://journify.tech/sitemap.xml",
    host: "https://journify.tech",
  };
}
