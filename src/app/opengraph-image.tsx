import { ImageResponse } from "next/og";

export const alt =
  "Aakar Labs — branding, UX/UI, and digital identity studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050509",
          padding: "72px 80px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.28em",
              color: "#eceef5",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
              fontWeight: 700,
            }}
          >
            AAKAR LABS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              letterSpacing: "0.18em",
              color: "rgba(236,238,245,0.55)",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
            }}
          >
            DESIGN STUDIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 3,
              background: "#d4756a",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 64,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "#eceef5",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            <span>we design digital</span>
            <span style={{ color: "#f0e8d5" }}>identities people remember</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 20,
            color: "rgba(236,238,245,0.62)",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          <span>Branding · UX/UI · Web · Systems</span>
          <span>aakarlabs.art</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
