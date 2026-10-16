import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Hexoria — création de sites vitrines et d'applications web sur mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage du parcours Professionnels. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px", background: "#12072d", color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 32, letterSpacing: 8, color: "#c9b6fb", fontWeight: 700 }}>HEXORIA · PROFESSIONNELS</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1 }}>Votre site web,</div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1.05, color: "#c9b6fb" }}>sur mesure.</div>
          <div style={{ display: "flex", fontSize: 38, marginTop: 28, color: "#e9e3f7" }}>Sites vitrines · Applications web, mobiles & SaaS</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#b8acd6" }}>{site.contact.web}</div>
          <div style={{ display: "flex", fontSize: 60, fontWeight: 800, color: "#c9b6fb" }}>{site.contact.phone}</div>
        </div>
      </div>
    ),
    size,
  );
}
