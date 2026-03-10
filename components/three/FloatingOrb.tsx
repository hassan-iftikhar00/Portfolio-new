"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
// `import type` — THREE is used only as a type annotation for useRef.
// This ensures the three namespace is erased at compile time and never
// included in the runtime bundle from this file's own import graph.
import type * as THREE from "three";

function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.12;
  });

  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]}>
      <MeshDistortMaterial
        color="#C8CDD6"
        attach="material"
        distort={0.35}
        speed={1.5}
        roughness={0}
        metalness={0.1}
        opacity={0.12}
        transparent
        wireframe={false}
      />
    </Sphere>
  );
}

function WireframeOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = -t * 0.05;
    meshRef.current.rotation.y = t * 0.08;
  });

  return (
    <Sphere ref={meshRef} args={[1.6, 24, 24]}>
      <meshBasicMaterial color="#8B929E" wireframe opacity={0.06} transparent />
    </Sphere>
  );
}

export default function FloatingOrb() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          // dpr cap prevents high-DPI screens (Retina, 4K) from rendering at
          // full pixel ratio, which would multiply GPU cost by 4x with no
          // visible improvement for a subtle background element.
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 3]} intensity={1} color="#E8EAEF" />
          <pointLight position={[-3, -3, -3]} intensity={0.5} color="#9BA3B2" />
          <OrbMesh />
          <WireframeOrb />
        </Canvas>
      </Suspense>
    </div>
  );
}
