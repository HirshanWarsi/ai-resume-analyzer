from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class ResumeAnalysis(Base):
    __tablename__ = "resume_analysis"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False
    )

    ats_score = Column(Integer)

    summary = Column(Text)

    strengths = Column(Text)

    weaknesses = Column(Text)

    missing_skills = Column(Text)

    suggestions = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )