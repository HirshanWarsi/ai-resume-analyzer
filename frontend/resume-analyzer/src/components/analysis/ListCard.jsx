import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ListCard({
  title,
  icon: Icon,
  items,
  tone = "default",
}) {
  const toneClasses = {
    default: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    destructive: "text-destructive bg-destructive/10",
    warning: "text-warning bg-warning/10",
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center gap-3 space-y-0 pb-3">
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl",
            toneClasses[tone],
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {items.length ? (
          items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="flex items-start gap-2.5 text-sm text-muted-foreground"
            >
              <span
                className={cn(
                  "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                  tone === "success" && "bg-success",
                  tone === "destructive" && "bg-destructive",
                  tone === "warning" && "bg-warning",
                  tone === "default" && "bg-primary",
                )}
              />
              <span className="leading-relaxed">{item}</span>
            </motion.div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No data available</p>
        )}
      </CardContent>
    </Card>
  );
}
