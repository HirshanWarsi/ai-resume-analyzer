import json
from re import match

from sqlalchemy.orm import Session

from app.models.job_match import JobMatch
from app.models.resume import Resume
from app.services.ai_service import model

def analyze_job_match(
    db: Session,
    resume_id: int,
    job_description: str
):
    resume = (
        db.query(Resume)
        .filter(Resume.id == resume_id)
        .first()
    )

    if resume is None:
        return None

    prompt = f"""
You are an ATS Resume Expert.

Compare this resume with the following job description.

Return ONLY valid JSON.

Resume:
{resume.extracted_text}

Job Description:
{job_description}

Format:

{{
    "match_score": 90,
    "matching_skills":[...],
    "missing_skills":[...],
    "recommendations":[...]
}}
"""
    
    response = model.generate_content(prompt)
    text = response.text.strip()
    result = json.loads(text)

    match = JobMatch(
        resume_id=resume.id,
        job_description=job_description,
        match_score=result["match_score"],
        matching_skills=json.dumps(result["matching_skills"]),
        missing_skills=json.dumps(result["missing_skills"]),
        recommendations=json.dumps(result["recommendations"])
    )

    db.add(match)
    db.commit()
    db.refresh(match)

    return match