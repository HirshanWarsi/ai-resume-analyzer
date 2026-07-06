import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Target, FileSearch, FileText, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentAnalyses from "@/components/dashboard/RecentAnalyses";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/services/api";
import { getResumeHistory } from "@/services/resumeService";

export default function Dashboard() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      setError("");

      try {
        const response = await getResumeHistory();
        setHistory(response.data || []);
      } catch (err) {
        setError(
          getApiErrorMessage(err, "We could not load your resume history."),
        );
      } finally {
        setLoading(false);
      }
    }

    void loadHistory();
  }, []);

  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => {
      return new Date(b.uploaded_at) - new Date(a.uploaded_at);
    });
  }, [history]);

  const stats = useMemo(() => {
    const latest = sortedHistory[0];
    const latestScore = latest?.ats_score ?? 0;

    return [
      {
        label: "Total resumes",
        value: sortedHistory.length,
        suffix: "",
        delta: "+0%",
      },
      {
        label: "Latest ATS score",
        value: latestScore,
        suffix: "/100",
        delta: latest ? "+1" : "—",
      },
      {
        label: "Latest uploaded resume",
        value: latest?.filename ? latest.filename : "—",
        delta: latest ? "New" : "—",
      },
      {
        label: "Recent analyses",
        value: sortedHistory.length,
        suffix: "",
        delta: history.length ? "Updated" : "—",
      },
    ];
  }, [history.length, sortedHistory]);

  const recentAnalyses = useMemo(() => {
    return sortedHistory.slice(0, 5).map((item) => ({
      id: item.resume_id,
      fileName: item.filename,
      role: "Uploaded resume",
      date: new Date(item.uploaded_at).toLocaleDateString(),
      score: item.ats_score,
    }));
  }, [sortedHistory]);

  return (
    <DashboardLayout title="Dashboard">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <WelcomeCard name={user?.name?.split(" ")[0] || "there"} />

        {loading ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-28 animate-pulse rounded-2xl border border-border bg-card"
                />
              ))}
            </div>
            <div className="h-56 animate-pulse rounded-2xl border border-border bg-card" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 px-5 py-4 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        ) : (
          <>
            <StatsGrid stats={stats} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {sortedHistory.length > 0 ? (
                  <RecentAnalyses analyses={recentAnalyses} />
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">No resumes uploaded yet</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Upload your first PDF to generate an ATS analysis and
                          see your dashboard populate.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  to={
                    sortedHistory[0]?.resume_id
                      ? `/analysis/${sortedHistory[0].resume_id}`
                      : "/upload"
                  }
                  aria-label="Open the latest resume analysis"
                >
                  <Card className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-glow">
                    <CardContent className="flex items-center gap-4 p-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <FileSearch className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">
                          View Resume Analysis
                        </p>
                        <p className="text-xs text-muted-foreground">
                          See your latest ATS breakdown
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/job-match" aria-label="Open the job match tool">
                  <Card className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-glow">
                    <CardContent className="flex items-center gap-4 p-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <Target className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">Run a Job Match</p>
                        <p className="text-xs text-muted-foreground">
                          Compare your resume to a JD
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
