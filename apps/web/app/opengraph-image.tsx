import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, display: "flex" }}>📅</div>
        <div
          style={{
            marginTop: 24,
            fontSize: 84,
            fontWeight: 700,
            display: "flex",
          }}
        >
          Activigo
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "#7dd3fc",
            display: "flex",
          }}
        >
          Actividades recreativas para el grupo
        </div>
      </div>
    ),
    { ...size },
  );
}
