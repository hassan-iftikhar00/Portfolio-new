"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {eyebrow && (
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          {align === "left" && (
            <span className="w-6 h-px bg-accent-cyan opacity-60" />
          )}
          <span className="text-xs font-mono font-medium tracking-widest uppercase text-accent-cyan/80">
            {eyebrow}
          </span>
          {align === "center" && (
            <>
              <span className="w-6 h-px bg-accent-cyan opacity-60" />
            </>
          )}
        </motion.div>
      )}

      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary"
      >
        {title}{" "}
        {titleHighlight && (
          <span className="text-gradient-cyan">{titleHighlight}</span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={cn(
            "text-text-sub text-base md:text-lg leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
