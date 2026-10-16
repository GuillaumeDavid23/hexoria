import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `Hexoria — dépannage informatique à domicile à ${site.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage (SMS, WhatsApp, Facebook) : reprend l'accroche du tract. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px", background: "#f7f4fd", color: "#16131f" }}>
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 8, color: "#5b21b6", fontWeight: 700 }}>HEXORIA · {site.signature.toUpperCase()}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1 }}>Un souci avec</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1.05, color: "#5b21b6" }}>votre ordinateur ?</div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 28 }}>Je vous aide à y voir clair.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#5c5870" }}>{site.area}</div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, color: "#5b21b6" }}>{site.contact.phone}</div>
        </div>
      </div>
    ),
    size,
  );
}
