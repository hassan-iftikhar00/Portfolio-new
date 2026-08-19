import { ImageResponse } from "next/og";
import { OgCard, ogSize, ogContentType } from "@/lib/ogTemplate";

export const alt = "Hassan Iftikhar - Full Stack Developer";
export const size = ogSize;
export const contentType = ogContentType;
// Render on-demand instead of at build. @vercel/og's wasm/font loader breaks
// on the local Windows path (it contains a space); on Vercel's Linux runtime
// this generates fine at request time.
export const dynamic = "force-dynamic";

// Home OG card, generated at build. Replaces the old /og.png.
export default function OpengraphImage() {
  return new ImageResponse(
    <OgCard
      eyebrow="Full Stack Developer"
      title="Production software that ships and stays up."
      tail="5 case studies · 6 countries"
    />,
    { ...size },
  );
}
