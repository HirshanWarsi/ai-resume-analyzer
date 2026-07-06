import json

from sqlalchemy.orm import Session

from app.models.resume_analysis import ResumeAnalysis
from app.services.ai_service import analyze_resume


def analyze_and_save_resume(
    db: Session,
    resume
):
    result = analyze_resume(
        resume.extracted_text
    )

    analysis = ResumeAnalysis(
        resume_id=resume.id,
        ats_score=result["ats_score"],
        summary=result["summary"],
        strengths=json.dumps(result["strengths"]),
        weaknesses=json.dumps(result["weaknesses"]),
        missing_skills=json.dumps(result["missing_skills"]),
        suggestions=json.dumps(result["suggestions"])
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return analysis

def get_analysis_by_resume_id(
    db: Session,
    resume_id: int
):
    return (
        db.query(ResumeAnalysis)
        .filter(ResumeAnalysis.resume_id == resume_id)
        .first()
    )