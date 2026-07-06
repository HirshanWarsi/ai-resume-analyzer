import api from "./api";

export function analyzeJobMatch(resumeId, jobDescription) {
  return api.post("/job-match/", {
    resume_id: resumeId,
    job_description: jobDescription,
  });
}
