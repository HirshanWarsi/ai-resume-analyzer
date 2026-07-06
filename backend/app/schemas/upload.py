from pydantic import BaseModel

from app.schemas.resume import ResumeResponse
from app.schemas.analysis import ResumeAnalysisResponse


class UploadResponse(BaseModel):
    resume: ResumeResponse
    analysis: ResumeAnalysisResponse