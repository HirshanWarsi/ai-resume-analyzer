from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.auth.auth_handler import get_current_user
from app.models.user import User
from app.schemas.resume import ResumeResponse
from app.services.resume_service import save_resume

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post(
    "/upload",
    response_model=ResumeResponse
)
def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Allow only PDF files
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    resume = save_resume(
        db=db,
        user_id=current_user.id,
        file=file
    )

    return resume