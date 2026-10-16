import type { NextConfig } from "next";

// Préproduction : en-tête X-Robots-Tag sur toutes les réponses (vérifiable avec curl -I)
const preview = process.env.SITE_ENV !== "production";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    const rules = [{ source: "/:file(icon.svg)", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] }];
    if (preview) rules.push({ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] });
    return rules;
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
