import React from "react";
import { motion } from "framer-motion";
import { ScanLine, Sparkles, ShieldCheck, Gauge } from "lucide-react";

const features = [
  { icon: Gauge, text: "Instant ATS scoring with clear, actionable breakdowns" },
  { icon: Sparkles, text: "AI-matched skills against real job descriptions" },
  { icon: ShieldCheck, text: "Private by design — your resume stays yours" },
];

export default function AuthShell({ children, eyebrow, title, subtitle }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:36px_36px] opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-blue-400/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-300/30 blur-[110px]" />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-[2rem] border border-white/20 shadow-glow-lg lg:grid-cols-2">
        {/* left brand panel */}
        <div className="relative hidden flex-col justify-between p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm" />
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
              <ScanLine className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold">ResumeAI</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 space-y-6"
          >
            <h2 className="font-display text-3xl font-bold leading-tight">
              See your resume the way an ATS does.
            </h2>
            <ul className="space-y-4">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <f.icon className="h-3.5 w-3.5" />
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <p className="relative z-10 text-xs text-white/60">
            Trusted groundwork for your next application cycle.
          </p>
        </div>

        {/* right form panel — glassmorphism */}
        <div className="glass-strong flex flex-col justify-center p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-2 flex items-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient">
                <ScanLine className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-display text-lg font-bold">ResumeAI</span>
            </div>
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {title}
            </h1>
            {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}

            <div className="mt-8">{children}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
