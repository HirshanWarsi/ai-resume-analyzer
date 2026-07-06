import React from "react";
import { motion } from "framer-motion";
import { FileCheck2, Gauge, Target, ListChecks } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const icons = [FileCheck2, Gauge, Target, ListChecks];

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = icons[i % icons.length];
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="h-full transition-shadow hover:shadow-glow">
              <CardContent className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                    {stat.delta}
                  </span>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold tracking-tight">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-sm font-medium text-muted-foreground">
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
