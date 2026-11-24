import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import profile from "@/data/profile";

// 1200x630 share card for Facebook, WhatsApp, LinkedIn and X (the square profile photo gets cropped there).
export const alt = `${profile.name} — ${profile.title} in Dhaka, Chattogram and Cumilla`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/profile.png"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 80px",
          background: "linear-gradient(135deg, #050505 0%, #14110a 100%)",
          color: "#f5f1e8",
        }}
      >
        <img src={src} alt="" width={340} height={340} style={{ borderRadius: 9999, border: "6px solid #c9a44c", objectFit: "cover" }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#c9a44c" }}>{profile.title}</div>
          <div style={{ fontSize: 120, fontWeight: 700, marginTop: 12, color: "#e3c97e" }}>{profile.name.toUpperCase()}</div>
          <div style={{ fontSize: 40, marginTop: 8, lineHeight: 1.25 }}>Buy, sell &amp; rent property in Bangladesh</div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#a1a1aa" }}>{profile.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
