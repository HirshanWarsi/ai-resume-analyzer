import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UploadCloud, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomeCard({ name = "Hirshan" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl bg-brand-gradient p-7 text-white shadow-glow-lg sm:p-9"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:28px_28px] opacity-20" />
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium ring-1 ring-white/25">
            <Sparkles className="h-3 w-3" /> Welcome back
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
            Hey {name}, let's land that next interview.
          </h2>
          <p className="mt-2 max-w-md text-sm text-white/80">
            Your average ATS score is trending up. Upload a fresh resume or check a
            job match to keep the momentum going.
          </p>
        </div>

        <Button asChild variant="glass" size="lg" className="shrink-0 text-white">
          <Link to="/upload">
            <UploadCloud className="h-4 w-4" />
            Upload Resume
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
