from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class JobMatch(Base):
    __tablename__ = "job_matches"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False
    )

    job_description = Column(Text, nullable=False)

    match_score = Column(Integer)

    matching_skills = Column(Text)

    missing_skills = Column(Text)

    recommendations = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )