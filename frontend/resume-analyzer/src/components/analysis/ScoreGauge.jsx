import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getColor(score) {
  if (score >= 80) return { stroke: "#16A34A", label: "Excellent" };
  if (score >= 60) return { stroke: "#2563EB", label: "Good" };
  if (score >= 40) return { stroke: "#F59E0B", label: "Needs Work" };
  return { stroke: "#DC2626", label: "Poor" };
}

export default function ScoreGauge({ score = 0, size = 220 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { stroke, label } = getColor(score);

  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timeout);
  }, [score]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-muted"
            strokeWidth={14}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {/* rotating scan tick, purely decorative */}
        <motion.div
          className="absolute inset-3 rounded-full border border-dashed border-primary/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-mono text-4xl font-bold tabular-nums"
          >
            {Math.round(animatedScore)}
          </motion.span>
          <span className="text-xs font-medium text-muted-foreground">/ 100 ATS Score</span>
        </div>
      </div>

      <span
        className="mt-4 rounded-full px-3 py-1 text-xs font-semibold"
        style={{ color: stroke, backgroundColor: `${stroke}1A` }}
      >
        {label}
      </span>
    </div>
  );
}
