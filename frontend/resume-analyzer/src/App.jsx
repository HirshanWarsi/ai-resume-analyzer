import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme-context";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import UploadResume from "@/pages/UploadResume";
import ResumeAnalysis from "@/pages/ResumeAnalysis";
import JobMatch from "@/pages/JobMatch";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/analysis" element={<ResumeAnalysis />} />
        <Route path="/job-match" element={<JobMatch />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
