/**
 * LazyFloatingOrb
 *
 * Drop-in replacement for FloatingOrb that guarantees:
 * — Three.js + @react-three/fiber + @react-three/drei are never bundled
 *   into the initial page chunk (ssr: false + dynamic import).
 * — The WebGL canvas never runs during SSR (avoids server-side window errors).
 * — The 3D scene only initialises after the initial page paint.
 *
 * Usage:
 *   import LazyFloatingOrb from "@/components/three/LazyFloatingOrb";
 *   // Then render: <LazyFloatingOrb />
 */
import dynamic from "next/dynamic";

const LazyFloatingOrb = dynamic(() => import("./FloatingOrb"), {
  ssr: false,
  loading: () => null, // renders nothing until the chunk loads
});

export default LazyFloatingOrb;
