import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Pages removed when the site dropped its backend; send old links and search results home.
  async redirects() {
    return ["/login", "/register", "/profile", "/jobs", "/match"].flatMap((source) => [
      { source, destination: "/", permanent: true },
      { source: `${source}/:path*`, destination: "/", permanent: true },
    ]);
  },
};

export default nextConfig;
