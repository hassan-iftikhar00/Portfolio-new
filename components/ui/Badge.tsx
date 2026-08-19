import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "violet" | "blue" | "default";
  size?: "sm" | "md";
  className?: string;
}

const variants = {
  cyan: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
  violet: "bg-accent-violet/10 text-accent-violet border-accent-violet/20",
  blue: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  default: "bg-white/5 text-text-sub border-white/10",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium font-mono tracking-wide",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
