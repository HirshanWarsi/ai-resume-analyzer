import os
import shutil
import uuid

from fastapi import UploadFile
from sqlalchemy.orm import Session, joinedload

from app.models.resume import Resume
from app.services.parser_service import extract_text_from_pdf
from app.services.analysis_service import analyze_and_save_resume
from app.models.resume_analysis import ResumeAnalysis

UPLOAD_DIR = "uploads/resumes"


os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_resume(
    db: Session,
    user_id: int,
    file: UploadFile
):
    file_extension = file.filename.split(".")[-1]

    unique_filename = f"{uuid.uuid4()}.{file_extension}"

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_pdf(file_path)

    resume = Resume(
        user_id=user_id,
        original_filename=file.filename,
        stored_filename=unique_filename,
        file_path=file_path,
        file_size=os.path.getsize(file_path),
        extracted_text=text
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    analysis = analyze_and_save_resume(
        db=db,
        resume=resume
    )

    return {
    "resume": resume,
    "analysis": analysis
}

def get_resume_history(
    db: Session,
    user_id: int
):
    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .all()
    )

    history = []

    for resume in resumes:

        analysis = (
            db.query(ResumeAnalysis)
            .filter(
                ResumeAnalysis.resume_id == resume.id
            )
            .first()
        )

        history.append(
            {
                "resume_id": resume.id,
                "filename": resume.original_filename,
                "ats_score": analysis.ats_score if analysis else 0,
                "uploaded_at": resume.created_at,
            }
        )

    return history