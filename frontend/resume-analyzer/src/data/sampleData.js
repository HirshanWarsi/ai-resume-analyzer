// Static demo content used purely to populate the UI.
// No network calls, no backend, no fake API layer.

export const stats = [
  { label: "Resumes Scanned", value: "12", delta: "+3 this week" },
  { label: "Average ATS Score", value: "78", suffix: "/100", delta: "+6 pts" },
  { label: "Job Matches Run", value: "27", delta: "+9 this week" },
  { label: "Skills Tracked", value: "34", delta: "5 new" },
];

export const recentAnalyses = [
  {
    id: "an-01",
    fileName: "Hirshan_Resume_MERN.pdf",
    role: "Full Stack Developer (MERN)",
    date: "2 days ago",
    score: 82,
  },
  {
    id: "an-02",
    fileName: "Hirshan_Resume_v3.pdf",
    role: "Frontend Engineer",
    date: "6 days ago",
    score: 74,
  },
  {
    id: "an-03",
    fileName: "Hirshan_Resume_AI-focus.pdf",
    role: "AI Product Engineer",
    date: "1 week ago",
    score: 69,
  },
  {
    id: "an-04",
    fileName: "Hirshan_Resume_Backend.pdf",
    role: "Node.js Backend Developer",
    date: "2 weeks ago",
    score: 71,
  },
];

export const analysisResult = {
  fileName: "Hirshan_Resume_MERN.pdf",
  atsScore: 82,
  summary:
    "This resume presents a clear MERN stack focus with concrete, shippable projects. Formatting is ATS-friendly, but a few keyword gaps and generic bullet phrasing are holding the score back from the top tier.",
  strengths: [
    "Quantified impact on the AI resume analyzer and expense tracker projects",
    "Clean reverse-chronological structure that parses well in ATS systems",
    "Strong, consistent tech stack keywords (React, Node.js, Express, MongoDB)",
    "Dedicated skills section separated from experience for easy scanning",
  ],
  weaknesses: [
    "Bullet points lean descriptive rather than outcome-driven in two roles",
    "No links to live project demos or GitHub repos in the header",
    "Summary section reads generic and could be tailored per application",
  ],
  missingSkills: ["Docker", "CI/CD", "TypeScript", "System Design", "Unit Testing (Jest)"],
  suggestions: [
    "Lead each bullet with the outcome, then the method: \"Cut load time 40% by...\"",
    "Add a pinned links row: GitHub, portfolio, and one live deployed project",
    "Introduce 2-3 missing skills you actually know into relevant project bullets",
    "Replace the generic summary with 2 lines tailored to the target role",
  ],
};

export const jobMatchResult = {
  matchScore: 76,
  matchingSkills: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"],
  missingSkills: ["GraphQL", "AWS", "Redis", "Docker"],
  recommendations: [
    "Mention any exposure to caching or queues, even from side projects",
    "Highlight the OpenAI API integration work — it aligns with this role's AI focus",
    "Add a short line on deployment experience (Vercel, Render, or similar counts)",
    "Mirror 2-3 exact phrases from the job description in your skills section",
  ],
};
