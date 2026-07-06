import api from "./api";

export function getResumeHistory() {
  return api.get("/resume/history");
}

export function uploadResume(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
}

export function getResumeAnalysis(resumeId) {
  return api.get(`/resume/${resumeId}/analysis`);
}

export function exportResumeReport(resumeId) {
  return api.get(`/resume/${resumeId}/export`, {
    responseType: "blob",
  });
}
