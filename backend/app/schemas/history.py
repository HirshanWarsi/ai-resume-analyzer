from datetime import datetime
from pydantic import BaseModel


class ResumeHistoryResponse(BaseModel):
    resume_id: int
    filename: str
    ats_score: int
    uploaded_at: datetime

    class Config:
        from_attributes = True