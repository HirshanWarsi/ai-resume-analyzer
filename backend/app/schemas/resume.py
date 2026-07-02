from pydantic import BaseModel
from datetime import datetime


class ResumeResponse(BaseModel):
    id: int
    original_filename: str
    stored_filename: str
    file_path: str
    file_size: int
    uploaded_at: datetime

    class Config:
        from_attributes = True