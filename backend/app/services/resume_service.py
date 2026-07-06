import os
import uuid

from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.services.parser_service import extract_text_from_pdf
from app.services.analysis_service import analyze_and_save_resume
from app.models.resume_analysis import ResumeAnalysis

UPLOAD_DIR = "uploads/resumes"
MAX_UPLOAD_SIZE = 10 * 1024 * 1024


os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_resume(
    db: Session,
    user_id: int,
    file: UploadFile
):
    file_extension = file.filename.rsplit(".", 1)[-1].lower()

    unique_filename = f"{uuid.uuid4()}.{file_extension}"

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    total_size = 0

    with open(file_path, "wb") as buffer:
        while chunk := file.file.read(1024 * 1024):
            total_size += len(chunk)
            if total_size > MAX_UPLOAD_SIZE:
                buffer.close()
                os.remove(file_path)
                raise HTTPException(
                    status_code=413,
                    detail="Resume PDF must be 10 MB or smaller."
                )
            buffer.write(chunk)

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
        .order_by(Resume.uploaded_at.desc())
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
                "uploaded_at": resume.uploaded_at,
            }
        )

    return history
