"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { owner } from "@/lib/data";
import Image from "next/image";

const navLinks = [
  { label: "Systems", href: "#highlights" },
  { label: "Work", href: "#projects" },
  { label: "Timeline", href: "#experience" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 },
    );

    document
      .querySelectorAll("section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Image */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src="/Copilot_20260310_201847.png"
                  alt="Hassan Iftikhar logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-text-primary text-sm hidden sm:block">
                Hassan Iftikhar
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    activeSection === link.href.replace("#", "")
                      ? "text-accent-cyan bg-accent-cyan/10"
                      : "text-text-sub hover:text-text-primary hover:bg-white/5",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-text-sub font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </div>
              <a
                href="#contact"
                className="px-4 py-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-semibold hover:bg-accent-cyan hover:text-background transition-all duration-200"
              >
                Get in touch
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 group"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "w-5 h-0.5 bg-text-sub transition-all duration-200 group-hover:bg-text-primary",
                  mobileOpen && "rotate-45 translate-y-2",
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-text-sub transition-all duration-200 group-hover:bg-text-primary",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-text-sub transition-all duration-200 group-hover:bg-text-primary",
                  mobileOpen && "-rotate-45 -translate-y-2",
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/[0.06] md:hidden overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-text-sub hover:text-text-primary hover:bg-white/5 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-semibold text-center"
              >
                Get in touch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
