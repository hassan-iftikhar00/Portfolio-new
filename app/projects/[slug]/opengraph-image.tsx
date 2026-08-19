import { ImageResponse } from "next/og";
import { caseStudies } from "@/lib/data";
import { OgCard, ogSize, ogContentType } from "@/lib/ogTemplate";

export const alt = "Case study - Hassan Iftikhar";
export const size = ogSize;
export const contentType = ogContentType;
// On-demand (not prerendered): avoids the local @vercel/og path-with-space
// crash; Vercel's Linux runtime generates these per request.
export const dynamic = "force-dynamic";

export default function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  const title = cs?.title ?? "Case study";
  const eyebrow = cs?.category ?? "Case study";
  const tail = cs ? cs.stack.slice(0, 4).join(" · ") : "";

  return new ImageResponse(
    <OgCard eyebrow={eyebrow} title={title} tail={tail} />,
    { ...size },
  );
}
