export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/services", "/jobs", "/match", "/register", "/login"],
        disallow: ["/api/", "/profile/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/profile/"],
      },
    ],
    sitemap: "https://journify.tech/sitemap.xml",
    host: "https://journify.tech",
  };
}