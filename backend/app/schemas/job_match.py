from pydantic import BaseModel
from datetime import datetime


class JobMatchRequest(BaseModel):
    resume_id: int
    job_description: str


class JobMatchResponse(BaseModel):
    id: int
    resume_id: int
    job_description: str
    match_score: int
    matching_skills: str
    missing_skills: str
    recommendations: str
    created_at: datetime

    class Config:
        from_attributes = True