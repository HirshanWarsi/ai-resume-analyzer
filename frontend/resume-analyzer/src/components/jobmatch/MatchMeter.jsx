import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export default function MatchMeter({ score }) {
  return (
    <div className="flex items-center gap-5">
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
        <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
          <path
            className="text-muted"
            stroke="currentColor"
            strokeWidth="3.2"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            stroke="url(#matchGradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - score }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <defs>
            <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute font-mono text-lg font-bold">{score}%</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">Overall Match Score</p>
        <p className="mb-2 text-xs text-muted-foreground">
          Based on skills, keywords, and role alignment
        </p>
        <Progress value={score} />
      </div>
    </div>
  );
}
