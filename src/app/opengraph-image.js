import { ImageResponse } from "next/og";

export const alt = "Journify — Final year projects with conference & journal paper";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f7f3ec",
          color: "#16131f",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
          Journify<span style={{ color: "#6d28d9" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
          <span>Your project. Your paper.</span>
          <span style={{ display: "flex" }}>
            <span style={{ background: "#d4f36b", padding: "0 16px" }}>Done right.</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 30, fontWeight: 700 }}>
          <span style={{ background: "#16131f", color: "#fff", padding: "12px 24px", borderRadius: 16 }}>Mini ₹2,499</span>
          <span style={{ background: "#6d28d9", color: "#fff", padding: "12px 24px", borderRadius: 16 }}>+ Conference ₹3,499</span>
          <span style={{ background: "#16131f", color: "#fff", padding: "12px 24px", borderRadius: 16 }}>+ Journal ₹4,499</span>
        </div>
      </div>
    ),
    size
  );
}
