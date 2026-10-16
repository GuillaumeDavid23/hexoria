import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/mentions-legales"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
