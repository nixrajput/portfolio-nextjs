import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo/site";
import { BRAND, GROUND, brandRgba } from "@/lib/brand";

// Node runtime (not edge): the webpack build bundles next/og's satori+resvg
// past Vercel's 1 MB edge-function limit. OG image generation is cached and
// not latency-critical, so the Node serverless runtime (no size cap) fits.
export const runtime = "nodejs";
export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Display host derived from the configured site URL, not hardcoded, so the
  // badge stays correct if the domain changes.
  const displayHost = SITE.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px",
        background: GROUND.dark,
        position: "relative",
      }}
    >
      {/* Deep-hue glow blob top-left */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -80,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: brandRgba(BRAND.deep, 0.25),
          filter: "blur(80px)",
        }}
      />
      {/* Mid-hue glow blob bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -60,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: brandRgba(BRAND.mid, 0.18),
          filter: "blur(80px)",
        }}
      />
      {/* Bright-hue glow blob top-right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: brandRgba(BRAND.bright, 0.15),
          filter: "blur(80px)",
        }}
      />

      {/* Logo mark: rising-N with spark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${BRAND.deep}, ${BRAND.mid})`,
            fontSize: 40,
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          N
        </div>
        <div
          style={{
            marginLeft: 8,
            fontSize: 28,
            color: BRAND.bright,
            fontWeight: 700,
          }}
        >
          ✦
        </div>
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.1,
          letterSpacing: "-2px",
        }}
      >
        {SITE.name}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 500,
          color: "#a1a1aa",
          marginTop: 20,
          lineHeight: 1.4,
        }}
      >
        Software Development Engineer &amp; AI Lead
      </div>

      {/* URL badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 48,
          padding: "10px 24px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.05)",
          color: "#71717a",
          fontSize: 22,
        }}
      >
        {displayHost}
      </div>
    </div>,
    { ...size },
  );
}
