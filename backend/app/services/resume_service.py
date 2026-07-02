import os
import shutil
import uuid

from sqlalchemy import text

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.services.parser_service import extract_text_from_pdf

UPLOAD_DIR = "uploads/resume"


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

    return resume