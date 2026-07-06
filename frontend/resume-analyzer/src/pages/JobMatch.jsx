import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Sparkles, Loader2, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MatchMeter from "@/components/jobmatch/MatchMeter";
import { jobMatchResult } from "@/data/sampleData";

export default function JobMatch() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  function handleAnalyze() {
    if (!jd.trim()) return;
    setLoading(true);
    setShowResults(false);
    // Purely presentational — no backend call is made.
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1100);
  }

  return (
    <DashboardLayout title="Job Match">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold">Match your resume to a job</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste a job description below and see how closely your resume aligns.
          </p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Job Description</CardTitle>
            <CardDescription>Paste the full listing for the most accurate match</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-[220px] resize-y"
            />
            <div className="flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                {jd.trim().split(/\s+/).filter(Boolean).length} words
              </p>
              <Button
                size="lg"
                disabled={!jd.trim() || loading}
                onClick={handleAnalyze}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Matching...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4" /> Analyze Match
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <Card>
                <CardContent className="p-6">
                  <MatchMeter score={jobMatchResult.matchScore} />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader className="flex-row items-center gap-3 space-y-0 pb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10 text-success">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </span>
                    <CardTitle className="text-base">Matching Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {jobMatchResult.matchingSkills.map((skill) => (
                      <Badge key={skill} variant="success">
                        {skill}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex-row items-center gap-3 space-y-0 pb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                      <XCircle className="h-4.5 w-4.5" />
                    </span>
                    <CardTitle className="text-base">Missing Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {jobMatchResult.missingSkills.map((skill) => (
                      <Badge key={skill} variant="destructive">
                        {skill}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex-row items-center gap-3 space-y-0 pb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Lightbulb className="h-4.5 w-4.5" />
                  </span>
                  <CardTitle className="text-base">Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {jobMatchResult.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
