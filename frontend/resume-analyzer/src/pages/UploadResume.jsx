import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ResumeDropzone from "@/components/dashboard/ResumeDropzone";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadResume } from "@/services/resumeService";
import { getApiErrorMessage } from "@/services/api";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleAnalyze() {
    if (!file) return;

    setUploading(true);
    setError("");
    setSuccess("");
    setProgress(10);

    try {
      const response = await uploadResume(file, (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) /
            (progressEvent.total || file.size || 1),
        );
        setProgress(percent);
      });
      setProgress(100);
      setSuccess("Resume uploaded and analyzed successfully.");
      const resumeId = response.data?.resume?.id;
      if (resumeId) {
        setTimeout(() => navigate(`/analysis/${resumeId}`), 600);
      }
    } catch (err) {
      setProgress(0);
      setError(
        getApiErrorMessage(err, "We could not upload your resume right now."),
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <DashboardLayout title="Upload Resume">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold">
            Upload your resume
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll scan the structure, keywords, and formatting the way an ATS
            would.
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <ResumeDropzone onFileSelected={setFile} />

            {uploading && (
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Uploading and analyzing…</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {error && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {success && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
                <CheckCircle2 className="h-4 w-4" />
                {success}
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                Only PDF files are supported for analysis.
              </p>
              <Button
                size="lg"
                disabled={!file || uploading}
                onClick={handleAnalyze}
                className="w-full sm:w-auto"
                aria-label="Upload and analyze the selected resume"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Analyze Resume
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tips for the best score</CardTitle>
            <CardDescription>A few things ATS parsers look for</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Use standard section headers like Experience & Education",
              "Avoid tables, columns, or text inside images",
              "Save as PDF unless the posting asks for DOC/DOCX",
              "Mirror key skills from the job description naturally",
            ].map((tip) => (
              <div
                key={tip}
                className="flex items-start gap-2.5 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {tip}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
