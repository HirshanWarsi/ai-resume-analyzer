import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  UploadCloud,
  FileSearch,
  Target,
  ScanLine,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload Resume", icon: UploadCloud },
  { to: "/analysis", label: "Resume Analysis", icon: FileSearch },
  { to: "/job-match", label: "Job Match", icon: Target },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed z-50 inset-y-0 left-0 w-72 shrink-0 border-r border-border bg-card/80 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:bg-card/50",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col px-5 py-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
                <ScanLine className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                Resume<span className="text-gradient">AI</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-10 flex flex-1 flex-col gap-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-xl bg-primary/10 ring-1 ring-primary/20"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <item.icon className="relative z-10 h-[18px] w-[18px]" />
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-4">
            <p className="text-xs font-semibold text-foreground">Free plan</p>
            <p className="mt-1 text-xs text-muted-foreground">
              3 of 5 monthly scans used
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-3/5 rounded-full bg-brand-gradient" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
