import type { MetadataRoute } from "next";
import { absoluteUrl, INDEXABLE } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(INDEXABLE ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
