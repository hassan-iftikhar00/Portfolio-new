"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tilt?: boolean;
  hover?: boolean;
}

export default function GlowCard({
  children,
  className,
  glowColor = "rgba(34,211,238,0.15)",
  tilt = false,
  hover = true,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [4, -4]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-4, 4]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={
        tilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-2xl bg-surface/60 backdrop-blur-xl border border-white/[0.06] overflow-hidden",
        "transition-shadow duration-300",
        className,
      )}
    >
      {/* Glow spot that follows cursor */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      {/* Top edge glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor.replace("0.15", "0.4")}, transparent)`,
        }}
      />
      {children}
    </motion.div>
  );
}
