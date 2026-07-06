import React from "react";
import api from "@/services/api";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  ListChecks,
  Lightbulb,
  FileText,
  Download,
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
import { analysisResult } from "@/data/sampleData";

export default function ResumeAnalysis() {
  const {
    fileName,
    atsScore,
    summary,
    strengths,
    weaknesses,
    missingSkills,
    suggestions,
  } = analysisResult;

  async function handleExport() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/resume/1/export", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      saveAs(response.data, "Resume_Report.pdf");
    } catch (error) {
      console.error(error);
      alert("Failed to download report.");
    }
  }

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
              <h2 className="font-display text-xl font-bold">{fileName}</h2>
              <p className="text-sm text-muted-foreground">Analyzed just now</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
              <ScoreGauge score={atsScore} />
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
                {summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {missingSkills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="warning">
                    Missing: {skill}
                  </Badge>
                ))}
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
              {missingSkills.map((skill) => (
                <Badge key={skill} variant="warning">
                  {skill}
                </Badge>
              ))}
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
