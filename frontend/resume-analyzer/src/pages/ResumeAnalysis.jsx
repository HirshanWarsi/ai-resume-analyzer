import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  ListChecks,
  Lightbulb,
  FileText,
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScoreGauge from "@/components/analysis/ScoreGauge";
import ListCard from "@/components/analysis/ListCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/services/api";
import {
  exportResumeReport,
  getResumeAnalysis,
} from "@/services/resumeService";
import { getResumeHistory } from "@/services/resumeService";
import { parseJsonList } from "@/lib/utils";

export default function ResumeAnalysis() {
  const { resumeId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [resumeMeta, setResumeMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function loadAnalysis() {
      setLoading(true);
      setError("");

      try {
        const [analysisResponse, historyResponse] = await Promise.all([
          getResumeAnalysis(resumeId),
          getResumeHistory(),
        ]);
        setAnalysis(analysisResponse.data);
        const matchedResume = (historyResponse.data || []).find(
          (item) => String(item.resume_id) === String(resumeId),
        );
        setResumeMeta(matchedResume || null);
      } catch (err) {
        setError(
          getApiErrorMessage(err, "We could not load the resume analysis."),
        );
      } finally {
        setLoading(false);
      }
    }

    if (resumeId) {
      void loadAnalysis();
    }
  }, [resumeId]);

  async function handleExport() {
    if (!resumeId) return;

    setExporting(true);
    setError("");

    try {
      const response = await exportResumeReport(resumeId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `Resume_Report_${resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(getApiErrorMessage(err, "The report could not be downloaded."));
    } finally {
      setExporting(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Resume Analysis">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-border bg-card px-6 py-10">
          <div className="h-5 w-40 animate-pulse rounded-full bg-muted" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !analysis) {
    return (
      <DashboardLayout title="Resume Analysis">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-border bg-card px-6 py-10">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <p>{error || "This analysis is not available yet."}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const strengths = useMemo(
    () => parseJsonList(analysis.strengths, []),
    [analysis.strengths],
  );
  const weaknesses = useMemo(
    () => parseJsonList(analysis.weaknesses, []),
    [analysis.weaknesses],
  );
  const missingSkills = useMemo(
    () => parseJsonList(analysis.missing_skills, []),
    [analysis.missing_skills],
  );
  const suggestions = useMemo(
    () => parseJsonList(analysis.suggestions, []),
    [analysis.suggestions],
  );

  const displayName = resumeMeta?.filename || "Your resume";
  const generatedDate = resumeMeta?.uploaded_at
    ? new Date(resumeMeta.uploaded_at).toLocaleDateString()
    : "Recently generated";

  return (
    <DashboardLayout title="Resume Analysis">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold">{displayName}</h2>
              <p className="text-sm text-muted-foreground">
                Generated {generatedDate}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={exporting}
            aria-label="Download the resume report as a PDF"
          >
            {exporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export Report
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
              <ScoreGauge score={analysis.ats_score} />
              <p className="text-center text-xs text-muted-foreground">
                Score reflects keyword match, formatting, and section structure
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
              <CardDescription>What stands out in this resume</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {analysis.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {missingSkills.slice(0, 3).length ? (
                  missingSkills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="warning">
                      Missing: {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ListCard
            title="Strengths"
            icon={ThumbsUp}
            items={strengths}
            tone="success"
          />
          <ListCard
            title="Weaknesses"
            icon={ThumbsDown}
            items={weaknesses}
            tone="destructive"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="h-full">
            <CardHeader className="flex-row items-center gap-3 space-y-0 pb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning/10 text-warning">
                <ListChecks className="h-4.5 w-4.5" />
              </span>
              <CardTitle className="text-base">Missing Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {missingSkills.length ? (
                missingSkills.map((skill) => (
                  <Badge key={skill} variant="warning">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No data available
                </p>
              )}
            </CardContent>
          </Card>

          <ListCard
            title="Suggestions"
            icon={Lightbulb}
            items={suggestions}
            tone="default"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
