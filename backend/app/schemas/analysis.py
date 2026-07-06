from pydantic import BaseModel
from datetime import datetime


class ResumeAnalysisResponse(BaseModel):
    id: int
    resume_id: int
    ats_score: int
    summary: str
    strengths: str
    weaknesses: str
    missing_skills: str
    suggestions: str
    created_at: datetime

    class Config:
        from_attributes = True