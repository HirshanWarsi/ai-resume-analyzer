import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentAnalyses from "@/components/dashboard/RecentAnalyses";
import { stats, recentAnalyses } from "@/data/sampleData";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, FileSearch } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <WelcomeCard />
        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentAnalyses analyses={recentAnalyses} />
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/analysis">
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-glow">
                <CardContent className="flex items-center gap-4 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <FileSearch className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">View Resume Analysis</p>
                    <p className="text-xs text-muted-foreground">See your latest ATS breakdown</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/job-match">
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:shadow-glow">
                <CardContent className="flex items-center gap-4 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Target className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Run a Job Match</p>
                    <p className="text-xs text-muted-foreground">Compare your resume to a JD</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
