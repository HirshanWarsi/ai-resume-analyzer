import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function scoreVariant(score) {
  if (score >= 80) return "success";
  if (score >= 60) return "warning";
  return "destructive";
}

export default function RecentAnalyses({ analyses }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Recent Analyses</CardTitle>
          <CardDescription>Your last few resume scans</CardDescription>
        </div>
        <Link
          to="/analysis"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {analyses.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              to="/analysis"
              className="flex items-center gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/60"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <FileText className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.fileName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.role} · {item.date}
                </p>
              </div>
              <Badge variant={scoreVariant(item.score)} className="font-mono">
                {item.score}
              </Badge>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
