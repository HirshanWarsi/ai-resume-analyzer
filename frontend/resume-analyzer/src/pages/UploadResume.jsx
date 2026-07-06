import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ResumeDropzone from "@/components/dashboard/ResumeDropzone";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  function handleAnalyze() {
    setAnalyzing(true);
    // Purely presentational transition — no backend call is made.
    setTimeout(() => navigate("/analysis"), 900);
  }

  return (
    <DashboardLayout title="Upload Resume">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold">Upload your resume</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll scan the structure, keywords, and formatting the way an ATS would.
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <ResumeDropzone onFileSelected={setFile} />

            <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                Your file is analyzed locally in this session and never shared.
              </p>
              <Button
                size="lg"
                disabled={!file || analyzing}
                onClick={handleAnalyze}
                className="w-full sm:w-auto"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
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
